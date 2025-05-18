import React, { useEffect, useState } from "react";

export const CustomerModal = ({ show, closeModal, isEdit, customer }) => {
  const [formData, setFormData] = useState({
    IDCliente: "",
    NombreCliente: "",
    Teléfono: "",
    Email: "",
    Dirección: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

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
              name="IDCliente"
              value={customer.IDCliente}
            ></input>
          ) : (
            ""
          )}

          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Editar Cliente" : "Agregar Cliente"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label required">Nombre</label>
                  <input
                    type="text"
                    name="NombreCliente"
                    onChange={handleChange}
                    className="form-control"
                    value={formData.NombreCliente}
                    placeholder="Juan Pérez"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label required">Teléfono</label>
                  <input
                    type="text"
                    name="Teléfono"
                    className="form-control"
                    placeholder="+503 0000 0000"
                    value={formData.Teléfono}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-5">
                  <label className="form-label required">Email</label>
                  <input
                    type="email"
                    name="Email"
                    className="form-control"
                    value={formData.Email}
                    onChange={handleChange}
                    placeholder="example@example.com"
                    required
                  />
                </div>
                <div className="col-7">
                  <label className="form-label required">Dirección</label>
                  <textarea
                    type="text"
                    name="Dirección"
                    className="form-control"
                    value={formData.Dirección}
                    onChange={handleChange}
                    placeholder="Av. Bernal"
                    required
                  ></textarea>
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
