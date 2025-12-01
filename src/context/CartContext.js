import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const CartContext = createContext();

const getInitialCart = () => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const stored = window.localStorage.getItem('unboxparadise-cart');
        const parsed = stored ? JSON.parse(stored) : [];
        // Normalize any legacy/stale items persisted in localStorage so
        // UI can reliably use `item.image` or `item.images[0]`.
        return Array.isArray(parsed)
            ? parsed.map((it) => ({
                  ...it,
                  image: it.image || (Array.isArray(it.images) && it.images.length > 0 ? it.images[0] : undefined)
              }))
            : [];
    } catch (error) {
        console.warn('Unable to read cart from localStorage', error);
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(getInitialCart);

    useEffect(() => {
        try {
            window.localStorage.setItem('unboxparadise-cart', JSON.stringify(cartItems));
        } catch (error) {
            console.warn('Unable to persist cart to localStorage', error);
        }
    }, [cartItems]);

    const addItem = useCallback((item) => {
        const normalized = {
            ...item,
            image: item.image || (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : undefined)
        };
        setCartItems((prev) => {
            if (prev.some((existing) => existing.id === normalized.id)) {
                return prev;
            }
            return [...prev, normalized];
        });
    }, []);

    const removeItem = useCallback((itemId) => {
        setCartItems((prev) => prev.filter((existing) => existing.id !== itemId));
    }, []);

    const toggleItem = useCallback((item) => {
        const normalized = {
            ...item,
            image: item.image || (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : undefined)
        };
        setCartItems((prev) => {
            if (prev.some((existing) => existing.id === normalized.id)) {
                return prev.filter((existing) => existing.id !== normalized.id);
            }
            return [...prev, normalized];
        });
    }, []);

    const isInCart = useCallback(
        (itemId) => cartItems.some((item) => item.id === itemId),
        [cartItems]
    );

    const value = useMemo(
        () => ({
            cartItems,
            addItem,
            removeItem,
            toggleItem,
            isInCart
        }),
        [cartItems, addItem, removeItem, toggleItem, isInCart]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
