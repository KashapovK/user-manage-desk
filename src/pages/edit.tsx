import { EditUserForm } from '../components/forms/edit-user-form';
import { ProfileSidebar } from '../components/ui/profile-sidebar';
import { BackButton } from '../components/ui/back-button';
import { UserNotFound } from '../components/user/not-found/user-not-found';
import { useUserFormData } from '../hooks/use-user-form-data';
import RequestSuspense from '../components/request-suspense/request-suspense';
import Header from '../layout/header';

export default function EditPage() {
  const { user } = useUserFormData();

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <>
      <Header />
      <RequestSuspense pending={!user}>
        <main className="page__main">
          <div className="page__container">
            <BackButton />

            <div className="page__content">
              <section className="profile">
                <ProfileSidebar
                  avatarSrc={user.avatar}
                  avatarAlt={user.name ? `Аватар ${user.name}` : 'Аватар'}
                />

                <div className="profile__content">
                  <h1 className="profile__title h2">Данные профиля</h1>

                  <EditUserForm />
                </div>
              </section>
            </div>
          </div>
        </main>
      </RequestSuspense>
    </>
  );
}
