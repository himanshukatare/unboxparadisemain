import React, { useEffect, useMemo, useState } from 'react';
import ImagePopover from './ImagePopover';

const StandaloneItemDetails = ({
    item,
    onToggle,
    isSelected = false,
    addLabel = 'Add to cart',
    removeLabel = 'Remove'
}) => {
    const itemData = item ?? {};

    const images = useMemo(() => {
        if (Array.isArray(item.images) && item.images.length > 0) {
            return item.images.filter(Boolean);
        }
        if (item?.image) {
            return [item.image];
        }
        return [];
    }, [item?.image, item?.images]);

    const [currentImage, setCurrentImage] = useState(0);
    const [showAllItems, setShowAllItems] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    useEffect(() => {
        setCurrentImage(0);
    }, [item?.id, images]);

    if (!item) return null;

    // Handle description items (if it's an array)
    const descriptionArray = Array.isArray(item.description) ? item.description : [];
    const hasMoreDescriptionItems = descriptionArray.length > 4;
    const displayedDescriptionItems = showAllItems ? descriptionArray : descriptionArray.slice(0, 4);

    // For text descriptions, check if it's long
    const descriptionText = !Array.isArray(item.description) ? (item.description || '') : '';
    const isLongTextDescription = descriptionText.length > 150;

    const handlePrevImage = () => {
        if (images.length <= 1) return;
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNextImage = () => {
        if (images.length <= 1) return;
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const isToggleMode = typeof onToggle === 'function';
    const buttonLabel = isToggleMode ? (isSelected ? removeLabel : addLabel) : 'Customize';
    const buttonClasses = isToggleMode
        ? `px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-md font-semibold text-[10px] md:text-xs text-white transition-all hover:scale-105 shadow-md ${isSelected
            ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
            : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
        }`
        : 'px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-md font-semibold text-[10px] md:text-xs text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all hover:scale-105 shadow-md';

    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full">
                {/* Product Image */}
                <div className="relative image-container-aspect flex-shrink-0">
                    {images.length > 0 ? (
                        <>
                            <img
                                src={images[currentImage]}
                                alt={item.name}
                                className="transition-transform duration-300 group-hover:scale-105"
                            />
                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={handlePrevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-1.5 hover:bg-black/60 transition-all focus:outline-none focus:ring-2 focus:ring-white/70"
                                    >
                                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white p-1.5 hover:bg-black/60 transition-all focus:outline-none focus:ring-2 focus:ring-white/70"
                                    >
                                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => setCurrentImage(index)}
                                                className={`h-2 w-2 rounded-full transition-all ${currentImage === index ? 'bg-white' : 'bg-white/40'
                                                    }`}
                                                aria-label={`View image ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                            {/* Expand Icon Button - Show for all cards with images */}
                            <button
                                type="button"
                                onClick={() => setIsPopoverOpen(true)}
                                className="absolute top-2 left-2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                aria-label="Expand image"
                                title="View full screen"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                            Image coming soon
                        </div>
                    )}

                    {item.badge && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
                            {item.badge}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-2.5 md:p-3 flex flex-col flex-grow">
                    <h3 className="text-sm md:text-base font-bold text-gray-800 mb-1 line-clamp-2">
                        {item.name}
                    </h3>
                    {item.id && (
                        <p className="text-[9px] font-semibold tracking-wide text-orange-500 mb-1.5 uppercase">
                            Product ID: {item.id}
                        </p>
                    )}

                    {/* Description - Handle both array and text */}
                    {Array.isArray(item.description) && item.description.length > 0 ? (
                        <div className="mb-2.5">
                            <ul className="space-y-0.5 text-left">
                                {displayedDescriptionItems.map((point, index) => (
                                    <li key={index} className="flex items-center gap-1 text-[10px] md:text-xs text-gray-600">
                                        <span className="h-1 w-1 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                            {hasMoreDescriptionItems && !showAllItems && (
                                <button
                                    type="button"
                                    onClick={() => setShowAllItems(true)}
                                    className="text-[10px] md:text-xs text-orange-500 hover:text-orange-600 font-semibold mt-1 flex items-center gap-0.5"
                                >
                                    View More ({descriptionArray.length - 4} more)
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}
                            {hasMoreDescriptionItems && showAllItems && (
                                <button
                                    type="button"
                                    onClick={() => setShowAllItems(false)}
                                    className="text-[10px] md:text-xs text-orange-500 hover:text-orange-600 font-semibold mt-1 flex items-center gap-0.5"
                                >
                                    View Less
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ) : (
                        descriptionText && (
                            <div className="mb-2.5">
                                <p className={`text-gray-600 text-[10px] md:text-xs ${showFullDescription ? '' : 'line-clamp-3'}`}>
                                    {descriptionText}
                                </p>
                                {isLongTextDescription && (
                                    <button
                                        type="button"
                                        onClick={() => setShowFullDescription(!showFullDescription)}
                                        className="text-[10px] md:text-xs text-orange-500 hover:text-orange-600 font-semibold mt-0.5 flex items-center gap-0.5"
                                    >
                                        {showFullDescription ? 'View Less' : 'View More'}
                                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        )
                    )}

                    {/* Price Section - Pushed to bottom */}
                    <div className="flex items-center justify-between mt-auto pt-1.5 border-t border-gray-100">
                        <div className="flex flex-col">
                            {item.startingFrom && (
                                <span className="text-[9px] text-gray-500 mb-0.5">Starting from</span>
                            )}
                            <div className="flex items-center gap-1.5">
                                {item.originalPrice && (
                                    <span className="text-[10px] md:text-xs text-gray-400 line-through">
                                        ₹{item.originalPrice}
                                    </span>
                                )}
                                <span className="text-base md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                                    ₹{item.price}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={isToggleMode ? () => onToggle(item) : undefined}
                            className={buttonClasses}
                        >
                            {buttonLabel}
                        </button>
                    </div>
                </div>
            </div>
            {/* Image Popover*/}
            <ImagePopover
                images={images}
                isOpen={isPopoverOpen}
                onClose={() => setIsPopoverOpen(false)}
                initialIndex={currentImage}
            />
        </>
    );
};

export default StandaloneItemDetails;
