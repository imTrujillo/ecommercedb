import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const Show = ({ customer, onEdit, onDelete }) => {
  return (
    <tr>
      <td data-label="IDProducto">
        <div className="d-flex py-1 align-items-center">
          <span>{customer.IDCliente}</span>
        </div>
      </td>
      <td data-label="NombreProducto">
        <div className="font-weight-medium">{customer.NombreCliente}</div>
      </td>
      <td className="text-secondary" data-label="Role">
        {customer.Teléfono}
      </td>
      <td className="text-secondary" data-label="Role">
        {customer.Email}
      </td>
      <td className="text-secondary" data-label="Role">
        {customer.Dirección}
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
                onClick={() => onEdit(customer)}
              >
                <IconPencil />
                Editar
              </button>
              <button
                className="dropdown-item text-danger"
                onClick={() => onDelete(customer)}
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
