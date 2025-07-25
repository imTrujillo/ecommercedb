import React, { useEffect, useState } from "react";
import {
  apiServiceGet,
  apiServicePost,
  apiServiceUpdate,
} from "../apiService/apiService";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const CategoryModal = ({
  show,
  closeModal,
  isEdit,
  category,
  fetchData,
}) => {
  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
  });

  // VALIDACIONES CON YUP
  const categorySchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre es requerido")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/,
        "No se permiten caracteres especiales"
      ),
    descripcion: Yup.string()
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .required("La descripción es requerida")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "No se permiten caracteres especiales"
      ),
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validar el formulario con Yup
      await categorySchema.validate(formData, { abortEarly: false });

      if (isEdit) {
        await apiServiceUpdate(`categorias/categoria/update/${category.id}`, {
          ...formData,
          id: category.id,
        });
      } else {
        await apiServicePost("categorias", formData);
      }
      closeModal();
      setFormData({
        id: 0,
        nombre: "",
        descripcion: "",
      });
      toast.success(
        isEdit ? "¡Categoría actualizado!" : "¡Categoría agregada!"
      );
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
        console.error("Error al guardar la categoría:", err);
        toast.error("Error al guardar la categoría.");
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
        <form onSubmit={(e) => handleSubmit(e)}>
          {isEdit ? (
            <input
              type="hidden"
              name="id"
              onChange={handleChange}
              value={category.id}
            ></input>
          ) : (
            ""
          )}

          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Editar Categoría" : "Agregar Categoría"}
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
                  placeholder="Categoría 01"
                />
              </div>
              <div className="row mb-3">
                <label className="form-label required">Descripción</label>
                <textarea
                  type="text"
                  name="descripcion"
                  className="form-control"
                  placeholder="Descripcion de Categoría 01"
                  value={formData.descripcion}
                  onChange={handleChange}
                ></textarea>
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
