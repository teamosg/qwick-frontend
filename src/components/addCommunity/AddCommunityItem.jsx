import Coaching from "@/assets/svg/Coaching";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AddCommunityItem = ({
  currentStep,
  setCurrentStep,
  data,
  formData,
  updateFormData,
  onNext,
}) => {
  // Determine which field to check based on current step
  const getSelectedField = () => {
    switch (currentStep) {
      case 1:
        return formData?.step1?.selectedModel;
      case 2:
        return formData?.step2?.selectedCategory;
      default:
        return null;
    }
  };

  // Determine which step field to update based on current step
  const getStepField = () => {
    switch (currentStep) {
      case 1:
        return "selectedModel";
      case 2:
        return "selectedCategory";
      default:
        return "selectedModel";
    }
  };

  const isSelected = getSelectedField() === data.id;
  const stepField = getStepField();

  const handleClick = async () => {
    // Create the updated form data
    const updatedFormData = {
      ...formData,
      [`step${currentStep}`]: {
        ...formData[`step${currentStep}`],
        [stepField]: data.id,
      },
    };

    // Update form data with selected item
    updateFormData(`step${currentStep}`, stepField, data.id);

    // Move to next step immediately with updated data
    if (onNext) {
      await onNext(updatedFormData);
    } else {
      setCurrentStep((currentStep) => currentStep + 1);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-md px-6 py-8 shadow transition-all duration-300 border-2 cursor-pointer ${
        isSelected
          ? "border-[#003933] bg-[#f0fdf4] shadow-lg"
          : "border-transparent hover:border-[#003933] hover:shadow-md"
      }`}
    >
      <motion.div
        className={`p-4 flex items-center justify-center w-15 h-15 rounded-2xl mb-12 transition-colors duration-300 ${
          isSelected ? "bg-[#003933]" : "bg-[#e5fff6]"
        }`}
        whileHover={{ scale: 1.05 }}
      >
        <Coaching />
      </motion.div>

      <h3
        className={`text-xl font-semibold transition-colors duration-300 ${
          isSelected ? "text-[#003933]" : "text-[#090003]"
        }`}
      >
        {data.title}
      </h3>

      {isSelected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2 text-sm text-[#003933] font-medium"
        >
          ✓ Selected
        </motion.div>
      )}
    </motion.div>
  );
};

export default AddCommunityItem;
