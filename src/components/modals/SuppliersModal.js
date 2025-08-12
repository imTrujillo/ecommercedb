import React, { useEffect, useState } from "react";
import { apiServicePost, apiServiceUpdate } from "../../API/apiService";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input";

export const SuppliersModal = ({
  show,
  closeModal,
  isEdit,
  supplier,
  fetchData,
}) => {
  // VALIDACIONES CON YUP
  const supplierSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "min 3 caracteres")
      .required("requerido")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "sin caracteres especiales"
      ),
    telefono: Yup.string()
      .required("requerido")
      .matches(/^[0-9]+$/, "solo números")
      .length(8, "len: 8 dígitos"),
    email: Yup.string().email("no válido").required("requerido"),
  });

  //Utilizar yup para validar formulario
  const methods = useForm({
    resolver: yupResolver(supplierSchema),
    defaultValues: {
      id: 0,
      nombre: "",
      telefono: "",
      email: "",
    },
  });

  useEffect(() => {
    if (supplier) {
      methods.reset({
        id: supplier.id || 0,
        nombre: supplier.nombre || "",
        telefono: supplier.telefono || "",
        email: supplier.email || "",
      });
    }
  }, [supplier]);

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (isEdit) {
        await apiServiceUpdate(`Proveedores/proveedor/update/${data.id}`, data);
      } else {
        await apiServicePost("Proveedores", data);
      }
      closeModal();
      fetchData();
      toast.success(
        isEdit ? "¡Proveedor actualizado!" : "¡Proveedor agregado!"
      );
      console.log(data);
    } catch (err) {
      console.error("Error al guardar el proveedor:", err);
      toast.error("Error al guardar el proveedor. Intenta de nuevo.");
    }
  });

  const nombreValidation = {
    id: "nombre",
    label: "Nombre",
    type: "text",
    name: "nombre",
    placeholder: "Proveedor 01",
  };

  const telefonoValidation = {
    id: "telefono",
    label: "Teléfono",
    type: "text",
    name: "telefono",
    placeholder: "12345678",
  };

  const emailValidation = {
    id: "email",
    label: "Correo",
    type: "email",
    name: "email",
    placeholder: "proveedor@proveedor.com",
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
                  <Input {...nombreValidation} />
                </div>
                <div className="row mb-3">
                  <Input {...emailValidation} />
                </div>
                <div className="row mb-3">
                  <Input {...telefonoValidation} />
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
