import { useNavigate } from 'react-router';
import logo from '@/assets/icons/logo.svg';
import styles from './logo.module.scss';

export function HeaderLogo() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className={styles.logoButton}
      aria-label="Перейти на главную страницу"
    >
      <img src={logo} alt="Логотип" />
    </button>
  );
}
