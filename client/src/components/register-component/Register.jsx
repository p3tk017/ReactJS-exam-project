import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Register.module.css';

export default function Register({ setUser }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!formData.email.includes("@")) {
            console.log("Email must contain '@'");
            return "Email must contain '@'";
        }
        if (formData.email.length < 1) {
            console.log("Missing email!");
            return "Missing email!"
        }
        if (formData.password.length < 5) {
            console.log("Password must be at least 5 characters long");
            return "Password must be at least 5 characters long";
        }
        if (formData.password.length < 1) {
            console.log("Missing password!");
            return "Missing password!";
        }
        if (formData.password !== formData.confirmPassword) {
            console.log("Passwords do not match!");
            return "Passwords do not match!";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            console.log(validationError);
            return;
        }

        try {
            const response = await fetch("http://localhost:3030/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            if (!response.ok) {
                setError("Registration failed!");
            }

            const data = await response.json();
            localStorage.setItem("authToken", data.accessToken);
            navigate("/");
            location.reload();

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.registerContainer}>
            {error && (
                <div className={styles.errorContainer}>
                    <p>{error}</p>
                </div>
            )}  
            <h1 className={styles.heading}>Register</h1>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />

                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                
                <button type="submit">Register</button>
            </form>
        </div>
    );
}