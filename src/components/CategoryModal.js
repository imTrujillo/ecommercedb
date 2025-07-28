import React, { useEffect, useState } from "react";
import {
  apiServiceGet,
  apiServicePost,
  apiServiceUpdate,
} from "../apiService/apiService";

export const CategoryModal = ({
  show,
  closeModal,
  isEdit,
  category,
  fetchData,
}) => {
  const [formData, setFormData] = useState({
    Id: 0,
    Nombre: "",
    Descripcion: "",
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

  const handleSubmit = async () => {
    if (isEdit) {
      await apiServiceUpdate(
        `categorias/categoria/update/${category.Id}`,
        formData
      );
    } else {
      await apiServicePost("categorias", formData);
    }
    closeModal();
    setFormData({
      Id: 0,
      Nombre: "",
      Descripcion: "",
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
              name="IDCategory"
              value={category.Id}
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
                  name="Nombre"
                  onChange={handleChange}
                  className="form-control"
                  value={formData.Nombre}
                  placeholder="Categoria 01"
                  pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                  required
                />
              </div>
              <div className="row mb-3">
                <label className="form-label required">Descripcion</label>
                <textarea
                  type="text"
                  name="Descripcion"
                  className="form-control"
                  placeholder="Descripcion de Categoria 01"
                  pattern="[A-Za-zÁÉÍÓÚáéíóúñ\s]+"
                  value={formData.Descripcion}
                  onChange={handleChange}
                  required
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
