import { IconPencil, IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Show = ({ openProductsModal, order, index, onEdit, onDelete }) => {
  dayjs.extend(relativeTime);
  let bullet_color_status = "";
  let status = "";
  switch (order.status) {
    case 1:
      bullet_color_status = "bg-green text-blue-fg";
      status = "Entregado";
      break;
    case 2:
      bullet_color_status = "bg-blue text-orange-fg";
      status = "Empaquetado";
      break;
    case 3:
      bullet_color_status = "bg-orange text-orange-fg";
      status = "En proceso";
      break;
    case 4:
      bullet_color_status = "bg-red text-orange-fg";
      status = "Cancelado";
      break;
    default:
      bullet_color_status = "bg-muted text-orange-fg";
      status = "Desconocido";
      break;
  }

  return (
    <tr>
      <td data-label="IDPedido">
        <div className="d-flex py-1 align-items-center">
          <span>{index}</span>
        </div>
      </td>
      <td data-label="Fecha">
        <div className="font-weight-medium">
          {dayjs(order.date).format(" MMMM D, YYYY. h:mm a")}
        </div>
      </td>

      <td className="text-secondary" data-label="Estado">
        <span className={`badge ${bullet_color_status} w-max`}>{status}</span>
      </td>

      <td className="text-secondary markdown" data-label="Productos">
        <button
          onClick={() => openProductsModal(order.details)}
          className="btn btn-action"
        >
          Mostrar ↓
        </button>
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
                onClick={() => onDelete(order.orderId)}
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
