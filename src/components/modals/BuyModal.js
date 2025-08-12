import React, { useEffect, useState } from "react";
import { apiServicePost } from "../../API/apiService";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input";

export const BuyModal = ({
  show,
  closeModal,
  productsCart,
  setProductsCart,
  fetchData,
  customers,
}) => {
  // VALIDACIONES CON YUP
  const orderSchema = Yup.object().shape({
    //Validaciones del cliente
    nombre: Yup.string()
      .required("requerido")
      .min(3, "min 3 caracteres")
      .max(100, "max 100 caracteres")
      .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, "solo letras y espacios"),
    telefono: Yup.string()
      .required("requerido")
      .matches(/^[0-9]+$/, "solo números")
      .length(8, "len: 8 dígitos"),
    direccion: Yup.string()
      .required("requerido")
      .min(20, "min 20 caracteres")
      .max(200, "max 200 caracteres")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "sin caracteres especiales"
      ),
    email: Yup.string().email("no válido").required("requerido"),

    //Validaciones del pedido
    metodoPago: Yup.string()
      .min(3, "min 3 caracteres")
      .required("requerido")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "sin caracteres especiales"
      ),
    direccionEnvio: Yup.string()
      .required("requerido")
      .min(20, "min 20 caracteres")
      .max(200, "max 200 caracteres")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "sin caracteres especiales"
      ),
  });

  //Utilizar yup para validar formulario
  const methods = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: {
      //Info del cliente
      nombre: "",
      telefono: "",
      email: "",
      direccion: "",

      //Info del pedido
      fecha: new Date(),
      estado: "Pendiente",
      metodoPago: "",
      direccionEnvio: "",
      clienteId: null,
      detalles: [],
    },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      //Guardar los detalles del pedido
      const detalles = productsCart.map((product) => ({
        cantidad: product.quantity ?? 1,
        precioUnitario: product.precio,
        productoId: product.id,
      }));

      //Confirmar que el carrito no este vació
      if (detalles.length <= 0) {
        toast.error("No hay productos en el carrito.");
        return;
      }

      const CustomerData = {
        nombre: data.nombre,
        telefono: data.telefono,
        email: data.email,
        direccion: data.direccion,
      };

      //Decidir si se creara un cliente o no, para evitar duplicación en la db
      const clienteExistente = customers.find(
        (c) =>
          c.email === CustomerData.email || c.nombre === CustomerData.nombre
      );
      let clienteId;
      if (!clienteExistente) {
        const clienteResponse = await apiServicePost("clientes", CustomerData);
        clienteId = clienteResponse.data.id;
      } else {
        clienteId = clienteExistente.id;
      }

      const OrderData = {
        fecha: new Date(),
        estado: "Pendiente",
        metodoPago: data.metodoPago,
        direccionEnvio: data.direccionEnvio,
        clienteId: clienteId,
        detalles: detalles,
      };

      //Enviar el pedido a la api
      console.log("payload a enviar:", OrderData);
      const ordenResponse = await apiServicePost(
        "pedidos/crear-con-detalles",
        OrderData
      );
      if (ordenResponse) {
        toast.success("¡Pedido registrado con éxito!");
      } else {
        toast.error("Error al crear el pedido. Intenta nuevamente.");
      }
      closeModal();
      fetchData();
    } catch (err) {
      console.error("Error al guardar el pedido:", err);
      toast.error("Error al guardar el pedido. Intenta de nuevo.");
    }
  });

  // Datos de cada input
  const nombreValidation = {
    id: "nombre",
    label: "Nombre",
    type: "text",
    name: "nombre",
    placeholder: "Juan Pérez",
  };

  const telefonoValidation = {
    id: "telefono",
    label: "Teléfono",
    type: "text",
    name: "telefono",
    placeholder: "12345678",
  };

  const emailValidation = {
    id: "email",
    label: "Correo",
    type: "email",
    name: "email",
    placeholder: "email@email.com",
  };

  const direccionValidation = {
    id: "direccion",
    label: "Dirección",
    type: "textarea",
    name: "direccion",
    placeholder: "Ubicación de la residencia del cliente",
  };

  const metodoPagoValidation = {
    id: "metodoPago",
    label: "Método de Pago",
    type: "text",
    name: "metodoPago",
    placeholder: "Efectivo",
  };

  const direccionEnvioValidation = {
    id: "direccionEnvio",
    label: "Dirección de Envío",
    type: "textarea",
    name: "direccionEnvio",
    placeholder: "Ubicación de la recepción de pedido",
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block show fade modal-blur"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg">
        <FormProvider {...methods}>
          <form noValidate onSubmit={onSubmit}>
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
                    <Input {...nombreValidation} />
                  </div>
                  <div className="col-6">
                    <Input {...telefonoValidation} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-5">
                    <Input {...emailValidation} />
                  </div>
                  <div className="col-7">
                    <Input {...metodoPagoValidation} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <Input {...direccionValidation} />
                  </div>
                  <div className="col-6">
                    <Input {...direccionEnvioValidation} />
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
        </FormProvider>
      </div>
    </div>
  );
};
