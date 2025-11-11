import styles from './user.module.scss';
import { useUserStore } from '@/store/store';

export function HeaderUser() {
  const currentUser = useUserStore((s) =>
    s.users.find((u) => u.id === s.currentUserId),
  );

  if (!currentUser) {
    return <span>Гость</span>;
  }

  return (
    <div className={styles.user}>
      {currentUser.avatar ? (
        <img
          className={styles.userAvatar}
          src={currentUser.avatar}
          alt={currentUser.name}
          width={24}
          height={24}
        />
      ) : (
        <div className={styles.userAvatarPlaceholder}>
          {currentUser.username.slice(0, 2).toUpperCase()}
        </div>
      )}
      <span className={styles.userName}>{currentUser.name}</span>
    </div>
  );
}
