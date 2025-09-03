import { motion } from "framer-motion";
import AddCommunityItem from "./AddCommunityItem";

const communityOneData = [
  { id: "1a2b3c01", title: "Mindset Mastery" },
  { id: "1a2b3c02", title: "Skill Builder" },
  { id: "1a2b3c03", title: "Career Boost" },
  { id: "1a2b3c04", title: "Focus Formula" },
  { id: "1a2b3c05", title: "Leadership Lab" },
  { id: "1a2b3c06", title: "Startup Steps" },
  { id: "1a2b3c07", title: "Public Speaking" },
  { id: "1a2b3c08", title: "Growth Path" },
  { id: "1a2b3c09", title: "Time Tactics" },
];

const AddCommunityOne = ({
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
        {communityOneData.map((data, index) => (
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

export default AddCommunityOne;
