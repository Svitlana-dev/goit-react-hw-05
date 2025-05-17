import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../services/movieService';
import css from './MovieCast.module.css';
import { BeatLoader } from 'react-spinners';

export default function MovieCast() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchMovieCast(movieId)
      .then((data) => setCast(data))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div>
      {loading && (
        <div className={css.spinner}>
          <BeatLoader size={15} color="#000" loading={true} />
        </div>
      )}

      {cast.length > 0
        ? cast.map((actor) => (
            <div key={actor.id} className={css.cast}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
              )}
              <h3 className={css.title}>{actor.name}</h3>
              <p className={css.body}>Character: {actor.character}</p>
            </div>
          ))
        : !loading && <p>No cast information available.</p>}
    </div>
  );
}
