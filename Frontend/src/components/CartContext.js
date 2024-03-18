// CartContext.js

import React, { createContext, useState } from 'react';
import { calculateTotal } from './calculateTotal';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartItemCount(cartItemCount + 1);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    setCartItemCount(cartItemCount - 1);
  };

  const clearCart = () => {
    setCart([]);
    setCartItemCount(0);
  };

  return (
    <CartContext.Provider value={{ cart, cartItemCount, addToCart, removeFromCart, calculateTotal, clearCart  }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };