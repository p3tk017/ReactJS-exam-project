import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User logged in:', formData);
    };

    return (
        <div className={styles.loginContainer}>
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