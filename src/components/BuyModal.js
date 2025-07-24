import React, { useEffect, useState } from "react";
import { apiServiceGet, apiServicePost } from "../apiService/apiService";
import { toast } from "react-toastify";

export const BuyModal = ({
  show,
  closeModal,
  productsCart,
  fetchData,
  customers,
}) => {
  const [customerData, setCustomerData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  const [orderDetailsData, setOrderDetailsData] = useState([]);

  const [orderData, setOrderData] = useState({
    fecha: new Date(),
    estado: "Pendiente",
    metodoPago: "",
    direccionEnvio: "",
    clienteId: null,
    detalles: [],
  });

  const handleChangeCustomer = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeOrder = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const detalles = Array.isArray(productsCart)
        ? productsCart.map((product) => ({
            cantidad: product.quantity ? product.quantity : 1,
            precioUnitario: product.precio,
            productoId: product.id,
          }))
        : [];

      if (detalles.length <= 0) {
        toast.error("No hay productos en el carrito.");
        return;
      }

      const clienteExistente = customers.find(
        (c) => c.email === customerData.email
      );

      let clienteResponse;

      if (!clienteExistente) {
        clienteResponse = await apiServicePost("clientes", customerData);
      } else {
        clienteResponse = clienteExistente;
      }

      const clienteID = clienteResponse.id;

      const pedidoPayload = {
        ...orderData,
        clienteId: clienteID,
        detalles: detalles,
      };
      console.log("payload a enviar:", pedidoPayload);

      const ordenResponse = await apiServicePost(
        "pedidos/crear-con-detalles",
        pedidoPayload
      );

      if (ordenResponse) {
        toast.success("¡Pedido registrado con éxito!");
        closeModal();
        fetchData();
        // Reset
        setCustomerData({
          nombre: "",
          telefono: "",
          email: "",
          direccion: "",
        });
        setOrderData({
          fecha: new Date(),
          estado: "Pendiente",
          metodoPago: "",
          direccionEnvio: "",
          clienteId: null,
          detalles: [],
        });
        setOrderDetailsData([]);
      } else {
        toast.error("Error al crear el pedido. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error en el envío del pedido:", error);
      toast.error("Ocurrió un error al registrar el pedido.");
    }
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
                    name="nombre"
                    onChange={handleChangeCustomer}
                    className="form-control"
                    value={customerData.nombre}
                    placeholder="Juan Pérez"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label required">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    className="form-control"
                    placeholder="+503 0000 0000"
                    value={customerData.telefono}
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
                    name="email"
                    className="form-control"
                    value={customerData.email}
                    onChange={handleChangeCustomer}
                    placeholder="example@example.com"
                    required
                  />
                </div>
                <div className="col-7">
                  <label className="form-label required">Método de pago</label>
                  <input
                    type="text"
                    name="metodoPago"
                    className="form-control"
                    placeholder="Efectivo"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                    value={orderData.metodoPago}
                    onChange={handleChangeOrder}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label required">Dirección</label>
                  <textarea
                    name="direccion"
                    className="form-control"
                    value={customerData.direccion}
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
                    name="direccionEnvio"
                    className="form-control"
                    placeholder="Ubicación de la recepción de pedido"
                    value={orderData.direccionEnvio}
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
