const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer-core');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const OUT = path.join(BUILD, 'prerender');
const SITEMAP = path.join(BUILD, 'sitemap.xml');

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.jfif': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

const findBrowser = () => {
    const candidates = [
        process.env.PUPPETEER_EXECUTABLE_PATH,
        'C:/Program Files/Google/Chrome/Application/chrome.exe',
        'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe') : null,
        'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
        'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
    ].filter(Boolean);
    return candidates.find((candidate) => fs.existsSync(candidate));
};

const readRoutes = () => {
    const xml = fs.readFileSync(SITEMAP, 'utf8');
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map((match) => {
            try {
                return new URL(match[1]).pathname;
            } catch {
                return null;
            }
        })
        .filter(Boolean);
};

const startServer = (shellHtml) => new Promise((resolve) => {
    const server = http.createServer((req, res) => {
        const urlPath = decodeURIComponent(req.url.split('?')[0]);
        const filePath = path.join(BUILD, urlPath);

        if (urlPath !== '/' && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
            res.end(fs.readFileSync(filePath));
            return;
        }

        res.writeHead(200, { 'Content-Type': MIME['.html'] });
        res.end(shellHtml);
    });

    server.listen(0, '127.0.0.1', () => resolve(server));
});

const main = async () => {
    if (!fs.existsSync(BUILD) || !fs.existsSync(SITEMAP)) {
        console.error('build/ or build/sitemap.xml not found. Run "npm run build" first.');
        process.exit(1);
    }

    const shellHtml = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
    const routes = readRoutes();
    const executablePath = findBrowser();
    if (!executablePath) {
        console.error('No Chrome/Edge found. Set PUPPETEER_EXECUTABLE_PATH to a browser executable.');
        process.exit(1);
    }

    console.log(`Browser: ${executablePath}`);
    console.log(`Routes:  ${routes.length}`);

    const server = await startServer(shellHtml);
    const base = `http://127.0.0.1:${server.address().port}`;

    const browser = await puppeteer.launch({
        executablePath,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const concurrency = 4;
    let cursor = 0;
    let done = 0;
    let failed = 0;

    const worker = async () => {
        while (cursor < routes.length) {
            const route = routes[cursor++];
            const page = await browser.newPage();
            try {
                await page.setViewport({ width: 1366, height: 900 });
                await page.goto(base + route, { waitUntil: 'networkidle0', timeout: 45000 });
                await page.waitForFunction(() => {
                    const root = document.getElementById('root');
                    return root && root.innerText && root.innerText.replace(/\s+/g, '').length > 80;
                }, { timeout: 20000 });

                const html = await page.content();
                const outFile = route === '/'
                    ? path.join(BUILD, 'index.html')
                    : path.join(OUT, route.replace(/^\//, '') + '.html');

                fs.mkdirSync(path.dirname(outFile), { recursive: true });
                fs.writeFileSync(outFile, html);
                done++;
                console.log(`  [${done + failed}/${routes.length}] ${route}`);
            } catch (error) {
                failed++;
                console.error(`  FAILED ${route}: ${error.message}`);
            } finally {
                await page.close();
            }
        }
    };

    await Promise.all(Array.from({ length: concurrency }, worker));
    await browser.close();
    server.close();

    console.log(`\nPrerendered ${done} pages (${failed} failed).`);
    console.log(`Output: ${OUT}`);
    if (failed > 0) process.exitCode = 1;
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
