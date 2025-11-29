import React, { useState, useEffect } from 'react';

const ImagePopover = ({ images, isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // reset index when initialIndex or isOpen changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  // prevent body scroll when popover is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, images.length]); // depend on images.length so handlers work correctly

  // Early return after hooks
  if (!isOpen || !images || images.length === 0) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-start justify-center bg-black/80 backdrop-blur-sm animate-fadeIn pt-[200px]"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-5xl mx-4 animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {/* X icon */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image Container */}
        <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
          <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />

            {/* Navigation Arrows (only show if more than 1 image) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* left chevron */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* right chevron */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Image Counter and Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-3">
              {/* Dots Indicator */}
              <div className="flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === index ? 'w-8 bg-orange-500' : 'w-2 bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Counter */}
              <div className="bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentIndex + 1}/{images.length}
              </div>
            </div>
          )}
        </div>

        {/* Helper text */}
        <div className="text-center mt-4 text-white/70 text-sm">
          Press <kbd className="px-2 py-1 bg-white/20 rounded">ESC</kbd> to close or use arrow keys to navigate
        </div>
      </div>
    </div>
  );
};

export default ImagePopover;

// import React, { useState, useEffect } from 'react';

// const ImagePopover = ({ images, isOpen, onClose, initialIndex = 0 }) => {
//     const [currentIndex, setCurrentIndex] = useState(initialIndex);

//     // All hooks must be called before any conditional returns
//     useEffect(() => {
//         setCurrentIndex(initialIndex);
//     }, [initialIndex, isOpen]);

//     useEffect(() => {
//         if (isOpen) {
//             // Disable body scroll when popover is open
//             document.body.style.overflow = 'hidden';
//         } else {
//             // Re-enable body scroll when popover is closed 
//             document.body.style.overflow = 'unset';
//         }

//         return () => {
//             document.body.style.overflow = 'unset';
//         };
//     }, [isOpen]);

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (e.key === 'Escape') {
//                 onClose();
//             } else if (e.key === 'ArrowLeft') {
//                 handlePrevious();
//             } else if (e.key === 'ArrowRight') {
//                 handleNext()
//             }
//         };

//         if (isOpen) {
//             window.addEventListener('keydown', handleKeyDown);
//             return () => window.removeEventListener('keydown', handleKeyDown);
//         }
//     }, [isOpen, currentIndex, onClose]);

//     //Early Reurn after all hooks
//     if (!isOpen || !images || images.length === 0) return null;

//     const handlePrevious = () => {
//         setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//     };

//     const handleNext = () => {
//         setCurrentIndex((prev) => (prev + 1) % images.length);
//     };

//     const handleBackdropClick = (e) => {
//         if (e.target === e.currentTarget) {
//             onClose();
//         }
//     };

//     return (
//         <div
//             className="fixed inset-0 z-40 flex items-start justify-center bg-black/80 barkdrop-blur-se animate-fadeIn pt-[200px]"
//             onClick={handleBackdropClick}
//         >
//             <div className="relative w-full max-w-5x1 mx-4 animate-scaleIn">
//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute -top-12 right-0 text-white hover: text-gray-300 transition-colors"
//                     aria-label="Close"
//                 >
//                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6112 12" />
//                     </svg>
//                 </button>

//                 {/* Image Container */}
//                 <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl/">
//                     <div className="relative aspect-video bg-gray-100">
//                         <img
//                             src={images[currentIndex]}
//                             alt={`Image $(currentIndex + 1}`}
//                             className="w-full h-full object-contain"
//                         />

//                         {/*Navigation Annous Only show if more than 1 Image */}
//                         {images.length > 1 && (
//                             <>
//                                 <button
//                                     onClick={handlePrevious}
//                                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                                     aria-label="Previous image"
//                                 >
//                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 517 7-7 7" />
//                                     </svg>
//                                 </button>

//                                 <button
//                                     onClick={handleNext}
//                                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                                     aria-label="Next image"
//                                 >
//                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 517 7-7 7" />
//                                     </svg>
//                                 </button>
//                             </>
//                         )}
//                     </div>

//                     {/* Image Counter and Dots */}
//                     {images.length > 1 && (
//                         <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-3">
//                             {/* Dots Indicator*/}
//                             <div className="flex gap-2">
//                                 {images.map((_, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => setCurrentIndex(index)}
//                                         className={`h-2 rounded-full transition-all ${currentIndex === index
//                                                 ? 'w-8 bg-orange-500'
//                                                 : 'w-2 bg-white/60 hover:bg-white/80'
//                                             }`}
//                                         aria-label={`Go to image ${index + 1}`}
//                                     />
//                                 ))}
//                             </div>

//                             {/*Counter*/}
//                             <div className="bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
//                                 {currentIndex + 1}/{images.length}
//                             </div>
//                         </div> >
//                         )}
//                 </div>

//                 {/* Helper text: */}
//                 <div className="text-center et-4 text white/70 text-sm">
//                     Press <kbd className="px-2 py-1 bg-white/20 rounded">ESC</kbd> to close or use arrow keys to navigate
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ImagePopover;