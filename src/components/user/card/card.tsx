import { useDropdown } from '@/hooks/dropdown/use-dropdown';
import { useUserActions } from '@/hooks/user/use-user-actions';
import { UserCardAvatar } from './avatar/avatar';
import { UserCardInfo } from './info/info';
import type { UserWithStatus } from '@/types/types';
import clsx from 'clsx';
import styles from './card.module.scss';

interface UserCardProps {
  user: UserWithStatus;
}

export function UserCard({ user }: UserCardProps) {
  const { isOpen, ref, toggle, close } = useDropdown();
  const { handleEdit, handleArchive, handleUnarchive, handleHide } =
    useUserActions(user.id);

  const isArchived = user.status === 'archived';

  const handleDropdownToggle = () => {
    toggle();
  };

  const handleActionWithClose = (action: () => void) => {
    action();
    close();
  };

  return (
    <article
      ref={ref}
      className={clsx(styles.cardActive, {
        [styles.cardArchived]: isArchived,
      })}
    >
      <UserCardAvatar
        src={user.avatar}
        alt={`Аватар пользователя ${user.name}`}
      />

      <UserCardInfo
        username={user.username}
        companyName={user.company.name}
        city={user.address.city}
        dropdown={{
          isOpen,
          onToggle: handleDropdownToggle,
          onEdit: () => handleActionWithClose(handleEdit),
          onArchive: () => handleActionWithClose(handleArchive),
          onUnarchive: () => handleActionWithClose(handleUnarchive),
          onHide: () => handleActionWithClose(handleHide),
          userStatus: user.status,
        }}
      />
    </article>
  );
}
