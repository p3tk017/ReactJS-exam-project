import { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import styles from "./EditBrand.module.css";
import { UserContext } from "../../contexts/userContext";
import { useParams } from "react-router-dom";

export default function EditBrand() {
    const { user } = useContext(UserContext);
    const { brandId } = useParams();
    const [brand, setBrand] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        logo: "",
        country: "",
        type: "",
        ownerId: user._id
    });

    useEffect(() => {
        if (!brandId) return;

        fetch(`http://localhost:3030/jsonstore/brands/${brandId}`)
            .then(res => res.json())
            .then(data => {
                if (!data) throw new Error("Brand not found");
                setBrand(data);
                setFormData(data);
            })
            .catch((err) => {
                setError(true);
                console.log(err);
            });
    }, [brandId]);

    if (!brand.ownerId) {
        return <p>Loading...</p>;
    }

    const isOwner = user && user._id === brand.ownerId;

    if (!isOwner) {
        return <Navigate to="/" />;
    }

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
            const response = await fetch(`http://localhost:3030/jsonstore/brands/${brandId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to create brand!");
            }

            navigate(`/brands/${brandId}`);

        } catch (err) {
            setError(err.message);  
        }
    };

    return (
        <div className={styles.brandContainer}>
            <h2 className={styles.heading}>Edit Brand</h2>
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

                <button type="submit">Edit Brand</button>
            </form>
        </div>
    );
}