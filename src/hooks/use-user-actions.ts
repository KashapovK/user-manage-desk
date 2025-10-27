import { useNavigate } from 'react-router';
import { useUserStore } from '../store/store';
import type { UserStatus } from '../types/types';

export function useUserActions(userId: number) {
  const navigate = useNavigate();
  const updateUserStatus = useUserStore((state) => state.updateUserStatus);

  const handleEdit = () => {
    navigate(`/edit/${userId}`);
  };

  const handleArchive = () => {
    updateUserStatus(userId, 'archived');
  };

  const handleUnarchive = () => {
    updateUserStatus(userId, 'active');
  };

  const handleHide = () => {
    updateUserStatus(userId, 'hidden');
  };

  const changeStatus = (status: UserStatus) => {
    updateUserStatus(userId, status);
  };

  return {
    handleEdit,
    handleArchive,
    handleUnarchive,
    handleHide,
    changeStatus,
  };
}
