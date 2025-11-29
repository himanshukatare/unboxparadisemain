import React, { useState, useEffect } from 'react';
import ProductsServices from '../component/ProductsServices';
//import ValueForMoneyPacks from '../component/ValueForMoneyPacks';

const ProductsServicesPage = () => {
    const [productsServicesData, setProductsServicesData] = useState(null);
    //const [valueForMoneyPacksData, setValueForMoneyPacksData] = useState(null);

    useEffect(() => {
        // Fetch products and pricing configuration
        Promise.all([
            fetch('/resource/config/productsservices.json'),
            fetch('/resource/config/valueformoneypacks.json')
        ])
        .then(([productsRes, packsRes]) => Promise.all([productsRes.json(), packsRes.json()]))
        .then(([productsData, packsData]) => {
            setProductsServicesData(productsData);
            //setValueForMoneyPacksData(packsData);
        })
        .catch(error => {
            console.error('Error loading products and services data:', error);
        });
    }, []);

    return (
        <div className="min-h-full" style={{ background: 'rgb(19,19,24)' }}>
            <main className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative" 
                  style={{ background: 'rgb(19,19,24)', paddingTop: '120px', minHeight: '100vh' }}>

                <ProductsServices data={productsServicesData} />
                {/* <ValueForMoneyPacks data={valueForMoneyPacksData} /> */}
            </main>
        </div>
    );
};

export default ProductsServicesPage;
