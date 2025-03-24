import React from "react";
import styles from "./Brands.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Brands() {
    // const brands = [
    //     { id: 3, name: "Xerjoff", type: "Niche", logo: "/brandsLogos/idA_FHUBtQ_1742313404362.png" },
    //     { id: 2, name: "Dior", type: "Designer", logo: "https://cdn.freebiesupply.com/logos/large/2x/dior-logo-png-transparent.png" },
    //     { id: 1, name: "Creed", type: "Niche", logo: "https://logos-download.com/wp-content/uploads/2021/01/Creed_1760_Logo.png" },
    // ];

    const [brands, setBrands] = useState([]);

    useEffect(() => { fetch("http://localhost:3030/jsonstore/brands")
        .then(res => res.json())
        .then(data => {
            const formattedBrands = Object.values(data)
            setBrands(formattedBrands);
        })
        .catch(err => console.log(err));
    }, []); 

    console.log(brands);
    
    return (
        <div className={styles.brandsContainer}>
            <h2 className={styles.heading}>Featured Brands</h2>
            <div className={styles.brandGrid}>
                {brands.map(brand => (
                    <Link to={`/brands/${brand.id}`} key={brand.id}>
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