import React, { useEffect, useState } from "react";
import {
  apiServiceGet,
  apiServicePost,
  apiServiceUpdate,
} from "../apiService/apiService";

export const ProductsModal = ({
  show,
  closeModal,
  isEdit,
  product,
  fetchData,
}) => {
  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    precio: 0.0,
    stock: 0,
    categoriaId: 0,
    proveedorId: 0,
  });

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Cargar categorías y proveedores al montar el modal
  useEffect(() => {
    const fetchDependencies = async () => {
        const cats = await apiServiceGet("Categorias", "");
        const sups = await apiServiceGet("Proveedores", "");
        setCategories(cats || []);
        setSuppliers(sups || []);
    };
    fetchDependencies();
}, []);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        stock: product.stock,
        categoriaId: product.categoriaId,
        proveedorId: product.proveedorId
      });
    } else {
      // Resetear formulario si no hay producto (para crear nuevo)
            setFormData({
                id: 0,
                nombre: "",
                descripcion: "",
                precio: 0.0,
                stock: 0,
                categoriaId: 0,
                proveedorId: 0,
            });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
     // Convierte a número solo si el campo es numérico para evitar problemas de tipo
    setFormData((prev) => ({ 
      ...prev, 
      [name]: ['precio', 'stock', 'categoriaId', 'proveedorId'].includes(name) ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // para asegurar de que los IDs sean números antes de enviar
        const dataToSend = {
            ...formData,
            precio: Number(formData.precio),
            stock: Number(formData.stock),
            categoriaId: Number(formData.categoriaId),
            proveedorId: Number(formData.proveedorId),
        };

    if (isEdit) {
      await apiServiceUpdate(`Productos/update/${dataToSend.id}`, dataToSend);
    } else {
      await apiServicePost("Productos", dataToSend);
    }
    closeModal();
    fetchData();
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
              name="id"
              value={formData.id}
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
                  <label className="form-label required">nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    onChange={handleChange}
                    className="form-control"
                    value={formData.nombre}
                    placeholder="Producto 01"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                    required
                  />
                </div>
                <div className="col-7">
                  <label className="form-label required">descripcion</label>
                  <textarea
                    type="text"
                    name="descripcion"
                    className="form-control"
                    placeholder="descripcion del Producto 01"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label required">precio</label>
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
                  <label className="form-label required">stock</label>
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
                    type="text"
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
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-7">
                  <label className="form-label required">Proveedor</label>
                  <select
                    type="text"
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
                      <option
                        key={supplier.id}
                        value={supplier.id}
                      >
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
