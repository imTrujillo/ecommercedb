import React, { useEffect, useState } from "react";
import { apiServicePost, apiServiceUpdate } from "../../API/apiService";
import * as Yup from "yup";
import { toast } from "react-toastify";

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

  // VALIDACIONES CON YUP
  const supplierSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre es requerido")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/,
        "No se permiten caracteres especiales"
      ),
    telefono: Yup.string()
      .required("El teléfono es requerido")
      .matches(/^[0-9]+$/, "El teléfono solo debe contener números")
      .length(8, "El teléfono debe contener exactamente 8 dígitos"),
    email: Yup.string()
      .email("Debe ser un correo válido")
      .required("El correo es requerido"),
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

    try {
      // Validar el formulario con Yup
      await supplierSchema.validate(formData, { abortEarly: false });

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
    } catch (err) {
      if (err.name === "ValidationError") {
        if (err.inner.length > 4) {
          toast.error("Formulario incompleto.");
        } else {
          err.inner.forEach((e) => {
            if (e?.message) {
              toast.error(e.message);
            }
          });
        }
      } else {
        console.error("Error al guardar proveedor:", err);
        toast.error("Error al guardar el proveedor.");
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
                  placeholder="0000 0000"
                />
              </div>
              <div className="row mb-3">
                <label className="form-label required">Correo</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  className="form-control"
                  value={formData.email}
                  placeholder="example@example.com"
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
