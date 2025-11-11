import { clsx } from 'clsx';
import styles from './profile-sidebar.module.scss';

interface ProfileSidebarProps {
  avatarSrc?: string;
  avatarAlt: string;
}

const SECTIONS = [
  { id: 1, label: 'Данные профиля', isActive: true },
  { id: 2, label: 'Рабочее пространство', isActive: false },
  { id: 3, label: 'Приватность', isActive: false },
  { id: 4, label: 'Безопасность', isActive: false },
] as const;

export function ProfileSidebar({ avatarSrc, avatarAlt }: ProfileSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.avatar}>
        <img src={avatarSrc} alt={avatarAlt} className={styles.avatarImage} />
      </div>

      <nav>
        <ul className={styles.sectionsList}>
          {SECTIONS.map((section) => (
            <li
              key={section.id}
              className={clsx(
                styles.sectionItem,
                section.isActive && styles.sectionItemActive,
              )}
            >
              {section.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
