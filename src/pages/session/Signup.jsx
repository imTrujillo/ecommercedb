import React, { useEffect, useState } from "react";
import style from "../../css/Auth.module.css";
import { Link } from "react-router-dom";
import {
  IconCalendar,
  IconCoin,
  IconId,
  IconLockFilled,
  IconLogin2,
  IconMailFilled,
  IconMapPinFilled,
  IconPhoneFilled,
  IconTable,
  IconUser,
  IconUserFilled,
} from "@tabler/icons-react";
import { subYears } from "date-fns";
import { useAuth } from "./AuthProvider";
import * as Yup from "yup";
import { toast } from "react-toastify";

export const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    dateOfBirth: "",
    fullName: "",
    email: "",
    dui: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    nit: "",
    salary: "",
  });

  const [role, setRole] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // VALIDACIONES CON YUP
  const signupSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("El nombre completo es requerido.")
      .min(5, "El nombre debe tener al menos 5 caracteres.")
      .matches(
        /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
        "Solo se permiten letras y espacios."
      ),
    username: Yup.string()
      .required("El nombre de usuario es requerido.")
      .min(5, "El usuario debe tener al menos 5 caracteres.")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/,
        "No se permiten caracteres especiales."
      ),
    email: Yup.string()
      .email("Correo electrónico no válido.")
      .required("El correo electrónico es requerido."),
    phoneNumber: Yup.string()
      .required("El teléfono es requerido")
      .matches(/^[0-9]+$/, "El teléfono solo debe contener números")
      .length(8, "El teléfono debe contener exactamente 8 dígitos"),
    address: Yup.string()
      .required("La dirección es requerida.")
      .min(10, "La dirección debe tener al menos 10 caracteres."),
    dui: Yup.string()
      .matches(/^[0-9]{9}$/, "El DUI debe contener exactamente 9 dígitos.")
      .required("El DUI es requerido."),
    dateOfBirth: Yup.date()
      .min(new Date(1930, 0, 1), "La fecha no puede ser anterior a 1930.")
      .max(subYears(new Date(), 18), "Debes tener al menos 18 años.")
      .required("El año de nacimiento es requerido."),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .required("La contraseña es requerida."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden.")
      .required("La confirmación de la contraseña es requerida."),
  });

  const employeeDataSchema = Yup.object().shape({
    nit: Yup.string()
      .required("El NIT es requerido")
      .matches(/^[0-9]+$/, "El NIT solo debe contener números")
      .length(14, "El NIT debe contener exactamente 14 dígitos"),
    salary: Yup.number()
      .typeError("El salario debe ser un número")
      .required("El salario es requerido")
      .min(1, "El salario debe ser mayor a 0")
      .max(80000, "El salario debe ser menor a 80,000"),
  });

  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        ...form,
      };

      if (role == "empleado") {
        formData.hireDate = new Date();
        await employeeDataSchema.validate(formData, { abortEarly: false });
      }

      await signupSchema.validate(formData, { abortEarly: false });

      formData.dui = formData.dui.replace(/^(\d{8})(\d{1})$/, "$1-$2");
      delete formData.role;

      if (role != "employee") {
        delete formData.nit;
        delete formData.salary;
      } else {
        delete formData.confirmPassword;
      }
      console.log(formData);
      await auth.signup(formData, role);
    } catch (err) {
      if (err.name === "ValidationError") {
        err.inner.forEach((e) => e?.message && toast.error(e.message));
      } else {
        console.error("Error al crear el usuario:", err);
        toast.error(
          "Error al crear el usuario. Por favor, inténtalo de nuevo."
        );
      }
    }
  };

  return (
    <div className={style.loginContainer}>
      <div className={`${style.loginCard} ${style.loginCardExpand}`}>
        <div className={style.loginHeader}>
          <IconLogin2 className={style.loginIcon} />
          <h2>Crea tu cuenta</h2>
          <p>Únete a nuestra comunidad y empieza a comprar</p>
        </div>

        <form
          className={`${style.createAccountForm} container`}
          onSubmit={handleSubmit}
        >
          {/* Fecha de nacimiento */}
          <div className="row ">
            <small className="text-secondary">Fecha de nacimiento:</small>
            <div className={style.inputGroup}>
              <IconCalendar className={style.icon} />
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>

          {/*  Nombre y DUI */}
          <div className="row">
            <div className="col-md-6">
              <div className={style.inputGroup}>
                <IconUserFilled className={style.icon} />
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  placeholder="Nombre completo"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className={style.inputGroup}>
                <IconId className={style.icon} />
                <input
                  type="text"
                  className="form-control"
                  name="dui"
                  placeholder="DUI"
                  value={form.dui}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className={style.inputGroup}>
              <IconUser className={style.icon} />
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Nombre de usuario"
                value={form.username}
                onChange={handleChange}
              />
            </div>
          </div>

          {/*  Correo y Teléfono */}
          <div className="row">
            <div className="col-md-6">
              <div className={style.inputGroup}>
                <IconMailFilled className={style.icon} />
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Correo electrónico"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className={style.inputGroup}>
                <IconPhoneFilled className={style.icon} />
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  placeholder="Teléfono"
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div className="row">
            <div className="col-12">
              <div className={style.inputGroup}>
                <IconMapPinFilled className={style.icon} />
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Dirección"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Contraseña y Confirmar */}
          <div className="row ">
            <div className="col-md-6">
              <div className={style.inputGroup}>
                <IconLockFilled className={style.icon} />
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Contraseña"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className={style.inputGroup}>
                <IconLockFilled className={style.icon} />
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Rol del usuario */}
          <div className="row">
            <div className={style.inputGroup}>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Selecciona un rol:</option>
                <option value="customer">Cliente</option>
                <option value="employee">Empleado</option>
              </select>
            </div>
          </div>

          {/* Datos extra para crear un empleado */}
          {role == "employee" && (
            <div className="row">
              <div className="col-md-6">
                <div className={style.inputGroup}>
                  <IconCoin className={style.icon} />
                  <input
                    type="number"
                    className="form-control"
                    name="salary"
                    placeholder="Salario"
                    value={form.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className={style.inputGroup}>
                  <IconTable className={style.icon} />
                  <input
                    type="text"
                    className="form-control"
                    name="nit"
                    placeholder="NIT"
                    value={form.nit}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Botón */}
          <div className="text-center">
            <button type="submit" className={style.loginButton}>
              Registrarse
            </button>
          </div>
        </form>

        <div className={style.signupLink}>
          <p>
            ¿Ya tienes una cuenta?
            <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
