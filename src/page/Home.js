import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from '../component/Carousel';
import ValueForMoneyPacks from '../component/ValueForMoneyPacks';
import BundledPacks from '../component/BundledPacks';
import StandaloneItemList from '../component/StandaloneItemList';
import FAQ from '../component/FAQ';
import RegisterUserInquiry from '../component/RegisterUserInquiry';
import Addons from '../component/Addons';
import ImportantNote from '../component/ImportantNote';
import useContactDetails from '../hooks/useContactDetails';

const Home = () => {
    const [config, setConfig] = useState({
        carousel: [],
        valueForMoneyPacks: null,
        bundledPacks: null,
        standaloneItems: null,
        addons: null,
        faq: null,
        catalog: null
    });
    const location = useLocation();
    const contactDetails = useContactDetails();

    useEffect(() => {
        // Fetch configuration files for home page
        const fetchConfigs = async () => {
            try {
                const [
                    carouselRes,
                    packsRes,
                    bundledPacksRes,
                    standaloneItemsRes,
                    addonsRes,
                    faqRes,
                    catalogRes
                ] = await Promise.all([
                    fetch('/resource/config/crousel.json'),
                    fetch('/resource/config/valueformoneypacks.json'),
                    fetch('/resource/config/bundledpacks.json'),
                    fetch('/resource/config/standaloneitems.json'),
                    fetch('/resource/config/addons.json'),
                    fetch('/resource/config/faq.json'),
                    fetch('/resource/config/catalog.json')
                ]);

                const [
                    carouselData,
                    packsData,
                    bundledPacksData,
                    standaloneItemsData,
                    addonsData,
                    faqData,
                    catalogData
                ] = await Promise.all([
                    carouselRes.json(),
                    packsRes.json(),
                    bundledPacksRes.json(),
                    standaloneItemsRes.json(),
                    addonsRes.json(),
                    faqRes.json(),
                    catalogRes.json()
                ]);

                setConfig({
                    carousel: carouselData.carousel || [],
                    valueForMoneyPacks: packsData,
                    bundledPacks: bundledPacksData,
                    standaloneItems: standaloneItemsData,
                    addons: addonsData,
                    faq: faqData,
                    catalog: catalogData
                });
            } catch (error) {
                console.error('Error loading configuration data:', error);
            }
        };

        fetchConfigs();
    }, []);

    useEffect(() => {
        if (location.hash) {
            const targetId = location.hash.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [location.hash]);

    return (
        <div className="min-h-full" style={{ background: 'rgb(19,19,24)' }}>
            <main className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative"
                style={{ background: 'rgb(19,19,24)', paddingTop: '100px' }}>

                <Carousel slides={config.carousel} />
                <ValueForMoneyPacks data={config.valueForMoneyPacks} />
                <BundledPacks data={config.bundledPacks} hideExpandIcon={true}/>
                <StandaloneItemList data={config.standaloneItems} catalogData={config.catalog} />
                <Addons data={config.addons} />
                <ImportantNote />
                <FAQ data={config.faq} />
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
                        Contact Us
                    </h2>
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                        Have a question or want to place an order? Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                </div>
                <RegisterUserInquiry contactDetails={contactDetails} />
            </main>
        </div>
    );
};

export default Home;
