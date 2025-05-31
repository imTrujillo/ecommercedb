import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const Show = ({ category, onEdit, onDelete }) => {
  return (
    <tr>
      <td data-label="IDCategory">
        <div className="d-flex py-1 align-items-center">
          <span>{category.IDCategoria}</span>
        </div>
      </td>
      <td data-label="NombreCategoria">
        <div className="font-weight-medium">{category.NombreCategoria}</div>
      </td>
      <td className="text-secondary" data-label="Role">
        {category.Descripción}
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
                onClick={() => onEdit(category)}
              >
                <IconPencil />
                Editar
              </button>
              <button
                className="dropdown-item text-danger"
                onClick={() => onDelete(category.IDCategoria)}
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
