import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useJoinedCommunityStore = create(
    persist(
        (set) => ({
            selectedJoinedCommunity: null,
            setSelectedJoinedCommunity: community => set({ selectedJoinedCommunity: community })
        })
    ),
    {
        name: "selectedJoinedCommunity",
        // getStorage: () => localStorage,
    }
)