import React from "react";
import photo from "../../assets/images/producto.jpg";

export const ShopCart = ({ productBuy, setProductsCart }) => {
  // BORRAR UN PRODUCTO DEL CARRITO
  const deleteProduct = (productDelete) => {
    setProductsCart((prev) => prev.filter((p) => p.id !== productDelete.id));
  };

  // ACTUALIZAR CANTIDAD DE UN PRODUCTO
  const updateQuantity = (id, value) => {
    if (value >= 1) {
      setProductsCart((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            const newQuantity = Math.min(Math.max(value, 1), p.stock);
            return { ...p, quantity: newQuantity };
          }
          return p;
        })
      );
    }
  };

  // Valor de cantidad (si no está definido, usa 1 por defecto)
  const quantity = productBuy.quantity ?? 1;

  return (
    <div className="card">
      <div className="row row-0">
        <div className="col-3 my-auto">
          <img src={photo} alt={productBuy.name} />
        </div>
        <div className="col">
          <div className="card-body">
            <h5>{productBuy.providerName}</h5>
            <h3 className="card-title">{productBuy.name}</h3>
            <p className="text-secondary">{productBuy.description}</p>
            <strong>$ {(productBuy.price * quantity).toFixed(2)}</strong>
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
            step="1"
            value={quantity}
            onChange={(e) =>
              updateQuantity(productBuy.id, Number(e.target.value))
            }
          />
        </div>
      </div>
    </div>
  );
};
