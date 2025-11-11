import styles from './info.module.scss';
import { UserCardDropdown } from '../dropdown/dropdown';
import type { UserStatus } from '@/types/types';
import type React from 'react';

interface DropdownProps {
  isOpen: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onEdit: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
  onHide: () => void;
  userStatus: UserStatus;
}

interface UserCardInfoProps {
  username: string;
  companyName: string;
  city: string;
  dropdown: DropdownProps;
}

export function UserCardInfo({
  username,
  companyName,
  city,
  dropdown,
}: UserCardInfoProps) {
  return (
    <div className={styles.cardGrid}>
      <div className={styles.info}>
        <p className={styles.username} title={username}>
          {username}
        </p>

        <p className={styles.company} title={companyName}>
          {companyName}
        </p>

        <span className={styles.city} title={city}>
          {city}
        </span>
      </div>

      <UserCardDropdown {...dropdown} />
    </div>
  );
}
