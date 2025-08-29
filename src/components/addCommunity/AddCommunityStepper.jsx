"use client";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTrigger,
} from "@/components/ui/stepper";
import { ArrowLeft } from "lucide-react";

const steps = [1, 2, 3];

export default function AddCommunityStepper({ currentStep, setCurrentStep }) {
  return (
    <div className="w-full space-y-8 text-center">
      <div className="gap-6 flex items-center justify-center">
        <button
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
          className=""
        >
          <span className="bg-[#eaeaea] p-2 block rounded-md cursor-pointer hover:bg-gray-200 transition duration-300">
            <ArrowLeft />
          </span>
        </button>

        <div className="flex-1">
          <Stepper
            value={currentStep}
            onValueChange={() => setCurrentStep(setCurrentStep)}
            className=" bg-[#eaeaea] rounded-full overflow-hidden"
          >
            {steps.map((step) => (
              <StepperItem key={step} step={step} className="flex-1">
                <StepperTrigger
                  className={`w-full flex-col items-start gap-2 bg-[#eaeaea] data-[state=completed]:bg-[#003933] data-[state=active]:bg-[#003933] `}
                  asChild
                >
                  <StepperIndicator
                    asChild
                    className={`h-4 w-full `}
                  ></StepperIndicator>
                </StepperTrigger>
              </StepperItem>
            ))}
          </Stepper>
        </div>
      </div>
      {/* <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          className="w-32"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          Prev step
        </Button>
        <Button
          variant="outline"
          className="w-32"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep >= steps.length}
        >
          Next step
        </Button>
      </div> */}
    </div>
  );
}
