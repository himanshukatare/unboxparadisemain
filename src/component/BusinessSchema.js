import React from 'react';

const SITE = 'https://www.unboxparadise.com';

const buildSchema = (details) => {
    if (!details) return null;

    const phones = [];
    if (details.phone?.display) phones.push(details.phone.display);
    if (details.phoneSecondary?.display) phones.push(details.phoneSecondary.display);

    const offices = (details.offices || []).map((office, index) => ({
        '@type': ['LocalBusiness', 'Organization'],
        '@id': `${SITE}/#office-${office.city.toLowerCase()}`,
        'name': `Unbox Paradise ${office.city}`,
        'description': `Corporate gifting services in ${office.city} by Unbox Paradise`,
        'url': SITE,
        'telephone': phones.map((p) => p.replace(/[^+\d]/g, '')),
        'email': details.email?.value || details.email?.display || 'connect@unboxparadise.com',
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': office.lines
                .filter((line) => !/^India$/i.test(line))
                .join(', '),
            'addressCountry': 'IN',
            'addressLocality': office.city
        },
        'sameAs': Object.values(details.social || {}).map((s) => s.url)
    }));

    if (offices.length === 0) return null;

    return {
        '@context': 'https://schema.org',
        '@graph': offices
    };
};

const BusinessSchema = ({ contactDetails }) => {
    const schema = buildSchema(contactDetails);
    if (!schema) return null;

    return (
        <script type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
};

export default BusinessSchema;
