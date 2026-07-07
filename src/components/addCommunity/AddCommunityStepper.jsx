"use client";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTrigger,
} from "@/components/ui/stepper";
// eslint-disable-next-line no-unused-vars
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
          whileHover={currentStep === 1 || isLoading ? {} : { scale: 1.05 }}
          whileTap={currentStep === 1 || isLoading ? {} : { scale: 0.95 }}
          className={`transition-all duration-200 ${
            currentStep === 1
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
        >
          <span
            className={`p-2 block rounded-md transition duration-300 bg-secondary dark:bg-qwick-gray-800 text-foreground-strong ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-qwick-gray-200 dark:hover:bg-qwick-gray-700"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </span>
        </motion.button>

        <div className="flex-1">
          <Stepper
            value={currentStep}
            onValueChange={setCurrentStep}
            className="bg-secondary dark:bg-qwick-gray-800 rounded-full overflow-hidden h-2.5 w-full flex"
          >
            {steps.map((step) => (
              <StepperItem key={step} step={step} className="flex-1">
                <StepperTrigger
                  className="w-full h-full flex"
                  asChild
                >
                  <StepperIndicator
                    asChild
                    className="h-full w-full bg-transparent data-[state=completed]:bg-primary data-[state=active]:bg-primary transition-all duration-300"
                  >
                    <span className="sr-only">Step {step}</span>
                  </StepperIndicator>
                </StepperTrigger>
              </StepperItem>
            ))}
          </Stepper>
        </div>
      </div>

      {/* Progress indicator */}
      <motion.div
        className="text-sm text-foreground-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Step {currentStep} of {steps.length}
        {isLoading && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2 text-primary font-medium"
          >
            • Loading...
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}