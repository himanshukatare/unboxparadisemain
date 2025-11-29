import React from "react";

const ImportantNote = () =>{
    return (
        <section className="page-section relative z-10">
            <div classNathew= "w-full mx-auto mb-6 md:mb-8 px-2 sm:px-4 max-w-[120rem]">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-orange-500/30 rounded-lg p-4 md:p-5 shadow-lg">
                    <div className="flex items-start gap-2 mb-2">
                        <svg className="w-5 h-7 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <h3 className="text-base md:text-lg font-bold text-white">Important Information</h3>
                    </div>
                    <ul className="space-y-2 m1-7">
                        <li className="flex items-start gap-2 text-xs md:text-sm text-gray-300">
                            <span className="text-orange-500 font-bold">★</span>
                            <span>All prices are <strong className="text-white">inclusive of GST</strong></span>
                        </li>
                        <li className="flex items start gap-2 text-xs md:text-sm text-gray-300">
                            <span className="text-orange-500 font-bold">★</span>
                            <span>Prices shown are based on a <strong className="text-white">minimum order quantity of 50 units</strong></span>
                        </li>
                        <li className="flex items start gap-2 text-xs md:text-sm text-gray-300">
                            <span  className="text-orange-500 font-bold">★</span>
                            <span>We don't just deliver <strong className="text-white">we make your distribution easy and hassle-free!</strong></span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ImportantNote