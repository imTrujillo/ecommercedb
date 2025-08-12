import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const Show = ({ employee, onEdit, onDelete }) => {
  return (
    <tr>
      <td data-label="IDProducto">
        <div className="d-flex py-1 align-items-center">
          <span>{employee.id}</span>
        </div>
      </td>
      <td data-label="nombreProducto">
        <div className="font-weight-medium">{employee.nombreCompleto}</div>
      </td>
      <td className="text-secondary" data-label="Role">
        {employee.nombreUsuario}
      </td>
      <td className="text-secondary" data-label="Role">
        {employee.email}
      </td>
      <td className="text-secondary" data-label="Role">
        {employee.fechaNacimiento}
      </td>
      <td className="text-secondary" data-label="Role">
        {employee.fechaContratacion}
      </td>
      <td className="text-secondary" data-label="Role">
        {employee.nit}
      </td>
      <td className="text-secondary" data-label="Role">
        {employee.direccion}
      </td>
      <td className="text-secondary" data-label="Role">
        ${employee.salario}
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
                onClick={() => onEdit(employee)}
              >
                <IconPencil />
                Editar
              </button>
              <button
                className="dropdown-item text-danger"
                onClick={() => onDelete(employee)}
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
