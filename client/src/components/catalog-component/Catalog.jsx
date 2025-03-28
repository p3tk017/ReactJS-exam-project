import { useState, useEffect } from 'react';
import styles from './Catalog.module.css';
import { Link } from 'react-router-dom';

export default function Catalog() {
    const [colognes, setColognes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/colognes")
            .then(res => res.json())
            .then(data => {
                const formattedColognes = Object.values(data);
                setColognes(formattedColognes);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.catalogContainer}>
            <h2 className={styles.heading}>Whole Collection</h2>
            <div className={styles.productGrid}>
                {colognes.map(product => (
                    <Link to={`/catalog/${product.id}`} key={product.id}>
                        <div className={styles.productCard}>
                            <img src={product.image} alt={product.name} className={styles.productImage} />
                            <h3 className={styles.productName}>{product.brand}</h3>
                            <p>{product.name}</p>
                            <p className={styles.productPrice}>{product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}