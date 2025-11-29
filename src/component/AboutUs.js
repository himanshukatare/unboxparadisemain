import React from 'react';
const AboutUs = ({ data }) => {
    if (!data) return null;
    return (
        <section className="page-section fade-in relative z-10" id="about-us">
            <div className="rounded-lg md:rounded-xl shadow-xl overflow-hidden">
                {/* <div className="relative">
                    <img src={data.image} alt={data.alt} className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover" />
                </div> */}
                
                {/* Text Content Below Image */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-6 md:px-10 lg:px-16 py-8 md:py-12">
                    <div className="mx-auto">
                        <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
                            {data.heading}
                        </h3>
                        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium mb-6 md:mb-8"
                           dangerouslySetInnerHTML={{ __html: data.description }}>
                        </p>
                        
                        {/* Vision and Mission Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm px-4 md:px-5 py-4 md:py-5 rounded-lg border border-white/20">
                                <div className="text-orange-400 text-2xl md:text-3xl flex-shrink-0">{data.vision.icon}</div>
                                <div className="flex-1">
                                    <div className="text-orange-400 font-bold text-sm md:text-base uppercase tracking-wide mb-2">{data.vision.title}</div>
                                    <p className="text-white text-xs sm:text-sm md:text-base font-medium leading-relaxed">
                                        {data.vision.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm px-4 md:px-5 py-4 md:py-5 rounded-lg border border-white/20">
                                <div className="text-pink-400 text-2xl md:text-3xl flex-shrink-0">{data.mission.icon}</div>
                                <div className="flex-1">
                                    <div className="text-pink-400 font-bold text-sm md:text-base uppercase tracking-wide mb-2">{data.mission.title}</div>
                                    <p className="text-white text-xs sm:text-sm md:text-base font-medium leading-relaxed">
                                        {data.mission.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
