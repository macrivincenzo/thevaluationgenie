import { CheckCircle } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Buyer/Seller" },
  { number: 2, label: "Business Data" },
  { number: 3, label: "File Upload" },
  { number: 4, label: "Report" },
];

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step.number < currentStep 
                  ? "bg-green-500 text-white" 
                  : step.number === currentStep 
                    ? "bg-primary text-white" 
                    : "bg-slate-300 text-slate-600"
              }`}>
                {step.number < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span className={`ml-3 text-sm font-medium ${
                step.number <= currentStep ? "text-slate-900" : "text-slate-500"
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${
                step.number < currentStep ? "bg-green-500" : "bg-slate-300"
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
