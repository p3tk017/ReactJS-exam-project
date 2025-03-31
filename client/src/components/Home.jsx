import { Link } from "react-router";
import { useState, useEffect } from "react";

export default function Home() {
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
        <>
            <section className="hero">
                <h1>Discover Your Signature Scent</h1>
                <p>Explore our collection of premium colognes.</p>
                <Link id="button" to="/catalog">View Now</Link>
            </section>
        
            <section className="products">
                <h2>Featured Colognes</h2>
                <div className="product-grid">
                    {colognes.slice(0, 3).map(product => (
                        <Link to={`/catalog/${product._id}`} key={product._id}>
                            <div className="product" key={product._id}>
                                <img src={product.image} alt={product.name} />
                                <h3>{product.brand}</h3>
                                <p>{product.name}</p>
                                <p className="productPrice">${product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}