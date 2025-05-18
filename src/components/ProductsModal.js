import React, { useEffect, useState } from "react";

export const ProductsModal = ({ show, closeModal, isEdit, product }) => {
  const [formData, setFormData] = useState({
    IDProducto: "",
    NombreProducto: "",
    Descripción: "",
    Precio: 0.0,
    Stock: 0,
    CategoriaID: 0,
    ProveedorID: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

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
          {isEdit ? (
            <input
              type="hidden"
              name="IDProducto"
              value={product.IDProducto}
            ></input>
          ) : (
            ""
          )}

          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Editar Producto" : "Agregar Producto"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-5">
                  <label className="form-label required">Nombre</label>
                  <input
                    type="text"
                    name="NombreProducto"
                    onChange={handleChange}
                    className="form-control"
                    value={formData.NombreProducto}
                    placeholder="Producto 01"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                    required
                  />
                </div>
                <div className="col-7">
                  <label className="form-label required">Descripción</label>
                  <textarea
                    type="text"
                    name="Descripción"
                    className="form-control"
                    placeholder="Descripción del Producto 01"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                    value={formData.Descripción}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label required">Precio</label>
                  <input
                    type="number"
                    name="Precio"
                    className="form-control"
                    value={formData.Precio}
                    onChange={handleChange}
                    placeholder="99.99"
                    min={0}
                    step={0.01}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label required">Stock</label>
                  <input
                    type="number"
                    name="Stock"
                    className="form-control"
                    value={formData.Stock}
                    onChange={handleChange}
                    placeholder="99"
                    min={0}
                    step={1}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-5">
                  <label className="form-label required">Categoría</label>
                  <select
                    type="text"
                    name="CategoriaID"
                    className="form-select"
                    value={formData.CategoriaID}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Selecciona aquí
                    </option>
                    <option value="1">Categoria1</option>
                    <option value="2">Categoria2</option>
                    <option value="3">Categoria3</option>
                  </select>
                </div>
                <div className="col-7">
                  <label className="form-label required">Proveedor</label>
                  <select
                    type="text"
                    name="ProveedorID"
                    className="form-select"
                    value={formData.ProveedorID}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Selecciona aquí
                    </option>
                    <option value="1">Proveedor1</option>
                    <option value="2">Proveedor2</option>
                    <option value="3">Proveedor3</option>
                  </select>
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
