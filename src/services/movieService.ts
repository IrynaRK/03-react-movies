import axios from 'axios';
import type { Movie } from '../types/movie';

interface MoviApiResponse {
results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const response = await axios.get<MoviApiResponse>('https://api.themoviedb.org/3/search/movie', 
        {
        params: { query },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    });
    return response.data.results;
}

