import React from "react";

export const ProductsOrderModal = ({
  show,
  closeProductsModal,
  orderDetails,
  products,
}) => {
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
                  {orderDetails.map((detail) => {
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
