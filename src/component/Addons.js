import React from 'react';
import StandaloneItemDetails from './StandaloneItemDetails';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
const Addons = ({ data, showBrowseButton = true, align = 'left', showAllItems = false }) => {
    const { toggleItem, isInCart } = useCart();
    if (!data || !data.items || data.items.length === 0) return null;

    //Appy fliter only if showAllItems is false and homeFeatureIds exist
    const shouldFilter = !showAllItems && Array.isArray(data.homeFeaturedIds) && data.homeFeaturedIds.length > 0;
    const featuredSet = shouldFilter ? new Set(data.homeFeaturedIds) : null;
    const visibleAddons = shouldFilter ? data.items.filter((addon) => featuredSet.has(addon.id)) : data.items;

    const normaliseAddon = (addon) => {
        if (addon.id) {
            return {
                ...addon,
                description: Array.isArray(addon.description) ? addon.description : addon.itemsIncluded
            };
        }
        const slug = addon.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return {
            ...addon,
            id: `addon-${slug}`,
            description: Array.isArray(addon.description) ? addon.description : addon.itemsIncluded
        };
    };
    return (
        <section className="page-section relative z-10">
            <div className={`w-full mx-auto mb-6 md:mb-8 px-2 sm:px-4 max-w-[120rem] ${align === 'center' ? 'text-center' : ''}`}>
                <div
                    className={`flex flex-col gap-4 mb-4 ${align === 'center'
                        ? 'items-center justify-center'
                        : 'sm:flex-row justify-between items-start sm:items-center'
                        }`}
                >
                    <div className={align === 'center' ? 'max-w-3xl' : ''}>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">
                            {data.heading || 'Add-ons'}
                        </h2>
                        {data.subheading && (
                            <p className={`text-gray-300 text-base md:text-lg ${align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-3xl'}`}>
                                {data.subheading}
                            </p>
                        )}
                    </div>

                    {showBrowseButton && (
                        <Link
                            to="/bundled-packs"
                            className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 
                            hover:from-orange-600 hover:to-pink-600 transition-all 
                            hover:scale-105 shadow-lg whitespace-nowrap inline-block"
                        >
                            Browse Add-ons
                        </Link>
                    )}
                </div>
            </div>

            {visibleAddons.length > 0 && (
                <div className={`w-full mx-auto mb-6 md:mb-8 px-2 sm:px-4 max-w-[120rem] ${align === 'center' ? 'text-center' : ''}`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {visibleAddons.map((addon) => {
                            const normalised = normaliseAddon(addon);
                            return (
                                <StandaloneItemDetails
                                    key={normalised.id || normalised.name}
                                    item={{
                                        ...normalised,
                                        price: normalised.price || '0',
                                        startingFrom: normalised.startingFrom ?? false
                                    }}
                                    onToggle={toggleItem}
                                    isSelected={isInCart(normalised.id)}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

            {data.note && (
                <div className={`w-full mx-auto mb-6 md:mb-8 px-2 sm:px-4 max-w-[120rem] ${align === 'center' ? 'flex justify-center' : ''}`}>
                    <div className="bg-gradient-to-r from-orange-100 to-pink-100 border-l-4 
                    border-orange-500 rounded-lg p-4 md:p-6">
                        <p
                            className="text-gray-700 text-sm sm:text-base md:text-lg font-medium"
                            dangerouslySetInnerHTML={{ __html: data.note }}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Addons;
