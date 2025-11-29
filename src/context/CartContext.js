import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const CartContext = createContext();

const getInitialCart = () => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const stored = window.localStorage.getItem('unboxparadise-cart');
        return stored ? JSON.parse(stored) : [];
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
        setCartItems((prev) => {
            if (prev.some((existing) => existing.id === item.id)) {
                return prev;
            }
            return [...prev, item];
        });
    }, []);

    const removeItem = useCallback((itemId) => {
        setCartItems((prev) => prev.filter((existing) => existing.id !== itemId));
    }, []);

    const toggleItem = useCallback((item) => {
        setCartItems((prev) => {
            if (prev.some((existing) => existing.id === item.id)) {
                return prev.filter((existing) => existing.id !== item.id);
            }
            return [...prev, item];
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
