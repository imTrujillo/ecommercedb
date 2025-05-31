import React from "react";
import { toast } from "react-toastify";
import photo from "../assets/images/producto.jpg";
import { IconReportMoney } from "@tabler/icons-react";

const ShopProducts = ({
  product,
  setProductsCart,
  productsCart,
  suppliers,
}) => {
  const handleProduct = (product) => {
    const alreadyInCart = productsCart.some((item) => item.id === product.id);

    if (alreadyInCart) {
      toast.warning("Este producto ya está en el carrito");
    } else {
      toast.success("¡Producto agregado al carrito!");
      setProductsCart((prev) => [...prev, product]);
    }
  };

  const supplier = suppliers.filter(
    (supplier) => supplier.id === product.id
  );

  return (
    <div className="card w-100">
      <img
        src={photo}
        alt={product.nombre}
        loading="lazy"
        className="w-100"
      />
      <div className="card-body">
        <p className="text-secondary">{supplier.nombre}</p>

        <h3 className="card-title">{product.nombre}</h3>
        <p className="text-secondary">{product.descripcion}</p>
        <h5>$ {product.precio.toFixed(2)}</h5>
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
