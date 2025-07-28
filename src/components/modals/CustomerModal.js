import React, { useEffect, useState } from "react";
import { apiServicePost, apiServiceUpdate } from "../../API/apiService";
import * as Yup from "yup";
import { toast } from "react-toastify";

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

  // VALIDACIONES CON YUP
  const customerSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre es requerido")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
        "No se permiten caracteres especiales"
      ),
    telefono: Yup.string()
      .required("El teléfono es requerido")
      .matches(/^[0-9]+$/, "El teléfono solo debe contener números")
      .length(8, "El teléfono debe contener exactamente 8 dígitos"),
    direccion: Yup.string()
      .min(10, "La dirección debe tener al menos 10 caracteres")
      .required("La dirección es requerida")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "No se permiten caracteres especiales"
      ),
    email: Yup.string()
      .email("Debe ser un correo válido")
      .required("El correo es requerido"),
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

    try {
      // Validar el formulario con Yup
      await customerSchema.validate(formData, { abortEarly: false });

      // para asegurar de que el ID sea un número antes de enviar
      const dataToSend = {
        ...formData,
        id: Number(formData.id),
      };
      if (isEdit) {
        await apiServiceUpdate(
          `Clientes/cliente/update/${dataToSend.id}`,
          dataToSend
        );
      } else {
        await apiServicePost("Clientes", dataToSend);
      }
      closeModal();
      fetchData();
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
        console.error("Error al guardar el cliente:", err);
        toast.error("Error al guardar el cliente.");
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
          {isEdit ? (
            <input type="hidden" name="id" value={customer.id}></input>
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
                    name="nombre"
                    onChange={handleChange}
                    className="form-control"
                    value={formData.nombre}
                    placeholder="Juan Pérez"
                  />
                </div>
                <div className="col-6">
                  <label className="form-label required">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    className="form-control"
                    placeholder="0000 0000"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-5">
                  <label className="form-label required">Correo</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@example.com"
                  />
                </div>
                <div className="col-7">
                  <label className="form-label required">Dirección</label>
                  <textarea
                    type="text"
                    name="direccion"
                    className="form-control"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Av. Bernal"
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
