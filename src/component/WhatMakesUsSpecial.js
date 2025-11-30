import React from 'react';

const WhatMakesUsSpecial = ({ data }) => {
    if (!data) return null;

    const { heading, features } = data;

    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8">{heading}</h2>

                <div className="grid gap-6 md:grid-cols-3">
                    {features && features.map((f) => (
                        <div key={f.id} className="bg-gray-800 p-6 rounded-md">
                            <div className="text-3xl mb-4 text-teal-400">{f.icon ? '★' : '★'}</div>
                            <h3 className="text-xl font-semibold text-white">{f.title}</h3>
                            <p className="mt-2 text-gray-300">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatMakesUsSpecial;
