import React, { useEffect, useState } from "react";
import {
  apiServiceGet,
  apiServicePost,
  apiServiceUpdate,
} from "../apiService/apiService";
import { toast } from "react-toastify";

export const ProductsModal = ({
  show,
  closeModal,
  isEdit,
  product,
  fetchData,
  suppliers,
  categories,
}) => {
  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    precio: 0.0,
    stock: 0,
    categoriaId: "",
    proveedorId: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        stock: product.stock,
        categoriaId: product.categoriaId.toString(),
        proveedorId: product.proveedorId.toString(),
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (!formData.categoriaId || !formData.proveedorId) {
      toast.error("Debes seleccionar categoría y proveedor");
      return;
    }

    const payload = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
      categoriaId: parseInt(formData.categoriaId),
      proveedorId: parseInt(formData.proveedorId),
    };

    try {
      if (isEdit) {
        await apiServiceUpdate(`Productos/update/${product.id}`, {
          ...payload,
          id: product.id,
        });
      } else {
        await apiServicePost("Productos", payload);
      }

      toast.success(isEdit ? "¡Producto actualizado!" : "¡Producto agregado!");
      fetchData();
      closeModal();

      // Limpiar formulario
      setFormData({
        id: 0,
        nombre: "",
        descripcion: "",
        precio: 0.0,
        stock: 0,
        categoriaId: "",
        proveedorId: "",
      });
    } catch (error) {
      console.error("Error al guardar producto:", error);
      toast.error("Error al guardar el producto.");
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
          {isEdit && <input type="hidden" name="id" value={product.id} />}

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
                    name="nombre"
                    className="form-control"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Producto 01"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                    required
                  />
                </div>
                <div className="col-7">
                  <label className="form-label required">Descripción</label>
                  <textarea
                    name="descripcion"
                    className="form-control"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción del Producto 01"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label required">Precio</label>
                  <input
                    type="number"
                    name="precio"
                    className="form-control"
                    value={formData.precio}
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
                    name="stock"
                    className="form-control"
                    value={formData.stock}
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
                    name="categoriaId"
                    className="form-select"
                    value={formData.categoriaId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Selecciona aquí
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-7">
                  <label className="form-label required">Proveedor</label>
                  <select
                    name="proveedorId"
                    className="form-select"
                    value={formData.proveedorId}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Selecciona aquí
                    </option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.nombre}
                      </option>
                    ))}
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
