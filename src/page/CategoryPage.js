import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import StandaloneItemDetails from '../component/StandaloneItemDetails';
import ImportantNote from '../component/ImportantNote';
import { useCart } from '../context/CartContext';
import { CATEGORY_META } from '../data/catalogCategories';

const SITE = 'https://www.unboxparadise.com';

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [catalogData, setCatalogData] = useState(null);
    const { toggleItem, isInCart } = useCart();

    useEffect(() => {
        fetch('/resource/config/catalog.json')
            .then((response) => response.json())
            .then((data) => setCatalogData(data))
            .catch((error) => console.error('Error loading catalog data:', error));
    }, []);

    if (!catalogData) return null;

    const categories = catalogData.categories || [];
    const category = categories.find((cat) => cat.id === categoryId);

    if (!category) {
        return (
            <div className="min-h-full">
                <main className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 text-center"
                    style={{ paddingTop: '160px', minHeight: '70vh' }}>
                    <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Category Not Found</h1>
                    <p className="text-gray-600 mb-6">The category you are looking for does not exist.</p>
                    <Link to="/catalog" className="inline-block rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg">
                        Browse Full Catalog
                    </Link>
                </main>
            </div>
        );
    }

    const meta = CATEGORY_META[category.id] || {};
    const items = category.items || [];
    const otherCategories = categories.filter((cat) => cat.id !== category.id);

    const createItemWithId = (cat, item) => {
        const fallbackSlug = `${item.name}`
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return {
            ...item,
            id: item.id || `${cat.id}-${fallbackSlug}`,
            categoryId: cat.id,
            categoryName: cat.name
        };
    };

    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'name': `${category.name} - Corporate Gifts`,
        'itemListElement': items.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'item': {
                '@type': 'Product',
                'name': item.name,
                'image': item.images && item.images.length > 0 ? `${SITE}${item.images[0]}` : undefined,
                'description': Array.isArray(item.description) ? item.description.join(', ') : item.description,
                'offers': item.price ? {
                    '@type': 'Offer',
                    'price': Number(item.price),
                    'priceCurrency': 'INR',
                    'availability': 'https://schema.org/InStock',
                    'seller': { '@type': 'Organization', 'name': 'Unbox Paradise' }
                } : undefined
            }
        }))
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Product Catalog', 'item': `${SITE}/catalog` },
            { '@type': 'ListItem', 'position': 3, 'name': category.name, 'item': `${SITE}/catalog/${category.id}` }
        ]
    };

    return (
        <div className="min-h-full">
            <main className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative"
                style={{ paddingTop: '120px' }}>
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

                <div className="w-full mx-auto mb-8 md:mb-10 px-2 sm:px-4 max-w-[120rem] text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
                        {category.name} – Custom Corporate Gifts
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mb-3">
                        {category.description}
                    </p>
                    {meta.intro && (
                        <p className="text-gray-700 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                            {meta.intro}
                        </p>
                    )}
                    <p className="text-gray-500 text-sm mt-4">
                        {items.length} products · <Link to="/catalog" className="text-pink-600 font-semibold hover:underline">View full catalog</Link>
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-[120rem] mx-auto px-2 sm:px-4">
                    {items.map((item) => {
                        const itemWithId = createItemWithId(category, item);
                        return (
                            <StandaloneItemDetails
                                key={itemWithId.id}
                                item={itemWithId}
                                onToggle={toggleItem}
                                isSelected={isInCart(itemWithId.id)}
                            />
                        );
                    })}
                </div>

                <ImportantNote />

                <section className="max-w-[120rem] mx-auto px-2 sm:px-4 mt-10 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold gradient-text text-center mb-6">
                        Browse Other Categories
                    </h2>
                    <div className="flex flex-wrap justify-center gap-2.5">
                        {otherCategories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/catalog/${cat.id}`}
                                className="rounded-full border border-pink-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:border-pink-400 hover:text-pink-600 transition-colors"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="max-w-[900px] mx-auto px-2 sm:px-4 mb-16">
                    <div className="rounded-2xl bg-gradient-to-r from-[rgb(226,168,43)] to-[rgb(184,3,124)] p-1 shadow-xl">
                        <div className="rounded-2xl bg-white px-6 py-8 md:px-10 md:py-10 text-center">
                            <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">
                                Need Bulk {category.name}?
                            </h2>
                            <p className="text-gray-600 mb-5 max-w-2xl mx-auto">
                                Share your quantity, branding and budget — we'll send a customized bulk quote within 24 hours.
                            </p>
                            <Link to="/contact" className="inline-block rounded-lg bg-gradient-to-r from-[rgb(226,168,43)] to-[rgb(184,3,124)] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105">
                                Get a Quote
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CategoryPage;
