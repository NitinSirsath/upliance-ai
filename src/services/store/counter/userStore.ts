import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  userId: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  setUser: (data: Omit<UserData, "userId">) => void;
}

export const useUserStore = create<UserData>()(
  persist(
    (set) => ({
      userId: crypto.randomUUID(),
      name: "",
      address: "",
      email: "",
      phone: "",
      setUser: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: "user-form",
    }
  )
);
