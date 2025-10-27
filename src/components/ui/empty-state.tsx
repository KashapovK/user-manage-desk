interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="home-page__empty" role="status" aria-live="polite">
      <p className="home-page__empty-text">{message}</p>
    </div>
  );
}
