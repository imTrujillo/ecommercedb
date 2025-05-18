import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const Show = ({ order, onEdit, onDelete }) => {
  var bullet_color = "";
  switch (order.Estado) {
    case "Realizado":
      bullet_color = "bg-blue text-blue-fg";
      break;
    case "Pendiente":
      bullet_color = "bg-orange text-orange-fg";
      break;
  }
  return (
    <tr>
      <td data-label="IDPedido">
        <div className="d-flex py-1 align-items-center">
          <span>{order.IDPedido}</span>
        </div>
      </td>
      <td data-label="Fecha">
        <div className="font-weight-medium">{order.Fecha}</div>
      </td>
      <td className="text-secondary" data-label="Role">
        <span className={`badge ${bullet_color} w-max`}>{order.Estado}</span>
      </td>
      <td className="text-secondary" data-label="Role">
        {order.MetodoPago}
      </td>
      <td className="text-secondary" data-label="Role">
        {order.DireccionEnvio}
      </td>
      <td className="text-secondary" data-label="Role">
        {order.Cliente}
      </td>
      <td className="text-secondary" data-label="Role">
        $ {order.PrecioTotal}
      </td>
      <td className="text-secondary markdown" data-label="Role">
        {order.Productos.map((product) => (
          <li key={product.IDProducto}>
            {product.NombreProducto}, {product.Cantidad} unidades, $
            {product.PrecioUnitario}
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
                onClick={() => onDelete(order)}
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
