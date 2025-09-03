import AddCommunityItem from "./AddCommunityItem";
const communityTwoData = [
  { id: "1a2b3c10", title: "Confidence Camp" },
  { id: "1a2b3c11", title: "Pitch Perfect" },
  { id: "1a2b3c12", title: "Hustle Hub" },
  { id: "1a2b3c13", title: "Vision Vault" },
  { id: "1a2b3c14", title: "Remote Ready" },
  { id: "1a2b3c15", title: "Team Talks" },
  { id: "1a2b3c16", title: "Idea Igniter" },
  { id: "1a2b3c17", title: "Success Sprint" },
  { id: "1a2b3c18", title: "Next Level" },
];
const AddCommunityTwo = ({ currentStep, setCurrentStep }) => {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 sm:grid sm:grid-cols-3 sm:gap-6">
        {communityTwoData.map((data) => (
          <AddCommunityItem
            key={data.id}
            data={data}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        ))}
      </div>
    </div>
  );
};

export default AddCommunityTwo;
