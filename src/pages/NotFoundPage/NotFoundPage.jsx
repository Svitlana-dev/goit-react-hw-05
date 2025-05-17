import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div>
      <p className={css.error}>404... Page not found...</p>
    </div>
  );
}
