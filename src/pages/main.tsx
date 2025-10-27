import RequestSuspense from '../components/request-suspense/request-suspense';
import Header from '../layout/header';
import { useUsersData } from '../hooks/use-users-data';
import { UsersSection } from '../components/user/users-section';
import { EmptyState } from '../components/ui/empty-state';

export default function MainPage() {
  const { activeUsers, archivedUsers, isLoading, error } = useUsersData();

  const getStatusMessage = () => {
    if (isLoading) return 'Загрузка пользователей...';
    if (error) return 'Ошибка загрузки пользователей';
    if (activeUsers.length === 0 && archivedUsers.length === 0)
      return 'Нет пользователей для отображения';
    return `Показано ${activeUsers.length} активных и ${archivedUsers.length} архивных пользователей`;
  };

  const hasNoUsers =
    activeUsers.length === 0 && archivedUsers.length === 0 && !isLoading;

  return (
    <>
      <Header />

      <RequestSuspense pending={isLoading}>
        <main className="home-page" id="main-content">
          <div className="home-page__container">
            <h1 className="home-page__title visually-hidden">
              Управление пользователями
            </h1>

            <div
              aria-live="polite"
              aria-atomic="true"
              className="visually-hidden"
            >
              {getStatusMessage()}
            </div>

            <UsersSection
              title="Активные"
              titleId="active-users-title"
              users={activeUsers}
              ariaLabel="Активные"
              modifier="active"
            />

            <UsersSection
              title="Архив"
              titleId="archived-users-title"
              users={archivedUsers}
              ariaLabel="Архивные пользователи"
              modifier="archived"
            />

            {hasNoUsers && (
              <EmptyState message="Нет пользователей для отображения" />
            )}
          </div>
        </main>
      </RequestSuspense>
    </>
  );
}
