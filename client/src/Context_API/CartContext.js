import React, { useState, createContext } from "react";
export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cartContext, setCartContext] = useState({
    countCart: 0,
  });
  return (
    <CartContext.Provider value={{ cartContext, setCartContext }}>
      {children}
    </CartContext.Provider>
  );
}
