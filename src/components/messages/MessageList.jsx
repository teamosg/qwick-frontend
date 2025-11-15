import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { MessageSquarePlus } from "lucide-react";
import NewMessageSidebar from "./NewMessageSidebar";
import CreateGroupModal from "./CreateGroupModal";
import {
  useGetConversationList,
  useGetRequestConversationList,
} from "@/hooks/conversatins.hook";
import MessageListSkeleton from "./skeletonns/MessageListSkeleton";
import { requestsChats } from "@/dummyData/chat";
import ChatList from "./ChatList";
import { FetchErrorAlert } from "../Alerts/FetchErrorAlerts";

const MessageList = ({ onSelectChat, selectedChatId }) => {
  const [sortBy, setSortBy] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRequestsOnly, setShowRequestsOnly] = useState(false);
  const [showNewMessageSidebar, setShowNewMessageSidebar] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  const {
    data: conversationList,
    isLoading: isConversationLoading,
    isError: isConversationError,
  } = useGetConversationList();

  const {
    data: requestConversationList,
    // isLoading: isRequestConversationLoading,
    // isError: isRequestConversationError,
  } = useGetRequestConversationList();

  console.log(requestConversationList);

  const pinnedConversation = conversationList?.filter((chat) => chat.pinned);
  const regularConversation = conversationList?.filter((chat) => !chat.pinned);

  const handleUserSelect = (user) => {
    // Create new chat with user
    const newChat = {
      id: Date.now(),
      name: user.name,
      avatar: user.avatar,
      lastMessage: "Start a conversation...",
      time: "Now",
      unreadCount: 0,
      isOnline: user.isOnline,
      type: "direct",
    };

    onSelectChat(newChat);
    setShowNewMessageSidebar(false);
  };

  const handleCreateGroup = (selectedUsers) => {
    // Create new group chat
    const groupChat = {
      id: Date.now(),
      name: `Group with ${selectedUsers
        .map((u) => u.name.split(" ")[0])
        .join(", ")}`,
      avatar: selectedUsers[0]?.avatar,
      lastMessage: "Group created",
      time: "Now",
      unreadCount: 0,
      isOnline: true,
      type: "group",
      members: selectedUsers,
    };

    onSelectChat(groupChat);
    setShowCreateGroupModal(false);
    setShowNewMessageSidebar(false);
  };

  // skeleton
  if (isConversationLoading || isConversationError)
    return <MessageListSkeleton />;

  return (
    <div className="w-80 border-r border-gray-200 dark:border-[#282828] bg-white dark:bg-[#171717] flex flex-col h-full max-h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-[#282828]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Messages
          </h2>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent text-sm text-gray-600 dark:text-gray-300 pr-6 focus:outline-none"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
            <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
      {/* Search and badge section */}
      <div className="p-4 border-b border-gray-200 dark:border-[#282828]">
        <div className="relative mb-3 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-[#282828] rounded-lg bg-gray-50 dark:bg-[#101010] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowNewMessageSidebar(true)}
            className="cursor-pointer p-2 border border-gray-300 dark:border-[#282828] rounded-lg hover:bg-gray-100 dark:hover:bg-[#1b1b1b] transition-colors"
          >
            <MessageSquarePlus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        {/* Badges */}
        <div className="flex items-center gap-2 mt-2 text-xs">
          <button
            onClick={() =>
              toast.error("This feature hasn't been implemented yet")
            }
            className="cursor-pointer flex items-center gap-1 px-2 border py-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#222] font-medium transition-colors"
          >
            <span className="text-red-400">●</span> Unread{" "}
            <span className="text-gray-400">2</span>
          </button>
          <button
            onClick={() => setShowRequestsOnly(!showRequestsOnly)}
            className={`cursor-pointer px-2 py-1 border flex items-center gap-1 rounded-full font-medium transition-all duration-300 ${
              showRequestsOnly
                ? "bg-[#003933] text-white border-[#003933]"
                : "hover:bg-gray-100 dark:hover:bg-[#222]"
            }`}
          >
            <span className="text-[#003933] dark:text-[#41d8a8]">●</span>{" "}
            Requests
            <span className="transition-transform duration-200">
              {showRequestsOnly ? (
                <X className="w-3.5 h-3.5" />
              ) : (
                <span className="text-gray-400">{requestsChats?.length}</span>
              )}
            </span>
          </button>
          <button
            onClick={() =>
              toast.error("This feature hasn't been implemented yet")
            }
            className="cursor-pointer px-2 py-1 border rounded-full font-medium hover:bg-gray-100 dark:hover:bg-[#222] transition-colors"
          >
            Groups <span className="text-gray-400">2</span>
          </button>
        </div>
      </div>

      {/* Chat List */}
      {isConversationError ? (
        <div className="p-4">
          <FetchErrorAlert />
        </div>
      ) : (
        <ChatList
          showRequestsOnly={showRequestsOnly}
          requestsChats={requestConversationList}
          onSelectChat={onSelectChat}
          selectedChatId={selectedChatId}
          pinnedConversation={pinnedConversation}
          regularConversation={regularConversation}
        />
      )}

      <NewMessageSidebar
        isOpen={showNewMessageSidebar}
        onClose={() => setShowNewMessageSidebar(false)}
        onUserSelect={handleUserSelect}
        onCreateGroup={() => {
          setShowNewMessageSidebar(false);
          setShowCreateGroupModal(true);
        }}
      />

      <CreateGroupModal
        isOpen={showCreateGroupModal}
        onClose={() => setShowCreateGroupModal(false)}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
};

export default MessageList;
