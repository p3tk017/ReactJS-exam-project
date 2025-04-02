import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CologneCreate.module.css";
import { UserContext } from "../../contexts/userContext";

export default function CologneCreate() {
    const { brandId } = useParams();
    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        price: "",
        type: "",
        image: "",
        description: "",
    });

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/brands`)
            .then(res => res.json())
            .then(data => {
                const selectedBrand = data[brandId];

                if (!selectedBrand) {
                    throw new Error("Brand not found");
                }

                setBrand(selectedBrand);
                setLoading(false);

                setFormData(prev => ({
                    ...prev,
                    brand: selectedBrand.name,
                    type: selectedBrand.type,
                }));
            })
            .catch(err => {
                console.error("Error fetching brand:", err);
                setError(true);
                setLoading(false);
            });
    }, [brandId]);

    if (loading || !user) return <p>Loading...</p>;
    if (error) return <p>Error loading brand.</p>;

    const isOwner = user?._id === brand?.ownerId;
    if (!isOwner) {
        navigate("/");
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3030/jsonstore/colognes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(() => {
            navigate(`/brands/${brandId}`);
        })
        .catch(err => console.error("Error:", err));
    };

    return (
        <div className={styles.cologneContainer}>
            <h2 className={styles.heading}>Create Cologne</h2>
            <form className={styles.cologneForm} onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Brand:</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
                
                <label>Price:</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} required />

                <label>Type:</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                    <option value="niche">Niche</option>
                    <option value="designer">Designer</option>
                </select>

                <label>Image URL:</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} required />

                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />

                <button type="submit">Create</button>
            </form>
        </div>
    );
}