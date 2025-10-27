import type { UserWithStatus } from '../../types/types';

interface HeaderUserProps {
  user?: UserWithStatus;
}

export function HeaderUser({ user }: HeaderUserProps) {
  if (!user) {
    return <div className="header__user header__user--empty">Гость</div>;
  }

  return (
    <div className="header__user">
      {user.avatar ? (
        <img
          className="header__user-avatar"
          src={user.avatar || '/placeholder.svg'}
          alt={user.name}
          width={24}
          height={24}
        />
      ) : (
        <div className="header__user-avatar-placeholder">
          {user.username.slice(0, 2).toUpperCase()}
        </div>
      )}
      <span className="header__user-name">{user.name}</span>
    </div>
  );
}
