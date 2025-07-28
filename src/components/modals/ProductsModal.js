import React, { useEffect, useState } from "react";
import {
  apiServiceGet,
  apiServicePost,
  apiServiceUpdate,
} from "../../API/apiService";
import { toast } from "react-toastify";
import * as Yup from "yup";

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

  // VALIDACIONES CON YUP
  const productSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre es requerido")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "No se permiten caracteres especiales"
      ),
    descripcion: Yup.string()
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .required("La descripción es requerida")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "No se permiten caracteres especiales"
      ),
    precio: Yup.number()
      .typeError("El precio debe ser un número")
      .positive("El precio debe ser mayor que 0")
      .required("El precio es requerido"),
    stock: Yup.number()
      .typeError("El stock debe ser un número")
      .integer("El stock debe ser un número entero")
      .min(0, "El stock no puede ser negativo")
      .required("El stock es requerido"),
    categoriaId: Yup.string().required("Selecciona una categoría"),
    proveedorId: Yup.string().required("Selecciona un proveedor"),
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

    try {
      // Validar el formulario con Yup
      await productSchema.validate(formData, { abortEarly: false });

      const payload = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        categoriaId: parseInt(formData.categoriaId),
        proveedorId: parseInt(formData.proveedorId),
      };

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
        console.error("Error al guardar producto:", err);
        toast.error("Error al guardar el producto.");
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
