import React from "react";
import photo from "../assets/images/producto.jpg";

export const ShopCart = ({ productBuy, setProductsCart }) => {
  //BORRAR UN PRODUCT DEL CARRITO
  const deleteProduct = (product) => {
    setProductsCart((prev) => prev.filter((p) => p.id !== product.id));
  };

  //ACTUALIZAR CANTIDAD DE UN PRODUCTO DENTRO DEL CARRITO DE COMPRAS
  const updateCantidad = (id, value) => {
    setProductsCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Number(value) } : p))
    );
  };
  return (
    <div className="card">
      <div className="row row-0">
        <div className="col-3 my-auto">
          <img src={photo} alt={productBuy.nombre} />
        </div>
        <div className="col">
          <div className="card-body">
            <h5>{productBuy.Proveedor}</h5>
            <h3 className="card-title">{productBuy.nombre}</h3>
            <p className="text-secondary">{productBuy.descripcion}</p>
            <strong>
              $ {(productBuy.precio * productBuy.stock).toFixed(2)}
            </strong>
          </div>
        </div>
        <div className="col-2 py-3 pe-3 d-flex flex-column justify-content-between">
          <button
            className="btn btn-danger"
            onClick={() => deleteProduct(productBuy)}
          >
            X
          </button>
          <input
            type="number"
            placeholder="1"
            min="1"
            step="0"
            value={productBuy.stock}
            onChange={(e) => updateCantidad(productBuy.id, e.target.value)}
          ></input>
        </div>
      </div>
    </div>
  );
};
