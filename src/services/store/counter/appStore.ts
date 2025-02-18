import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  userId: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  count: number; // Moved count inside the user object
}

interface AppState {
  users: User[];
  selectedUserId: string | null;
  setSelectedUser: (userId: string) => void;
  addUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      users: [],
      selectedUserId: null,

      setSelectedUser: (userId) => set({ selectedUserId: userId }),

      addUser: (user) =>
        set((state) => {
          return { users: [...state.users, user] };
        }),

      deleteUser: (userId) =>
        set((state) => {
          const filterUsers = state.users.filter(
            (element) => element.userId !== userId
          );
          return { users: filterUsers };
        }),

      increment: () => {
        const { selectedUserId, users } = get();
        if (!selectedUserId) return;

        set({
          users: users.map((user) =>
            user.userId === selectedUserId
              ? { ...user, count: user.count + 1 }
              : user
          ),
        });
      },

      decrement: () => {
        const { selectedUserId, users } = get();
        if (!selectedUserId) return;

        set({
          users: users.map((user) =>
            user.userId === selectedUserId
              ? { ...user, count: Math.max(0, user.count - 1) }
              : user
          ),
        });
      },

      reset: () => {
        const { selectedUserId, users } = get();
        if (!selectedUserId) return;

        set({
          users: users.map((user) =>
            user.userId === selectedUserId ? { ...user, count: 0 } : user
          ),
        });
      },
    }),
    { name: "app-store" }
  )
);
