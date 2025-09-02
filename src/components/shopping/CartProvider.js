import React, { createContext, useContext, useEffect, useState } from "react";

//CREAR EL CARRITO DE COMPRAS
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  // CARGAR CARRITO DESDE SESSIONSTORAGE
  const [productsCart, setProductsCart] = useState(() => {
    const storedCart = sessionStorage.getItem("productsCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // GUARDAR CARRITO EN SESSIONSTORAGE CADA VEZ QUE CAMBIA
  useEffect(() => {
    sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
  }, [productsCart]);

  return (
    <CartContext.Provider value={{ productsCart, setProductsCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
