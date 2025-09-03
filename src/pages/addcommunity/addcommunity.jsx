import AddCommunityForm from "@/components/addCommunity/AddComminityForm";
import AddCommunityOne from "@/components/addCommunity/AddCommunityOne";
import CommunityStepper from "@/components/addCommunity/AddCommunityStepper";
import AddCommunityTwo from "@/components/addCommunity/AddCommunityTwo";
import { useCallback, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const AddCommunity = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: { selectedModel: null },
    step2: { selectedCategory: null },
    step3: { businessName: "", description: "", tags: [] },
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation rules for each step
  const validateStep = useCallback((step, data) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!data.step1.selectedModel) {
          newErrors.step1 = "Please select a model";
        }
        break;
      case 2:
        if (!data.step2.selectedCategory) {
          newErrors.step2 = "Please select a category";
        }
        break;
      case 3:
        if (!data.step3.businessName.trim()) {
          newErrors.businessName = "Business name is required";
        }
        if (data.step3.businessName.length < 3) {
          newErrors.businessName =
            "Business name must be at least 3 characters";
        }
        if (!data.step3.description.trim()) {
          newErrors.description = "Description is required";
        }
        break;
      default:
        break;
    }

    return newErrors;
  }, []);

  // Handle form data updates
  const updateFormData = useCallback((step, field, value) => {
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [step]: {
          ...prev[step],
          [field]: value,
        },
      };

      // Console log the selected data with updated state
      console.log(`Step ${step} - Selected ${field}:`, value);
      console.log("Current form data:", newFormData);

      return newFormData;
    });

    // Clear step-specific errors when user makes a selection
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors[`step${step}`]) {
        delete newErrors[`step${step}`];
      }
      return newErrors;
    });
  }, []);

  // Handle step navigation with validation
  const handleNextStep = useCallback(
    async (updatedFormData = null) => {
      // Use the updated form data if provided, otherwise use current state
      const dataToValidate = updatedFormData || formData;
      const stepErrors = validateStep(currentStep, dataToValidate);

      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return false;
      }

      setErrors({});

      if (currentStep < 3) {
        setIsLoading(true);
        // Simulate API call or processing
        await new Promise((resolve) => setTimeout(resolve, 300));
        setCurrentStep((prev) => prev + 1);
        setIsLoading(false);
      } else {
        // Handle final submission
        await handleSubmit();
      }

      return true;
    },
    [currentStep, formData, validateStep]
  );

  const handlePrevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setErrors({});
    }
  }, [currentStep]);

  // Handle final submission

  // Handle final submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success - you can redirect or show success message
      console.log("=== FINAL SUBMISSION DATA ===");
      console.log("Complete form data:", formData);
      console.log("Step 1 - Selected Model:", formData.step1.selectedModel);
      console.log(
        "Step 2 - Selected Category:",
        formData.step2.selectedCategory
      );
      console.log("Step 3 - Business Name:", formData.step3.businessName);
      console.log("Step 3 - Country:", formData.step3.country);
      console.log("Step 3 - Description:", formData.step3.description);
      console.log("Step 3 - Tags:", formData.step3.tags);
      console.log("=== END SUBMISSION DATA ===");

      // Reset form or redirect
      // setCurrentStep(1);
      // setFormData({ step1: { selectedModel: null }, step2: { selectedCategory: null }, step3: { businessName: "", description: "", tags: [] } });
    } catch (error) {
      console.error("Error creating community:", error);
      setErrors({ submit: "Failed to create community. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when component unmounts or user leaves
  useEffect(() => {
    return () => {
      setFormData({
        step1: { selectedModel: null },
        step2: { selectedCategory: null },
        step3: { businessName: "", description: "", tags: [] },
      });
      setErrors({});
    };
  }, []);

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
    const commonProps = {
      currentStep,
      setCurrentStep,
      formData,
      updateFormData,
      errors,
      isLoading,
      onNext: handleNextStep,
      onPrev: handlePrevStep,
    };

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
            <h1 className="my-8 text-3xl md:text-4xl font-bold text-[#15161E] text-center">
              Which model best describes your offer?
            </h1>
            {errors.step1 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-center text-sm"
              >
                {errors.step1}
              </motion.div>
            )}
            <AddCommunityOne {...commonProps} />
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
            <h1 className="my-8 text-3xl md:text-4xl font-bold text-[#15161E] text-center">
              Choose your category
            </h1>
            {errors.step2 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-center text-sm"
              >
                {errors.step2}
              </motion.div>
            )}
            <AddCommunityTwo {...commonProps} />
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
            <h1 className="my-8 text-3xl md:text-4xl font-bold text-[#15161E] text-center">
              Name your business
            </h1>
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-center text-sm"
              >
                {errors.submit}
              </motion.div>
            )}
            <AddCommunityForm {...commonProps} isSubmitting={isSubmitting} />
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
        isLoading={isLoading}
      />

      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>

      {/* Loading overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003933] mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AddCommunity;
