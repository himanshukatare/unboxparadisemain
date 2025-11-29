import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './component/Header';
import Footer from './component/Footer';
import { CartProvider } from './context/CartContext';
import './styles.css';

const Home = lazy(() => import('./page/Home'));
const AboutUsPage = lazy(() => import('./page/AboutUsPage'));
const ProductsServicesPage = lazy(() => import('./page/ProductsServicesPage'));
const WhatMakesUsSpecialPage = lazy(() => import('./page/WhatMakesUsSpecialPage'));
const Catalog = lazy(() => import('./page/Catalog'));
const ContactUsPage = lazy(() => import('./page/ContactUsPage'));
const MyCart = lazy(() => import('./page/MyCart'));
const OurProcessPage = lazy(() => import('./page/OurProcessPage'));
const BundledPackPage = lazy(() => import('./page/BundledPackPage'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function App() {
  const [headerData, setHeaderData] = React.useState(null);
  const [footerData, setFooterData] = React.useState(null);

  React.useEffect(() => {
    window.scrollTo(0,0);
    // Fetch header and footer configs once for the entire app
    Promise.all([
      fetch('/resource/config/header.json'),
      fetch('/resource/config/footer.json')
    ])
    .then(([headerRes, footerRes]) => Promise.all([headerRes.json(), footerRes.json()]))
    .then(([headerData, footerData]) => {
      setHeaderData(headerData);
      setFooterData(footerData);
    })
    .catch(error => console.error('Error loading app config:', error));
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <div className="min-h-full" style={{ background: 'rgb(19,19,24)' }}>
          <Header data={headerData} />
          <Suspense
            fallback={
              <div className="flex min-h-[60vh] items-center justify-center text-white">
                <div className="rounded-full border-4 border-white/20 border-t-white/70 h-12 w-12 animate-spin mr-4" />
                <span className="text-lg font-semibold tracking-wide">Loading, please wait...</span>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/products-services" element={<ProductsServicesPage />} />
              <Route path="/our-process" element={<OurProcessPage />} />
              <Route path="/what-makes-us-special" element={<WhatMakesUsSpecialPage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/bundled-packs" element={<BundledPackPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/my-cart" element={<MyCart />} />
            </Routes>
          </Suspense>
          <Footer data={footerData} />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
