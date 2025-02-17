import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () =>
        set((state) => ({ count: Math.max(0, state.count - 1) })), // Ensuring count doesn't go below 0
      reset: () => set(() => ({ count: 0 })),
    }),
    {
      name: "counter-store",
    }
  )
);
