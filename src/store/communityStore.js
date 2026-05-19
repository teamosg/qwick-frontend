import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommunityStore = create(
    persist(
        (set) => ({

            selectedBrandCommunity: null,
            setSelectedBrandCommunity: community => set({ selectedBrandCommunity: community }),
            removeSelectedBrandCommunity: () => set({ selectedBrandCommunity: null }),

            selectedCreatorCommunity: null,
            setSelectedCreatorCommunity: community => set({ selectedCreatorCommunity: community }),
            removeSelectedCreatorCommunity: () => set({ selectedCreatorCommunity: null }),

            myCommunityList: [],
            setMyCommunityList: communityList => set({ myCommunityList: communityList }),

            myCommunityListAnnouncement: [],
            setMyCommunityListAnnouncement: communityList => set({ myCommunityListAnnouncement: communityList }),

        }),
        {
            name: "communityStore",
            // getStorage: () => localStorage,
        }
    )
)
