import React, { useEffect, useState } from "react";
import { ShopCategories } from "../../components/ShopCategories";
import { BuyModal } from "../../components/BuyModal";

import { ShopCart } from "../../components/ShopCart";
import { apiServiceGet } from "../../apiService/apiService";

export const Index = () => {
  // LOS PRODUCTOS DEL CARRITO DE COMPRAS
  const [productsCart, setProductsCart] = useState([]);

  //MODAL PARA EL PROCESO DE COMPRA
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  //LLAMAR APIS PARA TIENDA
  const [categorias, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [clientes, setCustomers] = useState([]);

  const fetchData = async () => {
    const cats = await apiServiceGet("categorias", "");
    const prods = await apiServiceGet("productos", "");
    const sups = await apiServiceGet("proveedores", "");
    const custs = await apiServiceGet("clientes", "");

    setCategories(cats);
    setProducts(prods);
    setSuppliers(sups);
    setCustomers(custs);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* MOSTRAR LAS CATEGORIAS DISPONIBLES */}
      <div className="page-wrapper">
        <div className="container-xl">
          <div className="row row-cards">
            {categorias.length <= 0 ? (
              <div className="col-12 text-center mt-3">
                No hay categorias disponibles
              </div>
            ) : (
              categorias.map((category) => (
                <ShopCategories
                  key={category.id}
                  category={category}
                  products={products}
                  suppliers={suppliers}
                  setProductsCart={setProductsCart}
                  productsCart={productsCart}
                />
              ))
            )}
          </div>
        </div>

        {/* VENTANA DEL CARRITO DE COMPRAS */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasEnd"
          aria-labelledby="offcanvasEndLabel"
        >
          <div className="offcanvas-header">
            <h2 className="offcanvas-title" id="offcanvasEndLabel">
              Tu Pedido
            </h2>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {/* PRODUCTOS DEL CARRITO DE COMPRAS */}
            {productsCart.length <= 0 ? (
              <div className="col-12 text-center mt-3">
                No hay categorias disponibles
              </div>
            ) : (
              <>
                {productsCart.map((productBuy, id) => (
                  <ShopCart
                    productBuy={productBuy}
                    key={id}
                    setProductsCart={setProductsCart}
                    productsCart={productsCart}
                  />
                ))}
                <div className="mt-3">
                  <button
                    className="btn btn-primary w-100"
                    type="button"
                    data-bs-dismiss="offcanvas"
                    onClick={() => setShowModal(true)}
                  >
                    Realizar pedido
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <BuyModal
        show={showModal}
        closeModal={closeModal}
        productsCart={productsCart}
        fetchData={fetchData}
      />
    </>
  );
};
