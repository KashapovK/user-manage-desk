import { create } from 'zustand';
import type { UserWithStatus, UserStatus } from '../types/types';
import { getAvatarUrl } from '../utils/generate-avatar';

interface UserStore {
  users: UserWithStatus[];
  currentUserId: number | null;
  setUsers: (users: UserWithStatus[]) => void;
  setCurrentUser: (userId: number) => void;
  getCurrentUser: () => UserWithStatus | undefined;
  updateUserStatus: (userId: number, status: UserStatus) => void;
  updateUser: (userId: number, updates: Partial<UserWithStatus>) => void;
  getUserById: (userId: number) => UserWithStatus | undefined;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  currentUserId: null,

  setUsers: (users) =>
    set({
      users: users.map((user) => ({
        ...user,
        avatar: getAvatarUrl(user.avatar, user.id),
      })),
    }),

  setCurrentUser: (userId) => set({ currentUserId: userId }),

  getCurrentUser: () =>
    get().users.find((user) => user.id === get().currentUserId),

  updateUserStatus: (userId, status) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, status } : user,
      ),
    })),

  updateUser: (userId, updates) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              ...updates,
              avatar: getAvatarUrl(updates.avatar, userId),
            }
          : user,
      ),
    })),

  getUserById: (userId) => get().users.find((user) => user.id === userId),
}));
