import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommunityStore = create(
    persist(
        (set) => ({
            selectedBrandCommunity: null,
            setSelectedBrandCommunity: community => set({ selectedBrandCommunity: community }),

            selectedCreatorCommunity: null,
            setSelectedCreatorCommunity: community => set({ selectedCreatorCommunity: community }),

            myCommunityList: [],
            setMyCommunityList: communityList => set({ myCommunityList: communityList }),
        })
    ),
    {
        name: "selectedBrandCommunity",
        // getStorage: () => localStorage,
    }
)