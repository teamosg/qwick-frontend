import { useCommunityStore } from "@/store/communityStore";
import AutomationCard from "./AutomationCards/AutomationCard";
import { useGetMyCommunityList } from "@/hooks/community.hook";

const AutomatedMessage = () => {
  const { selectedBrandCommunity } = useCommunityStore();
  const {
    data: communityList,
    isLoading: isLoadingMyCommunityList,
  } = useGetMyCommunityList();

  const myCommunityList = communityList?.created_communities || [];

  // Find the current community from the fresh list using username, fallback to store if not found yet (e.g. loading)
  const activeCommunity = myCommunityList.find(c => c.username === selectedBrandCommunity?.username) || selectedBrandCommunity;

  const automationCards = [
    {
      id: 1,
      title: "User Joined",
      description: "Send a message when a user joins this community",
      statusKey: "auto_welcome_enabled",
      textKey: "auto_welcome_text",
      isEnabled: activeCommunity?.auto_welcome_enabled,
      messageText: activeCommunity?.auto_welcome_text,
    },
    {
      id: 2,
      title: "User Left",
      description: "Send a message when a user left this community",
      statusKey: "auto_farewell_enabled",
      textKey: "auto_farewell_text",
      isEnabled: activeCommunity?.auto_farewell_enabled,
      messageText: activeCommunity?.auto_farewell_text,
    },
    {
      id: 3,
      title: "Lead",
      description: "Send a message when a user becomes a lead",
      statusKey: "auto_promotion_enabled",
      textKey: "auto_promotion_text",
      isEnabled: activeCommunity?.auto_promotion_enabled,
      messageText: activeCommunity?.auto_promotion_text,
    },
  ];



  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {automationCards.map((card) => (
          <AutomationCard
            key={card.id}
            title={card.title}
            description={card.description}
            communityUsername={selectedBrandCommunity?.username}
            isEnabled={card.isEnabled}
            messageText={card.messageText}
            statusKey={card.statusKey}
            textKey={card.textKey}
          />
        ))}
      </div>
    </div>
  );
};

export default AutomatedMessage;
