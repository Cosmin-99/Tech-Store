import React from 'react'
import { CartHook, useCart } from '../hooks/useCart';


export const CartContext = React.createContext<CartHook>(null!);
export const CartProvider: React.FC = (p) => {
    const { children } = p
    const cart = useCart();
    return <CartContext.Provider value={cart}>
        {children}
    </CartContext.Provider>
}