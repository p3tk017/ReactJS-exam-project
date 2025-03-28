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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
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
                throw new Error("Registration failed!");
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