import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CATEGORY_META } from '../data/catalogCategories';

const SITE = 'https://www.unboxparadise.com';

const PAGE_META = {
    '/': {
        title: 'Corporate Gifting & Diwali Hampers in Pune, Bhopal | Unbox Paradise',
        description: 'Premium corporate gifting, Diwali hampers, employee welcome kits and academic & edtech kits in Pune and Bhopal. Bulk customization with PAN-India delivery by Unbox Paradise.'
    },
    '/products-services': {
        title: 'Corporate, Academic & Festive Gifting Services | Unbox Paradise',
        description: 'Explore Unbox Paradise gifting services in Pune & Bhopal: corporate gifting, Diwali hampers, employee onboarding & welcome kits, academic and edtech kits, festive gifts and custom merchandise.'
    },
    '/catalog': {
        title: 'Bulk Corporate Gift Catalog 2026 | 96+ Custom Products | Unbox Paradise',
        description: 'Browse the Unbox Paradise catalog of customizable corporate gifts: t-shirts, polos, drinkware, bags, stationery, tech accessories and more with bulk discounts for brands in India.'
    },
    '/bundled-packs': {
        title: 'Corporate Gift Bundles & Value Packs | Unbox Paradise',
        description: 'Ready-made and customizable corporate gift bundles and value packs for employee welcome kits, Diwali gifting, client appreciation and academic events. Bulk pricing across India.'
    },
    '/about-us': {
        title: 'About Unbox Paradise | Corporate Gifting Company in Pune & Bhopal',
        description: 'Unbox Paradise is a corporate gifting company serving Pune, Bhopal and PAN India with welcome kits, Diwali hampers, academic kits and branded merchandise built around quality and on-time delivery.'
    },
    '/our-process': {
        title: 'Our Gifting Process | From Brief to Delivery | Unbox Paradise',
        description: 'See how Unbox Paradise delivers corporate gifts end-to-end: consultation, curation, branding, assembly, quality checks and PAN-India dispatch for bulk gifting orders.'
    },
    '/what-makes-us-special': {
        title: 'Why Choose Unbox Paradise for Corporate Gifting',
        description: 'What makes Unbox Paradise different: premium quality, creative customization, competitive bulk pricing, fast turnaround and hassle-free corporate gifting across Pune, Bhopal and India.'
    },
    '/contact-us': {
        title: 'Contact Unbox Paradise | Get a Corporate Gifting Quote',
        description: 'Contact Unbox Paradise for corporate gifting quotes in Pune and Bhopal. Call +91 96309 82265, WhatsApp us, or send your bulk gift requirements for a fast, free proposal.'
    },
    '/contact': {
        title: 'Contact Unbox Paradise | Get a Corporate Gifting Quote',
        description: 'Contact Unbox Paradise for corporate gifting quotes in Pune and Bhopal. Call +91 96309 82265, WhatsApp us, or send your bulk gift requirements for a fast, free proposal.'
    },
    '/corporate-gifting-pune': {
        title: 'Corporate Gifting Company in Pune | Diwali Hampers & Welcome Kits',
        description: 'Unbox Paradise is a corporate gifting company in Pune offering employee welcome kits, Diwali hampers, academic & edtech kits and custom merchandise with bulk pricing and PAN-India delivery.'
    },
    '/corporate-gifting-bhopal': {
        title: 'Corporate Gifting Company in Bhopal | Diwali Hampers & Welcome Kits',
        description: 'Unbox Paradise is a corporate gifting company in Bhopal offering employee welcome kits, Diwali hampers, academic & institutional kits and custom merchandise with bulk pricing across Madhya Pradesh.'
    },
    '/my-cart': {
        title: 'My Cart | Unbox Paradise',
        description: 'Review the corporate gifts and kits in your cart before requesting a bulk quote from Unbox Paradise.',
        noindex: true
    }
};

const BLOG_META = {
    'blog-list': {
        title: 'Blogs on Corporate Gifting & Gift Kits | Unbox Paradise',
        description: 'Insights and guides from Unbox Paradise on corporate gifting, Diwali hampers, employee welcome kits and more.'
    },
    'corporate-gifting-seo': {
        title: 'Corporate & Personalized Gifting Best Practices | Unbox Paradise',
        description: 'How corporate gifting, festive hampers, academic kits and custom merchandise create lasting brand impact.'
    },
    'employee-onboarding-welcome-kits-2026': {
        title: 'Employee Onboarding & Welcome Kits 2026 Guide | Unbox Paradise',
        description: 'The 2026 guide to employee onboarding kits and new hire welcome kits: what to include, trends and ROI for HR teams.'
    },
    'employee-onboarding-kits-2026': {
        title: 'Employee Onboarding Kits 2026: The Welcome Kit Playbook | Unbox Paradise',
        description: 'A complete playbook for HR teams on employee onboarding kits 2026: welcome kit checklist, trends and corporate gifting ideas.'
    }
};

const DEFAULT_META = {
    title: 'Unbox Paradise | Corporate Gifting, Kits & Hampers',
    description: 'Corporate gifting, Diwali hampers, welcome kits and custom merchandise from Unbox Paradise, serving Pune, Bhopal and PAN India.'
};

const upsertMeta = (attr, key, content) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

const upsertCanonical = (href) => {
    let el = document.querySelector('link[rel="canonical"]');
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
};

export const applyMeta = (meta, canonical) => {
    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertCanonical(canonical);
};

const resolveMeta = (pathname) => {
    if (pathname.startsWith('/blogs/')) {
        const slug = pathname.replace(/^\/blogs\//, '').replace(/\/+$/, '');
        const meta = BLOG_META[slug] || { title: 'Blogs | Unbox Paradise', description: DEFAULT_META.description };
        return { meta, canonical: `${SITE}/blogs/${slug}` };
    }
    if (pathname.startsWith('/catalog/')) {
        const segments = pathname.replace(/^\/catalog\//, '').replace(/\/+$/, '').split('/');
        const category = CATEGORY_META[segments[0]];
        if (category && segments.length === 1) {
            return {
                meta: { title: `${category.title} | Unbox Paradise`, description: category.description },
                canonical: `${SITE}/catalog/${segments[0]}`
            };
        }
        if (segments.length === 2) {
            const humanized = segments[1]
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            return {
                meta: { title: `${humanized} | Unbox Paradise`, description: DEFAULT_META.description },
                canonical: `${SITE}${pathname}`
            };
        }
    }
    if (PAGE_META[pathname]) {
        return { meta: PAGE_META[pathname], canonical: `${SITE}${pathname}` };
    }
    const normalized = pathname.replace(/\/+$/, '') || '/';
    if (PAGE_META[normalized]) {
        return { meta: PAGE_META[normalized], canonical: `${SITE}${normalized}` };
    }
    return { meta: DEFAULT_META, canonical: `${SITE}/` };
};

const PageMeta = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const { meta, canonical } = resolveMeta(pathname);
        applyMeta(meta, canonical);
    }, [pathname]);

    return null;
};

export default PageMeta;
