import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovies } from '../../services/movieService';
import SearchMovie from '../../components/SearchMovie/SearchMovie';
import css from './MoviesPage.module.css';
import { BeatLoader } from 'react-spinners';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('query') ?? '');

  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    setSearchParams(query ? { query } : {});
  }, [query, setSearchParams]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    fetchMovies(debouncedQuery)
      .then((data) => setMovies(data || []))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  return (
    <>
      <SearchMovie value={query} onSearch={setQuery} />
      {loading && (
        <div className={css.spinner}>
          <BeatLoader size={15} color="#000" loading={true} />
        </div>
      )}

      {!loading && movies.length === 0 && debouncedQuery && (
        <p className={css.error}>No movies found for “{debouncedQuery}”</p>
      )}

      {Array.isArray(movies) && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </>
  );
}
