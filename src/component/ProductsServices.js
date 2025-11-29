import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ImagePopover from './ImagePopover';

const ServiceCard = ({ service }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false);

    // Handle multiple images support
    const images = useMemo(() => {
        if (Array.isArray(service.images) && service.images.length > 0) {
            return service.images.filter(Boolean);
        }
        if (service?.image) {
            return [service.image];
        }
        return [];
    }, [service?.image, service?.images]);

    useEffect(() => {
        setCurrentImage(0);
    }, [service?.id, images]);

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
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Service Image */}
                <div className="relative image-container-aspect group">
                    {images.length > 0 ? (
                        <>
                            <img 
                                src={images[currentImage]} 
                                alt={service.title}
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
                            
                            {/* Expand Icon Button - Always Visible */}
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
                        </>
                    ) : (
                        <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                            Image coming soon
                        </div>
                    )}
                    
                    {service.badge && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {service.badge}
                        </div>
                    )}
                </div>
                
                {/* Service Details */}
                <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                        {service.title}
                    </h3>
                    
                    {service.description && (
                        <p className="text-gray-600 text-sm md:text-base mb-4">
                            {service.description}
                        </p>
                    )}
                    
                    {/* Items Included */}
                    {service.items && service.items.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Includes:</h4>
                            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                                {service.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="pt-4 border-t border-gray-200">
                        <Link to="/contact-us" className="block w-full px-6 py-3 rounded-lg font-semibold text-white text-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all hover:scale-105 shadow-md">
                            Get a Quote
                        </Link>
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

const ProductsServices = ({ data }) => {
    if (!data) return null;

    return (
        <section className="page-section relative z-10 px-4 sm:px-4" id="our-products">
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center gradient-text mb-8">
                {data.heading}
            </h2>
            
            {data.subheading && (
                <p className="text-center text-gray-300 text-base md:text-lg mb-8 px-4 max-w-3xl mx-auto">
                    {data.subheading}
                </p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-10">
                <Link
                    to="/bundled-packs"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all hover:scale-105 shadow-md w-full sm:w-auto"
                >
                    Browse Bundled Packs
                </Link>
                <Link
                    to="/catalog"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all hover:scale-105 shadow-md w-full sm:w-auto"
                >
                    Explore Product Catalog
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[120rem] mx-auto">
                {data.services.map((service, index) => (
                    <ServiceCard key={service.id || index} service={service} />
                ))}
            </div>
        </section>
    );
};

export default ProductsServices;