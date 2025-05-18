import React from "react";
import photo from "../assets/images/producto.jpg";

export const ShopCart = ({ productBuy, setProducts }) => {
  //BORRAR UN PRODUCT DEL CARRITO
  const deleteProduct = (product) => {
    setProducts((prev) =>
      prev.filter((p) => p.IDProducto !== product.IDProducto)
    );
  };

  //ACTUALIZAR CANTIDAD DE UN PRODUCTO DENTRO DEL CARRITO DE COMPRAS
  const updateCantidad = (id, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.IDProducto === id ? { ...p, Cantidad: Number(value) } : p
      )
    );
  };
  return (
    <div className="card">
      <div className="row row-0">
        <div className="col-3 my-auto">
          <img src={photo} alt={productBuy.NombreProducto} />
        </div>
        <div className="col">
          <div className="card-body">
            <h5>{productBuy.Proveedor}</h5>
            <h3 className="card-title">{productBuy.NombreProducto}</h3>
            <p className="text-secondary">{productBuy.Descripción}</p>
            <strong>
              $ {(productBuy.Precio * productBuy.Cantidad).toFixed(2)}
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
            min="0"
            step="0"
            value={productBuy.Cantidad}
            onChange={(e) =>
              updateCantidad(productBuy.IDProducto, e.target.value)
            }
          ></input>
        </div>
      </div>
    </div>
  );
};
