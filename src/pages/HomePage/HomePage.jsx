import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/movieService';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then((data) => setMovies(data));
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}
