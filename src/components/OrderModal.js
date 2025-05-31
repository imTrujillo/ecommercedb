import React, { useEffect, useState } from "react";
import { IconCalendar, IconPlus } from "@tabler/icons-react";
import { apiServiceGet, apiServicePost } from "../apiService/apiService";

export const OrderModal = ({
  show,
  closeModal,
  isEdit,
  order,
  fetchData,
  products,
  customers = [],
}) => {
  const [orderData, setOrderData] = useState({
    Fecha: new Date().toISOString(),
    Estado: "Pendiente",
    MetodoPago: "",
    DireccionEnvio: "",
    ClienteID: "",
  });

  const [orderProducts, setOrderProducts] = useState([]);
  const [product, setProduct] = useState({
    ProductoID: "",
    NombreProducto: "",
    Cantidad: 1,
    PrecioUnitario: 0.0,
  });

  useEffect(() => {
    if (isEdit && order) {
      setOrderData({
        Fecha: order.Fecha,
        Estado: order.Estado,
        MetodoPago: order.MetodoPago,
        DireccionEnvio: order.DireccionEnvio,
        ClienteID: order.ClienteID,
      });
      setOrderProducts(order.Productos || []);
    }
  }, [order, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (e) => {
    const productoID = e.target.value;
    const prod = products.find((p) => p.IDProducto === productoID);
    if (prod) {
      setProduct({
        ProductoID: prod.IDProducto,
        NombreProducto: prod.NombreProducto,
        Cantidad: 1,
        PrecioUnitario: prod.Precio,
      });
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setOrderProducts([...orderProducts, product]);
    setProduct({
      ProductoID: "",
      NombreProducto: "",
      Cantidad: 1,
      PrecioUnitario: 0.0,
    });
  };

  const handleChangeCantidad = (index, value) => {
    const updated = [...orderProducts];
    updated[index].Cantidad = parseInt(value);
    setOrderProducts(updated);
  };

  const handleDeleteProduct = (index) => {
    const updated = orderProducts.filter((_, i) => i !== index);
    setOrderProducts(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderResponse = await apiServicePost("orders", orderData);
    const pedidoID = orderResponse.IDPedido;

    for (const producto of orderProducts) {
      await apiServicePost("order_details", {
        PedidoID: pedidoID,
        ProductoID: producto.ProductoID,
        Cantidad: producto.Cantidad,
        PrecioUnitario: producto.PrecioUnitario,
      });
    }

    fetchData();
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
              {/* Fecha, Cliente, Estado */}
              <div className="row mb-3">
                <div className="col-4">
                  <label className="form-label required">Fecha</label>
                  <div className="input-icon mb-2">
                    <input
                      type="date"
                      className="form-control"
                      name="Fecha"
                      value={orderData.Fecha.split("T")[0]}
                      onChange={handleChange}
                    />
                    <span className="input-icon-addon">
                      <IconCalendar />
                    </span>
                  </div>
                </div>
                <div className="col-4">
                  <label className="form-label required">Cliente</label>
                  <select
                    name="ClienteID"
                    className="form-select"
                    value={orderData.ClienteID}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un cliente</option>
                    {customers.map((c) => (
                      <option key={c.IDCliente} value={c.IDCliente}>
                        {c.NombreCliente}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-4">
                  <label className="form-label required">Estado</label>
                  <select
                    name="Estado"
                    className="form-select"
                    value={orderData.Estado}
                    onChange={handleChange}
                    required
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Realizado">Realizado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              {/* Método de pago y dirección */}
              <div className="row mb-3">
                <div className="col-5">
                  <label className="form-label required">Método de Pago</label>
                  <input
                    type="text"
                    name="MetodoPago"
                    className="form-control"
                    value={orderData.MetodoPago}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-7">
                  <label className="form-label required">
                    Dirección de Envío
                  </label>
                  <textarea
                    name="DireccionEnvio"
                    className="form-control"
                    value={orderData.DireccionEnvio}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Productos */}
              <div className="row mb-3">
                <h6 className="mb-2">Lista de Productos</h6>
                <div className="row mb-3">
                  <div className="col-8">
                    <select
                      name="ProductoID"
                      className="form-select"
                      value={product.ProductoID}
                      onChange={handleProductChange}
                    >
                      <option value="">Selecciona un producto</option>
                      {products.map((p) => (
                        <option key={p.IDProducto} value={p.IDProducto}>
                          {p.NombreProducto}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={handleAddProduct}
                      className="btn btn-primary w-100"
                    >
                      <IconPlus className="me-2" /> Agregar
                    </button>
                  </div>
                </div>
                {orderProducts.length > 0 && (
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderProducts.map((prod, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{prod.NombreProducto}</td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              value={prod.Cantidad}
                              onChange={(e) =>
                                handleChangeCantidad(idx, e.target.value)
                              }
                              min="1"
                            />
                          </td>
                          <td>
                            {(prod.Cantidad * prod.PrecioUnitario).toFixed(2)}
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
