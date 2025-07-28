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
  const [productos, setProducts] = useState([]);
  const [proveedores, setSuppliers] = useState([]);
  const [clientes, setCustomers] = useState([]);

  const fetchData = async () => {
    const cats = await apiServiceGet("Categorias", "");
    const prods = await apiServiceGet("Productos", "");
    const sups = await apiServiceGet("Proveedores", "");
    const custs = await apiServiceGet("Clientes", "");

    setCategories(cats);
    setProducts(prods);
    setSuppliers(sups);
    setCustomers(custs);
  };
  useEffect(() => {
    fetchData();
  }, []);

  //DATOS EsTATICOS
  // const categorias = [
  //   {
  //     id: 1,
  //     NombreCategoría: "Motocicletas",
  //     Descripción: "Una aventura sobre ruedas",
  //     Productos: [
  //       {
  //         IDProducto: "1",
  //         NombreProducto: "Moto 1",
  //         Descripción: "Descripción de prueba",
  //         Precio: 999.99,
  //         Stock: 23,
  //         Cantidad: 1,
  //         CategoriaID: 1,
  //         ProveedorID: 1,
  //         Proveedor: "YAMAHA",
  //       },
  //       {
  //         IDProducto: "2",
  //         NombreProducto: "Moto 2",
  //         Descripción: "Descripción de prueba",
  //         Precio: 1000.99,
  //         Stock: 2,
  //         Cantidad: 1,
  //         CategoriaID: 1,
  //         ProveedorID: 2,
  //         Proveedor: "KOMODO",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     NombreCategoría: "Cocina",
  //     Descripción: "Para los amantes a la cocina",
  //     Productos: [
  //       {
  //         IDProducto: "3",
  //         NombreProducto: "Cacerola",
  //         Descripción: "Descripción de prueba",
  //         Precio: 9.99,
  //         Stock: 99,
  //         Cantidad: 1,
  //         CategoriaID: 2,
  //         ProveedorID: 3,
  //         Proveedor: "Nestle",
  //       },
  //       {
  //         IDProducto: "4",
  //         NombreProducto: "Pan",
  //         Descripción: "Descripción de prueba",
  //         Precio: 1.99,
  //         Stock: 23,
  //         CategoriaID: 2,
  //         ProveedorID: 3,
  //         Proveedor: "Nestle",
  //       },
  //       {
  //         IDProducto: "5",
  //         NombreProducto: "Sabritas",
  //         Descripción: "Descripción de prueba",
  //         Precio: 0.5,
  //         Stock: 60,
  //         CategoriaID: 2,
  //         ProveedorID: 4,
  //         Proveedor: "Diana",
  //       },
  //       {
  //         IDProducto: "6",
  //         NombreProducto: "Pan Tostado",
  //         Descripción: "Descripción de prueba",
  //         Precio: 10.99,
  //         Stock: 2,
  //         CategoriaID: 2,
  //         ProveedorID: 4,
  //         Proveedor: "Ulala",
  //       },
  //       {
  //         IDProducto: "7",
  //         NombreProducto: "Remolacha",
  //         Descripción: "Descripción de prueba",
  //         Precio: 0.2,
  //         Stock: 100,
  //         CategoriaID: 2,
  //         ProveedorID: 5,
  //         Proveedor: "Doña Flora",
  //       },
  //     ],
  //   },
  // ];

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
                  productos={productos}
                  proveedores={proveedores}
                  category={category}
                  setProductsCart={setProductsCart}
                  key={category.id}
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
