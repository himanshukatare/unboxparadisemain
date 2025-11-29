import React, { useMemo, useState, useEffect } from 'react';

const RegisterUserInquiry = ({ contactDetails }) => {
    const [formConfig, setFormConfig] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        email: '',
        phone: '',
        requirement: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        fetch('/resource/config/formconfig.json')
            .then(response => response.json())
            .then(data => setFormConfig(data))
            .catch(error => console.error('Error loading form config:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let nextValue = value;

        if (name === 'phone') {
            nextValue = value.replace(/[^0-9]/g, '');
        }

        setFormData(prev => ({
            ...prev,
            [name]: nextValue
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Please enter your name';
        }

        const emailProvided = formData.email.trim().length > 0;
        const phoneProvided = formData.phone.trim().length > 0;

        if (!emailProvided && !phoneProvided) {
            newErrors.email = 'Provide at least an email or phone number';
            newErrors.phone = 'Provide at least an email or phone number';
        }

        if (emailProvided && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (phoneProvided && !/^[0-9]{10,15}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number should be 10-15 digits';
        }

        if (!formData.requirement.trim()) {
            newErrors.requirement = 'Please describe your requirement';
        } else if (formData.requirement.trim().length < 10) {
            newErrors.requirement = 'Please provide more details (minimum 10 characters)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            if (!formConfig?.formApiUrl) {
                alert('Form configuration is not loaded. Please try again.');
                return;
            }

            setIsSubmitting(true);
            const submission = new FormData();
            submission.append('name', formData.name);
            submission.append('organization', formData.organization);
            submission.append('email', formData.email);
            submission.append('phone', formData.phone);
            submission.append('requirement', formData.requirement);

            fetch(formConfig.formApiUrl, {
                method: 'POST',
                body: submission
            })
                .then((response) => response.text())
                .then(() => {
                    setFormData({
                        name: '',
                        organization: '',
                        email: '',
                        phone: '',
                        requirement: ''
                    });
                    setShowSuccess(true);
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 2000);
                    setIsSubmitting(false);
                })
                .catch((error) => {
                    console.error('Error submitting form:', error);
                    alert('Oops! Something went wrong. Please try again.');
                    setIsSubmitting(false);
                });
        }
    };

    const contactInfo = useMemo(() => {
        const fallbackPhone = {
            display: '+91 96309 88265',
            link: 'tel:+919630988265'
        };

        const fallbackEmail = {
            display: 'contact@unboxparadise.com',
            link: 'mailto:contact@unboxparadise.com'
        };

        const fallbackWhatsapp = {
            display: 'WhatsApp',
            link: 'https://wa.me/919630988265'
        };

        const fallbackAddress = {
            lines: ['Unbox Paradise', 'Indore, Madhya Pradesh', 'India']
        };

        const fallbackSocial = {
            instagram: { handle: '@unboxparadise', url: 'https://instagram.com/unboxparadise' },
            facebook: { handle: '@unboxparadise', url: 'https://facebook.com/unboxparadise' },
            linkedin: { handle: '@unboxparadise', url: 'https://linkedin.com/company/unboxparadise' },
            twitter: { handle: '@unboxparadise', url: 'https://twitter.com/unboxparadise' }
        };

        return {
            phone: contactDetails?.phone || fallbackPhone,
            whatsapp: contactDetails?.whatsapp || fallbackWhatsapp,
            email: contactDetails?.email || fallbackEmail,
            address: contactDetails?.address || fallbackAddress,
            social: contactDetails?.social || fallbackSocial
        };
    }, [contactDetails]);

    return (
        <section className="w-full px-2 sm:px-4" id="contact-us">
            <div className="w-full">
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-4 md:p-6 shadow-2xl">
                    {/* Success Message */}
                    {showSuccess && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                            <div className="px-4 py-2 rounded-full bg-white/90 text-gray-900 text-xs md:text-sm font-semibold shadow-lg flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Query submitted successfully!
                            </div>
                        </div>
                    )}

                    <div className="grid gap-6 lg:gap-8 items-start lg:grid-cols-[1.5fr_1fr]">
                        {/* Left Column - Information */}
                        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.08] p-4 md:p-6 text-left shadow-inner">
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-pink-500/5" />
                            <div className="pointer-events-none absolute -top-24 right-6 h-48 w-48 rounded-full bg-orange-400/15 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />

                            <div className="relative z-10 space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mt-0.5">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">Get in Touch</h3>
                                        <p className="text-xs text-gray-100/70 mt-0.5">We're here to help you create amazing kits</p>
                                    </div>
                                </div>

                                <p className="text-gray-100/90 text-sm leading-relaxed">
                                    Share your requirements and our gifting specialists will curate tailor-made kits that delight your teams, clients, and partners.
                                </p>

                                {/* Features List */}
                                <div className="space-y-2.5">
                                    <div className="flex items-start gap-2.5">
                                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/15 text-white mt-0.5">
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white text-sm">Personalized Kits</p>
                                            <p className="text-xs text-gray-100/70">Brand-aligned welcome & onboarding solutions</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/15 text-white mt-0.5">
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white text-sm">Expert Consultants</p>
                                            <p className="text-xs text-gray-100/70">End-to-end planning & fulfillment support</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white/15 text-white mt-0.5">
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white text-sm">Fast Turnaround</p>
                                            <p className="text-xs text-gray-100/70">Quick proposals with clear timelines</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Cards - Compact Grid */}
                                <div className="grid grid-cols-2 gap-3 pt-3">
                                    <div className="rounded-lg border border-white/20 bg-white/10 p-3">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <p className="text-[10px] uppercase tracking-wide text-gray-100/70 font-semibold">Call Us</p>
                                        </div>
                                        <a
                                            href={contactInfo.phone.link}
                                            className="block text-sm font-semibold text-white hover:text-orange-200 transition-colors"
                                        >
                                            {contactInfo.phone.display}
                                        </a>
                                    </div>
                                    
                                    <div className="rounded-lg border border-white/20 bg-white/10 p-3">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-[10px] uppercase tracking-wide text-gray-100/70 font-semibold">Email</p>
                                        </div>
                                        <a
                                            href={contactInfo.email.link}
                                            className="block text-sm font-semibold text-white hover:text-orange-200 transition-colors truncate"
                                        >
                                            {contactInfo.email.display}
                                        </a>
                                    </div>
                                    
                                    <div className="rounded-lg border border-white/20 bg-white/10 p-3 col-span-2">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            <p className="text-[10px] uppercase tracking-wide text-gray-100/70 font-semibold">WhatsApp</p>
                                        </div>
                                        <a
                                            href={contactInfo.whatsapp.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-orange-200 transition-colors"
                                        >
                                            Chat with us
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Follow Us - Social Media */}
                                <div className="pt-3 mt-3 border-t border-white/20">
                                    <p className="text-[10px] uppercase tracking-wide text-gray-100/70 font-semibold mb-2 flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                        </svg>
                                        Follow Us
                                    </p>
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {/* Instagram */}
                                        <a
                                            href={contactInfo.social.instagram.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-2 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                                        >
                                            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                </svg>
                                            </div>
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <span className="text-[9px] text-gray-400 uppercase tracking-wider leading-none">Instagram</span>
                                                <span className="text-xs font-semibold text-white group-hover:text-pink-300 transition-colors truncate">
                                                    {contactInfo.social.instagram.handle}
                                                </span>
                                            </div>
                                        </a>

                                        {/* Facebook */}
                                        <a
                                            href={contactInfo.social.facebook.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-2 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                                        >
                                            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-600 flex-shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                </svg>
                                            </div>
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <span className="text-[9px] text-gray-400 uppercase tracking-wider leading-none">Facebook</span>
                                                <span className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                                                    {contactInfo.social.facebook.handle}
                                                </span>
                                            </div>
                                        </a>

                                        {/* LinkedIn */}
                                        <a
                                            href={contactInfo.social.linkedin.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-2 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                                        >
                                            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-700 flex-shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                </svg>
                                            </div>
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <span className="text-[9px] text-gray-400 uppercase tracking-wider leading-none">LinkedIn</span>
                                                <span className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
                                                    {contactInfo.social.linkedin.handle}
                                                </span>
                                            </div>
                                        </a>

                                        {/* Twitter */}
                                        <a
                                            href={contactInfo.social.twitter.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-2 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                                        >
                                            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-black flex-shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                                </svg>
                                            </div>
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <span className="text-[9px] text-gray-400 uppercase tracking-wider leading-none">Twitter</span>
                                                <span className="text-xs font-semibold text-white group-hover:text-gray-300 transition-colors truncate">
                                                    {contactInfo.social.twitter.handle}
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="relative rounded-xl bg-black/40 p-4 md:p-6 border border-white/10 shadow-xl">
                            <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/5" />
                            <div className="relative z-10">
                                <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Send Your Inquiry
                                </h4>
                                <p className="text-xs text-gray-100/70 mb-4">Fill out the form and we'll respond within 24 hours</p>
                                
                                <form onSubmit={handleSubmit} className="space-y-3.5">
                                    {/* Name & Organization in one row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label htmlFor="name" className="block text-white font-medium mb-1.5 text-xs">
                                                Name <span className="text-orange-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 rounded-lg bg-white text-gray-800 text-sm border-2 ${
                                                    errors.name ? 'border-red-500' : 'border-transparent'
                                                } focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all`}
                                                placeholder="Your name"
                                            />
                                            {errors.name && (
                                                <p className="mt-0.5 text-red-400 text-xs">{errors.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="organization" className="block text-white font-medium mb-1.5 text-xs">
                                                Organization
                                            </label>
                                            <input
                                                type="text"
                                                id="organization"
                                                name="organization"
                                                value={formData.organization}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 rounded-lg bg-white text-gray-800 text-sm border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                                                placeholder="Company name"
                                            />
                                        </div>
                                    </div>

                                    {/* Email & Phone in one row */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label htmlFor="email" className="block text-white font-medium mb-1.5 text-xs">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 rounded-lg bg-white text-gray-800 text-sm border-2 ${
                                                    errors.email ? 'border-red-500' : 'border-transparent'
                                                } focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all`}
                                                placeholder="you@example.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-0.5 text-red-400 text-xs">{errors.email}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-white font-medium mb-1.5 text-xs">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 rounded-lg bg-white text-gray-800 text-sm border-2 ${
                                                    errors.phone ? 'border-red-500' : 'border-transparent'
                                                } focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all`}
                                                placeholder="1234567890"
                                            />
                                            {errors.phone && (
                                                <p className="mt-0.5 text-red-400 text-xs">{errors.phone}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="requirement" className="block text-white font-medium mb-1.5 text-xs">
                                            Your Requirement <span className="text-orange-400">*</span>
                                        </label>
                                        <textarea
                                            id="requirement"
                                            name="requirement"
                                            value={formData.requirement}
                                            onChange={handleChange}
                                            rows="4"
                                            className={`w-full px-3 py-2 rounded-lg bg-white text-gray-800 text-sm border-2 ${
                                                errors.requirement ? 'border-red-500' : 'border-transparent'
                                            } focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all resize-none`}
                                            placeholder="Tell us about your project, quantity, budget, timeline..."
                                        ></textarea>
                                        {errors.requirement && (
                                            <p className="mt-0.5 text-red-400 text-xs">{errors.requirement}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Inquiry
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                    
                                    <p className="text-xs text-gray-100/50 text-center italic">
                                        <span className="text-orange-400">*</span> Provide at least email or phone
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterUserInquiry;
