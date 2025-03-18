import React from 'react';
import styles from './About.module.css';

export default function About() {
    return (
        <div className={styles.aboutContainer}>
            <h1 className={styles.heading}>About Us</h1>
            <div className={styles.aboutContent}>
                <p>
                    Welcome to CologneShop, your ultimate destination for premium fragrances. 
                    Our passion for scents drives us to bring you the finest colognes from world-renowned brands.
                </p>
                <p>
                    We believe that a great fragrance has the power to transform your mood, boost your confidence, 
                    and leave a lasting impression. Our carefully curated selection ensures that you find the perfect 
                    scent to match your personality and style.
                </p>
                <p>
                    Thank you for choosing CologneShop. We are committed to providing you with the best shopping 
                    experience and top-quality fragrances.
                </p>
            </div>
        </div>
    );
}