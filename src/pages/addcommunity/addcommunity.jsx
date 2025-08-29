import AddCommunityForm from "@/components/addCommunity/AddComminityForm";
import AddCommunityOne from "@/components/addCommunity/AddCommunityOne";
import CommunityStepper from "@/components/addCommunity/AddCommunityStepper";
import AddCommunityTwo from "@/components/addCommunity/AddCommunityTwo";
import { useState } from "react";

const AddCommunity = () => {
  const [currentStep, setCurrentStep] = useState(1);

  let content;

  switch (currentStep) {
    case 1:
      content = (
        <>
          <h1 className="my-8 text-4xl font-bold text-[#15161E] text-center">
            Which model best describes your offer?
          </h1>
          <AddCommunityOne
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </>
      );
      break;

    case 2:
      content = (
        <>
          <h1 className="my-8 text-4xl font-bold text-[#15161E] text-center">
            Which model best describes your offer?
          </h1>
          <AddCommunityTwo
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </>
      );
      break;
    case 3:
      content = (
        <>
          {" "}
          <h1 className="my-8 text-4xl font-bold text-[#15161E] text-center">
            Name your business
          </h1>
          <AddCommunityForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </>
      );
      break;
    default:
      content = (
        <>
          <h1 className="my-8 text-4xl font-bold text-[#15161E] text-center">
            Which model best describes your offer?
          </h1>
          <AddCommunityOne
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </>
      );
      break;
  }

  return (
    <div className="p-6 h-screen max-w-5xl mx-auto">
      <CommunityStepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      {content}
    </div>
  );
};

export default AddCommunity;
