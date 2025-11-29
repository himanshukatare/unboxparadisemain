import React from 'react';

const ContactUs = ({ data }) => {
    if (!data) return null;

    const getSocialIcon = (iconName) => {
        const icons = {
            twitter: (
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            ),
            instagram: (
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            ),
            linkedin: (
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            )
        };
        return icons[iconName] || icons.twitter;
    };

    return (
        <section className="page-section relative z-10 px-4 sm:px-4" id="contact-us">
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center gradient-text 
            mb-4 md:mb-6">
                {data.heading}
            </h2>
            
            {/* Contact Card */}
            <div className="w-full mx-auto max-w-4xl">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-6">
                    {/* Company Name */}
                    <div className="text-center mb-4 md:mb-6">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold"
                            style={{ 
                                background: 'linear-gradient(90deg,#e2a82b,#b8037c)', 
                                backgroundClip: 'text', 
                                WebkitBackgroundClip: 'text', 
                                WebkitTextFillColor: 'transparent' 
                            }}>
                            {data.companyName}
                        </h3>
                    </div>

                    {/* Contact Information and Social Media - Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Contact Information */}
                        <div className="rounded-lg p-3 md:p-4 space-y-3 md:space-y-4">
                            {/* Address */}
                            <div>
                                <p className="text-sm sm:text-base text-orange-400 font-semibold mb-1">
                                    {data.address.label}
                                </p>
                                <p className="text-sm sm:text-base text-white font-medium">
                                    {data.address.value}
                                </p>
                            </div>

                            {/* Phone */}
                            <div>
                                <p className="text-sm sm:text-base text-green-400 font-semibold mb-1">
                                    {data.phone.label}
                                </p>
                                <a href={data.phone.link} className="text-sm sm:text-base text-white font-medium hover:text-green-400 transition-colors block">
                                    {data.phone.value}
                                </a>
                            </div>

                            {/* Email */}
                            <div>
                                <p className="text-sm sm:text-base text-pink-400 font-semibold mb-1">
                                    {data.email.label}
                                </p>
                                <a href={data.email.link} 
                                   className="text-sm sm:text-base text-white font-medium hover:text-pink-400 
                                   transition-colors break-all block">
                                    {data.email.value}
                                </a>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="text-left" style={{ padding: '1rem' }}>
                            <p className="text-sm sm:text-base text-orange-400 font-semibold mb-1">
                                {data.socialMedia.label}
                            </p>
                            <div className="flex justify-start gap-4 sm:gap-6 flex-wrap">
                                {data.socialMedia.platforms.map((platform) => (
                                    <a key={platform.id} href={platform.url} target="_blank" rel="noopener noreferrer" 
                                       className="text-center hover:opacity-70 transition-opacity transform hover:scale-110">
                                        <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 
                                        text-white mb-1 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                            {getSocialIcon(platform.icon)}
                                        </svg>
                                        <span className="text-white text-xs sm:text-sm font-medium">{platform.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;