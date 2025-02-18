import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CounterState {
  userCounters: Record<string, number>; // Stores counter for each user
  selectedUserId: string | null;
  setSelectedUser: (userId: string) => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set, get) => ({
      userCounters: {}, // Each user will have their own count
      selectedUserId: null, // No user selected initially

      setSelectedUser: (userId) => set({ selectedUserId: userId }),

      increment: () => {
        const { selectedUserId, userCounters } = get();
        if (!selectedUserId) return; // Don't update if no user is selected

        set({
          userCounters: {
            ...userCounters,
            [selectedUserId]: (userCounters[selectedUserId] || 0) + 1,
          },
        });
      },

      decrement: () => {
        const { selectedUserId, userCounters } = get();
        if (!selectedUserId) return;

        set({
          userCounters: {
            ...userCounters,
            [selectedUserId]: Math.max(
              0,
              (userCounters[selectedUserId] || 0) - 1
            ),
          },
        });
      },

      reset: () => {
        const { selectedUserId, userCounters } = get();
        if (!selectedUserId) return;

        set({
          userCounters: { ...userCounters, [selectedUserId]: 0 },
        });
      },
    }),
    { name: "user-counter-store" }
  )
);
