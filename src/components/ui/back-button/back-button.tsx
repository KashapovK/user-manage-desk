import { useNavigate } from 'react-router';
import { BackArrowIcon } from '@/components/ui/icons/backarrow';
import { CaretDownIcon } from '@/components/ui/icons/caret-down';
import styles from './back-button.module.scss';

export function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => navigate(-1);

  return (
    <button
      className={styles.button}
      type="button"
      onClick={handleClick}
      aria-label="Назад"
    >
      <BackArrowIcon className={styles.desktopIcon} />
      <CaretDownIcon className={styles.mobileIcon} />
      <span className={styles.buttonText}>Назад</span>
    </button>
  );
}
