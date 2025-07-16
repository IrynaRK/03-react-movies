import axios from 'axios';
import type { Movie } from '../types/movie';

interface FetchMoviesParams {
    query: string;
}

export const fetchMovies = async ({ query }: FetchMoviesParams): Promise<Movie[]> => {
    const response = await axios.get('/api/search/movie', {
        params: { query },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    });
    return response.data.results;
}
console.log('TOKEN:', import.meta.env.VITE_TMDB_TOKEN);
