import { BackButton } from '@/components/ui/back-button/back-button';
import styles from './not-found.module.scss';

export function UserNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Пользователь не найден</h1>
        <p className={styles.message}>
          Возможно, пользователь был удален или вы перешли по неверной ссылке
        </p>
        <BackButton />
      </div>
    </div>
  );
}
