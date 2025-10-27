import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useUserStore } from '../../store/store';
import { FormField } from './form-field';
import { SuccessPopup } from '../popup/success-popup';
import { useResetForm } from '../../hooks/use-reset-form';
import { useUserFormData } from '../../hooks/use-user-form-data';
import {
  userSchema,
  type UserFormData,
} from '../../utils/validation/user-schema';

export function EditUserForm() {
  const { user } = useUserFormData();
  const updateUser = useUserStore((s) => s.updateUser);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user
      ? {
          name: user.name,
          username: user.username,
          email: user.email,
          city: user.address.city,
          phone: user.phone,
          companyName: user.company.name,
        }
      : undefined,
  });

  useResetForm(user, reset);

  const onSubmit = async (data: UserFormData) => {
    if (!user) return;

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

  if (!user) return null;

  return (
    <div className="edit-user-form">
      {showSuccess && <SuccessPopup onClose={() => setShowSuccess(false)} />}

      <form onSubmit={handleSubmit(onSubmit)} className="edit-user-form__form">
        <FormField
          id="name"
          label="Имя"
          placeholder="Введите полное имя"
          register={register}
          error={errors.name}
          autocomplete="name"
        />
        <FormField
          id="username"
          label="Никнейм"
          placeholder="Введите никнейм"
          register={register}
          error={errors.username}
          autocomplete="username"
        />
        <FormField
          id="email"
          label="Почта"
          placeholder="Введите email"
          register={register}
          error={errors.email}
          type="email"
          autocomplete="email"
        />
        <FormField
          id="city"
          label="Город"
          placeholder="Введите город"
          register={register}
          error={errors.city}
          autocomplete="address-level2"
        />
        <FormField
          id="phone"
          label="Телефон"
          placeholder="Введите телефон"
          register={register}
          error={errors.phone}
          autocomplete="tel"
        />
        <FormField
          id="companyName"
          label="Название компании"
          placeholder="Введите название компании"
          register={register}
          error={errors.companyName}
          autocomplete="organization"
        />

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
