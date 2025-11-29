import React, { useState, useEffect } from 'react';

const Carousel = ({ slides = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = slides.length;

    useEffect(() => {
        if (totalSlides === 0) return;
        
        const autoplayInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(autoplayInterval);
    }, [totalSlides]);

    const showSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    if (!slides || slides.length === 0) {
        return null;
    }

    return (
        <section className="carousel-section px-0">
            <div className="w-full">
                <div className="carousel-container">
                    <div className="carousel-slides">
                        {slides.map((slide, index) => (
                            <div key={index} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                                <div className="carousel-slide-content">
                                    <img src={slide.image} alt={slide.alt} className="absolute inset-0 w-full h-full object-cover" />
                                    {/* <div className="relative z-10 w-full h-full flex flex-col justify-center items-center 
                                    text-center px-4">
                                        <div className="w-24 h-24 md:w-32 md:h-32 
                                        bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md rounded-full 
                                        flex items-center justify-center mb-8 shadow-2xl border-2 border-white/50 
                                        transform hover:scale-110 transition-transform duration-300">
                                            <span className="text-5xl md:text-6xl filter drop-shadow-lg">{slide.icon}</span>
                                        </div>
                                        <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                                        text-white mb-6 md:mb-8 drop-shadow-2xl tracking-tight">
                                            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${slide.gradient}`}>
                                                {slide.title}
                                            </span>
                                        </h3>
                                        <p className="text-white text-xl sm:text-2xl md:text-3xl max-w-5xl mx-auto 
                                        leading-relaxed font-medium drop-shadow-xl bg-black/20 backdrop-blur-sm 
                                        px-8 py-4 rounded-2xl border border-white/20">
                                            {slide.description}
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <button className="carousel-nav-btn prev" onClick={prevSlide} aria-label="Previous slide">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button className="carousel-nav-btn next" onClick={nextSlide} aria-label="Next slide">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>

                    {/* Indicators */}
                    <div className="carousel-indicators">
                        {slides.map((_, index) => (
                            <button 
                                key={index}
                                className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                                data-slide={index}
                                onClick={() => showSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Carousel;
