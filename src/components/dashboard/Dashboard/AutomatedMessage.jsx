import AutomationCard from "./AutomationCards/AutomationCard";

const AutomatedMessage = () => {
  const automationCards = [
    {
      id: 1,
      title: "User Joined",
      description: "Send a message when a user joins this community",
    },
    {
      id: 2,
      title: "User Left",
      description: "Send a message when a user left this community",
    },
    {
      id: 3,
      title: "Lead",
      description: "Send a message when a user becomes a lead",
    },
  ];

  

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <AutomationCard
          title={automationCards[0].title}
          description={automationCards[0].description}
        />
        <AutomationCard
          title={automationCards[1].title}
          description={automationCards[1].description}
        />
        <AutomationCard
          title={automationCards[2].title}
          description={automationCards[2].description}
        />
      </div>
    </div>
  );
};

export default AutomatedMessage;
