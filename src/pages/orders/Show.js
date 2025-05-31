import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const Show = ({ order, onEdit, onDelete, products }) => {
  var bullet_color = "";
  switch (order.Estado) {
    case "Realizado":
      bullet_color = "bg-blue text-blue-fg";
      break;
    case "Pendiente":
      bullet_color = "bg-orange text-orange-fg";
      break;
  }
  const orderProducts = products.filter(
    (product) => product.id === order.productoId
  );
  return (
    <tr>
      <td data-label="IDPedido">
        <div className="d-flex py-1 align-items-center">
          <span>{order.id}</span>
        </div>
      </td>
      <td data-label="Fecha">
        <div className="font-weight-medium">{order.fecha}</div>
      </td>
      <td className="text-secondary" data-label="Role">
        <span className={`badge ${bullet_color} w-max`}>{order.estado}</span>
      </td>
      <td className="text-secondary" data-label="Role">
        {order.metodoPago}
      </td>
      <td className="text-secondary" data-label="Role">
        {order.direccionEnvio}
      </td>
      <td className="text-secondary" data-label="Role">
        {order.cliente}
      </td>
      <td className="text-secondary" data-label="Role">
        $ {order.precioTotal}
      </td>
      <td className="text-secondary markdown" data-label="Role">
        {orderProducts.map((product) => (
          <li key={product.id}>
            {product.nombre}, {product.cantidad} unidades, $
            {product.precioUnitario}
          </li>
        ))}
      </td>
      <td>
        <div className="btn-list flex-nowrap">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle align-text-top"
              data-bs-toggle="dropdown"
            >
              Acciones
            </button>
            <div className="dropdown-menu dropdown-menu-end">
              <button
                className="dropdown-item text-yellow"
                onClick={() => onEdit(order)}
              >
                <IconPencil />
                Editar
              </button>
              <button
                className="dropdown-item text-danger"
                onClick={() => onDelete(order.IDPedido)}
              >
                <IconTrash />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Show;
