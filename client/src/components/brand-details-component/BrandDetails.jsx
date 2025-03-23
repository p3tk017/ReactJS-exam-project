import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './BrandDetails.module.css';

export default function BrandDetails() {
    const { brandId } = useParams();
    const [brand, setBrand] = useState(null);
    const [fragrances, setFragrances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/brands/${brandId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Brand not found");
                }
                return res.json();
            })
            .then(data => {
                setBrand(data);
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
                console.log(err);
            });
    }, [brandId]);

    useEffect(() => {
        if (!brand) return;
        
        fetch(`http://localhost:3030/jsonstore/colognes`)
            .then(res => res.json())
            .then(data => {
                const filteredFragrances = Object.values(data).filter(frag => frag.brand === brand.name);
                setFragrances(filteredFragrances);
                setLoading(false);
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
                console.log(err);
            });
    }, [brand]);

    if (loading) return <p>Loading...</p>;
    if (error || !brand) return <Navigate to="/404" />;

    return (
        <div className={styles.detailsContainer}>
            <div className={styles.brandInfo}>
                <img src={brand.logo} alt={brand.name} className={styles.image} />
                <div className={styles.info}>
                    <h1 className={styles.name}>{brand.name}</h1>
                    <p className={styles.type}>{brand.type}</p>
                    <p className={styles.description}>{brand.description}</p>
                </div>
            </div>
            
            <div className={styles.catalogContainer}>
                {fragrances.length > 0 ? (
                    fragrances.map(frag => (
                        <div key={frag.id} className={styles.productCard}>
                            <img src={frag.image} alt={frag.name} />
                            <h2>{frag.name}</h2>
                        </div>
                    ))
                ) : (
                    <p>No fragrances found for this brand.</p>
                )}
            </div>
        </div>
    );
}