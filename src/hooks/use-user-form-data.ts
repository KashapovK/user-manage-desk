import { useParams } from 'react-router';
import { useUserStore } from '../store/store';

export function useUserFormData() {
  const params = useParams();
  const userId = Number(params.id);
  const getUserById = useUserStore((s) => s.getUserById);
  const user = getUserById(userId);
  return { userId, user };
}
