export const slugify = (text) =>
    String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

export const buildProductIndex = (categories = []) => {
    const byPath = {};
    const slugById = {};

    categories.forEach((category) => {
        const seen = {};
        (category.items || []).forEach((item) => {
            let slug = slugify(item.name) || slugify(item.id) || 'product';
            if (seen[slug]) {
                slug = `${slug}-${String(item.id || '').toLowerCase()}`;
            }
            seen[slug] = true;

            const product = {
                ...item,
                categoryId: category.id,
                categoryName: category.name,
                slug
            };

            byPath[`${category.id}/${slug}`] = product;
            if (item.id) {
                slugById[item.id] = { categoryId: category.id, slug };
            }
        });
    });

    return { byPath, slugById };
};

export const productPath = (index, categoryId, item) => {
    const known = item?.id ? index?.slugById?.[item.id] : null;
    const slug = known?.slug || slugify(item?.name) || slugify(item?.id) || 'product';
    const cat = known?.categoryId || categoryId;
    return `/catalog/${cat}/${slug}`;
};
