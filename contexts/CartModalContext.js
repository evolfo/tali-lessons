import React, { createContext, useContext, useState } from 'react';

const CartModalContext = createContext();

export const useCartModal = () => {
  const context = useContext(CartModalContext);
  if (!context) {
    throw new Error('useCartModal must be used within a CartModalProvider');
  }
  return context;
};

export const CartModalProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <CartModalContext.Provider value={{ cartOpen, openCart, closeCart }}>
      {children}
    </CartModalContext.Provider>
  );
};
