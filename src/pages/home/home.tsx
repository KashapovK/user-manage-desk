import { useUsersData } from '@/hooks/user/use-users-data';
import { UsersSection } from '@/components/user/section/section';
import { StatusMessage } from '@/components/ui/status-message/status-message';
import { useHomeStatus } from '@/hooks/use-home-status';

export default function HomePage() {
  const { activeUsers, archivedUsers, isLoading, error } = useUsersData();
  const status = useHomeStatus({
    activeUsers,
    archivedUsers,
    isLoading,
    error,
  });

  const showActiveSection = activeUsers.length > 0;
  const showArchivedSection = archivedUsers.length > 0;

  return (
    <main id="main-content">
      <h1 className="visually-hidden">Управление пользователями</h1>

      {status && <StatusMessage {...status} />}
      {showActiveSection && (
        <UsersSection
          title="Активные"
          titleId="active-users-title"
          users={activeUsers}
          ariaLabel="Активные пользователи"
        />
      )}
      {showArchivedSection && (
        <UsersSection
          title="Архив"
          titleId="archived-users-title"
          users={archivedUsers}
          ariaLabel="Архивные пользователи"
        />
      )}
    </main>
  );
}
