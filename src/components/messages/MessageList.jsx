import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import NewMessageSidebar from "./NewMessageSidebar";
import CreateGroupModal from "./CreateGroupModal";
import {
  useGetConversationList,
  useGetRequestConversationList,
} from "@/hooks/conversations.hook";
import MessageListSkeleton from "./skeletonns/MessageListSkeleton";
import ChatList from "./ChatList";
import { FetchErrorAlert } from "../Alerts/FetchErrorAlerts";
import { useEffect } from "react";
import AddToGroupModal from "./AddToGroupModal";
import { useConversationStore } from "@/store/conversationStore";
import SearchedMessageList from "./SearchedMessageList";


const MessageList = ({ selectedChat, onSelectChat, selectedChatId, setSelectedChat }) => {
  const [openAddToGroupModal, setOpenAddToGroupModal] = useState(false);
  const { setFetchedConversationList } = useConversationStore((state) => state);


  // const [sortBy, setSortBy] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRequestsOnly, setShowRequestsOnly] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [showNewMessageSidebar, setShowNewMessageSidebar] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [conversationList, setConversationList] = useState([]);

  const pinnedConversation = conversationList?.filter((chat) => chat.pinned) || []
  const regularConversation = conversationList?.filter((chat) => !chat.pinned) || []
  const groupConversations = conversationList?.filter((chat) => chat.type === "group") || []

  const searchedConversation = conversationList?.filter((chat) => {
    return chat?.username?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || chat?.group_name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  }) || []

  const {
    data: fetchedConversationList,
    isLoading: isConversationLoading,
    isError: isConversationError,
  } = useGetConversationList();

  const {
    data: requestConversationList,
    isLoading: isRequestConversationLoading,
    isError: isRequestConversationError,
  } = useGetRequestConversationList();

  const unreadConversations = conversationList?.filter(conversation => conversation?.unread_count)


  useEffect(() => {
    setFetchedConversationList(fetchedConversationList)
  }, [fetchedConversationList, setFetchedConversationList])

  useEffect(() => {
    if (fetchedConversationList) {
      setConversationList(fetchedConversationList);
    }
  }, [fetchedConversationList]);

  useEffect(() => {
    if (showUnreadOnly) {
      setConversationList(unreadConversations)
      return
    }
    setConversationList(fetchedConversationList)
  }, [showUnreadOnly])




  // skeleton
  if (
    isConversationLoading ||
    isRequestConversationLoading ||
    isConversationError ||
    isRequestConversationError
  )
    return <MessageListSkeleton />;




  return (
    <div className="w-full md:w-80 border-r border-l border-border dark:border-border bg-card dark:bg-card flex flex-col h-full max-h-full">
      {/* Search and badge section */}
      <div className="p-4">
        <div className="relative mb-3 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-qwick-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-border dark:border-border rounded-lg bg-background dark:bg-background text-foreground dark:text-foreground placeholder-muted-foreground dark:placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowNewMessageSidebar(true)}
            className="cursor-pointer p-2 border border-border dark:border-border rounded-lg hover:bg-qwick-gray-100 dark:hover:bg-qwick-gray-800 transition-colors"
          >
            <MessageSquarePlus className="w-5 h-5 text-muted-foreground dark:text-muted-foreground" />
          </button>
        </div>
        {/* Badges */}
        <div className="flex items-center gap-2 mt-2 text-xs">
          {/* unread filter button  */}
          {!showRequestsOnly && (
            <button
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={`cursor-pointer px-2 py-1 border flex items-center gap-1 rounded-full font-medium transition-all duration-300 ${showUnreadOnly
                ? "bg-foreground-strong text-white border-foreground-muted"
                : "hover:bg-accent dark:hover:bg-accent"
                }`}
            >
              <span className="text-[#F62B36]">●</span>
              Unread
              <span className="transition-transform duration-200">
                {showUnreadOnly ? (
                  <X className="w-3.5 h-3.5" />
                ) : (
                  <span className="text-qwick-gray-400">{unreadConversations?.length || 0}</span>
                )}
              </span>
            </button>
          )}



          {/* requests filter button  */}
          {
            !showUnreadOnly &&
            <button
              onClick={() => setShowRequestsOnly(!showRequestsOnly)}
              className={`cursor-pointer px-2 py-1 border flex items-center gap-1 rounded-full font-medium transition-all duration-300 ${showRequestsOnly
                ? "bg-foreground-strong text-white border-foreground-muted"
                : "hover:bg-accent dark:hover:bg-accent"
                }`}
            >
              <span className="text-foreground-strong dark:text-foreground-strong">●</span>{" "}
              Requests
              <span className="transition-transform duration-200">
                {showRequestsOnly ? (
                  <X className="w-3.5 h-3.5" />
                ) : (
                  <span className="text-qwick-gray-400">{requestConversationList?.length || 0}</span>
                )}
              </span>
            </button>
          }

          {/* groups filter button  */}
          {/* <button
            onClick={() =>
              toast.error("This feature hasn't been implemented yet")
            }
            className="cursor-pointer px-2 py-1 border rounded-full font-medium hover:bg-accent dark:hover:bg-accent transition-colors"
          >
            Groups <span className="text-gray-400">2</span>
          </button> */}
        </div>
      </div>

      {
        searchQuery
          ? (
            <SearchedMessageList
              searchedConversation={searchedConversation}

              onSelectChat={onSelectChat}
              selectedChatId={selectedChatId}

              setSelectedChat={setSelectedChat}
              setOpenAddToGroupModal={setOpenAddToGroupModal}
            />
          )
          : (
            isConversationError ? (
              <div className="p-4">
                <FetchErrorAlert />
              </div>
            ) : (
              <ChatList
                showUnreadOnly={showUnreadOnly}
                showRequestsOnly={showRequestsOnly}
                requestsChats={requestConversationList}
                onSelectChat={onSelectChat}
                selectedChatId={selectedChatId}
                pinnedConversation={pinnedConversation}
                regularConversation={regularConversation}
                setSelectedChat={setSelectedChat}
                setOpenAddToGroupModal={setOpenAddToGroupModal}
              />
            )
          )
      }


      <NewMessageSidebar
        isOpen={showNewMessageSidebar}
        fetchedConversationList={fetchedConversationList}
        onClose={() => setShowNewMessageSidebar(false)}
        onSelectChat={onSelectChat}
        onCreateGroup={() => {
          setShowNewMessageSidebar(false);
          setShowCreateGroupModal(true);
        }}
      />

      <CreateGroupModal
        isOpen={showCreateGroupModal}
        fetchedConversationList={fetchedConversationList}
        onClose={() => setShowCreateGroupModal(false)}
        onSelectChat={onSelectChat}
      />

      <AddToGroupModal
        chat={selectedChat}
        isOpen={openAddToGroupModal}
        onClose={() => setOpenAddToGroupModal(false)}
        groups={groupConversations}
      />
    </div>
  );
};

export default MessageList;
