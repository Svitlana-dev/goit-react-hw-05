import axios from 'axios';

const options = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmQ4NWUxY2ZjOTZkNDIxYjVlZmRmNjFhZjRlZDUxYSIsIm5iZiI6MTc0NzQ3NjIxMS40NTYsInN1YiI6IjY4Mjg1ZWYzYjYwMjQ2MDMxNDBiY2Q2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Smar8JfHpIuV1AHyAsDrYs9pgzmmTqRdxYiyzEGeauk',
  },
});

export const fetchMovies = async (query) => {
  const res = await options.get('/search/movie', {
    params: {
      query,
    },
  });
  return res.data.results;
};

export const fetchMovieById = async (movieId) => {
  const res = await options.get(`/movie/${movieId}`);
  return res.data;
};

export const fetchMovieCast = async (movieId) => {
  const res = await options.get(`/movie/${movieId}/credits`);
  return res.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const res = await options.get(`/movie/${movieId}/reviews`);
  return res.data.results;
};

export const fetchTrendingMovies = async () => {
  const res = await options.get('/trending/movie/day');
  return res.data.results;
};
