import { List, Pin } from "lucide-react";
import { MessagesSquare } from "lucide-react";
import ChatItem from "./skeletonns/ChatItem";
import { NoDataAlert } from "../Alerts/NoDataAlert";

const SearchedMessageList = ({
    searchedConversation,

    onSelectChat,
    selectedChatId,

    setOpenAddToGroupModal,
    setSelectedChat,
}) => {

    if (!searchedConversation?.length) {
        return <NoDataAlert
            message='No conversations found'
        />
    }


    return (
        <div className="flex-1 overflow-y-auto">
            <div className="p-4 animate-fadeIn">
                <div className="flex items-center gap-2 mb-3">
                    <MessagesSquare className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Searched Conversations
                    </h3>
                </div>
                <div className="space-y-1">
                    {searchedConversation?.map((chat) => (
                        <ChatItem
                            key={chat.user_id || chat.sender_id || `group_${chat.group_id}`}
                            chat={chat}
                            onSelectChat={onSelectChat}
                            selectedChatId={selectedChatId}
                            setSelectedChat={setSelectedChat}
                            setOpenAddToGroupModal={setOpenAddToGroupModal}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchedMessageList;