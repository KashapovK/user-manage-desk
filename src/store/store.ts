import { create } from "zustand"
import type { UserWithStatus, UserStatus } from "../types/types"

const generateAvatar = (id: number) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`

interface UserStore {
  users: UserWithStatus[]
  setUsers: (users: UserWithStatus[]) => void
  updateUserStatus: (userId: number, status: UserStatus) => void
  updateUser: (userId: number, updates: Partial<UserWithStatus>) => void
  getUserById: (userId: number) => UserWithStatus | undefined
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],

  setUsers: (users) =>
    set({
      users: users.map((user) => ({
        ...user,
        avatar: user.avatar ?? generateAvatar(user.id),
      })),
    }),

  updateUserStatus: (userId, status) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, status } : user
      ),
    })),

  updateUser: (userId, updates) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId
          ? {
              ...user,
              ...updates,
              avatar: updates.avatar ?? user.avatar ?? generateAvatar(user.id),
            }
          : user
      ),
    })),

  getUserById: (userId) => get().users.find((user) => user.id === userId),
}))
