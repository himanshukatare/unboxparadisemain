import React from 'react';

const QualityPriceBanner = () => {
    return (
        <section className="w-full px-2 sm:px-4 py-8 md:py-12 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Floating decorative elements */}
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Main star badge - Center focal point */}
                <div className="flex justify-center mb-8 relative">
                    <div className="relative group">
                        {/* Rotating ring effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 blur-xl opacity-75 animate-pulse"></div>
                        
                        {/* Main star container */}
                        <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                                <svg className="w-16 h-16 md:w-20 md:h-20 text-yellow-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                        </div>

                        {/* Orbiting mini stars */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 animate-bounce">
                            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 animate-bounce" style={{ animationDelay: '0.5s' }}>
                            <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                    <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2 animate-pulse">
                        Our Promise to You
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 font-medium">
                        Where premium quality meets unbeatable value
                    </p>
                </div>

                {/* Diagonal split design - Quality and Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Best Quality - Hexagon style */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-20"></div>
                        <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 md:p-10 shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-orange-100 font-semibold uppercase tracking-wider">Premium Quality</p>
                                        <h4 className="text-2xl md:text-3xl font-bold text-white">Best Quality</h4>
                                    </div>
                                </div>
                                <ul className="space-y-2 text-white/90">
                                    <li className="flex items-center gap-2 text-sm md:text-base">
                                        <svg className="w-5 h-5 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Premium materials
                                    </li>
                                    <li className="flex items-center gap-2 text-sm md:text-base">
                                        <svg className="w-5 h-5 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Quality assurance
                                    </li>
                                    <li className="flex items-center gap-2 text-sm md:text-base">
                                        <svg className="w-5 h-5 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Long-lasting products
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Lowest Price - Hexagon style */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300 opacity-20"></div>
                        <div className="relative bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl p-8 md:p-10 shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                            <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-400 rounded-full flex items-center justify-center shadow-xl animate-bounce" style={{ animationDelay: '0.3s' }}>
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-pink-100 font-semibold uppercase tracking-wider">Best Value</p>
                                        <h4 className="text-2xl md:text-3xl font-bold text-white">Lowest Price</h4>
                                    </div>
                                </div>
                                <ul className="space-y-2 text-white/90">
                                    <li className="flex items-center gap-2 text-sm md:text-base">
                                        <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Competitive pricing
                                    </li>
                                    <li className="flex items-center gap-2 text-sm md:text-base">
                                        <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Bulk discounts available
                                    </li>
                                    <li className="flex items-center gap-2 text-sm md:text-base">
                                        <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        No hidden costs
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom guarantee badge - Diamond shape */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative bg-gradient-to-r from-green-500 to-green-600 rounded-2xl px-6 py-4 shadow-xl transform hover:scale-105 transition-transform">
                            <div className="flex items-center gap-3">
                                <svg className="w-8 h-8 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-white font-bold text-lg md:text-xl">100% Satisfaction Guaranteed</p>
                                    <p className="text-green-100 text-xs md:text-sm">Premium quality at market-beating prices • No compromise</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualityPriceBanner;
