import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "../../css/Auth.module.css";
import {
  IconLockFilled,
  IconShieldCheck,
  IconUserFilled,
} from "@tabler/icons-react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../components/Input";

export const Login = () => {
  // se utiliza el localStorage para recordar username
  const rememberedUser = localStorage.getItem("rememberedUser");
  const [rememberUser, setRememberUser] = useState(!!rememberedUser); // convierte string a boolean

  //VALIDACIONES PARA CADA CAMPO DEL FORM
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required("requerido")
      .min(5, "min 5 caracteres")
      .max(50, "max 50 caracteres")
      .matches(/^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, "solo letras y números"),
    password: Yup.string()
      .min(6, "min 8 caracteres.")
      .matches(/[a-z]/, "falta letra minúscula")
      .matches(/[A-Z]/, "falta letra mayúscula")
      .matches(/\d/, "falta un número")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "falta carácter especial")
      .required("requerido"),
  });

  //Utilizar yup para validar formulario
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: rememberedUser || "",
      password: "",
    },
  });

  // Envio de los datos a la API
  const auth = useAuth();
  const onSubmit = methods.handleSubmit(async (data) => {
    // Guardar o eliminar username según el checkbox
    if (rememberUser) {
      localStorage.setItem("rememberedUser", data.username);
    } else {
      localStorage.removeItem("rememberedUser");
    }

    try {
      auth.login(data);
    } catch (err) {
      console.error("Error en login:", err);
      toast.error("Error al iniciar sesión. Intenta de nuevo.");
    }
  });

  // Datos de cada input
  const userValidation = {
    icon: <IconUserFilled className={style.icon} />,
    type: "text",
    id: "username",
    name: "username",
    placeholder: "Nombre de usuario",
    isAuthInput: true,
  };

  const passwordValidation = {
    icon: <IconLockFilled className={style.icon} />,
    type: "password",
    id: "password",
    name: "password",
    placeholder: "Contraseña",
    isAuthInput: true,
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.loginCard}>
        <div className={style.loginHeader}>
          <IconShieldCheck className={style.loginIcon} />
          <h2>Bienvenido de nuevo</h2>
          <p>Inicia sesión para continuar comprando</p>
        </div>
        <FormProvider {...methods}>
          <form className={style.loginForm} onSubmit={onSubmit} noValidate>
            <Input {...userValidation} />
            <Input {...passwordValidation} />

            <div className={style.optionsGroup}>
              <div className={style.rememberMe}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberUser}
                  onChange={(e) => setRememberUser(e.target.checked)}
                />
                <label htmlFor="rememberMe">Recordarme</label>
              </div>
              <Link to="/forgotpassword" className={style.forgotPassword}>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <button
              type="submit"
              onClick={onSubmit}
              className={style.loginButton}
            >
              Iniciar Sesión
            </button>
          </form>
        </FormProvider>
        <div className={style.signupLink}>
          <p className="d-flex justify-content-center gap-2">
            ¿No tienes una cuenta?
            <Link to="/sign-up">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
