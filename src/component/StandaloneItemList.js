import React from 'react';
import { Link } from 'react-router-dom';
import StandaloneItemDetails from './StandaloneItemDetails';
import { useCart } from '../context/CartContext';

const StandaloneItemList = ({ data, catalogData }) => {
    const { toggleItem, isInCart } = useCart();

    if (!data) return null;

    let standaloneItems = Array.isArray(data.items) ? data.items : [];

    if ((!standaloneItems || standaloneItems.length === 0) && catalogData?.categories) {
        const catalogItems = catalogData.categories.flatMap((category) =>
            category.items.map((item) => ({
                ...item,
                id: item.id || `${category.id}-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`,
                categoryId: category.id,
                categoryName: category.name,
                pricingModel: Array.isArray(item.itemsIncluded) && item.itemsIncluded.length > 0 ? 'per-pack' : 'per-item'
            }))
        );

        const featuredSet =
            Array.isArray(data.homeFeaturedIds) && data.homeFeaturedIds.length > 0
                ? new Set(data.homeFeaturedIds)
                : null;

        standaloneItems = featuredSet
            ? catalogItems.filter((item) => featuredSet.has(item.id))
            : catalogItems.slice(0, 8);
    } else if (Array.isArray(data.homeFeaturedIds) && data.homeFeaturedIds.length > 0) {
        const featuredSet = new Set(data.homeFeaturedIds);
        standaloneItems = standaloneItems.filter((item) => featuredSet.has(item.id));
    }

    if (!standaloneItems || standaloneItems.length === 0) return null;

    return (
        <section className="page-section relative z-10">
            {/* Header with Title and Button */}
            <div className="w-full mx-auto mb-6 md:mb-8 px-2 sm:px-4 max-w-[120rem]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">
                        {data.heading || 'Standalone Items'}
                    </h2>
                    
                    <Link to="/catalog" className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all hover:scale-105 shadow-lg whitespace-nowrap inline-block">
                        View All Items
                    </Link>
                </div>
                
                {data.subheading && (
                    <p className="text-left text-gray-300 text-base md:text-lg">
                        {data.subheading}
                    </p>
                )}
            </div>
            
            {/* Items Grid */}
            {standaloneItems.length > 0 && (
                <div className="w-full mx-auto mb-6 md:mb-8 px-2 sm:px-4 max-w-[120rem]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        {standaloneItems.map((item) => {
                            return (
                                <StandaloneItemDetails
                                    key={item.id || item.name}
                                    item={item}
                                    onToggle={toggleItem}
                                    isSelected={isInCart(item.id)}
                                />
                            );
                        })}
                    </div>
                </div>
            )}
            
            {/* Special Note */}
            {data.note && (
                <div className="w-full mx-auto mb-6 md:mb-8 px-2 sm:px-4 max-w-[120rem]">
                    <div className="bg-gradient-to-r from-orange-100 to-pink-100 border-l-4 border-orange-500 rounded-lg p-4 md:p-6">
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium"
                           dangerouslySetInnerHTML={{ __html: data.note }}>
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default StandaloneItemList;
