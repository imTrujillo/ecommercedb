import { toast } from "react-toastify";
import { useAuth } from "../../pages/session/AuthProvider";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import {
  employeeSchema,
  employeeValidations,
} from "../../validations/employeeSchema"; // VALIDACIONES CON YUP

export const UserModal = ({ show, closeModal, isEdit, user, fetchData }) => {
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
    if (user) {
      methods.reset({
        username: user.username || "",
        dateOfBirth: user.dateOfBirth || "",
        fullName: user.fullName || "",
        email: user.email || "",
        dui: user.dui || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        password: "",
        nit: user.nit || "",
        hireDate: user.hireDate || "",
        salary: user.salary || 0,
      });
    }
  }, [user]);

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
    } catch (err) {
      console.error("Error al guardar empleado:", err);
      toast.error("Error al guardar empleado. Intenta de nuevo.");
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
            {isEdit ? (
              <input type="hidden" name="id" value={user.id}></input>
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
                    <Input {...employeeValidations.fullNameValidation} />
                  </div>
                  <div className="col-6">
                    <Input {...employeeValidations.salaryValidation} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-5">
                    <Input {...employeeValidations.emailValidation} />
                  </div>
                  <div className="col-7">
                    <Input {...employeeValidations.phoneValidation} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <Input {...employeeValidations.hireDateValidation} />
                  </div>
                  <div className="col-6">
                    <Input {...employeeValidations.DOBValidation} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-5">
                    <Input {...employeeValidations.usernameValidation} />
                  </div>
                  <div className="col-7">
                    <Input {...employeeValidations.passwordValidation} />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <Input {...employeeValidations.duiValidation} />
                  </div>
                  <div className="col-6">
                    <Input {...employeeValidations.nitValidation} />
                  </div>
                </div>

                <div className="row mb-3">
                  <Input {...employeeValidations.addressValidation} />
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
