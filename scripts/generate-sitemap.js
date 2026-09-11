const fs = require('fs');
const path = require('path');

const SITE = 'https://www.unboxparadise.com';
const ROOT = path.join(__dirname, '..');
const CATALOG = path.join(ROOT, 'public', 'resource', 'config', 'catalog.json');
const SITEMAP = path.join(ROOT, 'public', 'sitemap.xml');

const slugify = (text) =>
    String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const STATIC_PATHS = [
    '/',
    '/products-services',
    '/catalog',
    '/bundled-packs',
    '/about-us',
    '/our-process',
    '/what-makes-us-special',
    '/contact',
    '/corporate-gifting-pune',
    '/corporate-gifting-bhopal',
    '/blogs/blog-list',
    '/blogs/corporate-gifting-seo',
    '/blogs/employee-onboarding-welcome-kits-2026',
    '/blogs/employee-onboarding-kits-2026',
    '/blogs/diwali-corporate-gifting-ideas-2026',
    '/blogs/employee-onboarding-kit-ideas',
    '/blogs/academic-and-edtech-kits-guide',
    '/blogs/corporate-gifting-in-pune-bhopal'
];

const catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
const productPaths = [];

(catalog.categories || []).forEach((category) => {
    productPaths.push(`/catalog/${category.id}`);
    const seen = {};
    (category.items || []).forEach((item) => {
        let slug = slugify(item.name) || slugify(item.id) || 'product';
        if (seen[slug]) {
            slug = `${slug}-${String(item.id || '').toLowerCase()}`;
        }
        seen[slug] = true;
        productPaths.push(`/catalog/${category.id}/${slug}`);
    });
});

const allPaths = [...STATIC_PATHS, ...productPaths];
const urls = allPaths.map((p) => `  <url>\n    <loc>${SITE}${p}</loc>\n  </url>`).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

fs.writeFileSync(SITEMAP, xml);
console.log(`Sitemap written with ${allPaths.length} URLs (${productPaths.length} catalog/category URLs).`);
