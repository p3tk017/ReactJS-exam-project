import React from 'react';
import styles from './About.module.css';

export default function About() {
    return (
        <div className={styles.aboutContainer}>
            <h1 className={styles.heading}>About Us</h1>
            <div className={styles.aboutContent}>
                <p>
                    Welcome to Cologne World, your ultimate destination for exploring and cataloging 
                    the world of perfumes. Our platform is dedicated to preserving the history, artistry, 
                    and craftsmanship of fragrances from renowned brands and independent perfumers alike.
                </p>
                <p>
                    We believe that every fragrance tells a story, and our mission is to document and share 
                    these olfactory experiences with enthusiasts and collectors. Whether you are looking for 
                    details about a classic perfume, niche creations, or limited editions, our archive serves 
                    as a valuable resource.
                </p>
                <p>
                    Thank you for visiting Fragrance Archive. We are committed to continuously expanding our 
                    collection and providing an insightful and engaging experience for all fragrance lovers.
                </p>
            </div>
        </div>
    );
}