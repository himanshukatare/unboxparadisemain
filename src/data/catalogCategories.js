export const CATEGORY_META = {
    wearables: {
        title: 'Custom Corporate Wearables | T-Shirts, Polos & Apparel',
        description: 'Bulk custom corporate t-shirts, polos and branded apparel with logo printing or embroidery. Ideal for teams, events and employer branding across India.',
        intro: 'Branded apparel is one of the most visible corporate gifts. We produce custom t-shirts, polos, hoodies and caps in bulk with printing or embroidery, so your team and event merchandise look consistent and professional.'
    },
    drinkware: {
        title: 'Custom Corporate Drinkware | Bottles, Mugs & Tumblers',
        description: 'Personalized corporate bottles, mugs and tumblers with your logo. Practical, everyday branded gifts for employees, clients and events in bulk.',
        intro: 'Drinkware gifts get used every day, which keeps your brand in sight. Choose from insulated bottles, ceramic and travel mugs, and tumblers — all customizable with your logo and colours.'
    },
    bags: {
        title: 'Custom Corporate Bags | Laptop, Tote & Backpack Gifts',
        description: 'Bulk branded bags for corporate gifting: laptop backpacks, tote bags, duffels and travel bags with custom logos. Perfect for onboarding and events.',
        intro: 'From laptop backpacks for new joiners to tote and travel bags for events, our corporate bags combine utility with strong brand visibility. All bags can be customized with your logo and colours.'
    },
    tech: {
        title: 'Corporate Tech Gifts | Gadgets & Accessories',
        description: 'Premium corporate tech gifts including power banks, wireless accessories, speakers and gadget kits. Custom-branded for employees, clients and events.',
        intro: 'Tech gifts are high-impact and highly appreciated. We offer power banks, audio accessories and curated gadget kits that can be branded and bundled for onboarding, recognition and client gifting.'
    },
    stationery: {
        title: 'Custom Corporate Stationery | Diaries, Pens & Notebooks',
        description: 'Branded corporate stationery in bulk: diaries, notebooks, pens and desk accessories with custom logos. Great for onboarding kits and events.',
        intro: 'Corporate stationery is a classic gifting choice for onboarding kits and events. Customize diaries, notebooks, pens and desk sets with your logo, colours and packaging for a polished, professional gift.'
    },
    miscellaneous: {
        title: 'Corporate Gift Accessories & Miscellaneous Items',
        description: 'A wide range of customizable corporate gift accessories and miscellaneous items to complete your welcome kits, festive hampers and event giveaways.',
        intro: 'Looking for the perfect filler or add-on for your gift kits? This collection covers a wide range of customizable accessories and utility items that round off welcome kits, hampers and giveaways.'
    },
    watchandfancy: {
        title: 'Corporate Watches & Fancy Gifts | Bulk Branding',
        description: 'Premium corporate watches and fancy gifts for recognition, milestone and festive gifting. Custom-branded and supplied in bulk across India.',
        intro: 'For milestone recognition and premium gifting, watches and fancy gifts make a lasting impression. Choose from elegant styles that can be branded and presented in premium packaging.'
    }
};

export const getCategoryMeta = (categoryId) => CATEGORY_META[categoryId] || null;

export const CATEGORY_IDS = Object.keys(CATEGORY_META);
