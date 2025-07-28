import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import ProgressSteps from "@/components/valuation/progress-steps";
import BuyerSellerSelection from "@/components/valuation/buyer-seller-selection";
import BusinessDataForm from "@/components/valuation/business-data-form";
import FileUpload from "@/components/valuation/file-upload";
import ValuationResult from "@/components/valuation/valuation-result";

export interface ValuationData {
  buyerOrSeller: 'buying' | 'selling' | '';
  businessName: string;
  industry: string;
  location: string;
  yearsInBusiness: number;
  annualRevenue: number;
  sde: number;
  addBacks: number;
  ownerInvolvement: string;
  growthTrend: string;
  majorRisks: string;
}

const initialData: ValuationData = {
  buyerOrSeller: '',
  businessName: '',
  industry: '',
  location: '',
  yearsInBusiness: 0,
  annualRevenue: 0,
  sde: 0,
  addBacks: 0,
  ownerInvolvement: '',
  growthTrend: '',
  majorRisks: '',
};

export default function ValuationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [valuationData, setValuationData] = useState<ValuationData>(initialData);
  const [valuationResult, setValuationResult] = useState<any>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const createValuationMutation = useMutation({
    mutationFn: async (data: ValuationData) => {
      const response = await apiRequest("POST", "/api/valuations", data);
      return await response.json();
    },
    onSuccess: (result) => {
      setValuationResult(result);
      setCurrentStep(4);
      toast({
        title: "Valuation Complete!",
        description: "Your business valuation has been calculated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleNext = () => {
    if (currentStep < 4) {
      if (currentStep === 3) {
        // Submit valuation on step 3 completion
        createValuationMutation.mutate(valuationData);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = (updates: Partial<ValuationData>) => {
    setValuationData(prev => ({ ...prev, ...updates }));
  };

  const handlePaymentComplete = (valuationId: string) => {
    setLocation(`/dashboard`);
    toast({
      title: "Payment Successful!",
      description: "Your PDF report is now available for download.",
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return valuationData.buyerOrSeller !== '';
      case 2:
        return valuationData.businessName && 
               valuationData.industry && 
               valuationData.location &&
               valuationData.yearsInBusiness > 0 &&
               valuationData.annualRevenue > 0 &&
               valuationData.sde > 0 &&
               valuationData.ownerInvolvement &&
               valuationData.growthTrend;
      case 3:
        return true; // File upload is optional
      case 4:
        return false; // Final step
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Business Valuation</h1>
          <p className="text-slate-600">Follow the steps below to get your professional business valuation.</p>
        </div>

        <ProgressSteps currentStep={currentStep} />

        <div className="mt-8">
          {currentStep === 1 && (
            <BuyerSellerSelection
              value={valuationData.buyerOrSeller}
              onChange={(value) => handleDataUpdate({ buyerOrSeller: value })}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <BusinessDataForm
              data={valuationData}
              onChange={handleDataUpdate}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}

          {currentStep === 3 && (
            <FileUpload
              valuationId={valuationResult?.id}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isLoading={createValuationMutation.isPending}
            />
          )}

          {currentStep === 4 && valuationResult && (
            <ValuationResult
              valuation={valuationResult}
              onPaymentComplete={handlePaymentComplete}
              onPrevious={handlePrevious}
            />
          )}
        </div>
      </div>
    </div>
  );
}
