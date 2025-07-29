import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import ProgressSteps from "@/components/valuation/progress-steps";
import BuyerSellerSelection from "@/components/valuation/buyer-seller-selection";
import SellerQuestions from "@/components/valuation/seller-questions";
import BuyerQuestions from "@/components/valuation/buyer-questions";
import IndustrySelection from "@/components/valuation/industry-selection";
import FileUpload from "@/components/valuation/file-upload";
import ValuationResult from "@/components/valuation/valuation-result";

export interface ValuationData {
  // Step 1: Buyer/Seller Selection
  buyerOrSeller: 'buying' | 'selling' | '';
  
  // Basic Business Info
  businessName: string;
  industry: string;
  location: string;
  yearsInBusiness: number;
  
  // Financial data (3 years)
  annualRevenue: number[]; // Array of 3 years
  sdeData: number[]; // Array of 3 years  
  profitMargin: number;
  
  // Seller-specific questions
  ownerWorkHours: number;
  canRunWithoutOwner: boolean;
  hasKeyEmployees: boolean;
  topCustomersRevenuePct: number;
  customerRetentionPct: number;
  hasLongTermContracts: boolean;
  growthRates: number[]; // Array of 3 years
  competitiveAdvantage: string;
  marketSize: string; // local/regional/national
  ownedAssets: string;
  businessDebts: string;
  locationOwnership: string; // own/lease
  
  // Buyer-specific questions
  maxInvestmentBudget: number;
  availableCash: number;
  hasIndustryExperience: boolean;
  timeCommitmentHours: number;
  managementPlan: string; // have/will-hire
  riskTolerance: string; // low/medium/high
  buyingMotivation: string;
  plannedChanges: string;
  investmentTimeline: string; // 1-3/3-5/5+ years
  financialRecordPriorities: string[];
  customerRelationshipConcerns: string;
  legalRegulatoryIssues: string;
  preferredPurchaseMethod: string; // cash/seller-financing
  openToEarnOut: boolean;
  minAcceptableROI: number;
  
  // Legacy fields for compatibility
  sde: number;
  addBacks: number;
  ownerInvolvement: string;
  growthTrend: string;
  majorRisks: string;
  
  // Uploaded files
  uploadedFiles?: any[];
}

const initialData: ValuationData = {
  // Step 1: Buyer/Seller Selection  
  buyerOrSeller: '',
  
  // Basic Business Info
  businessName: '',
  industry: '',
  location: '',
  yearsInBusiness: 0,
  
  // Financial data (3 years)
  annualRevenue: [0, 0, 0],
  sdeData: [0, 0, 0],
  profitMargin: 0,
  
  // Seller-specific questions
  ownerWorkHours: 0,
  canRunWithoutOwner: false,
  hasKeyEmployees: false,
  topCustomersRevenuePct: 0,
  customerRetentionPct: 0,
  hasLongTermContracts: false,
  growthRates: [0, 0, 0],
  competitiveAdvantage: '',
  marketSize: '',
  ownedAssets: '',
  businessDebts: '',
  locationOwnership: '',
  
  // Buyer-specific questions
  maxInvestmentBudget: 0,
  availableCash: 0,
  hasIndustryExperience: false,
  timeCommitmentHours: 0,
  managementPlan: '',
  riskTolerance: '',
  buyingMotivation: '',
  plannedChanges: '',
  investmentTimeline: '',
  financialRecordPriorities: [],
  customerRelationshipConcerns: '',
  legalRegulatoryIssues: '',
  preferredPurchaseMethod: '',
  openToEarnOut: false,
  minAcceptableROI: 0,
  
  // Legacy fields for compatibility
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

  // Total steps: 1=Buyer/Seller, 2=Questions, 3=Industry, 4=FileUpload, 5=Results
  const totalSteps = 5;

  const createValuationMutation = useMutation({
    mutationFn: async (data: ValuationData) => {
      console.log("Starting valuation calculation...");
      console.log("Sending valuation data:", JSON.stringify(data, null, 2));
      
      // Add detailed validation logging
      console.log("Business name:", data.businessName);
      console.log("Industry:", data.industry);
      console.log("Annual revenue:", data.annualRevenue);
      console.log("SDE data:", data.sdeData);
      
      const response = await apiRequest("POST", "/api/valuations", data);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }
      return await response.json();
    },
    onSuccess: (result) => {
      console.log("✓ Valuation created successfully:", result);
      setValuationResult(result);
      setCurrentStep(5);
      toast({
        title: "Valuation Complete!",
        description: "Your business valuation has been calculated.",
      });
    },
    onError: (error: Error) => {
      console.error("✗ Valuation creation error:", error);
      toast({
        title: "Calculation Failed",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleNext = () => {
    console.log("handleNext called, current step:", currentStep);
    console.log("Current valuation data:", valuationData);
    
    if (currentStep < totalSteps) {
      if (currentStep === 4) {
        // Submit valuation on step 4 completion (after file upload)
        console.log("Triggering valuation calculation...");
        createValuationMutation.mutate(valuationData);
      } else {
        console.log("Moving to next step:", currentStep + 1);
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
        // Questions step - basic validation based on buyer/seller type
        if (valuationData.buyerOrSeller === 'selling') {
          return valuationData.annualRevenue.some(rev => rev > 0) &&
                 valuationData.sdeData.some(sde => sde > 0);
        } else {
          return valuationData.maxInvestmentBudget > 0 &&
                 valuationData.availableCash > 0;
        }
      case 3:
        return valuationData.businessName && 
               valuationData.industry && 
               valuationData.location &&
               valuationData.yearsInBusiness > 0;
      case 4:
        return true; // File upload is optional
      case 5:
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
          {/* Step 1: Buyer/Seller Selection */}
          {currentStep === 1 && (
            <BuyerSellerSelection
              value={valuationData.buyerOrSeller}
              onChange={(value) => handleDataUpdate({ buyerOrSeller: value })}
              onNext={handleNext}
            />
          )}

          {/* Step 2: Detailed Questions based on buyer/seller type */}
          {currentStep === 2 && valuationData.buyerOrSeller === 'selling' && (
            <SellerQuestions
              data={valuationData}
              onChange={handleDataUpdate}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}

          {currentStep === 2 && valuationData.buyerOrSeller === 'buying' && (
            <BuyerQuestions
              data={valuationData}
              onChange={handleDataUpdate}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}

          {/* Step 3: Industry Selection and Business Details */}
          {currentStep === 3 && (
            <IndustrySelection
              data={valuationData}
              onChange={handleDataUpdate}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}

          {/* Step 4: File Upload */}
          {currentStep === 4 && (
            <FileUpload
              valuationId={valuationResult?.id}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isLoading={createValuationMutation.isPending}
              onFilesUpdate={(files) => handleDataUpdate({ uploadedFiles: files })}
            />
          )}

          {/* Step 5: Valuation Results */}
          {currentStep === 5 && valuationResult && (
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
