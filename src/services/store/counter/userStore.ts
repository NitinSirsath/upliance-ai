import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  userId: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

interface UserStore {
  users: UserData[];
  selectedUserId: string | null;
  addUser: (user: Omit<UserData, "userId">) => void;
  setSelectedUser: (userId: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: [],
      selectedUserId: null,
      addUser: (user) =>
        set((state) => {
          const newUser = { ...user, userId: crypto.randomUUID() };
          return { users: [...state.users, newUser] };
        }),
      setSelectedUser: (userId) => set(() => ({ selectedUserId: userId })),
    }),
    {
      name: "user-store",
    }
  )
);
