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
    IDProveedor: 0,
    NombreProveedor: "",
    Teléfono: "",
    Email: "",
  });

  useEffect(() => {
    if (supplier) {
      setFormData(supplier);
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (isEdit) {
      await apiServiceUpdate(`suppliers/${supplier.IDProveedor}`, formData);
    } else {
      await apiServicePost("suppliers", formData);
    }
    closeModal();
    setFormData({
      IDCategoria: 0,
      NombreCategoria: "",
      Descripción: "",
    });
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
              name="IDProveedor"
              value={supplier.IDProveedor}
            ></input>
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
                  name="NombreProveedor"
                  onChange={handleChange}
                  className="form-control"
                  value={formData.NombreProveedor}
                  placeholder="Proveedor 01"
                  pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                  required
                />
              </div>
              <div className="row mb-3">
                <label className="form-label required">Teléfono</label>
                <input
                  type="text"
                  name="Teléfono"
                  onChange={handleChange}
                  className="form-control"
                  value={formData.Teléfono}
                  placeholder="+503 0000 0000"
                  required
                />
              </div>
              <div className="row mb-3">
                <label className="form-label required">Email</label>
                <input
                  type="email"
                  name="Email"
                  onChange={handleChange}
                  className="form-control"
                  value={formData.Email}
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
