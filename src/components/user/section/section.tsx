import { UserCard } from '@/components/user/card/card';
import type { UserWithStatus } from '@/types/types';
import styles from './section.module.scss';

interface UsersSectionProps {
  title: string;
  titleId: string;
  users: UserWithStatus[];
  ariaLabel: string;
}

export function UsersSection({
  title,
  titleId,
  users,
  ariaLabel,
}: UsersSectionProps) {
  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <div className={styles.grid} role="list" aria-label={ariaLabel}>
        {users.map((user) => (
          <div className={styles.gridItem} key={user.id} role="listitem">
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </section>
  );
}
