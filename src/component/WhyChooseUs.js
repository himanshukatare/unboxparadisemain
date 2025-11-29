import React from 'react';

const WhyChooseUs = ({ data }) => {
    if (!data) return null;

    return (
        <section className="page-section relative z-10 px-4 sm:px-4" id="why-choose-us">
            <div className="text-center mb-10 md:mb-12">
                <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">
                    {data.heading}
                </h2>
                {data.subheading && (
                    <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto mt-3">
                        {data.subheading}
                    </p>
                )}
            </div>

            <div className="relative mx-auto w-full max-w-[120rem]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {data.reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="group text-center rounded-2xl bg-gradient-to-r from-orange-50 to-pink-50 p-6 md:p-8 shadow-[0_25px_45px_-35px_rgba(226,168,43,0.5)] transition-transform duration-300 hover:-translate-y-1"
                        >
                                <div className="mx-auto mb-4 md:mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg shadow-pink-500/20 overflow-hidden border border-white/40 md:h-24 md:w-24">
                                    {reason.image ? (
                                        <img
                                            src={reason.image.startsWith('http') ? reason.image : `${process.env.PUBLIC_URL || ''}${reason.image}`}
                                            alt={reason.title}
                                            className="w-16 h-16 md:w-20 md:h-20 object-contain"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <span className="text-3xl md:text-4xl text-white">{reason.icon}</span>
                                    )}
                                </div>
                            <h4 className="font-bold text-gray-800 mb-2 md:mb-3 text-lg md:text-xl">
                                {reason.title}
                            </h4>
                            <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
