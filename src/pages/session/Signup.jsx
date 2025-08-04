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
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Input";

export const SignUp = () => {
  //VALIDACIONES PARA CADA CAMPO DEL FORM
  const signupSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("requerido")
      .min(2, "min 2 caracteres")
      .max(100, "max 100 caracteres")
      .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/, "solo letras y espacios"),
    username: Yup.string()
      .required("requerido")
      .min(5, "min 5 caracteres")
      .max(50, "max 50 caracteres")
      .matches(/^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, "solo letras y números"),
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
      .min(new Date(1930, 0, 1), "min 1930")
      .max(subYears(new Date(), 19), "min 18 años")
      .required("requerido"),
    password: Yup.string()
      .min(6, "min 8 caracteres.")
      .matches(/[a-z]/, "falta letra minúscula")
      .matches(/[A-Z]/, "falta letra mayúscula")
      .matches(/\d/, "falta un número")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "falta caracter especial")
      .required("requerido"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "las contraseñas no coinciden")
      .required("requerida"),
  });

  //Utilizar yup para validar formulario
  const methods = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      username: "",
      dateOfBirth: "",
      fullName: "",
      email: "",
      dui: "",
      phoneNumber: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  //Envío de los datos a la API
  const auth = useAuth();
  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      console.log(data);
      await auth.signup(data, "customer");
    } catch (err) {
      console.error("Error en register:", err);
      toast.error("Error al registrarse. Intenta de nuevo.");
    }
  });

  // Datos de cada input
  const DOBValidation = {
    icon: <IconCalendar className={style.icon} />,
    label: "Fecha de nacimiento:",
    type: "date",
    name: "dateOfBirth",
    isAuthInput: true,
  };

  const fullNameValidation = {
    icon: <IconUserFilled className={style.icon} />,
    type: "text",
    name: "fullName",
    placeholder: "Nombre completo",
    isAuthInput: true,
  };

  const duiValidation = {
    icon: <IconId className={style.icon} />,
    type: "text",
    name: "dui",
    placeholder: "DUI",
    isAuthInput: true,
  };

  const usernameValidation = {
    icon: <IconUser className={style.icon} />,
    type: "text",
    name: "username",
    placeholder: "Nombre de usuario",
    isAuthInput: true,
  };

  const emailValidation = {
    icon: <IconMailFilled className={style.icon} />,
    type: "email",
    name: "email",
    placeholder: "Correo electrónico",
    isAuthInput: true,
  };

  const phoneValidation = {
    icon: <IconPhoneFilled className={style.icon} />,
    type: "text",
    name: "phoneNumber",
    placeholder: "Teléfono",
    isAuthInput: true,
  };

  const addressValidation = {
    icon: <IconMapPinFilled className={style.icon} />,
    type: "text",
    name: "address",
    placeholder: "Dirección",
    isAuthInput: true,
  };

  const passwordValidation = {
    icon: <IconLockFilled className={style.icon} />,
    type: "password",
    name: "password",
    placeholder: "Contraseña",
    isAuthInput: true,
  };

  const confirmPasswordValidation = {
    icon: <IconLockFilled className={style.icon} />,
    type: "password",
    name: "confirmPassword",
    placeholder: "Confirmar contraseña",
    isAuthInput: true,
  };

  return (
    <div className={style.loginContainer}>
      <div className={`${style.loginCard} ${style.loginCardExpand}`}>
        <div className={style.loginHeader}>
          <IconLogin2 className={style.loginIcon} />
          <h2>Crea tu cuenta</h2>
          <p>Únete a nuestra comunidad y empieza a comprar</p>
        </div>

        <FormProvider {...methods}>
          <form
            className={`${style.createAccountForm} container`}
            onSubmit={onSubmit}
            noValidate
          >
            {/* Fecha de nacimiento */}
            <div className="row ">
              <Input {...DOBValidation} />
            </div>

            {/*  Nombre y DUI */}
            <div className="row">
              <div className="col-md-6">
                <Input {...fullNameValidation} />
              </div>

              <div className="col-md-6">
                <Input {...duiValidation} />
              </div>
            </div>

            <div className="row">
              <Input {...usernameValidation} />
            </div>

            {/*  Correo y Teléfono */}
            <div className="row">
              <div className="col-md-6">
                <Input {...emailValidation} />
              </div>

              <div className="col-md-6">
                <Input {...phoneValidation} />
              </div>
            </div>

            {/* Dirección */}
            <div className="row">
              <div className="col-12">
                <Input {...addressValidation} />
              </div>
            </div>

            {/* Contraseña y Confirmar */}
            <div className="row ">
              <div className="col-md-6">
                <Input {...passwordValidation} />
              </div>

              <div className="col-md-6">
                <Input {...confirmPasswordValidation} />
              </div>
            </div>

            {/* Botón */}
            <div className="text-center">
              <button type="submit" className={style.loginButton}>
                Registrarse
              </button>
            </div>
          </form>
        </FormProvider>

        <div className={style.signupLink}>
          <p className="d-flex justify-content-center gap-2">
            ¿Ya tienes una cuenta?
            <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
