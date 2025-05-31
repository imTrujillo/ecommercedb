import React, { useEffect, useState } from "react";
import { apiServicePost } from "../apiService/apiService";

export const BuyModal = ({ show, closeModal, productCart, fetchData }) => {
  const [customerData, setCustomerData] = useState({
    NombreCliente: "",
    Teléfono: "",
    Email: "",
    Dirección: "",
  });

  const [orderData, setOrderData] = useState({
    Fecha: new Date().toISOString(),
    Estado: "Pendiente",
    MetodoPago: "",
    DireccionEnvio: "",
    IDCliente: customerData.IDCliente,
  });

  const [orderDetailsData, setOrderDetailsData] = useState([]);
  useEffect(() => {
    if (Array.isArray(productCart)) {
      const detalles = productCart.map((product) => ({
        Cantidad: 1,
        PrecioUnitario: product.Precio,
        ProductoID: product.IDProducto,
      }));
      setOrderDetailsData(detalles);
    }
  }, [productCart]);

  const handleChangeCustomer = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeOrder = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const clienteResponse = await apiServicePost("customers", customerData);
    const clienteID = clienteResponse.IDCliente;

    const ordenResponse = await apiServicePost("orders", {
      ...orderData,
      IDCliente: clienteID,
    });
    const pedidoID = ordenResponse.IDPedido;

    for (const detalle of orderDetailsData) {
      await apiServicePost("order_details", {
        ...detalle,
        PedidoID: pedidoID,
      });
    }

    closeModal();
    setCustomerData({
      NombreCliente: "",
      Telefono: "",
      Email: "",
      Direccion: "",
    });
    setOrderData({
      Fecha: new Date().toISOString(),
      Estado: "Pendiente",
      MetodoPago: "",
      DireccionEnvio: "",
      IDCliente: null,
    });
    setOrderDetailsData([]);
    fetchData();
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block show fade modal-blur"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="hidden"
            name="ClienteID"
            value={orderData.PedidoID}
          ></input>

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
                    onChange={handleChangeCustomer}
                    className="form-control"
                    value={customerData.NombreCliente}
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
                    value={customerData.Teléfono}
                    onChange={handleChangeCustomer}
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
                    value={customerData.Email}
                    onChange={handleChangeCustomer}
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
                    value={orderData.MetodoPago}
                    onChange={handleChangeOrder}
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
                    value={customerData.Dirección}
                    onChange={handleChangeCustomer}
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
                    value={orderData.DireccionEnvio}
                    onChange={handleChangeOrder}
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
