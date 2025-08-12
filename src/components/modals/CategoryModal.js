import React, { useEffect, useState } from "react";
import {
  apiServiceGet,
  apiServicePost,
  apiServiceUpdate,
} from "../../API/apiService";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input";

export const CategoryModal = ({
  show,
  closeModal,
  isEdit,
  category,
  fetchData,
}) => {
  // VALIDACIONES CON YUP
  const categorySchema = Yup.object().shape({
    nombre: Yup.string()
      .required("requerido")
      .min(2, "min 2 caracteres")
      .max(100, "max 100 caracteres")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "sin caracteres especiales"
      ),
    descripcion: Yup.string()
      .required("requerido")
      .min(10, "min 10 caracteres")
      .max(200, "max 200 caracteres")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "sin caracteres especiales"
      ),
  });

  //Utilizar yup para validar formulario
  const methods = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  });

  useEffect(() => {
    if (category) {
      methods.reset({
        id: category.id || 0,
        nombre: category.nombre || "",
        descripcion: category.descripcion || "",
      });
    }
  }, [category]);

  //Envío de los datos a la API
  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (isEdit) {
        await apiServiceUpdate(`categorias/categoria/update/${category.id}`, {
          ...data,
          id: category.id,
        });
      } else {
        await apiServicePost("categorias", data);
      }
      closeModal();
      fetchData();
      toast.success(
        isEdit ? "¡Categoría actualizado!" : "¡Categoría agregada!"
      );
      console.log(data);
    } catch (err) {
      console.error("Error al guardar la categoría:", err);
      toast.error("Error al guardar la categoría. Intenta de nuevo.");
    }
  });

  const nombreValidation = {
    id: "nombre",
    label: "Nombre",
    type: "text",
    name: "nombre",
    placeholder: "Categoría 01",
  };

  const descripcionValidation = {
    id: "descripcion",
    label: "Descripción",
    type: "textarea",
    name: "descripcion",
    placeholder: "Descripcion de Categoría 01",
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block show fade modal-blur"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-lg">
        <FormProvider {...methods}>
          <form noValidate onSubmit={onSubmit}>
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
                  <Input {...nombreValidation} />
                </div>
                <div className="row mb-3">
                  <Input {...descripcionValidation} />
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
        </FormProvider>
      </div>
    </div>
  );
};
