import { FavoriteIcon } from '@/components/ui/icons/favorite';
import { NotificationIcon } from '@/components/ui/icons/notification';
import styles from './actions.module.scss';

export function HeaderActions() {
  const actions = [
    {
      id: 'notification',
      icon: NotificationIcon,
      alt: 'Уведомления',
    },
    {
      id: 'favorite',
      icon: FavoriteIcon,
      alt: 'Избранное',
    },
  ];

  return (
    <ul
      className={styles.icons}
      role="list"
      aria-label="Действия: уведомления, избранное"
    >
      {actions.map((action) => {
        const IconComponent = action.icon;
        return (
          <li
            key={action.id}
            className={styles.iconsItem}
            data-action={action.id}
          >
            <IconComponent
              className={styles.iconImage}
              aria-label={action.alt}
            />
          </li>
        );
      })}
    </ul>
  );
}
