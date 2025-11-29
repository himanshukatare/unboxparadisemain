import React, { useEffect, useState } from 'react';
import OurProcess from '../component/OurProcess';

const OurProcessPage = () => {
    const [processData, setProcessData] = useState(null);

    useEffect(() => {
        fetch('/resource/config/ourprocess.json')
            .then((response) => response.json())
            .then((data) => setProcessData(data))
            .catch((error) => {
                console.error('Error loading our process data:', error);
            });
    }, []);

    return (
        <div className="min-h-full" style={{ background: 'rgb(19,19,24)' }}>
            <main
                className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative"
                style={{ background: 'rgb(19,19,24)', paddingTop: '120px', minHeight: '100vh' }}
            >
                <div className="w-full mx-auto px-2 sm:px-4 max-w-[120rem] text-center mb-8 md:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
                        Our Process
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto">
                        Discover how we transform your ideas into unforgettable unboxing experiences with our seamless end-to-end workflow.
                    </p>
                </div>

                <OurProcess data={processData} />
            </main>
        </div>
    );
};

export default OurProcessPage;
