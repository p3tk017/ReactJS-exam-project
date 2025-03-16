import styles from './Catalog.module.css';

export default function Catalog() {
    const products = [
        { id: 1, name: "Erba Pura", price: "$159.99", image: "https://cdn.notinoimg.com/detail_main_mq/xerjoff/2800018180231_01-o/erba-pura___240808.jpg" },
        { id: 2, name: "Creed Aventus", price: "$299.99", image: "https://via.placeholder.com/200" },
        { id: 3, name: "Dior Sauvage", price: "$99.99", image: "https://via.placeholder.com/200" }
    ];

    return (
        <div className={styles.catalogContainer}>
            <h2 className={styles.heading}>Our Collection</h2>
            <div className={styles.productGrid}>
                {products.map(product => (
                    <div key={product.id} className={styles.productCard}>
                        <img src={product.image} alt={product.name} className={styles.productImage} />
                        <h3 className={styles.productName}>{product.name}</h3>
                        <p className={styles.productPrice}>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}