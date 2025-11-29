import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import StandaloneItemDetails from '../component/StandaloneItemDetails';
import ImportantNote from '../component/ImportantNote';
import { useCart } from '../context/CartContext';

const Catalog = () => {
    const [catalogData, setCatalogData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // For actual filtering
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const searchRef = useRef(null);
    const { toggleItem, isInCart } = useCart();

    const createItemWithId = (category, item) => {
        const fallbackSlug = `${item.name}`
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        const resolvedId = item.id || `${category.id}-${fallbackSlug}`;

        return {
            ...item,
            id: resolvedId,
            categoryId: category.id,
            categoryName: category.name
        };
    };

    // Get all items from all categories for search
    const getAllItems = () => {
        if (!catalogData) return [];
        const allItems = [];
        catalogData.categories.forEach(category => {
            category.items.forEach(item => {
                allItems.push(createItemWithId(category, item));
            });
        });
        return allItems;
    };

    // Search items based on query
    const searchItems = (query) => {
        if (!query || query.length < 3) return [];
        
        const lowerQuery = query.toLowerCase();
        const allItems = getAllItems();
        
        return allItems.filter(item => {
            const searchableText = `${item.name} ${item.searchText || ''} ${item.categoryName}`.toLowerCase();
            return searchableText.includes(lowerQuery);
        });
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        // If field is empty, clear search and show all products
        if (value.length === 0) {
            setSearchTerm('');
            setSuggestions([]);
            setShowSuggestions(false);
            setSelectedCategory('all');
        } else if (value.length >= 3) {
            const results = searchItems(value);
            setSuggestions(results.slice(0, 8)); // Limit to 8 suggestions
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    // Handle search submit (Enter or blur)
    const handleSearchSubmit = (query = searchQuery) => {
        setSearchTerm(query);
        setShowSuggestions(false);
        setSelectedCategory('all'); // Reset category filter when searching
    };

    // Handle suggestion click
    const handleSuggestionClick = (item) => {
        setSearchQuery(item.name);
        setSearchTerm(item.name);
        setShowSuggestions(false);
    };

    // Clear search
    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchTerm('');
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedCategory('all'); // Reset to show all products
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        // Fetch catalog configuration
        const fetchConfig = async () => {
            try {
                const response = await fetch('/resource/config/catalog.json');
                const data = await response.json();
                setCatalogData(data);
            } catch (error) {
                console.error('Error loading catalog data:', error);
            }
        };

        fetchConfig();
    }, []);

    if (!catalogData) return null;

    const categories = catalogData.categories || [];
    
    // Apply search filter first
    let filteredCategories;
    if (searchTerm && searchTerm.length >= 3) {
        // Show search results
        const searchResults = searchItems(searchTerm);
        
        // Group results by category
        const categoriesMap = new Map();
        searchResults.forEach(item => {
            if (!categoriesMap.has(item.categoryId)) {
                const category = categories.find(cat => cat.id === item.categoryId);
                categoriesMap.set(item.categoryId, {
                    ...category,
                    items: []
                });
            }
            categoriesMap.get(item.categoryId).items.push(item);
        });
        
        filteredCategories = Array.from(categoriesMap.values());
    } else {
        // Apply category filter
        filteredCategories = selectedCategory === 'all'
            ? categories
            : categories.filter((category) => category.id === selectedCategory);
    }

    return (
        <div className="min-h-full" style={{ background: 'rgb(19,19,24)' }}>
            <main className="w-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-3 relative" 
                  style={{ background: 'rgb(19,19,24)', paddingTop: '120px' }}>
                
                {/* Page Header */}
                <div className="w-full mx-auto mb-8 md:mb-12 px-2 sm:px-4 max-w-[120rem]">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center gradient-text mb-4">
                        {catalogData.heading}
                    </h1>
                    {catalogData.subheading && (
                        <p className="text-center text-gray-300 text-base md:text-lg max-w-3xl mx-auto">
                            {catalogData.subheading}
                        </p>
                    )}

                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                         <Link
                             to="/bundled-packs"
                             className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all hover:scale-105 shadow-lg"
                         >
                             Browse Bundled Packs
                         </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-8 max-w-2xl mx-auto" ref={searchRef}>
                        <div className="relative">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchSubmit();
                                        }
                                    }}
                                    onBlur={() => {
                                        // Delay to allow suggestion click and clear button click
                                        setTimeout(() => {
                                            // Only submit if there's still a query (not cleared)
                                            if (searchQuery.length >= 3) {
                                                handleSearchSubmit();
                                            }
                                        }, 200);
                                    }}
                                    placeholder="Search products... (min 3 characters)"
                                    className="w-full px-4 py-3 pr-20 rounded-lg bg-white text-gray-900 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onMouseDown={(e) => {
                                            // Prevent blur event from firing
                                            e.preventDefault();
                                            handleClearSearch();
                                        }}
                                        className="absolute right-12 text-gray-400 hover:text-gray-600 transition-colors"
                                        aria-label="Clear search"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                                <div className="absolute right-3">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Search Suggestions Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto">
                                    <div className="p-2">
                                        <div className="text-xs font-semibold text-gray-500 px-3 py-2">
                                            {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''} found
                                        </div>
                                        {suggestions.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => handleSuggestionClick(item)}
                                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 rounded-lg transition-all text-left"
                                            >
                                                <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-semibold text-gray-900 truncate">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {item.categoryName}
                                                    </div>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                                                        ₹{item.price}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* No results message */}
                            {showSuggestions && searchQuery.length >= 3 && suggestions.length === 0 && (
                                <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 p-4">
                                    <div className="text-center text-gray-500">
                                        <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm">No products found matching "{searchQuery}"</p>
                                        <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Active search indicator */}
                        {searchTerm && (
                            <div className="mt-3 flex items-center justify-between px-2">
                                <div className="text-sm text-gray-300">
                                    Showing results for: <span className="font-semibold text-white">"{searchTerm}"</span>
                                </div>
                                <button
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleClearSearch();
                                    }}
                                    className="text-sm text-orange-400 hover:text-orange-300 font-semibold"
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Category Filter - Hidden when searching */}
                    {!searchTerm && categories.length > 0 && (
                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <label htmlFor="catalog-category-filter" className="text-sm uppercase tracking-wide text-white/80">
                                Filter by category
                            </label>
                            <select
                                id="catalog-category-filter"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full sm:w-auto min-w-[220px] px-4 py-2 rounded-lg bg-white text-gray-900 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                            >
                                <option value="all">View All Products</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Categories / Search Results */}
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <section key={category.id} className="mb-12 md:mb-16">
                            <div className="w-full mx-auto px-2 sm:px-4 max-w-[120rem]">
                                {/* Category Header */}
                                <div className="mb-6 md:mb-8">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2">
                                        {category.name}
                                    </h2>
                                    {category.description && (
                                        <p className="text-gray-300 text-sm md:text-base">
                                            {category.description}
                                        </p>
                                    )}
                                </div>

                                {/* Category Items Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                                    {(searchTerm ? category.items : category.items).map((item) => {
                                        const itemWithId = searchTerm ? item : createItemWithId(category, item);
                                        return (
                                            <StandaloneItemDetails
                                                key={itemWithId.id}
                                                item={itemWithId}
                                                onToggle={toggleItem}
                                                isSelected={isInCart(itemWithId.id)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    ))
                ) : searchTerm ? (
                    <div className="w-full mx-auto px-2 sm:px-4 max-w-[120rem]">
                        <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-12 text-center">
                            <svg className="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Products Found</h3>
                            <p className="text-gray-600 mb-6">
                                We couldn't find any products matching "<span className="font-semibold">{searchTerm}</span>"
                            </p>
                            <button
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleClearSearch();
                                }}
                                className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all hover:scale-105 shadow-lg"
                            >
                                Clear Search & Browse All
                            </button>
                        </div>
                    </div>
                ) : null}

                {/* Important Note */}
                <ImportantNote />

                {/* Note Section */}
                {catalogData.note && (
                    <div className="w-full mx-auto mb-8 md:mb-12 px-2 sm:px-4 max-w-[120rem]">
                        <div className="bg-gradient-to-r from-orange-100 to-pink-100 border-l-4 border-orange-500 rounded-lg p-4 md:p-6">
                            <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium"
                               dangerouslySetInnerHTML={{ __html: catalogData.note }}>
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Catalog;