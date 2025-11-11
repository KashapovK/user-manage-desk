import { useState } from 'react';
import type { UserWithStatus } from '@/types/types';
import { SuccessPopup } from '@/components/popups/success';
import { useSuccessPopup } from '@/hooks/common/use-success-popup';
import { useUserForm } from '@/hooks/forms/use-user-form';
import { fields } from '@/utils/const/fields';
import styles from './edit-user-form.module.scss';
import { FormField } from '@/components/forms/form-field/form-field';
import { useEditUserSubmit } from '@/hooks/forms/use-edit-user-submit';

interface EditUserFormProps {
  user: UserWithStatus;
  updateUser: (userId: number, updates: Partial<UserWithStatus>) => void;
}

export function EditUserForm({ user, updateUser }: EditUserFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const { startTimer, clearTimer } = useSuccessPopup(() =>
    setShowSuccess(false),
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    defaultValues,
  } = useUserForm(user);

  const onSubmit = useEditUserSubmit({
    user,
    updateUser,
    setShowSuccess,
    startTimer,
  });

  return (
    <>
      {showSuccess && (
        <SuccessPopup
          onClose={() => {
            setShowSuccess(false);
            clearTimer();
          }}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {fields.map((f) => (
          <FormField
            key={f.id}
            id={f.id}
            label={f.label}
            placeholder={f.placeholder}
            register={register}
            watch={watch}
            setValue={setValue}
            error={errors[f.id]}
            type={f.type}
            autocomplete={f.autocomplete}
            defaultValue={defaultValues[f.id]}
          />
        ))}

        <div>
          <button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </>
  );
}
