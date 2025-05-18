import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { ProductsModal } from "../../components/ProductsModal";
const Show = ({ product, onEdit, onDelete }) => {
  return (
    <tr>
      <td data-label="IDProducto">
        <div className="d-flex py-1 align-items-center">
          <span>{product.IDProducto}</span>
        </div>
      </td>
      <td data-label="NombreProducto">
        <div className="font-weight-medium">{product.NombreProducto}</div>
      </td>
      <td className="text-secondary" data-label="Role">
        {product.Descripción}
      </td>
      <td className="text-secondary" data-label="Role">
        $ {product.Precio}
      </td>
      <td className="text-secondary" data-label="Role">
        {product.Stock}
      </td>
      <td className="text-secondary" data-label="Role">
        {product.Categoria}
      </td>
      <td className="text-secondary" data-label="Role">
        {product.Proveedor}
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
                onClick={() => onDelete(product)}
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
