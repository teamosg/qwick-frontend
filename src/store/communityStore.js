import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCommunityStore = create(
    persist(
        (set) => ({
            isLoadingCommunityList: false,
            isErrorCommunityList: false,

            myName: null,
            setMyName: name => set({ myName: name }),

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
