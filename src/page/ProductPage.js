import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import StandaloneItemDetails from '../component/StandaloneItemDetails';
import ImagePopover from '../component/ImagePopover';
import ImportantNote from '../component/ImportantNote';
import { useCart } from '../context/CartContext';
import { buildProductIndex, productPath } from '../utils/catalog';
import { applyMeta } from '../component/PageMeta';

const SITE = 'https://www.unboxparadise.com';

const toAbsolute = (path) => (path && path.startsWith('http') ? path : `${SITE}${path}`);

const ProductPage = () => {
    const { categoryId, productSlug } = useParams();
    const [catalogData, setCatalogData] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { toggleItem, isInCart } = useCart();

    useEffect(() => {
        fetch('/resource/config/catalog.json')
            .then((response) => response.json())
            .then((data) => setCatalogData(data))
            .catch((error) => console.error('Error loading catalog data:', error));
    }, []);

    const index = useMemo(
        () => buildProductIndex(catalogData?.categories || []),
        [catalogData]
    );

    const product = index.byPath[`${categoryId}/${productSlug}`];

    useEffect(() => {
        setCurrentImage(0);
    }, [categoryId, productSlug]);

    useEffect(() => {
        if (!product) return;
        const description = Array.isArray(product.description)
            ? product.description.join(', ')
            : (product.description || '');
        applyMeta(
            {
                title: `${product.name} | ${product.categoryName} | Unbox Paradise`,
                description: `${product.name} for corporate gifting by Unbox Paradise. ${description}`.slice(0, 158)
            },
            `${SITE}/catalog/${product.categoryId}/${product.slug}`
        );
    }, [product]);

    if (!catalogData) return null;

    if (!product) {
        return (
            <div className="min-h-full">
                <main className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 text-center"
                    style={{ paddingTop: '160px', minHeight: '70vh' }}>
                    <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-6">The product you are looking for does not exist or has moved.</p>
                    <Link to="/catalog" className="inline-block rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg">
                        Browse Full Catalog
                    </Link>
                </main>
            </div>
        );
    }

    const images = Array.isArray(product.images) && product.images.length > 0
        ? product.images.filter(Boolean)
        : (product.image ? [product.image] : []);

    const category = (catalogData.categories || []).find((cat) => cat.id === product.categoryId);
    const related = (category?.items || [])
        .filter((item) => item.id !== product.id)
        .slice(0, 4)
        .map((item) => ({ ...item, categoryId: category.id, categoryName: category.name }));

    const descriptionText = Array.isArray(product.description)
        ? product.description.join(', ')
        : (product.description || '');

    const selected = isInCart(product.id);

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.name,
        'image': images.map(toAbsolute),
        'description': descriptionText,
        'sku': product.id,
        'category': product.categoryName,
        'brand': { '@type': 'Brand', 'name': 'Unbox Paradise' },
        'offers': product.price ? {
            '@type': 'Offer',
            'url': `${SITE}/catalog/${product.categoryId}/${product.slug}`,
            'price': Number(product.price),
            'priceCurrency': 'INR',
            'availability': 'https://schema.org/InStock',
            'seller': { '@type': 'Organization', 'name': 'Unbox Paradise' }
        } : undefined
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE}/` },
            { '@type': 'ListItem', 'position': 2, 'name': 'Product Catalog', 'item': `${SITE}/catalog` },
            { '@type': 'ListItem', 'position': 3, 'name': product.categoryName, 'item': `${SITE}/catalog/${product.categoryId}` },
            { '@type': 'ListItem', 'position': 4, 'name': product.name, 'item': `${SITE}/catalog/${product.categoryId}/${product.slug}` }
        ]
    };

    return (
        <div className="min-h-full">
            <main className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative"
                style={{ paddingTop: '120px' }}>
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

                <div className="max-w-[120rem] mx-auto px-2 sm:px-4 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <div>
                            <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg">
                                {images.length > 0 ? (
                                    <button type="button" onClick={() => setIsPopoverOpen(true)} className="block w-full" aria-label="View full size image">
                                        <div className="image-container-aspect">
                                            <img src={images[currentImage]} alt={product.name} loading="eager" decoding="async" className="object-cover" />
                                        </div>
                                    </button>
                                ) : (
                                    <div className="aspect-video flex items-center justify-center text-gray-400">Image coming soon</div>
                                )}
                            </div>
                            {images.length > 1 && (
                                <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
                                    {images.map((image, idx) => (
                                        <button
                                            key={image}
                                            type="button"
                                            onClick={() => setCurrentImage(idx)}
                                            className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${currentImage === idx ? 'border-pink-500' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                            aria-label={`View image ${idx + 1}`}
                                        >
                                            <img src={image} alt={`${product.name} thumbnail ${idx + 1}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <Link to={`/catalog/${product.categoryId}`} className="text-sm font-semibold uppercase tracking-wide text-pink-600 hover:underline">
                                {product.categoryName}
                            </Link>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-2">{product.name}</h1>
                            {product.id && (
                                <p className="text-xs font-semibold tracking-wide text-orange-500 uppercase mb-4">Product ID: {product.id}</p>
                            )}

                            <div className="flex items-center gap-3 mb-5">
                                {product.originalPrice && (
                                    <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                                )}
                                <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                                    ₹{product.price}
                                </span>
                                {product.startingFrom && <span className="text-sm text-gray-500">onwards</span>}
                            </div>

                            {Array.isArray(product.description) && product.description.length > 0 && (
                                <ul className="mb-6 space-y-2">
                                    {product.description.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm md:text-base">
                                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-pink-500" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {!Array.isArray(product.description) && descriptionText && (
                                <p className="mb-6 text-gray-700 text-sm md:text-base leading-relaxed">{descriptionText}</p>
                            )}

                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => toggleItem(product)}
                                    className={`rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105 ${selected ? 'bg-gradient-to-r from-red-500 to-pink-600' : 'bg-gradient-to-r from-orange-500 to-pink-500'}`}
                                >
                                    {selected ? 'Remove from Cart' : 'Add to Cart'}
                                </button>
                                <Link to="/contact" className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 hover:border-pink-400 hover:text-pink-600 transition-colors">
                                    Get a Bulk Quote
                                </Link>
                            </div>

                            {product.badge && (
                                <p className="mt-4 inline-block rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white">
                                    {product.badge}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {related.length > 0 && (
                    <section className="max-w-[120rem] mx-auto px-2 sm:px-4 mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-6">More in {product.categoryName}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {related.map((item) => (
                                <StandaloneItemDetails
                                    key={item.id}
                                    item={item}
                                    onToggle={toggleItem}
                                    isSelected={isInCart(item.id)}
                                    detailsHref={productPath(index, item.categoryId, item)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                <ImportantNote />

                <ImagePopover
                    images={images}
                    isOpen={isPopoverOpen}
                    onClose={() => setIsPopoverOpen(false)}
                    initialIndex={currentImage}
                    alt={product.name}
                />
            </main>
        </div>
    );
};

export default ProductPage;
