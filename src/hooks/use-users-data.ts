import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../services/api';
import { useUserStore } from '../store/store';

export function useUsersData() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const {
    users: storeUsers,
    setUsers,
    setCurrentUser,
    currentUserId,
  } = useUserStore();

  useEffect(() => {
    if (users && storeUsers.length === 0) {
      const usersWithStatus = users.slice(0, 6).map((user) => ({
        ...user,
        status: 'active' as const,
      }));

      setUsers(usersWithStatus);

      if (!currentUserId && usersWithStatus.length > 0) {
        setCurrentUser(usersWithStatus[0].id);
      }
    }
  }, [users, storeUsers.length, setUsers, setCurrentUser, currentUserId]);

  const activeUsers = storeUsers.filter((u) => u.status === 'active');
  const archivedUsers = storeUsers.filter((u) => u.status === 'archived');

  return {
    activeUsers,
    archivedUsers,
    isLoading,
    error,
  };
}
