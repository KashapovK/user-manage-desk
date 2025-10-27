import { UserCard } from './user-card/user-card';
import type { UserWithStatus } from '../../types/types';

interface UsersSectionProps {
  title: string;
  titleId: string;
  users: UserWithStatus[];
  ariaLabel: string;
  modifier?: 'active' | 'archived';
}

export function UsersSection({
  title,
  titleId,
  users,
  ariaLabel,
  modifier,
}: UsersSectionProps) {
  if (users.length === 0) return null;

  return (
    <section
      className={`user-section ${modifier ? `user-section--${modifier}` : ''}`}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="user-section__title">
        {title}
      </h2>
      <div className="user-section__grid" role="list" aria-label={ariaLabel}>
        {users.map((user) => (
          <div key={user.id} role="listitem">
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </section>
  );
}
