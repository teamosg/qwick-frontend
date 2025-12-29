import { create } from "zustand";

export const useNotificationStore = create((set) => ({
    notifications: [],
    hasUnread: false,
    addNotification: (notification) =>
        set((state) => ({
            notifications: [
                { ...notification, id: Date.now(), timestamp: new Date().toISOString() },
                ...state.notifications,
            ],
            hasUnread: true,
        })),
    clearNotifications: () => set({ notifications: [] }),
    setHasUnread: (value) => set({ hasUnread: value }),
}));

