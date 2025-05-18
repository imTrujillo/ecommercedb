import React, { useEffect, useState } from "react";

export const BuyModal = ({
  show,
  closeModal,
  customer,
  orderDetail,
  order,
}) => {
  const [formData, setFormData] = useState({
    //DATOS DEL CLIENTE
    IDCliente: 0,
    NombreCliente: "",
    Teléfono: "",
    Email: "",
    Dirección: "",

    //DATOS DEL PEDIDO
    Fecha: "",
    Estado: "",
    MetodoPago: "",
    DireccionEnvio: "",

    //DETALLES DEL PEDIDO
    Cantidad: 0,
    PrecioTotalProductos: 0,
  });

  useEffect(() => {
    if (customer) {
      setFormData((prev) => ({ ...prev, ...customer }));
    }
    if (order) {
      setFormData((prev) => ({ ...prev, ...order }));
    }
    if (orderDetail) {
      setFormData((prev) => ({ ...prev, ...orderDetail }));
    }
  }, [customer, order, orderDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block show fade modal-blur"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="ClienteID" value={order.PedidoID}></input>

          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Pedido</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label required">Nombre</label>
                  <input
                    type="text"
                    name="NombreCliente"
                    onChange={handleChange}
                    className="form-control"
                    value={formData.NombreCliente}
                    placeholder="Juan Pérez"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label required">Teléfono</label>
                  <input
                    type="text"
                    name="Teléfono"
                    className="form-control"
                    placeholder="+503 0000 0000"
                    value={formData.Teléfono}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-5">
                  <label className="form-label required">Email</label>
                  <input
                    type="email"
                    name="Email"
                    className="form-control"
                    value={formData.Email}
                    onChange={handleChange}
                    placeholder="example@example.com"
                    required
                  />
                </div>
                <div className="col-7">
                  <label className="form-label required">Método de pago</label>
                  <input
                    type="text"
                    name="MetodoPago"
                    className="form-control"
                    placeholder="Efectivo"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                    value={formData.MetodoPago}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label required">Dirección</label>
                  <textarea
                    type="text"
                    name="Dirección"
                    className="form-control"
                    value={formData.Dirección}
                    onChange={handleChange}
                    placeholder="Ubicación de la residencia del cliente"
                    required
                  ></textarea>
                </div>
                <div className="col-6">
                  <label className="form-label required">
                    Dirección de envío
                  </label>
                  <textarea
                    type="text"
                    name="DireccionEnvio"
                    className="form-control"
                    placeholder="Ubicación de la recepción de pedido"
                    value={formData.DireccionEnvio}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" onClick={closeModal}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
