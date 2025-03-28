import React from "react";
import styles from "./Brands.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Brands() {
    const [brands, setBrands] = useState([]);

    useEffect(() => { fetch("http://localhost:3030/jsonstore/brands")
        .then(res => res.json())
        .then(data => {
            const formattedBrands = Object.values(data)
            setBrands(formattedBrands);
        })
        .catch(err => console.log(err));
    }, []); 
    
    return (
        <div className={styles.brandsContainer}>
            <h2 className={styles.heading}>Featured Brands</h2>
            <div className={styles.brandGrid}>
                {brands.map(brand => (
                    <Link to={`/brands/${brand._id}`} key={brand._id}>
                        <div className={styles.brandCard}>
                            <img src={brand.logo} alt={brand.name} className={styles.brandLogo} />
                            <h3 className={styles.brandName}>{brand.name}</h3>
                            <p className={styles.brandType}>{brand.type}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}