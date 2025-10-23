import { create } from "zustand"
import type { UserWithStatus, UserStatus } from "../types/types"

interface UserStore {
  users: UserWithStatus[]
  setUsers: (users: UserWithStatus[]) => void
  updateUserStatus: (userId: number, status: UserStatus) => void
  updateUser: (userId: number, updates: Partial<UserWithStatus>) => void
  getUserById: (userId: number) => UserWithStatus | undefined
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  setUsers: (users) => set({ users }),
  updateUserStatus: (userId, status) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === userId ? { ...user, status } : user)),
    })),
  updateUser: (userId, updates) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === userId ? { ...user, ...updates } : user)),
    })),
  getUserById: (userId) => get().users.find((user) => user.id === userId),
}))
