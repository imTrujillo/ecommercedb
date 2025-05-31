import React, { useEffect, useState } from "react";
import { apiServicePost, apiServiceUpdate } from "../apiService/apiService";

export const CustomerModal = ({
  show,
  closeModal,
  isEdit,
  customer,
  fetchData,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        id: customer.id, // Asumiendo que el ID en C# es 'id'
        nombre: customer.nombre,
        telefono: customer.telefono, // Asumiendo 'telefono' sin tilde
        email: customer.email,
        direccion: customer.direccion, // Asumiendo 'direccion' sin tilde
      });
    } else {
      // Si es un nuevo cliente, resetear el formulario
      setFormData({
        id: 0,
        nombre: "",
        telefono: "",
        email: "",
        direccion: "",
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // para asegurar de que el ID sea un número antes de enviar
    const dataToSend = {
      ...formData,
      id: Number(formData.id),
    };
    if (isEdit) {
      await apiServiceUpdate(`Clientes/cliente/update/${dataToSend.id}`, dataToSend);
    } else {
      await apiServicePost("Clientes", dataToSend);
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
              value={customer.id}
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
                  <label className="form-label required">nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    onChange={handleChange}
                    className="form-control"
                    value={formData.nombre}
                    placeholder="Juan Pérez"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label required">telefono</label>
                  <input
                    type="text"
                    name="telefono"
                    className="form-control"
                    placeholder="+503 0000 0000"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-5">
                  <label className="form-label required">email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@example.com"
                    required
                  />
                </div>
                <div className="col-7">
                  <label className="form-label required">direccion</label>
                  <textarea
                    type="text"
                    name="direccion"
                    className="form-control"
                    value={formData.direccion}
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
