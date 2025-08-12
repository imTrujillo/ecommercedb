import React, { useEffect, useState } from "react";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import {
  apiServiceGet,
  apiServicePost,
  apiServiceUpdate,
} from "../../API/apiService";
import { DateTimePicker } from "@progress/kendo-react-dateinputs";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import { toast } from "react-toastify";
import * as Yup from "yup";
import addMonths from "date-fns/addMonths";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input";

export const OrderModal = ({
  show,
  closeModal,
  isEdit,
  order,
  fetchData,
  products,
  customers,
}) => {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [orderProducts, setOrderProducts] = useState([]);

  // VALIDACIONES CON YUP
  const orderSchema = Yup.object().shape({
    fecha: Yup.date()
      .min(new Date(2020, 0, 1), "min 2020")
      .max(addMonths(new Date(), 6), "max 6 meses")
      .required("requerida"),
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
    estado: Yup.string().required("requerido"),
    clienteId: Yup.string().required("requerido"),
  });

  //Utilizar yup para validar formulario
  const methods = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: {
      fecha: "",
      estado: "",
      metodoPago: "",
      direccionEnvio: "",
      clienteId: null,
      detalles: [],
    },
  });

  useEffect(() => {
    if (order) {
      const productosAdaptados = (order.orderDetails || []).map((d) => {
        const producto = products.find((p) => p.id === d.productoId);
        return {
          productoId: d.productoId ?? 0,
          nombre: producto?.nombre ?? "",
          cantidad: d.cantidad ?? 1,
          precioUnitario: d.precioUnitario ?? 0,
        };
      });
      setOrderProducts(productosAdaptados);

      methods.reset({
        id: order.id || 0,
        fecha: new Date(order.fecha) || "",
        estado: order.estado || "",
        metodoPago: order.metodoPago,
        direccionEnvio: order.direccionEnvio || "",
        clienteId: order.clienteId || 0,
        detalles: productosAdaptados || [],
      });
    }
  }, [order, products]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (isNaN(selectedProductId)) return;

    const prod = products.find((p) => p.id === Number(selectedProductId));

    if (prod) {
      if (orderProducts.some((p) => p.productoId === prod.id)) {
        toast("El producto ya fue agregado.");
        return;
      }
      setOrderProducts((prev) => [
        ...prev,
        {
          productoId: prod.id,
          nombre: prod.nombre,
          cantidad: 1,
          precioUnitario: prod.precio,
        },
      ]);

      setSelectedProductId("");
    }
  };

  const handleChangeCantidad = (index, value) => {
    const updated = [...orderProducts];
    updated[index].cantidad = parseInt(value);
    setOrderProducts(updated);
  };

  const handleDeleteProduct = (index) => {
    const updated = orderProducts.filter((_, i) => i !== index);
    setOrderProducts(updated);
  };

  //Envío de los datos a la API
  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (orderProducts.length <= 0) {
        toast.error("No hay productos guardados.");
        return;
      }

      const orderData = {
        ...data,
        detalles: orderProducts,
      };
      let orderResponse;
      if (!isEdit) {
        orderResponse = await apiServicePost(
          "pedidos/crear-con-detalles",
          orderData
        );
      } else {
        orderResponse = await apiServiceUpdate(
          `pedidos/update/${data.id}`,
          orderData
        );
      }

      if (orderResponse) {
        toast.success(
          isEdit
            ? "¡Pedido actualizado con éxito!"
            : "¡Pedido registrado con éxito!"
        );
        closeModal();
        fetchData();
      }
    } catch (err) {
      console.error("Error al guardar empleado:", err);
      toast.error("Error al guardar empleado. Intenta de nuevo.");
    }
  });

  //Datos de cada input
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

  const estadoValidation = {
    id: "estado",
    label: "Estado",
    type: "select",
    options: ["Realizado", "Pendiente", "Cancelado"],
    name: "estado",
  };

  const clienteValidation = (customers) => ({
    id: "clienteId",
    label: "Cliente",
    type: "select",
    options: customers,
    name: "clienteId",
  });

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
                <h5 className="modal-title">
                  {isEdit ? "Editar Pedido" : "Agregar Pedido"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {/* Fecha */}
                <div className="row mb-3">
                  <div>
                    <label className="form-label required">Fecha</label>
                    <fieldset>
                      <DateTimePicker
                        name="fecha"
                        popupSettings={{
                          appendTo: document.querySelector(".modal"),
                        }}
                      />
                    </fieldset>
                  </div>
                </div>

                {/* Cliente, Estado */}
                <div className="row mb-3">
                  <div className={isEdit ? "col-6" : "col-12"}>
                    <Input {...clienteValidation(customers)} />
                  </div>

                  {isEdit && (
                    <div className="col-6">
                      <Input {...estadoValidation} />
                    </div>
                  )}
                </div>

                {/* Método de pago y dirección */}
                <div className="row mb-3">
                  <div className="col-5">
                    <Input {...metodoPagoValidation} />
                  </div>
                  <div className="col-7">
                    <Input {...direccionEnvioValidation} />
                  </div>
                </div>

                {/* Productos */}
                <div className="row mb-3">
                  <h6 className="mt-6 mb-4 fs-2">Lista de Productos</h6>
                  <div className="row mb-3">
                    <div className="col-9">
                      <select
                        name="productoId"
                        className="form-select"
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                      >
                        <option value="">Selecciona un producto</option>
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-3">
                      <button
                        onClick={handleAddProduct}
                        className="btn btn-primary w-100"
                      >
                        <IconPlus className="me-2" /> Agregar
                      </button>
                    </div>
                  </div>
                  <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {orderProducts.length > 0 && (
                      <table className="table table-striped responsive">
                        <thead className="sticky-top">
                          <tr>
                            <th>#</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderProducts.map((prod, idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{prod.nombre}</td>
                              <td style={{ maxWidth: "60px" }}>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={prod.cantidad}
                                  onChange={(e) =>
                                    handleChangeCantidad(idx, e.target.value)
                                  }
                                  min="1"
                                />
                              </td>
                              <td>
                                {(prod.cantidad * prod.precioUnitario).toFixed(
                                  2
                                )}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteProduct(idx)}
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    <div className="text-end fs-4 p-4">
                      <strong>
                        Total: ${" "}
                        {orderProducts
                          .reduce(
                            (acc, p) => acc + p.cantidad * p.precioUnitario,
                            0
                          )
                          .toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEdit ? "Editar" : "Guardar"}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
