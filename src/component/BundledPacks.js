import React, { useState, useEffect } from 'react';
import ItemDetails from './ItemDetails';
import { Link } from 'react-router-dom';

const BundledPacks = ({ data, hideExpandIcon = false }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    // Responsive items per slide
    useEffect(() => {
        const updateItemsPerSlide = () => {
            if (window.innerWidth < 768) {
                setItemsPerSlide(1); // Mobile: 1 card
            } else if (window.innerWidth < 1024) {
                setItemsPerSlide(2); // Tablet: 2 cards
            } else {
                setItemsPerSlide(3); // Desktop: 3 cards
            }
        };

        updateItemsPerSlide();
        window.addEventListener('resize', updateItemsPerSlide);
        return () => window.removeEventListener('resize', updateItemsPerSlide);
    }, []);

    const featureMap = React.useMemo(() => {
        if (!data?.homeFeaturedIds) return null;
        return new Set(data.homeFeaturedIds);
    }, [data?.homeFeaturedIds]);

    const filteredItems = React.useMemo(() => {
        if (!data?.items) return [];
        if (!featureMap || featureMap.size === 0) return data.items;
        return data.items.filter((item) => featureMap.has(item.id));
    }, [data?.items, featureMap]);

    // Group items into slides
    const slides = [];
    for (let i = 0; i < filteredItems.length; i += itemsPerSlide) {
        slides.push(filteredItems.slice(i, i + itemsPerSlide));
    }

    const totalSlides = slides.length;

    // Auto-play functionality
    useEffect(() => {
        if (totalSlides === 0) return;

        const autoplayInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(autoplayInterval);
    }, [totalSlides]);

    // Early return after all hooks
    if (!data || filteredItems.length === 0) return null;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className="page-section relative z-10">
            {/* Header with Title and Button */}
            <div className="w-full mx-auto mb-6 md:mb-8 px-2 sm:px-4 max-w-[120rem]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">
                        {data.heading || 'Bundled Packs'}
                    </h2>

                    <Link
                        to="/bundled-packs"
                        className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 
                        hover:from-orange-600 hover:to-pink-600 transition-all hover:scale-105 shadow-lg whitespace-nowrap"
                    >
                        Browse Our Bundle
                    </Link>
                </div>

                {data.subheading && (
                    <p className="text-left text-gray-300 text-base md:text-lg">
                        {data.subheading}
                    </p>
                )}
            </div>

            {/* Carousel Container */}
            <div className="w-full mx-auto mb-6 md:mb-8 px-2 sm:px-4 max-w-[120rem] relative">
                <div className="relative overflow-visible">
                    {/* Slides */}
                    <div className="relative min-h-[650px] md:min-h-[700px]">
                        {slides.map((slideItems, slideIndex) => (
                            <div
                                key={slideIndex}
                                className={`absolute inset-0 transition-all duration-500 ease-in-out ${slideIndex === currentSlide
                                        ? 'opacity-100 translate-x-0 pointer-events-auto'
                                        : slideIndex < currentSlide
                                            ? 'opacity-0 -translate-x-full pointer-events-none'
                                            : 'opacity-0 translate-x-full pointer-events-none'
                                    }`}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                    {slideItems.map((item, itemIndex) => (
                                        <ItemDetails key={itemIndex} item={item} hideExpandIcon={hideExpandIcon}/>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    {totalSlides > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gradient-to-r 
                                from-orange-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:from-orange-600 
                                hover:to-pink-600 transition-all hover:scale-110 z-10 focus:outline-none 
                                focus:ring-2 focus:ring-orange-400"
                                aria-label="Previous slide"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gradient-to-r from-orange-500 
                                to-pink-500 text-white p-3 rounded-full shadow-lg hover:from-orange-600 hover:to-pink-600 
                                transition-all hover:scale-110 z-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                aria-label="Next slide"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </>
                    )}
                </div>
                {totalSlides > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentSlide
                                        ? 'w-12 h-3 bg-gradient-to-r from-orange-500 to-pink-500'
                                        : 'w-3 h-3 bg-gray-400 hover:bg-gray-300'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                )}
            </div>
            {data.note && (
                <div className="w-full mx-auto mb-6 md:mb-8 px-2 sm:px-4 max-w-[120rem]">
                    <div className="bg-gradient-to-r from-orange-100 to-pink-100 border-l-4 border-orange-500 
                    rounded-lg p-4 md:p-6">
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium"
                            dangerouslySetInnerHTML={{ __html: data.note }}>
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default BundledPacks;
