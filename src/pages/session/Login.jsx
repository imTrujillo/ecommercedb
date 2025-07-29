import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import * as Yup from "yup";
import './Login.css';

export const Login = () => {
  const [inputs, setInputs] = useState({
    user: "", // nombre de usuario o correo
    password: "", // la contraseña
  });

  // VALIDACIONES CON YUP
  const loginSchema = Yup.object().shape({
    user: Yup.string()
      .required("El nombre de usuario o correo electrónico es requerido.")
      .min(3, "El usuario debe tener al menos 3 caracteres."), // validación de longitud mínima
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres.")
      .required("La contraseña es requerida."),
  });

  // para actualizar el estado de los inputs
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const auth = useAuth();

  // para el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validar el formulario con Yup sobre los campos 'user' y 'password'
      await loginSchema.validate(inputs, { abortEarly: false });

      // Llama a la función de login del contexto de autenticación
      auth.login(inputs);

      // Si el login es exitoso, puedes redirigir al usuario
      navigate('/dashboard');
      toast.success("¡Inicio de sesión exitoso!"); // Mensaje de éxito
    } catch (err) {
      if (err.name === "ValidationError") {
        // Se itera sobre todos los errores de validación de Yup y se muestran
        err.inner.forEach((error) => {
          if (error?.message) {
            toast.error(error.message);
          }
        });
      } else {
        // Otros errores (de la API o la función auth.login)
        console.error("Error durante el inicio de sesión:", err);
        toast.error("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <i className="fas fa-lock login-icon"></i>
          <h2>Bienvenido de nuevo</h2>
          <p>Inicia sesión para continuar comprando</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-user icon"></i>
            <input
              type="text"
              id="username"
              name="user"
              placeholder="Nombre de usuario o correo electrónico"
              required
              value={inputs.user}
              onChange={handleInput}
            />
          </div>
          <div className="input-group">
            <i className="fas fa-lock icon"></i>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              required
              value={inputs.password}
              onChange={handleInput}
            />
          </div>
          <div className="options-group">
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Recordarme</label>
            </div>
            <Link
              to="/sign-up">
            <a className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
            </Link>
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
        <div className="signup-link">
          <p>
            ¿No tienes una cuenta? 
            <Link
              to="/forgotpassword">
              <a>Regístrate aquí</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
