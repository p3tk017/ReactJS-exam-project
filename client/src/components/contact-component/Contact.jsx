import styles from './Contact.module.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Contact() {
    return (
        <div className={styles.contactContainer}>
            <h1 className={styles.heading}>Contact Us</h1>
            <div className={styles.contactContent}>
                <p>Have questions or suggestions? Reach out to us through our social media channels!</p>
                <div className={styles.socialMedia}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a href="https://instagram.com/_p3tk0_" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                </div>
            </div>
        </div>
    );
}