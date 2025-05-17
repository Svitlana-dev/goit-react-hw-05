import css from './SearchMovie.module.css';

export default function SearchMovie({ value, onSearch }) {
  return (
    <div>
      <p className={css.label}>Find movies by name</p>
      <input
        className={css.search}
        type="text"
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className={css.btn}>Search</button>
    </div>
  );
}
