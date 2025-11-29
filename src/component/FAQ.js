import React, { useState } from 'react';

const FAQ = ({ data }) => {
    const [openIndex, setOpenIndex] = useState(null);

    if (!data) return null;

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="page-section relative z-10 px-4 sm:px-4" id="faq">
            <div className="max-w-[120rem] mx-auto">
                <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center gradient-text mb-8 md:mb-12">
                    {data.heading}
                </h2>
                
                <div className="mx-auto">
                    {data.questions.map((item, index) => (
                        <div 
                            key={index} 
                            className="mb-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white/20 transition-all duration-300 hover:bg-white/15 hover:shadow-xl"
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleQuestion(index)}
                                className="w-full text-left px-4 md:px-6 py-4 md:py-5 flex items-center 
                                justify-between focus:outline-none group"
                            >
                                <span className="text-base md:text-lg font-semibold text-white pr-4 
                                group-hover:text-orange-400 transition-colors">
                                    {item.question}
                                </span>
                                <svg
                                    className={`w-5 h-5 md:w-6 md:h-6 text-orange-400 flex-shrink-0 transform 
                                        transition-transform duration-300 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Answer */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    openIndex === index ? 'max-h-96' : 'max-h-0'
                                }`}
                            >
                                <div className="px-4 md:px-6 pb-4 md:pb-5 pt-0">
                                    <div className="border-t border-white/20 pt-4">
                                        <p className="text-sm md:text-base text-white/90 leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Help Section */}
                {data.helpText && (
                    <div className="mt-8 md:mt-12 text-center">
                        <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 
                        border-l-4 border-orange-500">
                            <p className="text-white font-medium text-sm md:text-base">
                                {data.helpText}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FAQ;
