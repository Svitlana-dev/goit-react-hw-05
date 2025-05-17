import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/movieService';
import css from './MovieReviews.module.css';
import { BeatLoader } from 'react-spinners';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchMovieReviews(movieId)
      .then((data) => setReviews(data))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div>
      {loading && (
        <div className={css.spinner}>
          <BeatLoader size={15} color="#000" loading={true} />
        </div>
      )}
      {reviews.length > 0
        ? reviews.map((review) => (
            <div key={review.id} className={css.review}>
              <h3 className={css.title}>Author: {review.author}</h3>
              <p className={css.body}>{review.content}</p>
            </div>
          ))
        : !loading && <p>No reviews available for this movie.</p>}
    </div>
  );
}
