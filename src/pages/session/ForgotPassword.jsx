import React, { useState } from "react";
import style from "../../css/Auth.module.css";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  IconId,
  IconKeyFilled,
  IconLockFilled,
  IconShieldLockFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../components/Input";

export const ForgotPassword = () => {
  //VALIDACIONES PARA CADA CAMPO DEL FORM
  const setNewPasswordSchema = Yup.object().shape({
    username: Yup.string()
      .required("requerido")
      .min(5, "min 5 caracteres")
      .max(50, "max 50 caracteres")
      .matches(/^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, "solo letras y números"),
    dui: Yup.string()
      .matches(/^\d{8}-\d{1}$/, "formato: 12345678-9")
      .required("requerido"),
    newPassword: Yup.string()
      .min(6, "min 8 caracteres.")
      .matches(/[a-z]/, "falta letra minúscula")
      .matches(/[A-Z]/, "falta letra mayúscula")
      .matches(/\d/, "falta un número")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "falta carácter especial")
      .required("requerido"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "las contraseñas no coinciden")
      .required("requerida"),
  });

  //Utilizar yup para validar formulario
  const methods = useForm({
    resolver: yupResolver(setNewPasswordSchema),
    defaultValues: {
      username: "",
      dui: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  //Envío de los datos a la API
  const auth = useAuth();
  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      console.log(data);
      await auth.setNewPassword(data);
    } catch (err) {
      console.error("Error de actualización de contraseña:", err);
      toast.error("Error al actualizar la contraseña. Intenta de nuevo.");
    }
  });

  // Datos de cada input
  const usernameValidation = {
    icon: <IconUserFilled className={style.icon} />,
    type: "text",
    name: "username",
    placeholder: "Nombre de usuario",
    isAuthInput: true,
  };

  const duiValidation = {
    icon: <IconId className={style.icon} />,
    type: "text",
    name: "dui",
    placeholder: "DUI",
    isAuthInput: true,
  };

  const newPasswordValidation = {
    icon: <IconLockFilled className={style.icon} />,
    type: "password",
    name: "newPassword",
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
      <div className={style.loginCard}>
        <div className={style.loginHeader}>
          <IconShieldLockFilled className={style.loginIcon} />
          <h2>Verifica tu identidad</h2>
          <p>Ingresa tus datos para restablecer tu contraseña.</p>
        </div>
        <FormProvider {...methods}>
          <form className="forgot-password-form" onSubmit={onSubmit} noValidate>
            <Input {...usernameValidation} />
            <Input {...duiValidation} />
            <Input {...newPasswordValidation} />
            <Input {...confirmPasswordValidation} />
            <button type="submit" className={style.loginButton}>
              Restablecer Contraseña
            </button>
          </form>
        </FormProvider>

        <div className={style.signupLink}>
          <p className="d-flex justify-content-center gap-2">
            ¿Recordaste tu contraseña?
            <Link to="/login">Volver al inicio de sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
