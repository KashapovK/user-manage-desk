// src/hooks/useResetForm.ts
import { useEffect } from 'react';
import type { UseFormReset } from 'react-hook-form';
import type { UserWithStatus } from '../types/types';

export function useResetForm(
  user: UserWithStatus | undefined,
  reset: UseFormReset<any>,
) {
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        phone: user.phone,
        companyName: user.company.name,
      });
    }
  }, [user, reset]);
}
