import type React from 'react';

import { useDropdown } from '../../../hooks/use-dropdown';
import { useUserActions } from '../../../hooks/use-user-actions';
import { UserCardAvatar } from './user-card-avatar';
import { UserCardInfo } from './user-card-info';
import { UserCardDropdown } from './user-card-dropdown';
import type { UserWithStatus } from '../../../types/types';
import clsx from 'clsx';

interface UserCardProps {
  user: UserWithStatus;
}

export function UserCard({ user }: UserCardProps) {
  const { isOpen, ref, toggle, close } = useDropdown();
  const { handleEdit, handleArchive, handleUnarchive, handleHide } =
    useUserActions(user.id);

  const isArchived = user.status === 'archived';

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle();
  };

  const handleActionWithClose = (action: () => void) => {
    action();
    close();
  };

  return (
    <article
      ref={ref}
      className={clsx('user-card', {
        'user-card--archived': isArchived,
      })}
    >
      <div
        className={clsx('user-card__container', {
          'user-card__container--archived': isArchived,
        })}
      >
        <UserCardAvatar
          src={user.avatar}
          alt={`Аватар пользователя ${user.name}`}
          isArchived={isArchived}
        />

        <div className="user-card__bottom">
          <UserCardInfo
            username={user.username}
            companyName={user.company.name}
            city={user.address.city}
            isArchived={isArchived}
          />

          <UserCardDropdown
            isOpen={isOpen}
            onToggle={handleDropdownToggle}
            onEdit={() => handleActionWithClose(handleEdit)}
            onArchive={() => handleActionWithClose(handleArchive)}
            onUnarchive={() => handleActionWithClose(handleUnarchive)}
            onHide={() => handleActionWithClose(handleHide)}
            userStatus={user.status}
          />
        </div>
      </div>
    </article>
  );
}
