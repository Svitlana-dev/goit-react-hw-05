import { Suspense, useEffect, useRef, useState } from 'react';
import {
  NavLink,
  useParams,
  Outlet,
  Link,
  useLocation,
} from 'react-router-dom';
import { fetchMovieById } from '../../services/movieService';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';
import { BeatLoader } from 'react-spinners';

const getActiveLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function MovieDetailsPage() {
  const location = useLocation();
  const backlinkRef = useRef(location.state);

  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieById(movieId).then((data) => setMovie(data));
  }, [movieId]);

  return (
    <div>
      <Link to={backlinkRef.current} className={css.back}>
        Go back
      </Link>

      {movie && (
        <div className={css.wrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className={css.poster}
          />

          <div className={css.info}>
            <h2>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </h2>
            <p>User Score: {Math.round(movie.vote_average * 10)}%</p>

            <h3>Overview</h3>
            <p>{movie.overview}</p>

            <h3>Genres</h3>
            <p>{movie.genres.map((genre) => genre.name).join(', ')}</p>
          </div>
        </div>
      )}

      <p className={css.additional}>Additional information</p>
      <ul className={css.list}>
        <li>
          <NavLink to="cast" className={getActiveLinkClass}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={getActiveLinkClass}>
            Reviews
          </NavLink>
        </li>
      </ul>

      <Suspense
        fallback={
          <div className={css.spinner}>
            <BeatLoader size={15} color="#000" loading={true} />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
}
