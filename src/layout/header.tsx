import { useUserStore } from '../store/store';
import { HeaderLogo } from './header/header-logo';
import { HeaderActions } from './header/header-actions';
import { HeaderUser } from './header/header-user';

export default function Header() {
  const currentUser = useUserStore((s) =>
    s.users.find((u) => u.id === s.currentUserId),
  );

  return (
    <header className="header">
      <div className="header__container">
        <HeaderLogo />

        <div className="header__right">
          <HeaderActions />
          <HeaderUser user={currentUser} />
        </div>
      </div>
    </header>
  );
}
