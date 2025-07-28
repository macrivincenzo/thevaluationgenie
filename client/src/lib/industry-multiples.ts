interface IndustryMultiple {
  industry: string;
  multiple: number;
  description: string;
  factors: string[];
}

// Industry multiples based on SDE (Seller's Discretionary Earnings)
// These are typical ranges for service-based businesses
const industryMultiples: IndustryMultiple[] = [
  {
    industry: "consulting",
    multiple: 2.8,
    description: "Professional Consulting Services",
    factors: [
      "High margins and scalability",
      "Intellectual property value",
      "Client relationships and contracts",
      "Owner dependency risk"
    ]
  },
  {
    industry: "marketing",
    multiple: 2.5,
    description: "Marketing & Advertising Services",
    factors: [
      "Creative assets and campaigns",
      "Client portfolio strength", 
      "Digital capabilities",
      "Market competition level"
    ]
  },
  {
    industry: "accounting",
    multiple: 3.2,
    description: "Accounting & Bookkeeping Services",
    factors: [
      "Recurring revenue model",
      "Professional certifications",
      "Client retention rates",
      "Regulatory compliance"
    ]
  },
  {
    industry: "landscaping",
    multiple: 2.3,
    description: "Landscaping & Maintenance Services",
    factors: [
      "Equipment and asset value",
      "Seasonal revenue patterns",
      "Contract vs. one-time work",
      "Labor management complexity"
    ]
  },
  {
    industry: "cleaning",
    multiple: 2.1,
    description: "Cleaning Services",
    factors: [
      "Contract stability",
      "Low barrier to entry",
      "Equipment and supply needs",
      "Staff turnover challenges"
    ]
  },
  {
    industry: "hvac",
    multiple: 2.7,
    description: "HVAC Services",
    factors: [
      "Technical expertise required",
      "Equipment and inventory value",
      "Service contract renewals",
      "Licensing requirements"
    ]
  },
  {
    industry: "legal",
    multiple: 3.0,
    description: "Legal Services",
    factors: [
      "Professional licensing",
      "Case portfolio value",
      "Client relationship strength",
      "Specialization premium"
    ]
  },
  {
    industry: "insurance",
    multiple: 3.5,
    description: "Insurance Services",
    factors: [
      "Commission-based income",
      "Client policy renewals",
      "Carrier relationships",
      "Book of business value"
    ]
  },
  {
    industry: "realestate",
    multiple: 2.4,
    description: "Real Estate Services",
    factors: [
      "Market cycle dependency",
      "Agent team structure",
      "Brand recognition value",
      "Geographic market focus"
    ]
  },
  {
    industry: "other",
    multiple: 2.5,
    description: "Other Service Business",
    factors: [
      "Industry-specific factors",
      "Market positioning",
      "Operational efficiency",
      "Growth potential"
    ]
  }
];

export interface ValuationResult {
  low: number;
  high: number;
  multiple: number;
  industryData: IndustryMultiple;
}

export function calculateValuation(industry: string, sde: number): ValuationResult {
  const industryData = industryMultiples.find(im => im.industry === industry) || industryMultiples.find(im => im.industry === "other")!;
  
  const baseMultiple = industryData.multiple;
  
  // Create a range around the base multiple (±15%)
  const lowMultiple = baseMultiple * 0.85;
  const highMultiple = baseMultiple * 1.15;
  
  const low = Math.round(sde * lowMultiple);
  const high = Math.round(sde * highMultiple);
  
  return {
    low,
    high,
    multiple: baseMultiple,
    industryData
  };
}

export function getIndustryMultiple(industry: string): IndustryMultiple {
  return industryMultiples.find(im => im.industry === industry) || industryMultiples.find(im => im.industry === "other")!;
}

export function getAllIndustries(): IndustryMultiple[] {
  return industryMultiples;
}

// Adjustment factors that can modify the base multiple
export interface ValuationAdjustments {
  ownerInvolvement: number; // multiplier: minimal=1.1, moderate=1.0, high=0.9
  growthTrend: number; // multiplier: growing=1.1, stable=1.0, declining=0.9
  yearsInBusiness: number; // bonus for established businesses
  hasRisks: number; // penalty for identified major risks
}

export function calculateAdjustedValuation(
  industry: string, 
  sde: number, 
  adjustments: Partial<ValuationAdjustments>
): ValuationResult {
  const baseResult = calculateValuation(industry, sde);
  
  let adjustmentFactor = 1.0;
  
  // Owner involvement adjustment
  if (adjustments.ownerInvolvement) {
    adjustmentFactor *= adjustments.ownerInvolvement;
  }
  
  // Growth trend adjustment
  if (adjustments.growthTrend) {
    adjustmentFactor *= adjustments.growthTrend;
  }
  
  // Years in business adjustment
  if (adjustments.yearsInBusiness) {
    adjustmentFactor *= adjustments.yearsInBusiness;
  }
  
  // Risk adjustment
  if (adjustments.hasRisks) {
    adjustmentFactor *= adjustments.hasRisks;
  }
  
  return {
    ...baseResult,
    low: Math.round(baseResult.low * adjustmentFactor),
    high: Math.round(baseResult.high * adjustmentFactor),
  };
}

export function getOwnerInvolvementMultiplier(level: string): number {
  switch (level) {
    case 'minimal': return 1.1;
    case 'moderate': return 1.0;
    case 'high': return 0.9;
    default: return 1.0;
  }
}

export function getGrowthTrendMultiplier(trend: string): number {
  switch (trend) {
    case 'growing': return 1.1;
    case 'stable': return 1.0;
    case 'declining': return 0.9;
    default: return 1.0;
  }
}

export function getYearsInBusinessMultiplier(years: number): number {
  if (years >= 10) return 1.1;
  if (years >= 5) return 1.05;
  if (years >= 3) return 1.0;
  return 0.95; // Less than 3 years
}
