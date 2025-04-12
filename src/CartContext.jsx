import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

   if (existingProduct) {
      // Increase the quantity if the product is already in the cart
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: existingProduct.quantity + 1 } : item
      ));

   } else {
      // Add the product to the cart with a quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: quantity } : item
    ));
  };

const clearCart = () => {
  setCart([]);
};

return (
  <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};