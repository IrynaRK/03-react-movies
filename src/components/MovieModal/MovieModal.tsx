import { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import styles from './MovieModal.module.css';
import type { Movie } from "../../types/movie";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
       const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);



    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleEscape);

        return () =>{ 
            window.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
    };
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

     if (!modalRoot) return null;

    return createPortal(
        <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <button className={styles.closeButton} aria-label="close modal" onClick={onClose}>
                    &times;
                </button>
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                 alt={movie.title}
                 className={styles.image} />
                 <div className={styles.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average}/10
                    </p>
                 </div>
            </div>
        </div>,
        modalRoot
    );
}