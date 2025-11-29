import React, { useState, useEffect } from 'react';
import WhatMakesUsSpecial from '../component/WhatMakesUsSpecial';
//import OurProcess from '../component/OurProcess';
import WhyChooseUs from '../component/WhyChooseUs';

const WhatMakesUsSpecialPage = () => {
    const [whatMakesUsSpecialData, setWhatMakesUsSpecialData] = useState(null);
    //const [ourProcessData, setOurProcessData] = useState(null);
    const [whyChooseUsData, setWhyChooseUsData] = useState(null);

    useEffect(() => {
        // Fetch configuration for all sections
        Promise.all([
            fetch('/resource/config/whatmakesusspecial.json'),
            //fetch('/resource/config/ourprocess.json'),
            fetch('/resource/config/whychooseus.json')
        ])
        .then(([specialRes, whyUsRes]) => 
            Promise.all([specialRes.json(),  whyUsRes.json()])
        )
        .then(([specialData, whyUsData]) => {
            setWhatMakesUsSpecialData(specialData);
            //setOurProcessData(processData);
            setWhyChooseUsData(whyUsData);
        })
        .catch(error => {
            console.error('Error loading what makes us special data:', error);
        });
    }, []);

    return (
        <div className="min-h-full" style={{ background: 'rgb(19,19,24)' }}>
            <main className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative" 
                  style={{ background: 'rgb(19,19,24)', paddingTop: '120px', minHeight: '100vh' }}>

                <WhatMakesUsSpecial data={whatMakesUsSpecialData} />
                <WhyChooseUs data={whyChooseUsData} />
            </main>
        </div>
    );
};

export default WhatMakesUsSpecialPage;
