import { HeaderLogo } from '@/components/layout/header/logo/logo';
import { HeaderActions } from '@/components/layout/header/actions/actions';
import { HeaderUser } from '@/components/layout/header/user/user';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <HeaderLogo />
        <div className={styles.headerRight}>
          <HeaderActions />
          <HeaderUser />
        </div>
      </div>
    </header>
  );
}
