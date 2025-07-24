import React, { useEffect, useState } from "react";
import { ShopCategories } from "../../components/ShopCategories";
import { BuyModal } from "../../components/BuyModal";
import { ShopCart } from "../../components/ShopCart";
import { apiServiceGet } from "../../apiService/apiService";

export const Index = () => {
  // CARGAR CARRITO DESDE LOCALSTORAGE
  const [productsCart, setProductsCart] = useState(() => {
    const storedCart = localStorage.getItem("productsCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // GUARDAR CARRITO EN LOCALSTORAGE CADA VEZ QUE CAMBIA
  useEffect(() => {
    localStorage.setItem("productsCart", JSON.stringify(productsCart));
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
        fetchData={fetchData}
        customers={customers}
      />
    </>
  );
};
