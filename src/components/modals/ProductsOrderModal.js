import React, { useState } from "react";
import PaginationControl from "../../assets/PaginationControl";

export const ProductsOrderModal = ({
  show,
  closeProductsModal,
  orderDetails,
  products,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(orderDetails.length / rowsPerPage);

  const visibleData = orderDetails.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (!show) return null;

  return (
    <div
      className="modal d-block show fade modal-blur"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg">
        {/* MODAL PARA MOSTRAR PRODUCTOS DE UN PEDIDO */}
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Lista de Productos</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeProductsModal}
            ></button>
          </div>
          <div className="modal-body">
            <div class="table-responsive">
              <table class="table table-vcenter card-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleData.map((detail) => {
                    const product = products.find(
                      (p) => p.id === detail.productoId
                    );
                    return (
                      <tr key={detail.id}>
                        <td>
                          {product ? product.nombre : "Producto no encontrado"}
                        </td>
                        <td class="text-secondary">
                          {detail.cantidad}{" "}
                          {detail.cantidad == 1 ? "unidad" : "unidades"}
                        </td>
                        <td class="text-secondary">${detail.precioUnitario}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <PaginationControl
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
