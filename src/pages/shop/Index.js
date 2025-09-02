import React, { useEffect, useState } from "react";
import { ShopCategories } from "../../components/shopping/ShopCategories";
import { apiServiceGet } from "../../API/apiService";
import { EmptyState } from "../../components/EmptyState";
import { useCart } from "../../components/shopping/CartProvider";
import { CartCanvas } from "../../components/shopping/CartCanvas";
import { useAuth } from "../session/AuthProvider";

export const Index = () => {
  //OBTENER DEL CARRITO DE COMPRA
  const { productsCart, setProductsCart } = useCart();

  //LLAMAR APIS PARA TIENDA
  const [categorias, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const { user } = useAuth();
  const fetchData = async () => {
    const cats = await apiServiceGet("category");
    const prods = await apiServiceGet("product");
    setCategories(cats);
    setProducts(prods.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="container-xl px-4">
        {user && (
          <h1 className="badge bg-body-secondary fs-3 my-3">
            ¡Bienvenido usuario "{user.username}"!
          </h1>
        )}
        <div className="row row-cards">
          {categorias.length <= 0 ? (
            <EmptyState text="No hay categorías disponibles." />
          ) : (
            categorias.map((category) => (
              <ShopCategories
                key={category.id}
                category={category}
                products={products}
                setProductsCart={setProductsCart}
                productsCart={productsCart}
              />
            ))
          )}
        </div>
      </div>

      {/* CARRITO DE COMPRAS */}
      <CartCanvas
        productsCart={productsCart}
        setProductsCart={setProductsCart}
        fetchData={fetchData}
      />
    </div>
  );
};
