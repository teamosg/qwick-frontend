import { motion } from "framer-motion";
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

const AddCommunityTwo = ({
  currentStep,
  setCurrentStep,
  formData,
  updateFormData,
  onNext,
  isLoading,
}) => {
  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid sm:grid-cols-3 sm:gap-6">
        {communityTwoData.map((data, index) => (
          <motion.div
            key={data.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <AddCommunityItem
              data={data}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              formData={formData}
              updateFormData={updateFormData}
              onNext={onNext}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AddCommunityTwo;
