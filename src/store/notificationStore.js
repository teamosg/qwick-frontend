import { create } from "zustand";

export const useNotificationStore = create((set) => ({
    hasUnread: false,
    setHasUnread: (value) => set({ hasUnread: value }),
}));
