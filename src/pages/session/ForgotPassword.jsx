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

export const ForgotPassword = () => {
  const [inputs, setInputs] = useState({
    username: "",
    dui: "",
    newPassword: "",
    confirmPassword: "",
  });

  // VALIDACIONES CON YUP
  const setNewPasswordSchema = Yup.object().shape({
    username: Yup.string()
      .required("El nombre de usuario es requerido.")
      .min(5, "El usuario debe tener al menos 5 caracteres.")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/,
        "No se permiten caracteres especiales"
      ),
    dui: Yup.string()
      .matches(/^[0-9]+$/, "El DUI solo debe contener números")
      .length(9, "El DUI debe contener 9 caracteres.")
      .required("El DUI es requerido."),
    newPassword: Yup.string()
      .min(6, "La contraseña debe tener al menos 8 caracteres.")
      .required("La contraseña es requerida."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Las contraseñas no coinciden.")
      .min(6, "La contraseña debe tener al menos 8 caracteres.")
      .required("La contraseña es requerida."),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validar el formulario con Yup
      await setNewPasswordSchema.validate(inputs, { abortEarly: false });
      inputs.dui = inputs.dui.replace(/^(\d{8})(\d{1})$/, "$1-$2");
      auth.setNewPassword(inputs);
    } catch (err) {
      if (err.name === "ValidationError") {
        if (err.inner.length > 4) {
          toast.error("Formulario incompleto.");
        } else {
          err.inner.forEach((e) => {
            if (e?.message) {
              toast.error(e.message);
            }
          });
        }
      } else {
        console.error("Error de ectualización de contraseña:", err);
        toast.error(
          "Error al actualizar la contraseña. Por favor, inténtalo de nuevo."
        );
      }
    }
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.loginCard}>
        <div className={style.loginHeader}>
          <IconShieldLockFilled className={style.loginIcon} />
          <h2>Verifica tu identidad</h2>
          <p>Ingresa tus datos para restablecer tu contraseña.</p>
        </div>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className={style.inputGroup}>
            <IconUserFilled className={style.icon} />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nombre de usuario"
              value={inputs.username}
              onChange={(e) => handleInputChange(e, "verification")}
            />
          </div>
          <div className={style.inputGroup}>
            <IconId className={style.icon} />
            <input
              type="text"
              id="dui"
              name="dui"
              placeholder="DUI"
              value={inputs.dui}
              onChange={(e) => handleInputChange(e, "verification")}
            />
          </div>
          <div className={style.inputGroup}>
            <IconLockFilled className={style.icon} />
            <input
              type="password"
              id="new-password"
              name="newPassword"
              placeholder="Nueva contraseña"
              value={inputs.newPassword}
              onChange={(e) => handleInputChange(e, "newPassword")}
            />
          </div>
          <div className={style.inputGroup}>
            <IconLockFilled className={style.icon} />
            <input
              type="password"
              id="confirm-new-password"
              name="confirmPassword"
              placeholder="Confirmar nueva contraseña"
              value={inputs.confirmPassword}
              onChange={(e) => handleInputChange(e, "newPassword")}
            />
          </div>
          <button type="submit" className={style.loginButton}>
            Restablecer Contraseña
          </button>
        </form>

        <div className={style.signupLink}>
          <p>
            ¿Recordaste tu contraseña?{" "}
            <Link to="/login">
              <a>Volver al inicio de sesión</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
