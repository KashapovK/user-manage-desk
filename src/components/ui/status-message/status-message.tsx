import { clsx } from 'clsx';
import styles from './status-message.module.scss';

interface StatusMessageProps {
  type: 'loading' | 'error' | 'empty' | 'success';
  message?: string;
  activeCount?: number;
  archivedCount?: number;
}

export function StatusMessage({
  type,
  message,
  activeCount = 0,
  archivedCount = 0,
}: StatusMessageProps) {
  const getMessage = () => {
    if (message) return message;

    switch (type) {
      case 'loading':
        return 'Загрузка пользователей...';
      case 'error':
        return 'Ошибка загрузки пользователей';
      case 'empty':
        return 'Нет пользователей для отображения';
      case 'success':
        return `Показано ${activeCount} активных и ${archivedCount} архивных пользователей`;
      default:
        return '';
    }
  };

  const className = clsx(
    styles.statusMessage,
    type !== 'success' && styles[type],
    type === 'success' && 'visually-hidden',
  );

  return (
    <div className={className} aria-live="polite" aria-atomic="true">
      {getMessage()}
    </div>
  );
}
