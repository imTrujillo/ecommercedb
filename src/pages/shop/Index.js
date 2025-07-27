import React, { useEffect, useState } from "react";
import { ShopCategories } from "../../components/shopping/ShopCategories";
import { BuyModal } from "../../components/modals/BuyModal";
import { ShopCart } from "../../components/shopping/ShopCart";
import { apiServiceGet } from "../../API/apiService";

export const Index = () => {
  // CARGAR CARRITO DESDE SESSIONSTORAGE
  const [productsCart, setProductsCart] = useState(() => {
    const storedCart = sessionStorage.getItem("productsCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // GUARDAR CARRITO EN SESSIONSTORAGE CADA VEZ QUE CAMBIA
  useEffect(() => {
    sessionStorage.setItem("productsCart", JSON.stringify(productsCart));
  }, [productsCart]);

  //MODAL PARA EL PROCESO DE COMPRA
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  //LLAMAR APIS PARA TIENDA
  const [categorias, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [customers, setCustomers] = useState([]);

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
      <div className="page-wrapper">
        <div className="container-xl">
          <div className="row row-cards">
            {categorias.length <= 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center m-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48" // más grande
                  height="48" // más grande
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mb-2"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-2 10.66h-6l-.117 .007a1 1 0 0 0 0 1.986l.117 .007h6l.117 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-5.99 -5l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm6 0l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" />
                </svg>
                <span className="fw-semibold">
                  No hay categorías disponibles
                </span>
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

        {/* CARRITO DE COMPRAS */}
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
            {productsCart.length <= 0 ? (
              <div className="col-12 text-center mt-3">¡Carrito Vacío!</div>
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

                {/* TOTAL DEL CARRITO */}
                <div className="p-3 text-end">
                  <h4>
                    Total: ${" "}
                    {productsCart
                      .reduce((acc, item) => {
                        const quantity = item.quantity ?? 1;
                        return acc + item.precio * quantity;
                      }, 0)
                      .toFixed(2)}
                  </h4>
                </div>

                {/* HACER PEDIDO */}
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
        setProductsCart={setProductsCart}
        fetchData={fetchData}
        customers={customers}
      />
    </>
  );
};
