import React, { useState } from 'react';
import useContactDetails from '../hooks/useContactDetails';

const GetQuotePage = () => {
    const [formData, setFormData] = useState({
        email: '',
        quantity: '',
        requirement: ''
    });

    const [submitStatus, setSubmitStatus] = useState('');
    const contactDetails = useContactDetails();
    const supportPhone = contactDetails?.phone || { display: '+91 96309 88265', link: 'tel:+919630988265' };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Here you can add your form submission logic
        // For now, we'll just show a success message
        console.log('Form submitted:', formData);
        setSubmitStatus('success');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({
                email: '',
                quantity: '',
                requirement: ''
            });
            setSubmitStatus('');
        }, 3000);
    };

    return (
        <div className="min-h-full" style={{ background: 'rgb(19,19,24)' }}>
            <main className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative" 
                  style={{ background: 'rgb(19,19,24)', paddingTop: '140px', minHeight: '100vh' }}>
                
                {/* Page Heading */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                        style={{ 
                            background: 'linear-gradient(90deg, #e2a82b, #b8037c)', 
                            backgroundClip: 'text', 
                            WebkitBackgroundClip: 'text', 
                            WebkitTextFillColor: 'transparent' 
                        }}>
                        Get a Quote
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                        Fill out the form below and we'll get back to you with a personalized quote for your requirements.
                    </p>
                </div>

                {/* Form Container */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10"
                         style={{
                             borderTop: '2px solid transparent',
                             borderImage: 'linear-gradient(90deg, #e2a82b, #b8037c) 1',
                             boxShadow: '0 4px 12px rgba(226, 168, 43, 0.15), 0 2px 6px rgba(184, 3, 124, 0.15)'
                         }}>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Address Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm sm:text-base md:text-lg font-semibold text-orange-400 mb-2">
                                    Email Address <span className="text-pink-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border-2 border-white/20 text-white placeholder-white/40 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all text-sm sm:text-base"
                                />
                            </div>

                            {/* Quantity Field */}
                            <div>
                                <label htmlFor="quantity" className="block text-sm sm:text-base md:text-lg font-semibold text-green-400 mb-2">
                                    Quantity <span className="text-pink-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    placeholder="Enter quantity (e.g., 100)"
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border-2 border-white/20 text-white placeholder-white/40 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition-all text-sm sm:text-base"
                                />
                            </div>

                            {/* Requirement Field */}
                            <div>
                                <label htmlFor="requirement" className="block text-sm sm:text-base md:text-lg font-semibold text-pink-400 mb-2">
                                    Your Requirement <span className="text-pink-400">*</span>
                                </label>
                                <textarea
                                    id="requirement"
                                    name="requirement"
                                    value={formData.requirement}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    placeholder="Please describe your requirements in detail..."
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border-2 border-white/20 text-white placeholder-white/40 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all resize-vertical text-sm sm:text-base"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full px-6 py-4 rounded-lg font-bold text-white text-base sm:text-lg transition-all hover:scale-105 hover:shadow-lg transform"
                                    style={{ 
                                        background: 'linear-gradient(90deg, #e2a82b, #b8037c)',
                                        boxShadow: '0 4px 12px rgba(226, 168, 43, 0.3), 0 2px 6px rgba(184, 3, 124, 0.3)'
                                    }}
                                >
                                    Submit Quote Request
                                </button>
                            </div>
                        </form>

                        {/* Success Message */}
                        {submitStatus === 'success' && (
                            <div className="mt-6 p-4 rounded-lg bg-green-500/20 border-2 border-green-400 text-center animate-fade-in">
                                <p className="text-green-400 font-semibold text-sm sm:text-base">
                                    ✓ Your quote request has been submitted successfully! We'll get back to you soon.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Additional Information */}
                    <div className="mt-8 text-center">
                        <p className="text-white/60 text-sm sm:text-base">
                            Need immediate assistance? Call us at{' '}
                            <a href={supportPhone.link} className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                                {supportPhone.display}
                            </a>
                            {' '}or WhatsApp us for a quick response.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GetQuotePage;
