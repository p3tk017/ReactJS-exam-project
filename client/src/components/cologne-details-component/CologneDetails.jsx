import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './CologneDetails.module.css';

export default function CologneDetails() {
    const { cologneId } = useParams();
    const [fragrance, setFragrance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/colognes/${cologneId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Fragrance not found");
                }
                return res.json();
            })
            .then(data => {
                setFragrance(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [cologneId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <Navigate to="/404" />;


    return (
        <div className={styles.detailsContainer}>
            <img src={fragrance.image} alt={fragrance.name} className={styles.image} />
            <div className={styles.info}>
                <h1 className={styles.name}>{fragrance.name}</h1> {/* Add link to brand */} 
                <p className={styles.brand}>{fragrance.brand}</p>
                <p className={styles.type}>Type: {fragrance.type}</p>
                <p className={styles.description}>{fragrance.description}</p>
            </div>
        </div>
    );
}