import { useParams, Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './BrandDetails.module.css';

export default function BrandDetails({user}) {
    const { brandId } = useParams();
    const [brand, setBrand] = useState(null);
    const [fragrances, setFragrances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const isOwner = user && user._id === brand?.ownerId;

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/brands`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                const selectedBrand = data[brandId];
                if (!selectedBrand) throw new Error("Brand not found");

                setBrand(selectedBrand);
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
                        <Link to={`/catalog/${frag.id}`} key={frag.id}>
                            <div className={styles.productCard}>
                                <img src={frag.image} alt={frag.name} />
                                <h2>{frag.name}</h2>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No fragrances found for this brand.</p>
                )}

                {isOwner && (
                    <Link to={`/brands/add-cologne/${brand._id}`} className={styles.addButton}>
                        <i className="fa-solid fa-plus"></i>
                    </Link>
                )}
            </div>
        </div>
    );
}