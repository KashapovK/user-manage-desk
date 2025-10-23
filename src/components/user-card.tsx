import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUserStore } from '../store/store';
import type { UserWithStatus } from '../types/types';

interface UserCardProps {
  user: UserWithStatus;
}

export function UserCard({ user }: UserCardProps) {
  const navigate = useNavigate();
  const updateUserStatus = useUserStore((state) => state.updateUserStatus);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/edit/${user.id}`);
    setDropdownOpen(false);
  };

  const handleArchive = () => {
    updateUserStatus(user.id, 'archived');
    setDropdownOpen(false);
  };

  const handleUnarchive = () => {
    updateUserStatus(user.id, 'active');
    setDropdownOpen(false);
  };

  const handleHide = () => {
    updateUserStatus(user.id, 'hidden');
    setDropdownOpen(false);
  };

  return (
    <div className="user-card">
      <div className="user-card__header">
        <div className="user-card__avatar">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              width={112}
              height={120}
              className="user-card__avatar-img"
            />
          ) : (
            <span className="user-card__avatar-text">
              {user.username.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <div className="user-card__info">
          <h3 className="user-card__username">{user.username}</h3>
          <p className="user-card__city">{user.address.city}</p>
          <p className="user-card__company">{user.company.name}</p>
        </div>

        <button
          className="user-card__dropdown-toggle"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src="src/assets/icons/Dropdown.svg"
            alt="Меню"
            width={24}
            height={24}
          />
        </button>
      </div>

      {dropdownOpen && (
        <div className="user-card__dropdown">
          <button className="user-card__dropdown-item" onClick={handleEdit}>
            Редактировать
          </button>

          {user.status === 'active' ? (
            <>
              <button
                className="user-card__dropdown-item"
                onClick={handleArchive}
              >
                Архивировать
              </button>
              <button className="user-card__dropdown-item" onClick={handleHide}>
                Скрыть
              </button>
            </>
          ) : user.status === 'archived' ? (
            <button
              className="user-card__dropdown-item"
              onClick={handleUnarchive}
            >
              Активировать
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
