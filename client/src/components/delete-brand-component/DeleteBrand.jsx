import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import styles from "./DeleteBrand.module.css";

export default function DeleteBrand() {
    const { brandId } = useParams();
    const [brand, setBrand] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!brandId) return;

        fetch(`http://localhost:3030/jsonstore/brands/${brandId}`)
            .then(res => res.json())
            .then(data => {
                if (!data) throw new Error("Brand not found");
                setBrand(data);
            })
            .catch((err) => {
                setError(true);
                console.log(err);
            });
    }, [brandId]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/brands/${brandId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete brand!");
            }

            navigate("/brands");

        } catch (err) {
            setError(err.message);
        }
    };

    if (error || !brand) return <Navigate to="/404" />;

    return (
        <div className={styles.deleteContainer}>
            <h2 className={styles.heading}>Are you sure you want to delete {brand.name}?</h2>
            <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
        </div>
    );
}