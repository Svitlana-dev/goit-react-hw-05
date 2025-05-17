import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  if (!Array.isArray(movies)) return null;

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.listItem}>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
            className={css.image}
          />

          <h3 className={css.movieTitle}>{movie.title}</h3>

          <Link
            className={css.link}
            to={`/movies/${movie.id}`}
            state={location}
          >
            Details
          </Link>
        </li>
      ))}
    </ul>
  );
}
