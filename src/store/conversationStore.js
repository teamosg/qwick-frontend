import { create } from "zustand";

export const useConversationStore = create(
    (set) => ({
        fetchedConversationList: [],
        setFetchedConversationList: conversationList => set({ fetchedConversationList: conversationList }),
    })
)
