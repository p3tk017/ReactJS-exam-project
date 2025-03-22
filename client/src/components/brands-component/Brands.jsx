import React from "react";
import styles from "./Brands.module.css";

export default function Brands() {
    const brands = [
        { id: 1, name: "Xerjoff", type: "Niche", logo: "/brandsLogos/idA_FHUBtQ_1742313404362.png" },
        { id: 2, name: "Dior", type: "Designer", logo: "https://cdn.freebiesupply.com/logos/large/2x/dior-logo-png-transparent.png" },
        { id: 3, name: "Creed", type: "Niche", logo: "https://logos-download.com/wp-content/uploads/2021/01/Creed_1760_Logo.png" },
    ];

    return (
        <div className={styles.brandsContainer}>
            <h2 className={styles.heading}>Featured Brands</h2>
            <div className={styles.brandGrid}>
                {brands.map(brand => (
                    <div key={brand.id} className={styles.brandCard}>
                        <img src={brand.logo} alt={brand.name} className={styles.brandLogo} />
                        <h3 className={styles.brandName}>{brand.name}</h3>
                        <p className={styles.brandType}>{brand.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}