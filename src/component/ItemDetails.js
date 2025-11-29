import React, { useState, useEffect, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import ImagePopover from './ImagePopover';

const ItemDetails = ({ item, hideExpandIcon = false }) => {
    const { toggleItem, isInCart } = useCart();
    const [showAllItems, setShowAllItems] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const itemWithId = React.useMemo(() => {
        if (!item) return null;
        if (item.id) return item;
        const slug = item.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return { ...item, id: `bundle-${slug}` };
    }, [item]);

    // Handle multiple images support
    const images = useMemo(() => {
        if (Array.isArray(item.images) && item.images.length > 0) {
            return item.images.filter(Boolean);
        }
        if (item?.image) {
            return [item.image];
        }
        return [];
    }, [item?.image, item?.images]);

    useEffect(() => {
        setCurrentImage(0);
    }, [item?.id, images]);

    if (!itemWithId) return null;

    const selected = isInCart(itemWithId.id);
    
    // Handle items display
    const allItems = item.itemsIncluded || [];
    const hasMoreItems = allItems.length > 8;
    const displayedItems = showAllItems ? allItems : allItems.slice(0, 8);
    
    // Check if description is long enough to need "View More"
    const description = item.description || '';
    const isLongDescription = description.length > 150;

    const handlePrevImage = () => {
        if (images.length <= 1) return;
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNextImage = () => {
        if (images.length <= 1) return;
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                {/* Product Image */}
                <div className="relative image-container-aspect flex-shrink-0 group">
                    {images.length > 0 ? (
                        <>
                            <img
                                src={images[currentImage]}
                                alt={item.name}
                                className="transition-transform duration-300 group-hover:scale-105"
                            />
                            
                            {/* Image Navigation - Only show if more than 1 image */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={handlePrevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-1.5 hover:bg-black/60 transition-all focus:outline-none focus:ring-2 focus:ring-white/70"
                                        aria-label="Previous image"
                                    >
                                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-1.5 hover:bg-black/60 transition-all focus:outline-none focus:ring-2 focus:ring-white/70"
                                        aria-label="Next image"
                                    >
                                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    
                                    {/* Image Dots Indicator */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => setCurrentImage(index)}
                                                className={`h-2 w-2 rounded-full transition-all ${
                                                    currentImage === index ? 'bg-white' : 'bg-white/40'
                                                }`}
                                                aria-label={`View image ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                            
                            {/* Expand Icon Button - Always Visible (matching StandaloneItemDetails style) */}
                            {!hideExpandIcon && (
                                <button
                                    type="button"
                                    onClick={() => setIsImagePopoverOpen(true)}
                                    className="absolute top-2 left-2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    aria-label="Expand image"
                                    title="View full screen"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                            Image coming soon
                        </div>
                    )}
                    
                    {item.badge && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {item.badge}
                        </div>
                    )}
                </div>

            {/* Product Details */}
            <div className="p-3 md:p-4 flex flex-col flex-grow">
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1.5">
                    {item.name}
                </h3>

                <div className="mb-3">
                    <p className={`text-gray-600 text-xs md:text-sm ${showFullDescription ? '' : 'line-clamp-3'}`}>
                        {item.description}
                    </p>
                    {isLongDescription && (
                        <button
                            type="button"
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="text-xs text-orange-500 hover:text-orange-600 font-semibold mt-1 flex items-center gap-1"
                        >
                            {showFullDescription ? 'View Less' : 'View More'}
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d={showFullDescription ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Items Included */}
                {allItems.length > 0 && (
                    <div className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-700 mb-1.5">Items Included:</h4>
                        <ul className="list-disc list-inside text-gray-600 text-xs space-y-0.5">
                            {displayedItems.map((includedItem, index) => (
                                <li key={index}>{includedItem}</li>
                            ))}
                        </ul>
                        {hasMoreItems && !showAllItems && (
                            <button
                                type="button"
                                onClick={() => setShowAllItems(true)}
                                className="text-xs text-orange-500 hover:text-orange-600 font-semibold mt-1.5 flex items-center gap-1"
                            >
                                View More ({allItems.length - 8} more items)
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        )}
                        {hasMoreItems && showAllItems && (
                            <button
                                type="button"
                                onClick={() => setShowAllItems(false)}
                                className="text-xs text-orange-500 hover:text-orange-600 font-semibold mt-1.5 flex items-center gap-1"
                            >
                                View Less
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Price Section - Pushed to bottom */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-2">
                        {item.originalPrice && (
                            <span className="text-gray-400 text-xs line-through">
                                ₹{item.originalPrice}
                            </span>
                        )}
                        <span className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                            ₹{item.price}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => toggleItem(itemWithId)}
                        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md font-semibold text-xs md:text-sm text-white transition-all hover:scale-105 shadow-md ${
                            selected
                                ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                                : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
                        }`}
                    >
                        {selected ? 'Remove' : 'Add to cart'}
                    </button>
                </div>
            </div>
        </div>

        {/* Image Popover Modal */}
        <ImagePopover 
            images={images}
            isOpen={isImagePopoverOpen}
            onClose={() => setIsImagePopoverOpen(false)}
            initialIndex={currentImage}
        />
        </>
    );
};

export default ItemDetails;