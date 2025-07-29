import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
// Si usas toastify, asegúrate de importarlo y configurarlo en tu App.js
// import { toast } from 'react-toastify';

export const ForgotPassword = () => {
    // Estado para controlar el paso actual del formulario (1 para verificación, 2 para nueva contraseña)
    const [currentStep, setCurrentStep] = useState(1);

    // Estados para los inputs de cada paso
    const [verificationInputs, setVerificationInputs] = useState({
        username: "",
        dui: "",
    });
    const [newPasswordInputs, setNewPasswordInputs] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });

    // Estados para los mensajes de la aplicación
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // 'success' o 'error'

    // Manejador genérico para actualizar los inputs del paso actual
    const handleInputChange = (e, formType) => {
        const { name, value } = e.target;
        if (formType === "verification") {
            setVerificationInputs((prev) => ({ ...prev, [name]: value }));
        } else {
            // formType === 'newPassword'
            setNewPasswordInputs((prev) => ({ ...prev, [name]: value }));
        }
        // Limpiar mensajes al cambiar los inputs
        setMessage("");
        setMessageType("");
    };

    // Manejador para el envío del formulario de verificación (Paso 1)
    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar los datos de verificación (username, DUI) al backend y esperar una respuesta.
        console.log("Verificando identidad con:", verificationInputs);

        // *** SIMULACIÓN DE LLAMADA A LA API ***
        // todo conexion con la API para verificación de datos
        // const response = await apiServicePost('/url', verificationInputs);
        // if (response.status === 200) { setCurrentStep(2); } else { setError/Message }

        // Simulación: Si los datos son 'correctos', avanza al paso 2
        if (
            verificationInputs.username === "testuser" &&
            verificationInputs.dui === "12345678"
        ) {
            setMessage(
                "Identidad verificada. Ahora puedes ingresar tu nueva contraseña."
            );
            setMessageType("success");
            setCurrentStep(2); // Avanzar al segundo paso
        } else {
            setMessage(
                "Nombre de usuario o DUI incorrectos. Por favor, inténtalo de nuevo."
            );
            setMessageType("error");
        }
    };

    // Manejador para el envío del formulario de nueva contraseña (Paso 2)
    const handleNewPasswordSubmit = async (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar la nueva contraseña al backend
        console.log("Restableciendo contraseña a:", newPasswordInputs);

        // *** SIMULACIÓN DE LLAMADA A LA API ***
        // todo conexion con la API para registrar nueva contraseña
        // const response = await apiServicePost('url', newPasswordInputs);
        // if (response.status === 200) { showSuccessMessage; navigateToLogin; } else { setError/Message }

        if (
            newPasswordInputs.newPassword === newPasswordInputs.confirmNewPassword &&
            newPasswordInputs.newPassword.length >= 6
        ) {
            setMessage(
                "Contraseña restablecida con éxito. Redirigiendo al inicio de sesión..."
            );
            setMessageType("success");
            // aqui podría ir el rediccionamiento
            // navigate('/login');
            // Por ahora, solo muestra el mensaje y restablece los campos
            setNewPasswordInputs({ newPassword: "", confirmNewPassword: "" });
            setTimeout(() => {
                // Opcional: Volver al paso 1 o redirigir
                setCurrentStep(1); // Para poder probar de nuevo
                setMessage("");
                setMessageType("");
            }, 3000); // Redirige después de 3 segundos
        } else {
            if (
                newPasswordInputs.newPassword !== newPasswordInputs.confirmNewPassword
            ) {
                setMessage("Las contraseñas no coinciden. Por favor, verifica.");
            } else if (newPasswordInputs.newPassword.length < 6) {
                setMessage("La nueva contraseña debe tener al menos 6 caracteres.");
            }
            setMessageType("error");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Encabezado del Paso 1 */}
                {currentStep === 1 && (
                    <div className="login-header">
                        <i className="fas fa-user-shield login-icon"></i>
                        <h2>Verifica tu identidad</h2>
                        <p>Ingresa tus datos para restablecer tu contraseña.</p>
                    </div>
                )}

                {/* Encabezado del Paso 2 */}
                {currentStep === 2 && (
                    <div className="login-header">
                        <i className="fas fa-key login-icon"></i>
                        <h2>Nueva contraseña</h2>
                        <p>Ingresa y confirma tu nueva contraseña.</p>
                    </div>
                )}

                {/* Área para mostrar mensajes */}
                {message && (
                    <div
                        className={`message-area ${messageType === "error" ? "error-message" : "success-message"
                            }`}
                    >
                        <p>{message}</p>
                    </div>
                )}

                {/* Formulario de Verificación (Paso 1) */}
                {currentStep === 1 && (
                    <form
                        className="forgot-password-form"
                        onSubmit={handleVerificationSubmit}
                    >
                        <div className="input-group">
                            <i className="fas fa-user icon"></i>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Nombre de usuario"
                                required
                                value={verificationInputs.username}
                                onChange={(e) => handleInputChange(e, "verification")}
                            />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-id-card icon"></i>
                            <input
                                type="text"
                                id="dui"
                                name="dui"
                                placeholder="DUI"
                                required
                                value={verificationInputs.dui}
                                onChange={(e) => handleInputChange(e, "verification")}
                            />
                        </div>
                        <button type="submit" className="login-button">
                            Continuar
                        </button>
                    </form>
                )}

                {/* Formulario de Nueva Contraseña (Paso 2) */}
                {currentStep === 2 && (
                    <form
                        className="forgot-password-form"
                        onSubmit={handleNewPasswordSubmit}
                    >
                        <div className="input-group">
                            <i className="fas fa-lock icon"></i>
                            <input
                                type="password"
                                id="new-password"
                                name="newPassword"
                                placeholder="Nueva contraseña"
                                required
                                value={newPasswordInputs.newPassword}
                                onChange={(e) => handleInputChange(e, "newPassword")}
                            />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-lock icon"></i>
                            <input
                                type="password"
                                id="confirm-new-password"
                                name="confirmNewPassword"
                                placeholder="Confirmar nueva contraseña"
                                required
                                value={newPasswordInputs.confirmNewPassword}
                                onChange={(e) => handleInputChange(e, "newPassword")}
                            />
                        </div>
                        <button type="submit" className="login-button">
                            Restablecer Contraseña
                        </button>
                    </form>
                )}

                <div className="signup-link">
                    <p>
                        ¿Recordaste tu contraseña?{" "}
                        <Link
                            to="/login">
                            <a>Volver al inicio de sesión</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
