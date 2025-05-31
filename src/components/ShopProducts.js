import React from "react";
import { toast } from "react-toastify";
import photo from "../assets/images/producto.jpg";
import { IconReportMoney } from "@tabler/icons-react";

const ShopProducts = ({ product, setProductsCart, suppliers }) => {
  const handleProduct = (product) => {
    toast("¡Su producto fue agregado!");
    setProductsCart((prev) => [...prev, product]);
  };
  const supplier = suppliers.filter(
    (supplier) => supplier.IDProveedor === product.IDProveedor
  );

  return (
    <div className="card w-100">
      <img
        src={photo}
        alt={product.NombreProducto}
        loading="lazy"
        className="w-100"
      />
      <div className="card-body">
        <p className="text-secondary">{supplier.NombreProveedor}</p>
        <h3 className="card-title">{product.NombreProducto}</h3>
        <p className="text-secondary">{product.Descripción}</p>
        <h5>$ {product.Precio.toFixed(2)}</h5>
        <button
          className="btn btn-primary"
          onClick={() => handleProduct(product)}
        >
          <IconReportMoney className="me-3" /> Agregar al carrito
        </button>
      </div>
    </div>
  );
};
export default ShopProducts;
