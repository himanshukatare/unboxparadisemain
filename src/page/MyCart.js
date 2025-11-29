import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ImportantNote from '../component/ImportantNote'

const MyCart = () => {
    const { cartItems, toggleItem } = useCart();
    const hasItems = cartItems.length > 0;
    const [quantities, setQuantities] = useState({});
    const [contactInfo, setContactInfo] = useState({
        email: '',
        phone: ''
    });
    const [contactErrors, setContactErrors] = useState({});
    const [quoteSubmitting, setQuoteSubmitting] = useState(false);
    const [quoteSuccess, setQuoteSuccess] = useState(false);
    const [quoteError, setQuoteError] = useState('');

    useEffect(() => {
        setQuantities((prev) => {
            const next = { ...prev };
            cartItems.forEach((item) => {
                if (!next[item.id]) {
                    next[item.id] = 1;
                }
            });
            Object.keys(next).forEach((key) => {
                if (!cartItems.find((item) => item.id === key)) {
                    delete next[key];
                }
            });
            return next;
        });
    }, [cartItems]);

    const handleQuantityChange = (id, value) => {
        const numericValue = Math.max(1, parseInt(value, 10) || 1);
        setQuantities((prev) => ({
            ...prev,
            [id]: numericValue
        }));
    };

    const handleRemove = (item) => {
        toggleItem(item);
        setQuantities((prev) => {
            const next = { ...prev };
            delete next[item.id];
            return next;
        });
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        let nextValue = value;
        if (name === 'phone') {
            nextValue = value.replace(/[^0-9]/g, '');
        }
        setContactInfo((prev) => ({
            ...prev,
            [name]: nextValue
        }));

        if (contactErrors[name]) {
            setContactErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateContact = () => {
        const errors = {};
        const emailProvided = contactInfo.email.trim().length > 0;
        const phoneProvided = contactInfo.phone.trim().length > 0;

        if (!emailProvided && !phoneProvided) {
            errors.email = 'Provide at least an email or phone number';
            errors.phone = 'Provide at least an email or phone number';
        }

        if (emailProvided && !/\S+@\S+\.\S+/.test(contactInfo.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (phoneProvided && !/^[0-9]{10,15}$/.test(contactInfo.phone)) {
            errors.phone = 'Phone number should be 10-15 digits';
        }

        setContactErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleQuoteSubmit = (e) => {
        e.preventDefault();
        if (!validateContact()) return;

        setQuoteSubmitting(true);
        setQuoteSuccess(false);
        setQuoteError('');

        const summary = cartItems
            .map((item) => {
                const qty = quantities[item.id] || 1;
                const idText = item.id ? ` (ID: ${item.id})` : '';
                return `${item.name}${idText} x ${qty}`;
            })
            .join(', ');

        const submission = new FormData();
        submission.append('email', contactInfo.email);
        submission.append('phone', contactInfo.phone);
        submission.append('requirement', summary || 'No items specified');
        submission.append('source', 'MyCart Quote Request');

        fetch('https://script.google.com/macros/s/AKfycbxjiZ3KE9Rcgxe6ncvNJ9dBux0ixuP5XeuJy7p2iTZ3NOgk7XOvsQc1zpUJ86655J29/exec', {
            method: 'POST',
            body: submission
        })
            .then((response) => response.text())
            .then(() => {
                setQuoteSubmitting(false);
                setQuoteSuccess(true);
                setContactInfo({ email: '', phone: '' });
                setQuantities({});
                setTimeout(() => {
                    setQuoteSuccess(false);
                }, 4000);
                setTimeout(() => {
                    cartItems.forEach((item) => toggleItem(item));
                }, 0);
            })
            .catch((error) => {
                console.error('Error submitting quote request:', error);
                setQuoteError('Oops! Something went wrong. Please try again.');
                setQuoteSubmitting(false);
            });
    };

    return (
        <div className="min-h-full" style={{ background: 'rgb(19,19,24)' }}>
            <main
                className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative"
                style={{ background: 'rgb(19,19,24)', paddingTop: '120px', minHeight: 'calc(100vh - 120px)' }}
            >
                <div className="w-full mx-auto px-2 sm:px-4 max-w-[120rem]">
                    <div className="text-center mb-8 md:mb-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
                            My Cart
                        </h1>
                        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                            {hasItems
                                ? 'Review the products you have selected. You can remove items or continue exploring the catalog for more gifts.'
                                : 'Your cart is empty right now. Explore our catalog and add the items that catch your eye.'}
                        </p>
                    </div>

                    {quoteSuccess && (
                        <div className="mb-6 rounded-lg bg-white/80 px-4 py-3 text-sm font-semibold text-gray-900 shadow-lg text-center">
                            Quote sent successfully! We’ll get back to you soon. Thank you for choosing us.
                        </div>
                    )}
                    {quoteError && (
                        <div className="mb-6 rounded-lg bg-red-500/80 px-4 py-3 text-sm font-semibold text-white shadow-lg text-center">
                            {quoteError}
                        </div>
                    )}

                    {hasItems ? (
                        <form onSubmit={handleQuoteSubmit} className="space-y-6 md:space-y-8">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 shadow-[0_25px_60px_-45px_rgba(255,255,255,0.55)]">
                                <p className="text-sm md:text-base text-gray-200 text-center md:text-left">
                                    <span className="font-semibold text-white">Heads up:</span> increasing quantities gives you more room to negotiate the best pricing in the final quote.
                                </p>
                            </div>
                            <ImportantNote />
                            {cartItems.map((item) => {
                                const pricingLabelRaw =
                                    item.pricingModel ||
                                    (Array.isArray(item.itemsIncluded) && item.itemsIncluded.length > 0
                                        ? 'Per Pack'
                                        : 'Per Item');
                                const pricingLabel =
                                    pricingLabelRaw === 'per-item'
                                        ? 'Per Item'
                                        : pricingLabelRaw === 'per-pack'
                                        ? 'Per Pack'
                                        : pricingLabelRaw;

                                return (
                                <div
                                    key={item.id}
                                    className="flex flex-col lg:flex-row gap-5 lg:gap-8 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 shadow-[0_25px_60px_-45px_rgba(255,255,255,0.5)]"
                                >
                                    <div className="w-full lg:w-48 h-48 lg:h-32 overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-pink-50 flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col gap-4">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                            <div className="space-y-1">
                                                <h3 className="text-xl md:text-2xl font-semibold text-white">
                                                    {item.name}
                                                </h3>
                                                {item.id && (
                                                    <p className="text-xs font-semibold tracking-wide text-orange-400 uppercase">
                                                        Product ID: {item.id}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <span className="text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                                                ₹{item.price}
                                            </span>
                                                {pricingLabel && (
                                                    <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
                                                        {pricingLabel}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {Array.isArray(item.description) && item.description.length > 0 && (
                                            <ul className="space-y-2 text-sm text-gray-300">
                                                {item.description.map((point, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-auto">
                                            <div className="flex items-center gap-3">
                                                <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-300">
                                                    Quantity
                                                </label>
                                                <input
                                                    id={`quantity-${item.id}`}
                                                    type="number"
                                                    min="1"
                                                    value={quantities[item.id] || 1}
                                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                    className="w-20 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(item)}
                                                className="self-start sm:self-auto inline-flex items-center gap-2 rounded-lg border border-red-400/50 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 transition-all hover:bg-red-500/30 hover:border-red-300"
                                            >
                                                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )})}

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 shadow-[0_25px_60px_-45px_rgba(255,255,255,0.55)]">
                                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                                    Need a custom quote?
                                </h2>
                                <p className="text-sm text-gray-300 mb-4">
                                    Share your preferred contact details and we’ll send you the best deal for your selection.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="quote-email" className="block text-sm text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            id="quote-email"
                                            type="email"
                                            name="email"
                                            value={contactInfo.email}
                                            onChange={handleContactChange}
                                            className={`w-full rounded-lg border px-3 py-2 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                                                contactErrors.email ? 'border-red-500' : 'border-white/20'
                                            }`}
                                            placeholder="you@example.com"
                                        />
                                        {contactErrors.email && (
                                            <p className="mt-1 text-xs text-red-400">{contactErrors.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="quote-phone" className="block text-sm text-gray-300 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            id="quote-phone"
                                            type="tel"
                                            name="phone"
                                            value={contactInfo.phone}
                                            onChange={handleContactChange}
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            className={`w-full rounded-lg border px-3 py-2 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                                                contactErrors.phone ? 'border-red-500' : 'border-white/20'
                                            }`}
                                            placeholder="+91 1234567890"
                                        />
                                        {contactErrors.phone && (
                                            <p className="mt-1 text-xs text-red-400">{contactErrors.phone}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={quoteSubmitting}
                                        className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-white transition-all ${
                                            quoteSubmitting
                                                ? 'bg-white/20 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 hover:scale-[1.02] shadow-lg'
                                        }`}
                                    >
                                        {quoteSubmitting ? 'Submitting...' : 'Quote us for best deal'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
                            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                                Your cart is feeling a little light.
                            </h2>
                            <p className="text-gray-300 text-base md:text-lg mb-6">
                                Browse our catalog to find the perfect items for your gifting experience.
                            </p>
                            <Link
                                to="/catalog"
                                className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all hover:scale-105 shadow-lg"
                            >
                                Explore Catalog
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MyCart;
