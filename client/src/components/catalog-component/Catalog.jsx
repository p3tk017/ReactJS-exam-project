import styles from './Catalog.module.css';
import { Link } from 'react-router-dom';

export default function Catalog() {
    const products = [
        { id: 1, brand: "Xerjoff", name: "Erba Pura", price: "$159.99", image: "https://cdn.notinoimg.com/detail_main_mq/xerjoff/2800018180231_01-o/erba-pura___240808.jpg" },
        { id: 2, brand: "Creed", name: "Aventus", price: "$299.99", image: "https://cdn.notinoimg.com/detail_main_mq/creed/3508441001114_01n-o/aventus___180419.jpg" },
        { id: 3, brand: "Dior", name: "Sauvage", price: "$99.99", image: "https://cdn.notinoimg.com/detail_main_mq/dior/3348901486392_01/sauvage___200828.jpg" },
    ];

    return (
        <div className={styles.catalogContainer}>
            <h2 className={styles.heading}>Whole Collection</h2>
            <div className={styles.productGrid}>
                {products.map(product => (
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