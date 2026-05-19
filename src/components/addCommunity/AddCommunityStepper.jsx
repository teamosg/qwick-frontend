"use client";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTrigger,
} from "@/components/ui/stepper";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const steps = [1, 2];

export default function AddCommunityStepper({
  currentStep,
  setCurrentStep,
  isLoading,
}) {
  return (
    <motion.div
      className="w-full space-y-8 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="gap-6 flex items-center justify-center">
        <motion.button
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1 || isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`transition-opacity duration-200 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="bg-[#eaeaea] p-2 block rounded-md cursor-pointer hover:bg-gray-200 transition duration-300">
            <ArrowLeft />
          </span>
        </motion.button>

        <div className="flex-1">
          <Stepper
            value={currentStep}
            onValueChange={() => setCurrentStep(setCurrentStep)}
            className="bg-[#eaeaea] rounded-full overflow-hidden"
          >
            {steps.map((step) => (
              <StepperItem key={step} step={step} className="flex-1">
                <StepperTrigger
                  className={`w-full flex-col items-start gap-2 bg-[#eaeaea] data-[state=completed]:bg-[#003933] data-[state=active]:bg-[#003933] transition-all duration-300`}
                  asChild
                >
                  <StepperIndicator
                    asChild
                    className={`h-4 w-full transition-all duration-300`}
                  ></StepperIndicator>
                </StepperTrigger>
              </StepperItem>
            ))}
          </Stepper>
        </div>
      </div>

      {/* Progress indicator */}
      <motion.div
        className="text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Step {currentStep} of {steps.length}
        {isLoading && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2 text-[#003933]"
          >
            • Loading...
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}