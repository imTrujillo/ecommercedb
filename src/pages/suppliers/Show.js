import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const Show = ({ supplier, onEdit, onDelete }) => {
  return (
    <tr>
      <td data-label="IDProveedor">
        <div className="d-flex py-1 align-items-center">
          <span>{supplier.IDProveedor}</span>
        </div>
      </td>
      <td data-label="NombreProveedor">
        <div className="font-weight-medium">{supplier.NombreProveedor}</div>
      </td>
      <td className="text-secondary" data-label="Role">
        {supplier.Teléfono}
      </td>
      <td className="text-secondary" data-label="Role">
        {supplier.Email}
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
