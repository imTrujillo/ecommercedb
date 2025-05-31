import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const Show = ({
  order,
  onEdit,
  onDelete,
  orderDetails,
  customers,
  products,
}) => {
  let bullet_color = "";
  switch (order.estado) {
    case "Realizado":
      bullet_color = "bg-blue text-blue-fg";
      break;
    case "Pendiente":
      bullet_color = "bg-orange text-orange-fg";
      break;
    default:
      bullet_color = "bg-muted";
      break;
  }

  const customer = customers.find((c) => c.id === order.clienteId);

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
      <td className="text-secondary" data-label="Estado">
        <span className={`badge ${bullet_color} w-max`}>{order.estado}</span>
      </td>
      <td className="text-secondary" data-label="Método de pago">
        {order.metodoPago}
      </td>
      <td className="text-secondary" data-label="Dirección de envío">
        {order.direccionEnvio}
      </td>
      <td className="text-secondary" data-label="Cliente">
        {customer ? customer.nombre : "Cliente no encontrado"}
      </td>
      <td className="text-secondary markdown" data-label="Productos">
        <ul>
          {orderDetails.map((detail) => {
            const product = products.find((p) => p.id === detail.productoId);
            return (
              <li key={detail.id}>
                {product ? product.nombre : "Producto no encontrado"},{" "}
                {detail.cantidad} unidades, ${detail.precioUnitario}
              </li>
            );
          })}
        </ul>
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
                <IconPencil /> Editar
              </button>
              <button
                className="dropdown-item text-danger"
                onClick={() => onDelete(order.id)}
              >
                <IconTrash /> Eliminar
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Show;
