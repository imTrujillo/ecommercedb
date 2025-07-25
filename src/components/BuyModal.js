import React, { useEffect, useState } from "react";
import { apiServiceGet, apiServicePost } from "../apiService/apiService";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const BuyModal = ({
  show,
  closeModal,
  productsCart,
  setProductsCart,
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

  // VALIDACIONES CON YUP
  const customerSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre es requerido")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
        "No se permiten caracteres especiales"
      ),
    telefono: Yup.string()
      .required("El teléfono es requerido")
      .matches(/^[0-9]+$/, "El teléfono solo debe contener números")
      .length(8, "El teléfono debe contener exactamente 8 dígitos"),
    direccion: Yup.string()
      .min(10, "La dirección debe tener al menos 10 caracteres")
      .required("La dirección es requerida")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "No se permiten caracteres especiales"
      ),
    email: Yup.string()
      .email("Debe ser un correo válido")
      .required("El correo es requerido"),
  });

  const orderSchema = Yup.object().shape({
    metodoPago: Yup.string()
      .min(3, "El método de pago debe tener al menos 3 caracteres")
      .required("El método de pago es requerido")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "No se permiten caracteres especiales"
      ),
    direccionEnvio: Yup.string()
      .min(10, "La dirección de envío debe tener al menos 10 caracteres")
      .required("La dirección de envío es requerida")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "No se permiten caracteres especiales"
      ),
    estado: Yup.string().required("Selecciona un estado"),
    clienteId: Yup.string().required("Selecciona un cliente"),
  });

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

      // Validar el formulario con Yup
      await customerSchema.validate(customerData, { abortEarly: false });

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

      // Validar el formulario con Yup
      await orderSchema.validate(pedidoPayload, { abortEarly: false });

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
        setProductsCart([]);
      } else {
        toast.error("Error al crear el pedido. Intenta nuevamente.");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        if (err.inner.length > 3) {
          toast.error("Formulario incompleto.");
        } else {
          err.inner.forEach((e) => {
            if (e?.message) {
              toast.error(e.message);
            }
          });
        }
      } else {
        console.error("Error al guardar el pedido:", err);
        toast.error("Error al guardar el pedido.");
      }
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
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-5">
                  <label className="form-label required">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={customerData.email}
                    onChange={handleChangeCustomer}
                    placeholder="example@example.com"
                  />
                </div>
                <div className="col-7">
                  <label className="form-label required">Método de pago</label>
                  <input
                    type="text"
                    name="metodoPago"
                    className="form-control"
                    placeholder="Efectivo"
                    value={orderData.metodoPago}
                    onChange={handleChangeOrder}
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
