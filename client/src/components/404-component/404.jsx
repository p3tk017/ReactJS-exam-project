import { Link } from 'react-router-dom';
import styles from './404.module.css';

export default function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <h1 className={styles.heading}>404 - Page Not Found</h1>
            <p className={styles.message}>Oops! The page you are looking for does not exist.</p>
            <Link to="/" className={styles.homeLink}>Go Back Home</Link>
        </div>
    );
}