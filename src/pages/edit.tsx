import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { UserWithStatus } from '../types/types';
import { EditUserForm } from '../components/edit-user-form';
import { useUserStore } from '../store/store';
import RequestSuspense from '../components/request-suspense';
import Header from '../layout/header';
import backarrowIcon from '../assets/icons/backarrow.svg';

export default function EditPage() {
  const params = useParams();
  const navigate = useNavigate();
  const userId = Number(params.id);
  const getUserById = useUserStore((s) => s.getUserById);
  const [user, setUser] = useState<UserWithStatus | undefined>(() =>
    getUserById(userId),
  );

  useEffect(() => {
    setUser(getUserById(userId));
  }, [userId, getUserById]);

  if (!user) {
    return (
      <div className="page page--centered">
        <div className="page__content">
          <h1 className="page__title">Пользователь не найден</h1>
          <button
            className="button button--primary"
            onClick={() => navigate('/')}
            type="button"
          >
            <span className="button__text">Вернуться назад</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header user={user} />
      <RequestSuspense pending={!user}>
        <main className="page__main">
          <div className="page__container">
            <div className="page__wrapper">
              <button
                className="button button--ghost button--back"
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Назад"
              >
                <img
                  src={backarrowIcon}
                  alt=""
                  className="button__icon"
                  height={28}
                  width={28}
                />
                <span className="button__text">Назад</span>
              </button>
            </div>

            <div className="page__content">
              <section className="profile">
                <aside className="profile__sidebar">
                  <div className="profile__avatar">
                    <img
                      src={user.avatar}
                      alt={user.name ? `Аватар ${user.name}` : 'Аватар'}
                      className="profile__avatar-image"
                      width={280}
                      height={280}
                    />
                  </div>

                  <ul className="profile__sections">
                    <li className="profile__section-item profile__section-item--active">
                      Данные профиля
                    </li>
                    <li className="profile__section-item">
                      Рабочее пространство
                    </li>
                    <li className="profile__section-item">Приватность</li>
                    <li className="profile__section-item">Безопасность</li>
                  </ul>
                </aside>

                <div className="profile__content">
                  <h1 className="profile__title">Данные профиля</h1>
                  <div className="profile__form">
                    <EditUserForm user={user} />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </RequestSuspense>
    </>
  );
}
