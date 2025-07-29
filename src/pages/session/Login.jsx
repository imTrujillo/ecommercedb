import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import * as Yup from "yup";
import style from "../../css/Auth.module.css";
import {
  IconId,
  IconLockFilled,
  IconLogin2,
  IconShieldCheck,
  IconUserFilled,
} from "@tabler/icons-react";

export const Login = () => {
  const rememberedUser = localStorage.getItem("rememberedUser");

  const [rememberUser, setRememberUser] = useState(!!rememberedUser); // convierte string a boolean
  const [inputs, setInputs] = useState({
    username: rememberedUser || "",
    password: "",
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required("El nombre de usuario es requerido.")
      .min(3, "El usuario debe tener al menos 5 caracteres.")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/,
        "No se permiten caracteres especiales"
      ),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 8 caracteres.")
      .required("La contraseña es requerida."),
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Guardar o eliminar username según el checkbox
    if (rememberUser) {
      localStorage.setItem("rememberedUser", inputs.username);
    } else {
      localStorage.removeItem("rememberedUser");
    }

    try {
      await loginSchema.validate(inputs, { abortEarly: false });
      auth.login(inputs); // aquí podrías redirigir si lo necesitas
    } catch (err) {
      if (err.name === "ValidationError") {
        if (err.inner.length > 4) {
          toast.error("Formulario incompleto.");
        } else {
          err.inner.forEach((e) => {
            if (e?.message) toast.error(e.message);
          });
        }
      } else {
        console.error("Error en login:", err);
        toast.error("Error al iniciar sesión. Intenta de nuevo.");
      }
    }
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.loginCard}>
        <div className={style.loginHeader}>
          <IconShieldCheck className={style.loginIcon} />
          <h2>Bienvenido de nuevo</h2>
          <p>Inicia sesión para continuar comprando</p>
        </div>
        <form className={style.loginForm} onSubmit={handleSubmit}>
          <div className={style.inputGroup}>
            <IconUserFilled className={style.icon} />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nombre de usuario"
              value={inputs.username}
              onChange={handleInput}
            />
          </div>
          <div className={style.inputGroup}>
            <IconLockFilled className={style.icon} />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={inputs.password}
              onChange={handleInput}
            />
          </div>
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
          <button type="submit" className={style.loginButton}>
            Iniciar Sesión
          </button>
        </form>
        <div className={style.signupLink}>
          <p>
            ¿No tienes una cuenta?
            <Link to="/sign-up">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
