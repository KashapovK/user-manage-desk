import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { useUserStore } from '../store/store';
import type { UserWithStatus } from '../types/types';

const userSchema = z.object({
  name: z.string().min(2, 'Имя должно быть от 2 до 64 символов').max(64),
  username: z
    .string()
    .min(2, 'Никнейм должен быть от 2 до 64 символов')
    .max(64),
  email: z.email('Некорректный email'),
  city: z.string().min(2, 'Город должен быть от 2 до 64 символов').max(64),
  phone: z.string().regex(/^\d+$/, 'Телефон должен содержать только цифры'),
  companyName: z
    .string()
    .min(2, 'Название компании должно быть от 2 до 64 символов')
    .max(64),
});

type UserFormData = z.infer<typeof userSchema>;

interface EditUserFormProps {
  user: UserWithStatus;
}

export function EditUserForm({ user }: EditUserFormProps) {
  const updateUser = useUserStore((state) => state.updateUser);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.address.city,
      phone: user.phone,
      companyName: user.company.name,
    },
  });

  useEffect(() => {
    reset({
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.address.city,
      phone: user.phone,
      companyName: user.company.name,
    });
  }, [user, reset]);

  const onSubmit = async (data: UserFormData) => {
    // Симуляция задержки, для наглядности соотвествия тз
    await new Promise((resolve) => setTimeout(resolve, 3000));

    updateUser(user.id, {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      address: { ...user.address, city: data.city },
      company: { ...user.company, name: data.companyName },
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="edit-user-form">
      {showSuccess && (
        <div
          className="edit-user-form__popup"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="edit-user-form__popup-content"
            onClick={(e) => e.stopPropagation()} // чтобы клик по контенту не закрывал окно
          >
            <span>Изменения успешно сохранены!</span>
            <button
              type="button"
              className="edit-user-form__popup-close"
              onClick={() => setShowSuccess(false)}
            >
              <img
                src="/icons/cross.svg"
                alt="Закрыть"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="edit-user-form__form">
        <div className="edit-user-form__group">
          <label htmlFor="name" className="edit-user-form__label">
            Имя
          </label>
          <input
            id="name"
            {...register('name')}
            className="edit-user-form__input"
            placeholder="Введите полное имя"
          />
          {errors.name && (
            <p className="edit-user-form__error">{errors.name.message}</p>
          )}
        </div>

        <div className="edit-user-form__group">
          <label htmlFor="username" className="edit-user-form__label">
            Никнейм
          </label>
          <input
            id="username"
            {...register('username')}
            className="edit-user-form__input"
            placeholder="Введите никнейм"
          />
          {errors.username && (
            <p className="edit-user-form__error">{errors.username.message}</p>
          )}
        </div>

        <div className="edit-user-form__group">
          <label htmlFor="email" className="edit-user-form__label">
            Почта
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="edit-user-form__input"
            placeholder="Введите email"
          />
          {errors.email && (
            <p className="edit-user-form__error">{errors.email.message}</p>
          )}
        </div>

        <div className="edit-user-form__group">
          <label htmlFor="city" className="edit-user-form__label">
            Город
          </label>
          <input
            id="city"
            {...register('city')}
            className="edit-user-form__input"
            placeholder="Введите город"
          />
          {errors.city && (
            <p className="edit-user-form__error">{errors.city.message}</p>
          )}
        </div>

        <div className="edit-user-form__group">
          <label htmlFor="phone" className="edit-user-form__label">
            Телефон
          </label>
          <input
            id="phone"
            {...register('phone')}
            className="edit-user-form__input"
            placeholder="Введите телефон"
          />
          {errors.phone && (
            <p className="edit-user-form__error">{errors.phone.message}</p>
          )}
        </div>

        <div className="edit-user-form__group">
          <label htmlFor="companyName" className="edit-user-form__label">
            Навзание компании
          </label>
          <input
            id="companyName"
            {...register('companyName')}
            className="edit-user-form__input"
            placeholder="Введите название компании"
          />
          {errors.companyName && (
            <p className="edit-user-form__error">
              {errors.companyName.message}
            </p>
          )}
        </div>

        <div className="edit-user-form__actions">
          <button
            type="submit"
            className="edit-user-form__button edit-user-form__button--primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
}
