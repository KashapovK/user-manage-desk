import { EditUserForm } from '@/components/forms/edit-user-form/edit-user-form';
import { ProfileSidebar } from '@/components/ui/profile-sidebar/profile-sidebar';
import { BackButton } from '@/components/ui/back-button/back-button';
import { UserNotFound } from '@/components/user/not-found/not-found';
import { useUserFormData } from '@/hooks/forms/use-user-form-data';
import RequestSuspense from '@/components/request-suspense/request-suspense';
import styles from './edit.module.scss';

export default function EditPage() {
  const { userId, user, updateUser } = useUserFormData();

  if (!userId) {
    return <RequestSuspense />;
  }

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <main>
      <div className={styles.backButtonWrapper}>
        <BackButton />
      </div>

      <div className={styles.content}>
        <ProfileSidebar
          avatarSrc={user.avatar}
          avatarAlt={user.name ? `Аватар ${user.name}` : 'Аватар'}
        />

        <section className={styles.mainContent}>
          <h1 className={styles.title}>Данные профиля</h1>
          <EditUserForm user={user} updateUser={updateUser} />
        </section>
      </div>
    </main>
  );
}
