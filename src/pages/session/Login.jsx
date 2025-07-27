import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const Login = () => {
  const [inputs, setInputs] = useState({
    user: "",
    password: "",
  });

  // VALIDACIONES CON YUP
  const loginSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre es requerido")
      .matches(
        /^(?![\W_]+$)[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]+$/,
        "No se permiten caracteres especiales"
      ),
    telefono: Yup.string()
      .required("El teléfono es requerido")
      .matches(/^[0-9]+$/, "El teléfono solo debe contener números")
      .length(8, "El teléfono debe contener exactamente 8 dígitos"),
    email: Yup.string()
      .email("Debe ser un correo válido")
      .required("El correo es requerido"),
  });

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validar el formulario con Yup
      await loginSchema.validate(inputs, { abortEarly: false });

      auth.login(inputs);
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
        console.error("Error al guardar proveedor:", err);
        toast.error("Error al guardar el proveedor.");
      }
    }
  };
  return <div>Login</div>;
};
