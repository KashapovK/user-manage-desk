import { useNavigate } from 'react-router';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <div className="page__back">
      <button
        className="button button--ghost button--back"
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Назад"
      >
        <svg
          className="button__icon"
          height={28}
          width={28}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.25 12H0.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 17.25L0.75 12L6 6.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="button__text">Назад</span>
      </button>
    </div>
  );
}
