import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemDetails from '../component/ItemDetails';
import Addons from '../component/Addons';
import ImportantNote from '../component/ImportantNote'

const BundledPackPage = () => {
    const [bundledData, setBundledData] = useState(null);
    const [addonsData, setAddonsData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bundledRes, addonsRes] = await Promise.all([
                    fetch('/resource/config/bundledpacks.json'),
                    fetch('/resource/config/addons.json')
                ]);

                const [bundledJson, addonsJson] = await Promise.all([
                    bundledRes.json(),
                    addonsRes.json()
                ]);

                setBundledData(bundledJson);
                setAddonsData(addonsJson);
            } catch (error) {
                console.error('Error loading bundled packs or addons:', error);
            }
        };

        fetchData();
    }, []);

    if (!bundledData) {
        return null;
    }

    return (
        <div className="min-h-full" style={{ background: 'rgb(19,19,24)' }}>
            <main
                className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative"
                style={{ background: 'rgb(19,19,24)', paddingTop: '120px', minHeight: '100vh' }}
            >
                <div className="w-full mx-auto px-2 sm:px-4 max-w-[120rem]">
                    <div className="text-center mb-8 md:mb-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
                            {bundledData.heading || 'Bundled Packs'}
                        </h1>
                        {bundledData.subheading && (
                            <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto">
                                {bundledData.subheading}
                            </p>
                        )}
                        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link
                                to="/catalog"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all hover:scale-105 shadow-lg"
                            >
                                Browse Product Catalog
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
                        {bundledData.items?.map((item, index) => (
                            <ItemDetails key={index} item={item} />
                        ))}
                    </div>
                    <ImportantNote />
                    {bundledData.note && (
                        <div className="bg-gradient-to-r from-orange-100 to-pink-100 border-l-4 border-orange-500 rounded-lg p-4 md:p-6">
                            <p
                                className="text-gray-700 text-sm sm:text-base md:text-lg font-medium"
                                dangerouslySetInnerHTML={{ __html: bundledData.note }}
                            />
                        </div>
                    )}
                </div>

                <Addons data={addonsData} showBrowseButton={false} align="center" showAllItems={true} />
            </main>
        </div>
    );
};

export default BundledPackPage;