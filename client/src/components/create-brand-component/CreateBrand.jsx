import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateBrand.module.css";
import { UserContext } from "../../contexts/userContext";

export default function BrandCreate() {   
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        logo: "",
        country: "",
        type: "",
        ownerId: user._id
    });

    const {user} = useContext(UserContext);

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

        if (!formData.name || !formData.description || !formData.logo || !formData.country || !formData.type) {
            setError("All fields are required!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3030/jsonstore/brands", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to create brand!");
            }

            navigate("/brands");

        } catch (err) {
            setError(err.message);  
        }
    };

    return (
        <div className={styles.brandContainer}>
            <h2 className={styles.heading}>Create New Brand</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.brandForm}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>

                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </label>

                <label>
                    Logo Image Link:
                    <input type="text" name="logo" value={formData.logo} onChange={handleChange} required />
                </label>

                <label>
                    Country:
                    <input type="text" name="country" value={formData.country} onChange={handleChange} required />
                </label>

                <label>
                    Type:
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="niche">Niche</option>
                        <option value="designer">Designer</option>
                    </select>
                </label>

                <button type="submit">Create Brand</button>
            </form>
        </div>
    );
}