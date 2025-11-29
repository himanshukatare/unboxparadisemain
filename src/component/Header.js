import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useContactDetails from '../hooks/useContactDetails';

const Header = ({ data }) => {
    const { cartItems } = useCart();
    const contactDetails = useContactDetails();
    const [openDropdown, setOpenDropdown] = React.useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    if (!data) return null;

    const cartCount = cartItems.length;
    const scrollToTop = () => {
        requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    const contact = contactDetails || data.contact;
    const hasContact = Boolean(contact && (contact.phone || contact.whatsapp || contact.email));

    return (
        <header className="site-header text-white pb-2 fixed top-0 left-0 right-0 z-50" 
                style={{ 
                     background: 'rgb(19,19,24)', 
                     borderBottom: '2px solid transparent', 
                     borderImage: 'linear-gradient(90deg, #e2a82b, #b8037c) 1', 
                     boxShadow: '0 4px 12px rgba(226, 168, 43, 0.15), 0 2px 6px rgba(184, 3, 124, 0.15)' 
                 }}>
            <div className="w-full mx-auto px-4 lg:px-8 xl:px-12">
                {/* Mobile Contact Strip - Top */}
                {hasContact && (
                    <div className="md:hidden flex items-center justify-center gap-2 border-b border-white/10">
                        {contact?.phone && (
                            <>
                                <a
                                    href={contact.phone.link || '#'}
                                    className="flex items-center gap-1 text-xs text-white/90 hover:text-white transition-colors"
                                >
                                    <svg
                                        className="w-3 h-3 text-orange-400 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <span className="whitespace-nowrap">{contact.phone.display}</span>
                                </a>
                                <span className="text-white/30">|</span>
                            </>
                        )}
                        {contact?.whatsapp && (
                            <>
                                <a
                                    href={contact.whatsapp.link || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-xs text-white/90 hover:text-white transition-colors"
                                >
                                    <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    <span className="whitespace-nowrap">{contact.whatsapp.display}</span>
                                </a>
                                <span className="text-white/30">|</span>
                            </>
                        )}
                        {contact?.email && (
                            <a
                                href={contact.email.link || '#'}
                                className="flex items-center gap-1 text-xs text-white/90 hover:text-white transition-colors truncate max-w-[140px]"
                            >
                                <svg className="w-3 h-3 text-pink-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" 
                                    strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="truncate">{contact.email.display}</span>
                            </a>
                        )}
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <Link to="/" onClick={scrollToTop} className="block">
                        {/* Logo Image */}
                        <img src={data.logo.src} alt={data.logo.alt} className="h-16 sm:h-20 md:h-24 lg:h-20 w-auto" />
                        <div className="mt-1 md:mt-2 hidden sm:block">
                            <p
                                className="text-xs md:text-sm lg:text-base font-light tracking-wide italic text-white opacity-90"
                                style={{ fontFamily: "'Brush Script MT', cursive" }}
                            >
                                {data.tagline}
                            </p>
                        </div>
                    </Link>

                    <nav className="relative block">
                        <div className="flex flex-col items-end gap-3">
                            {/* Contact Info - Desktop */}
                            <div className="hidden md:flex flex-wrap items-center gap-1.5 md:gap-2 lg:gap-3 text-xs">
                                {hasContact && contact && (
                                    <>
                                        {contact.phone && (
                                            <a
                                                href={contact.phone.link || '#'}
                                                className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 transition-all group"
                                            >
                                                <svg
                                                    className="w-3.5 h-3.5 md:w-4 md:h-4 text-orange-400 group-hover:text-orange-300 transition-colors flex-shrink-0"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                                <span className="text-white/90 group-hover:text-white text-xs whitespace-nowrap">
                                                    {contact.phone.display}
                                                </span>
                                            </a>
                                        )}
                                        {contact.whatsapp && (
                                            <a
                                                href={contact.whatsapp.link || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 transition-all group"
                                            >
                                                <svg
                                                    className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-400 group-hover:text-green-300 transition-colors flex-shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                                <span className="text-white/90 group-hover:text-white text-xs whitespace-nowrap">
                                                    {contact.whatsapp.display}
                                                </span>
                                            </a>
                                        )}
                                        {contact.email && (
                                            <a
                                                href={contact.email.link || '#'}
                                                className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 transition-all group"
                                            >
                                                <svg
                                                    className="w-3.5 h-3.5 md:w-4 md:h-4 text-pink-400 group-hover:text-pink-300 transition-colors flex-shrink-0"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-white/90 group-hover:text-white text-xs truncate max-w-[140px] lg:max-w-none">
                                                    {contact.email.display}
                                                </span>
                                            </a>
                                        )}
                                    </>
                                )}
                            </div>
                            <button
                                type="button"
                                className="lg:hidden flex items-center justify-center rounded-lg border border-white/15 bg-white/10 p-2 text-white shadow-md transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                onClick={() => setMobileMenuOpen((prev) => !prev)}
                                aria-label="Toggle navigation menu"
                                aria-expanded={mobileMenuOpen}
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            <div
                                className={`lg:hidden absolute top-16 right-0 w-64 rounded-2xl border border-white/15 bg-black/90 backdrop-blur-lg shadow-2xl transition-all duration-200 ${
                                    mobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                                }`}
                            >
                                <ul className="flex flex-col gap-3 px-5 py-4 text-right">
                                    {data.navigation.map((item) => (
                                        <li key={`mobile-${item.id}`} className="flex flex-col gap-2">
                                            {Array.isArray(item.children) && item.children.length > 0 ? (
                                                <>
                                                    <span className="text-sm font-medium text-white/90">
                                                        {item.label}
                                                    </span>
                                                    <div className="flex flex-col gap-2">
                                                        {item.children.map((child) => (
                                                            <Link
                                                                key={`mobile-${child.id}`}
                                                                to={child.href.startsWith('#') ? `/${child.href}` : child.href}
                                                                onClick={() => {
                                                                    setMobileMenuOpen(false);
                                                                    if (child.href === '/') scrollToTop();
                                                                    if (child.href.startsWith('#')) {
                                                                        const el = document.querySelector(child.href);
                                                                        if (el) {
                                                                            requestAnimationFrame(() => {
                                                                                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                                            });
                                                                        }
                                                                    }
                                                                }}
                                                                className="text-sm text-white/75 hover:text-white transition-colors"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <Link
                                                    to={item.href.startsWith('#') ? `/${item.href}` : item.href}
                                                    onClick={() => {
                                                        setMobileMenuOpen(false);
                                                        if (item.href === '/') scrollToTop();
                                                        if (item.href.startsWith('#')) {
                                                            const el = document.querySelector(item.href);
                                                            if (el) {
                                                                requestAnimationFrame(() => {
                                                                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                                });
                                                            }
                                                        }
                                                    }}
                                                    className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                                                >
                                                    {item.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                    <li>
                                        <Link
                                            to="/my-cart"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
                                        >
                                            My Cart{cartCount > 0 ? ` (${cartCount})` : ''}
                                        </Link>
                                    </li>
                                    <li>
                                        {data.ctaButton?.url?.startsWith('http') ? (
                                            <a
                                                href={data.ctaButton.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="inline-flex w-full justify-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
                                                style={{ background: 'linear-gradient(90deg, #e2a82b, #b8037c)' }}
                                            >
                                                {data.ctaButton?.label || 'Get a Quote'}
                                            </a>
                                        ) : (
                                            <Link
                                                to={data.ctaButton?.url || '/contact'}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="inline-flex w-full justify-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
                                                style={{ background: 'linear-gradient(90deg, #e2a82b, #b8037c)' }}
                                            >
                                                {data.ctaButton?.label || 'Get a Quote'}
                                            </Link>
                                        )}
                                    </li>
                                </ul>
                            </div>

                            {/* Navigation Links */}
                            <ul className="hidden lg:flex gap-3 md:gap-4 lg:gap-5 text-sm md:text-base items-center">
                                {data.navigation.map((item) => (
                                    <li key={item.id} className={item.showOnMobile ? '' : 'hidden lg:block'}>
                                        {Array.isArray(item.children) && item.children.length > 0 ? (
                                            <div
                                                className="relative group"
                                                onMouseEnter={() => setOpenDropdown(item.id)}
                                                onMouseLeave={() => setOpenDropdown(null)}
                                            >
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-1 hover:text-orange-400 transition-colors"
                                                    onClick={() =>
                                                        setOpenDropdown((prev) => (prev === item.id ? null : item.id))
                                                    }
                                                >
                                                    {item.label}
                                                    <svg
                                                        className={`h-3 w-3 transition-transform ${openDropdown === item.id ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                                <div
                                                    className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-200 absolute right-0 mt-3 w-64 rounded-xl border 
                                                        border-white/15 bg-black/80 backdrop-blur-xl shadow-xl py-3 z-50 ${
                                                        openDropdown === item.id ? 'opacity-100 visible' : ''
                                                    }`}
                                                >
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.id}
                                                            to={child.href.startsWith('#') ? `/${child.href}` : child.href}
                                                            className="flex items-center gap-2 px-5 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                                                            onClick={() => setOpenDropdown(null)}
                                                        >
                                                            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
                                                            <span>{child.label}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                to={item.href.startsWith('#') ? `/${item.href}` : item.href}
                                                onClick={item.href === '/' ? scrollToTop : undefined}
                                                className="hover:text-orange-400 transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                                <li>
                                    <Link to="/my-cart" className="hover:text-orange-400 transition-colors">
                                        My Cart{cartCount > 0 ? ` (${cartCount})` : ''}
                                    </Link>
                                </li>
                                <li>
                                    {data.ctaButton?.url?.startsWith('http') ? (
                                        <a
                                            href={data.ctaButton.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg text-xs md:text-sm"
                                            style={{ background: 'linear-gradient(90deg, #e2a82b, #b8037c)', color: 'white' }}
                                        >
                                            {data.ctaButton?.label || 'Get a Quote'}
                                        </a>
                                    ) : (
                                        <Link
                                            to={data.ctaButton?.url || '/contact'}
                                            className="inline-block px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg text-xs md:text-sm"
                                            style={{ background: 'linear-gradient(90deg, #e2a82b, #b8037c)', color: 'white' }}
                                        >
                                            {data.ctaButton?.label || 'Get a Quote'}
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
