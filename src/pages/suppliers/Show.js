import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const Show = ({ supplier, onEdit, onDelete }) => {
  let bullet_color = "";
  switch (supplier.isActive) {
    case true:
      bullet_color = "bg-blue text-blue-fg";
      break;
    case false:
      bullet_color = "bg-orange text-orange-fg";
      break;
    default:
      bullet_color = "bg-muted text-orange-fg";
      break;
  }

  return (
    <tr>
      <td data-label="id">
        <div className="d-flex py-1 align-items-center">
          <span>{supplier.id}</span>
        </div>
      </td>
      <td data-label="nombre">
        <div className="font-weight-medium">{supplier.name}</div>
      </td>
      <td className="text-secondary" data-label="telefono">
        {supplier.phoneNumber}
      </td>
      <td className="text-secondary" data-label="email">
        {supplier.email}
      </td>
      <td className="text-secondary" data-label="Role">
        <span className={`badge ${bullet_color} w-max`}>
          {supplier.isActive ? "Activo" : "Inactivo"}
        </span>
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
                onClick={() => onEdit(supplier)}
              >
                <IconPencil />
                Editar
              </button>
              <button
                className="dropdown-item text-danger"
                onClick={() => onDelete(supplier)}
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
