import React, { useEffect, useState } from "react";
import { apiServicePost, apiServiceUpdate } from "../apiService/apiService";

export const SuppliersModal = ({
  show,
  closeModal,
  isEdit,
  supplier,
  fetchData,
}) => {
  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    telefono: "",
    email: "",
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        id: supplier.id,
        nombre: supplier.nombre,
        telefono: supplier.telefono,
        email: supplier.email,
      });
    } else {
      setFormData({
        id: 0,
        nombre: "",
        telefono: "",
        email: "",
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await apiServiceUpdate(
        `Proveedores/proveedor/update/${formData.id}`,
        formData
      );
    } else {
      await apiServicePost("Proveedores", formData);
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
            <input type="hidden" name="id" value={supplier.id}></input>
          ) : (
            ""
          )}

          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Editar Proveedor" : "Agregar Proveedor"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal-body">
              <div className="row mb-3">
                <label className="form-label required">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  onChange={handleChange}
                  className="form-control"
                  value={formData.nombre}
                  placeholder="Proveedor 01"
                  pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                  required
                />
              </div>
              <div className="row mb-3">
                <label className="form-label required">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  onChange={handleChange}
                  className="form-control"
                  value={formData.telefono}
                  placeholder="+503 0000 0000"
                  required
                />
              </div>
              <div className="row mb-3">
                <label className="form-label required">Correo</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="form-control"
                  value={formData.email}
                  placeholder="example@example.com"
                  required
                />
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
