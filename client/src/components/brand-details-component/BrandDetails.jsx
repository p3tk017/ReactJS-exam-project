import { useParams, Navigate, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import styles from './BrandDetails.module.css';
import { UserContext } from '../../contexts/userContext';

export default function BrandDetails() {
    const { brandId } = useParams();
    const [brand, setBrand] = useState(null);
    const [fragrances, setFragrances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/brands`)
            .then(res => res.json())
            .then(data => {
                const selectedBrand = data[brandId];
                if (!selectedBrand) throw new Error("Brand not found");

                if (!selectedBrand.likes) {
                    selectedBrand.likes = [];
                }

                setBrand(selectedBrand);
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
                console.log(err);
            });
    }, [brandId]);

    useEffect(() => {
        if (!brand) return;
        
        fetch(`http://localhost:3030/jsonstore/colognes`)
            .then(res => res.json())
            .then(data => {
                const filteredFragrances = Object.values(data).filter(frag => frag.brand === brand.name);
                setFragrances(filteredFragrances);
                setLoading(false);
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
                console.log(err);
            });
    }, [brand]);

    useEffect(() => {
        fetch(`http://localhost:3030/jsonstore/comments/${brandId}`)
            .then(res => res.json())
            .then(data => setComments( Object.values(data) || [] ))
            .catch((err) => console.log(err));
    }, [brandId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();

        if (commentText.trim() === '') return;

        const newComment = {
            author: user.email,
            text: commentText,
            date: new Date().toLocaleString(),
        };

        fetch(`http://localhost:3030/jsonstore/comments/${brandId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        })
            .then((res) => res.json())
            .then((comment) => {
                setComments([...comments, comment]);
                setCommentText('');
            })
            .catch((err) => console.log(err));
    };

    if (loading) return <p>Loading...</p>;
    if (error || !brand) return <Navigate to="/404" />;

    let isOwner = user && user._id === brand?.ownerId;

    if (!brand.ownerId) {
        isOwner = false;
    }

    return (
        <div className={styles.detailsContainer}>
            <div className={styles.brandInfo}>
                <img src={brand.logo} alt={brand.name} className={styles.image} />
                <div className={styles.info}>
                    <h1 className={styles.name}>{brand.name}</h1>
                    <p className={styles.type}>{brand.type}</p>
                    <p className={styles.description}>{brand.description}</p>
                    {isOwner && (
                        <div className={styles.buttonsContainer}>
                            <Link to={`/brands/edit/${brand._id}`} className={styles.editButton}>Edit</Link>
                            <Link to={`/brands/delete/${brand._id}`} className={styles.editButton}>Delete</Link>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.catalogContainer}>
                {fragrances.length > 0 ? (
                    fragrances.map(frag => (
                        <Link to={`/catalog/${frag._id}`} key={frag._id}>
                            <div className={styles.productCard}>
                                <img src={frag.image} alt={frag.name} />
                                <h2>{frag.name}</h2>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No fragrances found for this brand.</p>
                )}

                {isOwner && (
                    <Link to={`/brands/add-cologne/${brand._id}`} className={styles.addButton}>
                        <i className="fa-solid fa-plus"></i>
                    </Link>
                )}
            </div>

            <div className={styles.commentSection}>
                <h2>Comments</h2>

                {!isOwner && (
                    <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className={styles.commentInput}
                        />
                        <button type="submit" className={styles.commentSubmitButton}>Post</button>
                    </form>
                )}

                <div className={styles.commentList}>
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment._id} className={styles.commentCard}>
                                <p><strong>{comment.author}</strong> <span>{comment.date}</span></p>
                                <p>{comment.text}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
