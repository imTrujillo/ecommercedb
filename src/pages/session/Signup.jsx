import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

export const SignUp = () => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        dui: "",
        phone: "",
        address: "",
        dob: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }
        alert("Cuenta creada con éxito.");
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <i className="fas fa-user-plus login-icon"></i>
                    <h2>Crea tu cuenta</h2>
                    <p>Únete a nuestra comunidad y empieza a comprar</p>
                </div>
                <form className="create-account-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <i className="fas fa-user icon"></i>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Nombre completo"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-envelope icon"></i>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-id-card icon"></i>
                        <input
                            type="text"
                            name="dui"
                            placeholder="DUI"
                            value={form.dui}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-phone icon"></i>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Teléfono"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-map-marker-alt icon"></i>
                        <input
                            type="text"
                            name="address"
                            placeholder="Dirección"
                            value={form.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-calendar-alt icon"></i>
                        <input
                            type="date"
                            name="dob"
                            placeholder="Fecha de nacimiento"
                            value={form.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-lock icon"></i>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <i className="fas fa-lock icon"></i>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Registrarse</button>
                </form>
                <div className="signup-link">
                    <p>¿Ya tienes una cuenta?
                        <Link
                            to="/login">
                            <a>Inicia sesión aquí</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
