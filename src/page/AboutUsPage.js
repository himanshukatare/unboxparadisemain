import React, { useState, useEffect } from 'react';
import AboutUs from '../component/AboutUs';
import OurSuccess from '../component/OurSuccess';

const AboutUsPage = () => {
    const [aboutUsData, setAboutUsData] = useState(null);
    const [successData, setSuccessData] = useState(null);

    useEffect(() => {
        // Fetch about us configuration
        fetch('/resource/config/aboutus.json')
            .then(response => response.json())
            .then(data => {
                setAboutUsData(data);
            })
            .catch(error => {
                console.error('Error loading about us data:', error);
            });

        // Fetch our success configuration
        fetch('/resource/config/oursuccess.json')
            .then(response => response.json())
            .then(data => {
                setSuccessData(data);
            })
            .catch(error => {
                console.error('Error loading success data:', error);
            });
    }, []);

    return (
        <div className="min-h-full" style={{ background: 'rgb(19,19,24)' }}>
            <main className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative" 
                  style={{ background: 'rgb(19,19,24)', paddingTop: '120px', minHeight: '100vh' }}>

                <AboutUs data={aboutUsData} />
                <OurSuccess data={successData} />
            </main>
        </div>
    );
};

export default AboutUsPage;
