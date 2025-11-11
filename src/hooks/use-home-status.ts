import type { UserWithStatus } from '@/types/types';

interface UseHomeStatusProps {
  activeUsers: UserWithStatus[];
  archivedUsers: UserWithStatus[];
  isLoading: boolean;
  error: Error | null;
}

export function useHomeStatus({
  activeUsers,
  archivedUsers,
  isLoading,
  error,
}: UseHomeStatusProps) {
  if (error) return { type: 'error' as const };
  if (!isLoading && activeUsers.length === 0 && archivedUsers.length === 0) {
    return { type: 'empty' as const };
  }
  if (!isLoading && (activeUsers.length > 0 || archivedUsers.length > 0)) {
    return {
      type: 'success' as const,
      activeCount: activeUsers.length,
      archivedCount: archivedUsers.length,
    };
  }
  return null;
}
