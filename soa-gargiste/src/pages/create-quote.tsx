import { ClaimInfoStep } from "@/components/quote/claim-info-step";
import { DamagePhotosStep } from "@/components/quote/damage-photos-step";
import { RepairLinesStep } from "@/components/quote/repair-lines-step";
import { SummaryStep } from "@/components/quote/summary-step";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export default function CreateQuote() {
  const [currentStep, setCurrentStep] = useState(1);
  const [quoteData, setQuoteData] = useState({
    claimNumber: "",
    insuranceNumber: "",
    incidentDate: "",
    damageDescription: "",
    photos: [] as File[],
    repairLines: [] as Array<{
      id: string;
      designation: string;
      type: "Part" | "Labor";
      quantity: number;
      unitCost: number;
      total: number;
    }>,
  });

  const steps = [
    { number: 1, label: "Claim Info", completed: currentStep > 1 },
    { number: 2, label: "Damage Photos", completed: currentStep > 2 },
    { number: 3, label: "Services", completed: currentStep > 3 },
    { number: 4, label: "Summary", completed: false },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateQuoteData = (data: Partial<typeof quoteData>) => {
    setQuoteData({ ...quoteData, ...data });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Create Quote</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Step {currentStep} of {steps.length} -{" "}
          {currentStep === 1 && "Claim Information"}
          {currentStep === 2 && "Damage Photos"}
          {currentStep === 3 && "Repair Lines"}
          {currentStep === 4 && "Summary & Review"}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                  step.completed
                    ? "bg-success text-success-foreground"
                    : step.number === currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step.completed ? <Check className="h-5 w-5" /> : step.number}
              </div>
              <span className="text-xs mt-2 text-center hidden sm:block">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step.completed ? "bg-success" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="p-6">
        {currentStep === 1 && (
          <ClaimInfoStep data={quoteData} updateData={updateQuoteData} />
        )}
        {currentStep === 2 && (
          <DamagePhotosStep data={quoteData} updateData={updateQuoteData} />
        )}
        {currentStep === 3 && (
          <RepairLinesStep data={quoteData} updateData={updateQuoteData} />
        )}
        {currentStep === 4 && <SummaryStep data={quoteData} />}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex-1 sm:flex-none"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Next Step
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Complete Quote
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>

      {currentStep === 1 && (
        <p className="text-xs text-destructive text-center">
          * Required fields must be filled out to proceed to the next step
        </p>
      )}
    </div>
  );
}
