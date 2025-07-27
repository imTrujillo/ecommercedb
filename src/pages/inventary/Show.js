import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const Show = ({ product, onEdit, onDelete, suppliers, categories }) => {
  const supplier = suppliers.find((s) => s.id === product.proveedorId);

  const category = categories.find((c) => c.id === product.categoriaId);

  return (
    <tr>
      <td data-label="IDProducto">
        <div className="d-flex py-1 align-items-center">
          <span>{product.id}</span>
        </div>
      </td>
      <td data-label="NombreProducto">
        <div className="font-weight-medium">{product.nombre}</div>
      </td>
      <td className="text-secondary" data-label="Role">
        {product.descripcion}
      </td>
      <td className="text-secondary" data-label="Role">
        $ {product.precio}
      </td>
      <td className="text-secondary" data-label="Role">
        {product.stock}
      </td>
      <td className="text-secondary" data-label="Role">
        {category.nombre}
      </td>
      <td className="text-secondary" data-label="Role">
        {supplier.nombre}
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
                onClick={() => onEdit(product)}
              >
                <IconPencil />
                Editar
              </button>
              <button
                className="dropdown-item text-danger"
                onClick={() => onDelete(product.id)}
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
