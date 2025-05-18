import React, { useEffect, useState } from "react";
import { IconCalendar, IconPlus } from "@tabler/icons-react";

export const OrderModal = ({ show, closeModal, isEdit, order }) => {
  //CREAR EL FORM DATA QUE SE ENVIARÍA A LA API
  const [formData, setFormData] = useState({
    IDPedido: 0,
    Fecha: "",
    Estado: "",
    MetodoPago: "",
    DireccionEnvio: "",
    Cliente: "",
    PrecioTotal: 0.0,
    Productos: [],
    ClienteID: 0,
  });
  //DEFINIR LOS PRODUCTOS QUE TENDRIA EL PEDIDO
  const [product, setProduct] = useState({
    ProductoID: "",
    NombreProducto: "",
    Cantidad: 1,
    PrecioUnitario: 0.0,
  });

  useEffect(() => {
    if (order) {
      setFormData(order);
    }
  }, [order]);

  // MANEJAR LOS CAMBIOS DE LOS INPUTS DEL FORM
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    // Definimos los productos disponibles con sus precios
    const productoSeleccionado = {
      1: { NombreProducto: "Producto1", Cantidad: 1, PrecioUnitario: 10.0 },
      2: { NombreProducto: "Producto2", Cantidad: 1, PrecioUnitario: 20.0 },
      3: { NombreProducto: "Producto3", Cantidad: 1, PrecioUnitario: 30.0 },
    };
    const seleccionado = productoSeleccionado[value] || {
      NombreProducto: "",
      PrecioUnitario: 0.0,
    };
    setProduct((prev) => ({
      ...prev,
      [name]: value,
      NombreProducto: seleccionado.NombreProducto,
      PrecioUnitario: seleccionado.PrecioUnitario,
    }));
  };

  //AGREGAR PRODUCTOS AL PEDIDO
  const handleAddProduct = (e) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      Productos: [...prev.Productos, { ...product }],
    }));
  };

  //MANEJAR CANTIDAD DE PRODUCTOS A AGREGAR
  const handleChangeCantidad = (index, value) => {
    const updated = [...formData.Productos];
    updated[index].Cantidad = parseInt(value);
    setFormData((prev) => ({
      ...prev,
      Productos: updated,
    }));
  };

  const handleDeleteProduct = (index) => {
    //AQUí IRíA LA PETiCIÓN PARA LA API
    const filtered = formData.Productos.filter((_, idx) => idx !== index);
    setFormData((prev) => ({
      ...prev,
      Productos: filtered,
    }));
  };

  //ENVIAR EL FORMULARIO
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
          {isEdit ? (
            <input type="hidden" name="IDPedido" value={order.IDPedido}></input>
          ) : (
            ""
          )}

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
              <div className="row mb-3">
                <div className="col-4">
                  <label className="form-label required">Fecha</label>

                  <div className="mb-2 input-icon">
                    <input
                      className="form-control"
                      placeholder="Selecciona una fecha"
                      id="datepicker-icon"
                      value={formData.Fecha}
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
                    onChange={handleChange}
                    className="form-select"
                    value={formData.ClienteID}
                    required
                  >
                    <option value="" disabled>
                      Selecciona un cliente
                    </option>
                    <option value="1" disabled>
                      Martin
                    </option>
                    <option value="2" disabled>
                      Santi
                    </option>
                    <option value="3" disabled>
                      Luis
                    </option>
                  </select>
                </div>

                <div className="col-4">
                  <label className="form-label required">Estado</label>
                  <select
                    name="Estado"
                    onChange={handleChange}
                    className="form-select"
                    value={formData.Estado}
                    required
                  >
                    <option value="" disabled>
                      Selecciona un estado
                    </option>
                    <option value="Pendiente" disabled>
                      Pendiente
                    </option>
                    <option value="Realizado" disabled>
                      Realizado
                    </option>
                    <option value="Cancelado" disabled>
                      Cancelado
                    </option>
                  </select>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-5">
                  <label className="form-label required">Método de Pago</label>
                  <input
                    type="text"
                    name="MetodoPago"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Efectivo"
                    value={formData.MetodoPago}
                    required
                  />
                </div>

                <div className="col-7">
                  <label className="form-label required">
                    Dirección del envío
                  </label>
                  <textarea
                    type="text"
                    name="DireccionEnvio"
                    className="form-control"
                    placeholder="Av. Bernal"
                    value={formData.DireccionEnvio}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <h2 className="modal-title">Lista de Productos</h2>
                <div className="row">
                  <div className="col-8">
                    <select
                      name="ProductoID"
                      onChange={handleProductChange}
                      className="form-select"
                      value={product.ProductoID}
                      required
                    >
                      <option value="" disabled>
                        Selecciona un producto
                      </option>
                      <option value="1">Producto1</option>
                      <option value="2">Producto2</option>
                      <option value="3">Producto3</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={handleAddProduct}
                      className="btn btn-primary"
                    >
                      <IconPlus className="me-3" />
                      Agregar
                    </button>
                  </div>
                </div>
                {formData.Productos.length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-vcenter card-table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Precio Unitario</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.Productos.map((prod, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{prod.NombreProducto}</td>
                            <td>
                              <input
                                className="form-control"
                                type="number"
                                min="0"
                                step="1"
                                value={prod.Cantidad}
                                onChange={(e) =>
                                  handleChangeCantidad(idx, e.target.value)
                                }
                              />
                            </td>
                            <td>
                              {(prod.Cantidad * prod.PrecioUnitario).toFixed(2)}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger rounded-2"
                                onClick={() => handleDeleteProduct(idx)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
