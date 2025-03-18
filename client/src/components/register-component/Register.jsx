import React, { useState } from 'react';
import styles from './Register.module.css';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User registered:', formData);
    };

    return (
        <div className={styles.registerContainer}>
            <h1 className={styles.heading}>Register</h1>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                
                <button type="submit">Register</button>
            </form>
        </div>
    );
}