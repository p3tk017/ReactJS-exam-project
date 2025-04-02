import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';

export default function Login({ setUser }) {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

        try {
            const res = await fetch("http://localhost:3030/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Invalid email or password!");
            }

            if (res.message === "Login or password don't match") {
                setError("Invalid email or password!")
            }

            const data = await res.json();
            localStorage.setItem("authToken", data.accessToken);
            setUser(data);
            navigate("/"); 
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.loginContainer}>
            {error && (
                <div className={styles.error}>
                    {error}
                </div>
            )}
            <h1 className={styles.heading}>Login</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                
                <button type="submit">Login</button>
            </form>
            <p className={styles.registerPrompt}>Not registered? <Link to="/register" className={styles.registerLink}>Create an account</Link></p>
        </div>
    );
}