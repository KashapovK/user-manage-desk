import { useParams } from 'react-router';
import { useUserStore } from '@/store/store';

export function useUserFormData() {
  const params = useParams();
  const userId = Number(params.id);
  if (!userId) {
    return { userId, user: undefined };
  }

  const user = useUserStore((s) => s.getUserById(+userId));
  const updateUser = useUserStore((s) => s.updateUser);
  return { userId, user, updateUser };
}
