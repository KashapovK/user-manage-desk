import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UserWithStatus } from '@/types/types';
import type { UserFormData } from '@/utils/validation/user-schema';
import { userSchema } from '@/utils/validation/user-schema';

export function useUserForm(user: UserWithStatus) {
  const defaultValues = useMemo<UserFormData>(
    () => ({
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      city: user.address.city || '',
      phone: user.phone || '',
      companyName: user.company.name || '',
    }),
    [user],
  );

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues,
    mode: 'onChange',
  });

  return {
    ...form,
    defaultValues,
  };
}
