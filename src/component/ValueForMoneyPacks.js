import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ValueForMoneyPacks = ({ data }) => {
    const { toggleItem, isInCart } = useCart();
    const navigate = useNavigate();
    
    if (!data) return null;

    return (
        <section className="page-section relative z-10">
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 gradient-text">
                {data.heading}
            </h2>
            
            {/* Limited Period Offer Badge */}
            <div className="flex justify-center mt-4 mb-4">
                <div className="relative inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg animate-pulse">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    <span className="text-white font-bold text-sm md:text-base lg:text-lg uppercase tracking-wide">
                        Limited Period Offer
                    </span>
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
            </div>
            <div className="w-full mx-auto mb-6 md:mb-8 px-2 sm:px-4 max-w-[120rem]">
                <div className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-x-auto">
                    <table className="w-full border-collapse text-xs md:text-sm">
                        <thead className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                            <tr>
                                <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-left font-semibold border-r border-white/30 text-sm md:text-base whitespace-nowrap">Kit Name</th>
                                <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-left font-semibold border-r border-white/30 text-sm md:text-base">Items Included</th>
                                <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-center font-semibold border-r border-white/30 text-sm md:text-base whitespace-nowrap">Price</th>
                                <th className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-center font-semibold text-sm md:text-base whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.packs.map((pack, index) => (
                                <tr key={index} className={`hover:bg-gray-50 transition-colors ${pack.bgColor || ''}`}>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3 border-r border-gray-200">
                                        <div className="text-sm md:text-base font-semibold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                                            {pack.kitName || pack.name}
                                        </div>
                                        {pack.tagline && (
                                            <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">
                                                {pack.tagline}
                                            </p>
                                        )}
                                    </td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-gray-700 border-r border-gray-200 text-xs md:text-sm">
                                        {pack.items}
                                    </td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-center border-r border-gray-200">
                                        <div className="flex flex-col items-center gap-0.5">
                                            {pack.actualPrice && (
                                                <div className="text-xs md:text-sm text-gray-400 line-through">
                                                    {pack.actualPrice}
                                                </div>
                                            )}
                                            <div className={`text-base md:text-lg font-bold ${pack.textColor === 'text-purple-600' ? 'text-purple-600' : 'text-orange-600'} ${pack.textColor === 'text-purple-600' ? '' : 'whitespace-nowrap'}`}>
                                                {pack.price}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-2 sm:px-3 md:px-4 py-2 md:py-3 text-center">
                                        <button
                                            onClick={() => {
                                                const cartItem = {
                                                    id: `value-pack-${pack.id}`,
                                                    name: pack.kitName || pack.name,
                                                    price: pack.price,
                                                    actualPrice: pack.actualPrice,
                                                    image: pack.image || '/resource/logo.png',
                                                    items: pack.items,
                                                    tagline: pack.tagline,
                                                    type: 'value-pack'
                                                };
                                                toggleItem(cartItem);
                                            }}
                                            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md font-medium text-white text-xs md:text-sm transition-all hover:scale-105 shadow-md whitespace-nowrap ${
                                                isInCart(`value-pack-${pack.id}`)
                                                    ? 'bg-red-500 hover:bg-red-600'
                                                    : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
                                            }`}
                                        >
                                            {isInCart(`value-pack-${pack.id}`) ? 'Remove' : 'Add to Cart'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Customization Note */}
            <div className="w-full mx-auto mb-6 md:mb-8 px-2 sm:px-4 max-w-[120rem]">
                <div className="relative bg-gradient-to-br from-orange-50 via-white to-pink-50 border-2 border-orange-300 rounded-xl p-6 md:p-8 shadow-lg overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200 to-orange-200 rounded-full blur-2xl opacity-30"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2 flex items-center gap-2">
                                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Personalization Options Available!
                            </h3>
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                                <span className="font-semibold text-gray-800">Customize Your Way:</span> Make each kit uniquely yours! Add your brand name and logo to T-shirts, Pens, Notepads, Water Bottles, and more.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-semibold text-orange-600 shadow-sm border border-orange-200">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Logo Printing
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-semibold text-pink-600 shadow-sm border border-pink-200">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Custom Branding
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-semibold text-orange-600 shadow-sm border border-orange-200">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Add-on Items
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-semibold text-pink-600 shadow-sm border border-pink-200">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Flexible Quantities
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 italic">
                                💡 <strong>Pro Tip:</strong> Mix and match add-ons with any value pack to create the perfect welcome kit for your team!
                            </p>
                        </div>
                        
                        {/* CTA Button */}
                        <div className="flex-shrink-0 w-full md:w-auto">
                            <button
                                onClick={() => navigate('/contact')}
                                className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Customize Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValueForMoneyPacks;
