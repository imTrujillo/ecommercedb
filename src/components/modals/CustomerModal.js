import React, { useEffect, useState } from "react";
import { apiServicePost, apiServiceUpdate } from "../../API/apiService";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input";

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
      .required("requerido")
      .min(2, "min 3 caracteres")
      .max(100, "max 100 caracteres")
      .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, "solo letras y espacios"),
    telefono: Yup.string()
      .required("requerido")
      .matches(/^[0-9]+$/, "solo números")
      .length(8, "len: 8 dígitos"),
    direccion: Yup.string()
      .required("requerido")
      .min(20, "min 20 caracteres")
      .max(200, "max 200 caracteres")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s,\.!?:;]+$/,
        "sin caracteres especiales"
      ),
    email: Yup.string().email("no válido").required("requerido"),
  });

  //Utilizar yup para validar formulario
  const methods = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: {
      id: "",
      nombre: "",
      telefono: "",
      email: "",
      direccion: "",
    },
  });

  useEffect(() => {
    if (customer) {
      methods.reset({
        id: customer.id || 0, // Asumiendo que el ID en C# es 'id'
        nombre: customer.nombre || "",
        telefono: customer.telefono || "", // Asumiendo 'telefono' sin tilde
        email: customer.email || "",
        direccion: customer.direccion || "", // Asumiendo 'direccion' sin tilde
      });
    }
  }, [customer]);

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (isEdit) {
        const dataToSend = {
          ...formData,
          id: Number(formData.id),
        };
        await apiServiceUpdate(
          `Clientes/cliente/update/${dataToSend.id}`,
          dataToSend
        );
      } else {
        await apiServicePost("Clientes", formData);
      }
      closeModal();
      fetchData();
      console.log(data);
    } catch (err) {
      console.error("Error al guardar cliente:", err);
      toast.error("Error al guardar cliente. Intenta de nuevo.");
    }
  });

  const nombreValidation = {
    id: "nombre",
    label: "Nombre",
    type: "text",
    name: "nombre",
    placeholder: "Juan Pérez",
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
    placeholder: "email@email.com",
  };

  const direccionValidation = {
    id: "direccion",
    label: "Dirección",
    type: "textarea",
    name: "direccion",
    placeholder: "Av. Bernal",
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
                    <Input {...nombreValidation} />
                  </div>
                  <div className="col-6">
                    <Input {...telefonoValidation} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-5">
                    <Input {...emailValidation} />
                  </div>
                  <div className="col-7">
                    <Input {...direccionValidation} />
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
        </FormProvider>
      </div>
    </div>
  );
};
