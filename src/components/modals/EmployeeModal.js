import React, { useEffect, useState } from "react";
import { apiServicePost, apiServiceUpdate } from "../../API/apiService";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { subYears } from "date-fns";
import { useAuth } from "../../pages/session/AuthProvider";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { yupResolver } from "@hookform/resolvers/yup";

export const EmployeeModal = ({
  show,
  closeModal,
  isEdit,
  employee,
  fetchData,
}) => {
  //VALIDACIONES PARA CADA CAMPO DEL FORM
  const employeeSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("requerido")
      .min(2, "min 2 caracteres")
      .max(100, "max 100 caracteres")
      .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, "solo letras y espacios"),
    username: Yup.string()
      .required("requerido")
      .min(5, "min 5 caracteres")
      .max(50, "max 50 caracteres")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/,
        "solo letras y números"
      ),
    email: Yup.string().email("no válido").required("requerido"),
    phoneNumber: Yup.string().required("requerido"),
    address: Yup.string()
      .required("requerido")
      .min(20, "min 20 caracteres")
      .max(200, "max 200 caracteres"),
    dui: Yup.string()
      .matches(/^\d{8}-\d{1}$/, "formato: 12345678-9")
      .required("requerido"),
    dateOfBirth: Yup.date()
      .transform((value, originalValue) => {
        return originalValue === "" ? undefined : value;
      })
      .min(subYears(new Date(), 65), "max 65 años")
      .max(subYears(new Date(), 19), "min 18 años")
      .required("requerido"),
    hireDate: Yup.date()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .max(new Date(), "Debe ser una fecha actual o pasada")
      .required("Fecha de contratación requerida")
      .when("dateOfBirth", (dob, schema) => {
        if (!dob) return schema;
        const minHireDate = subYears(dob, -18);
        return schema.min(minHireDate, "min 18 años para contratarse");
      }),
    password: Yup.string()
      .min(6, "min 8 caracteres.")
      .matches(/[a-z]/, "falta letra minúscula")
      .matches(/[A-Z]/, "falta letra mayúscula")
      .matches(/\d/, "falta un número")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "falta caracter especial")
      .required("requerido"),
    salary: Yup.number()
      .transform((value, originalValue) => {
        return originalValue === "" ? undefined : value;
      })
      .min(0.01, "min $0")
      .max(50000, "max $50,000")
      .required("requerido"),
    nit: Yup.string()
      .matches(/^\d{4}-\d{6}-\d{3}-\d{1}$/, "formato: 0614-241287-102-5")
      .required("requerido"),
  });

  //Utilizar yup para validar formulario
  const methods = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      username: "",
      dateOfBirth: "",
      fullName: "",
      email: "",
      dui: "",
      phoneNumber: "",
      address: "",
      password: "",
      nit: "",
      hireDate: "",
      salary: 0,
    },
  });

  useEffect(() => {
    if (employee) {
      methods.reset({
        username: employee.username || "",
        dateOfBirth: employee.dateOfBirth || "",
        fullName: employee.fullName || "",
        email: employee.email || "",
        dui: employee.dui || "",
        phoneNumber: employee.phoneNumber || "",
        address: employee.address || "",
        password: "",
        nit: employee.nit || "",
        hireDate: employee.hireDate || "",
        salary: employee.salary || 0,
      });
    }
  }, [employee]);

  //Envío de los datos a la API
  const auth = useAuth();
  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (isEdit) {
        //const dataToSend = {
        //...formData,
        //id: Number(formData.id),
        // await apiServiceUpdate(
        //   `Clientes/cliente/update/${dataToSend.id}`,
        //   dataToSend
        // );
      } else {
        await auth.signup(data, "employee");
      }
      closeModal();
      fetchData();
      console.log(data);
    } catch (err) {
      console.error("Error al guardar empleado:", err);
      toast.error("Error al guardar empleado. Intenta de nuevo.");
    }
  });

  // Datos de cada input
  const DOBValidation = {
    id: "dateOfBirth",
    label: "Fecha de nacimiento:",
    type: "date",
    name: "dateOfBirth",
  };

  const fullNameValidation = {
    id: "fullName",
    label: "Nombre completo",
    type: "text",
    name: "fullName",
    placeholder: "Juan Pérez",
  };

  const duiValidation = {
    id: "dui",
    label: "DUI",
    type: "text",
    name: "dui",
    placeholder: "12345678-9",
  };

  const usernameValidation = {
    id: "username",
    label: "Nombre de usuario",
    type: "text",
    name: "username",
    placeholder: "Nombre de usuario",
  };

  const emailValidation = {
    id: "email",
    label: "Correo electrónico",
    type: "email",
    name: "email",
    placeholder: "example@example.com",
  };

  const phoneValidation = {
    id: "phoneNumber",
    label: "Teléfono",
    type: "text",
    name: "phoneNumber",
    placeholder: "1234-5678",
  };

  const addressValidation = {
    id: "address",
    label: "Dirección",
    type: "textarea",
    name: "address",
    placeholder: "Av. Bernal",
  };

  const passwordValidation = {
    id: "password",
    label: "Contraseña",
    type: "password",
    name: "password",
    placeholder: "TuMascota123!",
  };

  const hireDateValidation = {
    id: "hireDate",
    label: "Fecha de contratación:",
    type: "date",
    name: "hireDate",
  };

  const nitValidation = {
    id: "nit",
    label: "NIT",
    type: "text",
    name: "nit",
    placeholder: "1234-123456-123-1",
  };

  const salaryValidation = {
    id: "salary",
    label: "Salario",
    type: "number",
    name: "salary",
    placeholder: "999.99",
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
              <input type="hidden" name="id" value={employee.id}></input>
            ) : (
              ""
            )}

            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEdit ? "Editar Empleado" : "Agregar Empleado"}
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
                    <Input {...fullNameValidation} />
                  </div>
                  <div className="col-6">
                    <Input {...salaryValidation} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-5">
                    <Input {...emailValidation} />
                  </div>
                  <div className="col-7">
                    <Input {...phoneValidation} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <Input {...hireDateValidation} />
                  </div>
                  <div className="col-6">
                    <Input {...DOBValidation} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-5">
                    <Input {...usernameValidation} />
                  </div>
                  <div className="col-7">
                    <Input {...passwordValidation} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <Input {...duiValidation} />
                  </div>
                  <div className="col-6">
                    <Input {...nitValidation} />
                  </div>
                </div>

                <div className="row mb-3">
                  <Input {...addressValidation} />
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
