import { useState } from "react";
import toast, { Toaster} from "react-hot-toast";
import styles from './App.module.css';

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(false);
    const [selectedMovie,setSelectedMovie] = useState<Movie | null>(null);  
    
    const handleSearch = async (query: string) => {
        setLoading(true);
        setError(false);
        setMovies([]);

        try {
            const results = await fetchMovies(query);

            if (results.length === 0) {
                toast.error('No movies found for your request.');
                return;
            }
            setMovies(results);
        
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectMovie = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div className={styles.app}>
            <Toaster position="top-right" />
            <SearchBar onSubmit={handleSearch} />

            {loading && <Loader />}
            {error && <ErrorMessage />}
            {!loading && !error && movies.length > 0 && (
                <MovieGrid movies={movies} onSelect={handleSelectMovie} />
            )}
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
        </div>
    );
 }