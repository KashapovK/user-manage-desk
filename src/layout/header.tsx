import type { UserWithStatus } from '../types/types';

interface HeaderProps {
  user?: UserWithStatus;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img
            className="header__logo-image"
            src="/icons/logo.svg"
            alt="Логотип"
            width={124}
            height={24}
          />
        </div>

        <div className="header__right">
          <ul
            className="header__icons"
            role="list"
            aria-label="Действия: уведомления, избранное"
          >
            <li
              className="header__icons-item header__icons-item--notification"
              data-action="notification"
            >
              <img
                src="/icons/notification.svg"
                alt="Уведомления"
                width={24}
                height={24}
                className="header__icon-image"
              />
            </li>

            <li
              className="header__icons-item header__icons-item--favorite"
              data-action="favorite"
            >
              <img
                src="/icons/favorite.svg"
                alt="Избранное"
                width={24}
                height={24}
                className="header__icon-image"
              />
            </li>
          </ul>

          {user ? (
            <div className="header__user">
              {user.avatar ? (
                <img
                  className="header__user-avatar"
                  src={user.avatar}
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
          ) : (
            <div className="header__user header__user--empty">Гость</div>
          )}
        </div>
      </div>
    </header>
  );
}
