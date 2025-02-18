import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "./userStore"; // Import user store

interface CounterState {
  userCounters: Record<string, number>;
  initializeCounter: (userId: string) => void;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      userCounters: {}, // Each user will have their own count

      initializeCounter: (userId) => {
        set((state) => ({
          userCounters: {
            ...state.userCounters,
            [userId]: state.userCounters[userId] ?? 0, // Ensure counter exists
          },
        }));
      },

      increment: () => {
        const selectedUserId = useUserStore.getState().selectedUserId; // Read from user store
        if (!selectedUserId) return;

        set((state) => ({
          userCounters: {
            ...state.userCounters,
            [selectedUserId]: (state.userCounters[selectedUserId] || 0) + 1,
          },
        }));
      },

      decrement: () => {
        const selectedUserId = useUserStore.getState().selectedUserId; // Read from user store
        if (!selectedUserId) return;

        set((state) => ({
          userCounters: {
            ...state.userCounters,
            [selectedUserId]: Math.max(
              0,
              (state.userCounters[selectedUserId] || 0) - 1
            ),
          },
        }));
      },

      reset: () => {
        const selectedUserId = useUserStore.getState().selectedUserId; // Read from user store
        if (!selectedUserId) return;

        set((state) => ({
          userCounters: {
            ...state.userCounters,
            [selectedUserId]: 0,
          },
        }));
      },
    }),
    { name: "user-counter-store" }
  )
);
