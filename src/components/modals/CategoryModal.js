import { useEffect } from "react";
import { apiServicePost, apiServiceUpdate } from "../../API/apiService";
import { toast } from "react-toastify";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input";
import {
  categorySchema,
  categoryValidations,
} from "../../validations/categorySchema"; // VALIDACIONES CON YUP
import { boolean } from "yup";

export const CategoryModal = ({
  show,
  closeModal,
  isEdit,
  category,
  fetchData,
}) => {
  //Utilizar yup para validar formulario
  const methods = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (category) {
      methods.reset({
        id: category.id || 0,
        name: category.name || "",
        description: category.description || "",
        isActive: category.isActive ? "true" : "false",
      });
    }
  }, [category]);

  //Envío de los datos a la API
  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (isEdit) {
        await apiServiceUpdate(`category/category/update/${category.id}`, data);
      } else {
        await apiServicePost("category", data);
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
                  <div className="col-6">
                    <Input {...categoryValidations.nameValidation} />
                  </div>
                  <div className="col-6">
                    <Input {...categoryValidations.isActiveValidation} />
                  </div>
                </div>
                <div className="row mb-3">
                  <Input {...categoryValidations.descriptionValidation} />
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
