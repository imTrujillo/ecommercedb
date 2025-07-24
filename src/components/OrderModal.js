import React, { useEffect, useState } from "react";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import {
  apiServiceGet,
  apiServicePost,
  apiServiceUpdate,
} from "../apiService/apiService";
import { DateTimePicker } from "@progress/kendo-react-dateinputs";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import { toast } from "react-toastify";

export const OrderModal = ({
  show,
  closeModal,
  isEdit,
  order,
  fetchData,
  products,
  customers,
}) => {
  const [orderData, setOrderData] = useState({
    fecha: new Date(),
    estado: "Pendiente",
    metodoPago: "",
    direccionEnvio: "",
    clienteId: null,
    detalles: [],
  });
  const [orderProducts, setOrderProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    if (show && isEdit && order) {
      setOrderData({
        id: order.id,
        fecha: new Date(order.fecha),
        estado: order.estado,
        metodoPago: order.metodoPago,
        direccionEnvio: order.direccionEnvio,
        clienteId: order.clienteId,
        detalles: order.detalles,
      });

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
      setSelectedProductId("");
    } else if (show && !isEdit) {
      setOrderData({
        fecha: new Date(),
        estado: "Pendiente",
        metodoPago: "",
        direccionEnvio: "",
        clienteId: null,
        detalles: [],
      });
      setOrderProducts([]);
      setSelectedProductId("");
    }
  }, [show, isEdit, order, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    setOrderData((prev) => ({ ...prev, fecha: e.value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const productoID = parseInt(selectedProductId);
    if (isNaN(productoID)) return;

    const prod = products.find((p) => p.id === productoID);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const detalles = orderProducts;

    if (detalles.length <= 0) {
      toast.error("No hay productos guardados.");
      return;
    }

    const fullOrder = {
      ...orderData,
      detalles,
    };

    console.log(fullOrder);
    let orderResponse;
    if (!isEdit) {
      orderResponse = await apiServicePost(
        "pedidos/crear-con-detalles",
        fullOrder
      );
    } else {
      orderResponse = await apiServiceUpdate(
        `pedidos/update/${fullOrder.id}`,
        fullOrder
      );
    }

    if (orderResponse) {
      if (isEdit) {
        toast.success("¡Pedido actualizado con éxito!");
      } else {
        toast.success("¡Pedido registrado con éxito!");
      }

      setOrderData({
        fecha: new Date(),
        estado: "Pendiente",
        metodoPago: "",
        direccionEnvio: "",
        clienteId: null,
        id: 0,
        detalles: [],
      });
      setOrderProducts([]);
      fetchData();
      closeModal();
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
                      value={orderData.fecha}
                      onChange={handleDateChange}
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
                  <label className="form-label required">Cliente</label>
                  <select
                    name="clienteId"
                    className="form-select"
                    value={orderData.clienteId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un cliente</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {isEdit ? (
                  <div className="col-6">
                    <label className="form-label required">Estado</label>
                    <select
                      name="estado"
                      className="form-select"
                      value={orderData.estado}
                      onChange={handleChange}
                      required
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Realizado">Realizado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {/* Método de pago y dirección */}
              <div className="row mb-3">
                <div className="col-5">
                  <label className="form-label required">Método de Pago</label>
                  <input
                    type="text"
                    name="metodoPago"
                    placeholder="Efectivo"
                    className="form-control"
                    value={orderData.metodoPago}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-7">
                  <label className="form-label required">
                    Dirección de Envío
                  </label>
                  <textarea
                    name="direccionEnvio"
                    className="form-control"
                    placeholder="Av. Bernal"
                    value={orderData.direccionEnvio}
                    onChange={handleChange}
                    required
                  />
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
                              {(prod.cantidad * prod.precioUnitario).toFixed(2)}
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
      </div>
    </div>
  );
};
