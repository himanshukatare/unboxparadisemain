import React from 'react';
import { Link } from 'react-router-dom';
import { CITIES, CITY_ORDER } from '../data/cityGifting';
import useContactDetails from '../hooks/useContactDetails';

const SITE = 'https://www.unboxparadise.com';

const FALLBACK_PHONES = ['+91 96309 82265', '+91 89625 77745'];

const buildSchema = (city, phones, email) => {
    const postalCode = city.addressLines
        .join(' ')
        .match(/\b\d{6}\b/);
    const streetAddress = city.addressLines
        .filter((line) => !/^India$/i.test(line))
        .join(', ');

    const localBusiness = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': `Unbox Paradise - ${city.city}`,
        'description': `Corporate gifting company in ${city.city} offering employee welcome kits, festive hampers, academic kits and custom merchandise.`,
        'url': `${SITE}/${city.slug}`,
        'image': `${SITE}${city.image}`,
        'telephone': phones.map((p) => p.replace(/[^+\d]/g, '')),
        'email': email,
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': streetAddress,
            'addressLocality': city.city,
            'addressRegion': city.state,
            'addressCountry': 'IN',
            ...(postalCode ? { 'postalCode': postalCode[0] } : {})
        },
        'areaServed': city.areasServed,
        'parentOrganization': {
            '@type': 'Organization',
            'name': 'Unbox Paradise',
            'url': `${SITE}/`
        }
    };

    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': `${SITE}/` },
            { '@type': 'ListItem', 'position': 2, 'name': city.heading, 'item': `${SITE}/${city.slug}` }
        ]
    };

    const faq = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': city.faq.map((item) => ({
            '@type': 'Question',
            'name': item.question,
            'acceptedAnswer': { '@type': 'Answer', 'text': item.answer }
        }))
    };

    return { localBusiness, breadcrumb, faq };
};

const CityGiftingPage = ({ cityKey }) => {
    const city = CITIES[cityKey];
    const contactDetails = useContactDetails();

    if (!city) return null;

    const phones = [
        contactDetails?.phone?.display,
        contactDetails?.phoneSecondary?.display
    ].filter(Boolean);
    const phoneList = phones.length > 0 ? phones : FALLBACK_PHONES;
    const email = contactDetails?.email?.display || 'connect@unboxparadise.com';
    const whatsapp = contactDetails?.whatsapp?.link || 'https://wa.me/919630982265';
    const otherKey = CITY_ORDER.find((key) => key !== city.key);
    const otherCity = CITIES[otherKey];
    const schema = buildSchema(city, phoneList, email);

    return (
        <div className="min-h-full">
            <main
                className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative"
                style={{ paddingTop: '120px', minHeight: '100vh' }}
            >
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.localBusiness) }} />
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.breadcrumb) }} />
                <script type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.faq) }} />

                <div className="max-w-[120rem] mx-auto px-2 sm:px-4 text-center mb-8 md:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
                        {city.heading}
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
                        {city.heroSubtitle}
                    </p>
                </div>

                <div className="max-w-[1100px] mx-auto mb-10 md:mb-14">
                    <img
                        src={city.image}
                        alt={city.imageAlt}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-auto rounded-2xl shadow-xl"
                    />
                </div>

                <section className="max-w-[900px] mx-auto mb-12 space-y-4">
                    {city.intro.map((paragraph, index) => (
                        <p key={index} className="text-gray-700 text-base md:text-lg leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </section>

                <section className="max-w-[120rem] mx-auto mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text text-center mb-8">
                        Gifting Solutions We Deliver in {city.city}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                        {city.highlights.map((item) => (
                            <div key={item.title} className="rounded-2xl border border-white/40 bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-gray-700 mt-8">
                        Explore our{' '}
                        <Link to="/catalog" className="text-pink-600 font-semibold hover:underline">product catalog</Link>,{' '}
                        <Link to="/bundled-packs" className="text-pink-600 font-semibold hover:underline">bundled gift packs</Link>{' '}
                        or{' '}
                        <Link to="/products-services" className="text-pink-600 font-semibold hover:underline">gifting services</Link>.
                    </p>
                </section>

                <section className="max-w-[1000px] mx-auto mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text text-center mb-6">
                        Why Companies in {city.city} Choose Unbox Paradise
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {city.whyChoose.map((point, index) => (
                            <li key={index} className="flex items-start gap-3 rounded-xl bg-white/70 border border-white/40 p-4 shadow-sm">
                                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-400 to-pink-500" />
                                <span className="text-gray-700 text-sm md:text-base">{point}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="max-w-[1000px] mx-auto mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text text-center mb-6">
                        Areas We Serve in {city.city}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-2.5">
                        {city.areasServed.map((area) => (
                            <span key={area} className="rounded-full border border-pink-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm">
                                {area}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="max-w-[900px] mx-auto mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text text-center mb-6">
                        Corporate Gifting FAQs for {city.city}
                    </h2>
                    <div className="space-y-3">
                        {city.faq.map((item) => (
                            <details key={item.question} className="group rounded-xl border border-white/40 bg-white p-4 md:p-5 shadow-sm">
                                <summary className="flex cursor-pointer items-center justify-between text-base md:text-lg font-semibold text-gray-800 list-none">
                                    {item.question}
                                    <span className="ml-4 text-pink-500 transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                                </summary>
                                <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                <section className="max-w-[900px] mx-auto mb-16">
                    <div className="rounded-2xl bg-gradient-to-r from-[rgb(226,168,43)] to-[rgb(184,3,124)] p-1 shadow-xl">
                        <div className="rounded-2xl bg-white px-6 py-8 md:px-10 md:py-10 text-center">
                            <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">
                                Get a Corporate Gifting Quote in {city.city}
                            </h2>
                            <p className="text-gray-600 mb-5 max-w-2xl mx-auto">
                                Share your requirement, quantity and budget — our {city.city} team will send a customized proposal within 24 hours.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
                                {phoneList.map((phone) => (
                                    <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:border-pink-300 hover:text-pink-600 transition-colors">
                                        {phone}
                                    </a>
                                ))}
                                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:border-green-300 hover:text-green-600 transition-colors">
                                    WhatsApp
                                </a>
                            </div>
                            <Link to="/contact" className="inline-block rounded-lg bg-gradient-to-r from-[rgb(226,168,43)] to-[rgb(184,3,124)] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105">
                                Request a Quote
                            </Link>
                            <p className="mt-5 text-sm text-gray-500">
                                {city.addressLines.join(', ')}
                            </p>
                            {otherCity && (
                                <p className="mt-3 text-sm text-gray-600">
                                    Also serving{' '}
                                    <Link to={`/${otherCity.slug}`} className="text-pink-600 font-semibold hover:underline">
                                        corporate gifting in {otherCity.city}
                                    </Link>.
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CityGiftingPage;
