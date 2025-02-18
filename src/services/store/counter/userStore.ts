import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCounterStore } from "./counterStore"; // Import counter store

interface User {
  userId: string;
  name: string;
  address: string;
  email: string;
}

interface UserStore {
  users: User[];
  selectedUserId: string | null;
  setSelectedUser: (userId: string) => void;
  addUser: (user: Omit<User, "userId">) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      selectedUserId: null,

      setSelectedUser: (userId) => {
        set({ selectedUserId: userId });
        useCounterStore.getState().initializeCounter(userId); // Ensure counter is initialized
      },

      addUser: (user) =>
        set((state) => {
          const newUser = { ...user, userId: crypto.randomUUID() };
          useCounterStore.getState().initializeCounter(newUser.userId); // Initialize counter
          return { users: [...state.users, newUser] };
        }),
    }),
    { name: "user-store" }
  )
);
