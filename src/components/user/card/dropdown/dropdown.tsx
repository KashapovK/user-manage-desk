import type React from 'react';
import type { UserStatus } from '@/types/types';
import { DropdownIcon } from '@/components/ui/icons/dropdown';
import { useDropdownPosition } from '@/hooks/dropdown/use-dropdown-position';
import styles from './dropdown.module.scss';

interface UserCardDropdownProps {
  isOpen: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onEdit: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
  onHide: () => void;
  userStatus: UserStatus;
}

export function UserCardDropdown({
  isOpen,
  onToggle,
  onEdit,
  onArchive,
  onUnarchive,
  onHide,
  userStatus,
}: UserCardDropdownProps) {
  const { triggerRef, dropdownRef } = useDropdownPosition(isOpen);

  return (
    <div className={styles.dropdownWrapper}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.dropdownToggle}
        onClick={onToggle}
        aria-label="Открыть меню пользователя"
        aria-expanded={isOpen}
      >
        <DropdownIcon />
      </button>

      {isOpen && (
        <nav
          ref={dropdownRef}
          className={styles.dropdown}
          aria-label="Действия с пользователем"
        >
          {userStatus === 'active' ? (
            <>
              <button className={styles.dropdownItem} onClick={onEdit}>
                Редактировать
              </button>
              <button className={styles.dropdownItem} onClick={onArchive}>
                Архивировать
              </button>
              <button className={styles.dropdownItem} onClick={onHide}>
                Скрыть
              </button>
            </>
          ) : (
            <button className={styles.dropdownItem} onClick={onUnarchive}>
              Активировать
            </button>
          )}
        </nav>
      )}
    </div>
  );
}
