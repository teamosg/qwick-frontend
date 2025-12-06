import AddCommunityForm from "@/components/addCommunity/AddCommunityForm";
import AddCommunityOne from "@/components/addCommunity/AddCommunityOne";
import CommunityStepper from "@/components/addCommunity/AddCommunityStepper";
import AddCommunityTwo from "@/components/addCommunity/AddCommunityTwo";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";


const AddCommunity = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    business_name: "",
    country: "",
    category: null,
    subcategory: null
  });
  const [formStatus, setFormStatus] = useState({
    errors: {},
    isLoading: false,
    isSubmitting: false,
  })

  const handleCategoryClick = (id) => {
    if (!id) return
    setFormData({ ...formData, category: id });
    setCurrentStep(2)
  };
  const handleSubCategoryClick = (id) => {
    if (!id) return
    setFormData({ ...formData, subcategory: id });
    setCurrentStep(3)
  };


  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3,
  };

  // Render content based on current step
  const renderContent = () => {

    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-6"
          >
            <h1 className="my-8 text-3xl md:text-4xl font-bold text-[#15161E] dark:text-white text-center">
              Which model best describes your offer?
            </h1>

            <AddCommunityOne
              selectedId={formData?.category}
              onClick={handleCategoryClick}
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-6"
          >
            <h1 className="my-8 text-3xl md:text-4xl font-bold text-[#15161E] dark:text-white text-center">
              Choose your category
            </h1>

            <AddCommunityTwo
              selectedId={formData?.subcategory}
              onClick={handleSubCategoryClick}
            />
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-6"
          >
            <h1 className="my-8 text-3xl md:text-4xl font-bold text-[#15161E] dark:text-white text-center">
              Name your business
            </h1>

            <AddCommunityForm
              formData={formData}
              setFormData={setFormData}
              formStatus={formStatus}
              setFormStatus={setFormStatus}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 h-screen max-w-5xl mx-auto">
      <CommunityStepper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        isLoading={formStatus.isLoading}
      />

      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>

      {/* Loading overlay */}
      {formStatus?.isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003933] mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
              Loading...
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AddCommunity;
