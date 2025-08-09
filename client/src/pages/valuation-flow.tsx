import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import ProgressSteps from "@/components/valuation/progress-steps";
import BuyerSellerSelection from "@/components/valuation/buyer-seller-selection";
import SellerQuestions from "@/components/valuation/seller-questions";
import BuyerQuestions from "@/components/valuation/buyer-questions";
import ComprehensiveQuestions from "@/components/valuation/comprehensive-questions";
import IndustrySelection from "@/components/valuation/industry-selection";
import FileUpload from "@/components/valuation/file-upload";
import ValuationResult from "@/components/valuation/valuation-result";

export interface ValuationData {
  // Step 1: Buyer/Seller Selection
  buyerOrSeller: 'buying' | 'selling' | '';
  
  // Section 1: Basic Business Information
  businessName: string;
  industry: string;
  businessDescription?: string;
  foundedYear?: number;
  location: string;
  employeeCount?: number;
  
  // Section 2: Financial Performance (Last 12 Months)
  annualRevenue: number | number[]; // Can be single value or array for compatibility
  recurringRevenuePct?: number;
  oneTimeRevenuePct?: number;
  sde: number; // Required for halal-compliant valuations
  sdeMargin?: number;
  grossMargin?: number;
  netProfitMargin?: number;
  ownerSalary?: number;
  addBacks?: number;
  
  // Section 3: Customer & Market Metrics
  customerRetentionRate?: number;
  top5CustomersPct?: number;
  customerLifetimeValue?: number;
  customerAcquisitionCost?: number;
  revenueGrowthRate?: number;
  
  // Section 4: Operational Metrics
  ownerInvolvement: string;
  managementTeam?: string;
  systemsProcesses?: string;
  
  // Section 5: Market & Competition
  marketPosition?: string;
  competitiveAdvantages?: string[];
  marketGrowth?: string;
  
  // Section 6: Risk Assessment
  majorRiskFactors?: string[];
  technologyRisk?: string;
  
  // Section 7: Growth & Future Potential
  growthOpportunities?: string[];
  expansionPlans?: string;
  
  // Section 8: Assets & Liabilities
  majorAssets?: string;
  outstandingDebt?: number;
  intellectualProperty?: string[];
  
  // Legacy fields for compatibility
  yearsInBusiness: number;
  sdeData?: number[]; // Array of 3 years  
  profitMargin?: number;
  sde: number;
  growthTrend: string;
  majorRisks: string;
  
  // Legacy seller-specific questions
  ownerWorkHours?: number;
  canRunWithoutOwner?: boolean;
  hasKeyEmployees?: boolean;
  topCustomersRevenuePct?: number;
  customerRetentionPct?: number;
  hasLongTermContracts?: boolean;
  growthRates?: number[]; // Array of 3 years
  competitiveAdvantage?: string;
  marketSize?: string; // local/regional/national
  ownedAssets?: string;
  businessDebts?: string;
  locationOwnership?: string; // own/lease
  
  // Legacy buyer-specific questions
  maxInvestmentBudget?: number;
  availableCash?: number;
  hasIndustryExperience?: boolean;
  timeCommitmentHours?: number;
  managementPlan?: string; // have/will-hire
  riskTolerance?: string; // low/medium/high
  buyingMotivation?: string;
  plannedChanges?: string;
  investmentTimeline?: string; // 1-3/3-5/5+ years
  financialRecordPriorities?: string[];
  customerRelationshipConcerns?: string;
  legalRegulatoryIssues?: string;
  preferredPurchaseMethod?: string; // cash/seller-financing
  openToEarnOut?: boolean;
  minAcceptableROI?: number;
  
  // Uploaded files
  uploadedFiles?: any[];
}

const initialData: ValuationData = {
  // Step 1: Buyer/Seller Selection (now universal - everyone gets same questions)
  buyerOrSeller: 'selling',
  
  // Section 1: Basic Business Info
  businessName: '',
  industry: '',
  businessDescription: '',
  foundedYear: new Date().getFullYear(),
  location: '',
  employeeCount: 0,
  
  // Section 2: Financial Performance
  annualRevenue: 0,
  recurringRevenuePct: 0,
  oneTimeRevenuePct: 0,
  ebitda: 0,
  ebitdaMargin: 0,
  ownerSalary: 0,
  addBacks: 0,
  
  // Section 3: Customer & Market Metrics
  customerRetentionRate: 0,
  top5CustomersPct: 0,
  customerLifetimeValue: 0,
  customerAcquisitionCost: 0,
  revenueGrowthRate: 0,
  
  // Section 4: Operational Metrics
  ownerInvolvement: '',
  managementTeam: '',
  systemsProcesses: '',
  
  // Section 5: Market & Competition
  marketPosition: '',
  competitiveAdvantages: [],
  marketGrowth: '',
  
  // Section 6: Risk Assessment
  majorRiskFactors: [],
  technologyRisk: '',
  
  // Section 7: Growth & Future Potential
  growthOpportunities: [],
  expansionPlans: '',
  
  // Section 8: Assets & Liabilities
  majorAssets: '',
  outstandingDebt: 0,
  intellectualProperty: [],
  
  // Legacy compatibility fields
  yearsInBusiness: 0,
  sdeData: [0, 0, 0],
  profitMargin: 0,
  sde: 0,
  growthTrend: '',
  majorRisks: '',
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
  minAcceptableROI: 0
};

export default function ValuationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [valuationData, setValuationData] = useState<ValuationData>(initialData);
  const [valuationResult, setValuationResult] = useState<any>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Total steps: 1=Start, 2=Questions, 3=Industry, 4=FileUpload, 5=Results
  const totalSteps = 5;

  // Check user's report limits
  const { data: limitCheck } = useQuery({
    queryKey: ['/api/valuations/check-limits'],
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const createValuationMutation = useMutation({
    mutationFn: async (data: ValuationData) => {
      console.log("Starting valuation calculation...");
      console.log("Sending valuation data:", JSON.stringify(data, null, 2));
      
      // Check limits before submitting (frontend validation)
      if (limitCheck && !limitCheck.canCreate) {
        throw new Error(limitCheck.reason || 'Cannot create report - monthly limit reached');
      }
      
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
      // Refetch limits to update usage display
      queryClient.invalidateQueries({ queryKey: ['/api/valuations/check-limits'] });
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

  const validateRequiredFields = () => {
    const required = [];
    
    // Essential business information
    if (!valuationData.businessName?.trim()) required.push("Business Name");
    if (!valuationData.industry) required.push("Industry");
    if (!valuationData.location?.trim()) required.push("Location");
    if (!valuationData.foundedYear) required.push("Year Founded");
    if (valuationData.employeeCount === undefined) required.push("Number of Employees");
    
    // Critical financial data - SDE only (halal-compliant)
    if (!valuationData.annualRevenue || valuationData.annualRevenue === 0) required.push("Annual Revenue");
    if (!valuationData.sde || valuationData.sde === 0) {
      required.push("SDE (Seller's Discretionary Earnings)");
    }
    
    // Operational details
    if (!valuationData.ownerInvolvement) required.push("Owner Involvement Level");
    
    return required;
  };

  const handleNext = () => {
    console.log("handleNext called, current step:", currentStep);
    console.log("Current valuation data:", valuationData);
    
    if (currentStep < totalSteps) {
      if (currentStep === 2) {
        // Validate essential fields after comprehensive questions
        const missingFields = validateRequiredFields();
        
        if (missingFields.length > 0) {
          toast({
            title: "Required Information Missing",
            description: `Please complete these essential fields: ${missingFields.slice(0, 3).join(', ')}${missingFields.length > 3 ? ` and ${missingFields.length - 3} more` : ''}`,
            variant: "destructive",
          });
          return;
        }
      }
      
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
        return true; // Always can proceed from intro step
      case 2:
        // Comprehensive questions - validate core data (SDE only, halal-compliant)
        return valuationData.businessName && 
               valuationData.industry && 
               ((typeof valuationData.annualRevenue === 'number' && valuationData.annualRevenue > 0) ||
                (Array.isArray(valuationData.annualRevenue) && valuationData.annualRevenue.some(rev => rev > 0))) &&
               valuationData.sde !== undefined &&
               valuationData.sde > 0 &&
               valuationData.ownerInvolvement;
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

          {/* Step 2: Comprehensive Questions */}
          {currentStep === 2 && (
            <ComprehensiveQuestions
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
