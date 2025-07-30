interface IndustryMultiple {
  industry: string;
  multiple: number;
  description: string;
  factors: string[];
}

// Industry multiples based on SDE (Seller's Discretionary Earnings)
// Comprehensive industry list with typical multiplier ranges
const industryMultiples: IndustryMultiple[] = [
  {
    industry: "accounting-bookkeeping",
    multiple: 3.8,
    description: "Accounting & Bookkeeping",
    factors: ["Professional licensing", "Client retention", "Technology systems", "Seasonal workload"]
  },
  {
    industry: "advertising-marketing",
    multiple: 3.5,
    description: "Advertising & Marketing",
    factors: ["Client portfolio", "Creative assets", "Team expertise", "Market competition"]
  },
  {
    industry: "architecture-engineering",
    multiple: 3.8,
    description: "Architecture & Engineering",
    factors: ["Professional licensing", "Project complexity", "Technology tools", "Industry expertise"]
  },
  {
    industry: "auto-repair-services",
    multiple: 2.6,
    description: "Auto Repair & Services",
    factors: ["Equipment value", "Technical expertise", "Customer relationships", "Location"]
  },
  {
    industry: "beauty-personal-care",
    multiple: 2.8,
    description: "Beauty & Personal Care",
    factors: ["Location lease", "Equipment value", "Client retention", "Service variety"]
  },
  {
    industry: "cleaning-services",
    multiple: 2.5,
    description: "Cleaning Services",
    factors: ["Contract stability", "Low barrier to entry", "Equipment needs", "Staff turnover"]
  },
  {
    industry: "computer-it-services",
    multiple: 4.2,
    description: "Computer & IT Services",
    factors: ["Technical expertise", "Client contracts", "Technology assets", "Market demand"]
  },
  {
    industry: "consulting-services",
    multiple: 4.0,
    description: "Consulting Services",
    factors: ["High margins", "Intellectual property", "Client relationships", "Owner dependency"]
  },
  {
    industry: "construction",
    multiple: 2.4,
    description: "Construction",
    factors: ["Equipment value", "Licensing", "Project pipeline", "Bonding capacity"]
  },
  {
    industry: "daycare-education",
    multiple: 2.8,
    description: "Daycare & Education",
    factors: ["Licensing requirements", "Facility value", "Staff qualifications", "Waiting lists"]
  },
  {
    industry: "dental-practice",
    multiple: 3.8,
    description: "Dental Practice",
    factors: ["Professional licenses", "Patient base", "Equipment value", "Insurance contracts"]
  },
  {
    industry: "e-commerce-online-retail",
    multiple: 3.8,
    description: "E-commerce & Online Retail",
    factors: ["Digital assets", "Customer base", "Supply chain", "Platform dependency"]
  },
  {
    industry: "event-planning",
    multiple: 2.9,
    description: "Event Planning",
    factors: ["Client relationships", "Vendor networks", "Seasonal patterns", "Creative assets"]
  },
  {
    industry: "financial-services",
    multiple: 4.0,
    description: "Financial Services",
    factors: ["Professional licensing", "Client assets", "Regulatory compliance", "Trust relationships"]
  },
  {
    industry: "fitness-wellness",
    multiple: 3.0,
    description: "Fitness & Wellness",
    factors: ["Membership base", "Equipment value", "Location lease", "Competition"]
  },
  {
    industry: "food-beverage",
    multiple: 2.5,
    description: "Food & Beverage",
    factors: ["Brand recognition", "Supply chain", "Quality systems", "Market demand"]
  },
  {
    industry: "graphic-design-creative",
    multiple: 3.0,
    description: "Graphic Design & Creative",
    factors: ["Portfolio quality", "Client base", "Creative tools", "Market positioning"]
  },
  {
    industry: "healthcare-services",
    multiple: 4.2,
    description: "Healthcare Services",
    factors: ["Professional licensing", "Recurring patients", "Equipment value", "Regulatory compliance"]
  },
  {
    industry: "home-services-maintenance",
    multiple: 2.7,
    description: "Home Services & Maintenance",
    factors: ["Technical licensing", "Equipment value", "Service contracts", "Geographic coverage"]
  },
  {
    industry: "insurance-services",
    multiple: 3.5,
    description: "Insurance Services",
    factors: ["Client portfolio", "Licensing", "Commission structure", "Carrier relationships"]
  },
  {
    industry: "landscaping-lawn-care",
    multiple: 2.8,
    description: "Landscaping & Lawn Care",
    factors: ["Equipment value", "Seasonal patterns", "Contract vs. one-time work", "Labor management"]
  },
  {
    industry: "legal-services",
    multiple: 3.2,
    description: "Legal Services",
    factors: ["Professional licensing", "Client base", "Specialization", "Case complexity"]
  },
  {
    industry: "manufacturing",
    multiple: 3.0,
    description: "Manufacturing",
    factors: ["Equipment value", "Supply chain", "Quality systems", "Market demand"]
  },
  {
    industry: "medical-practice",
    multiple: 4.0,
    description: "Medical Practice",
    factors: ["Professional licenses", "Patient base", "Equipment value", "Insurance contracts"]
  },
  {
    industry: "pet-services",
    multiple: 2.7,
    description: "Pet Services",
    factors: ["Customer loyalty", "Service contracts", "Facility requirements", "Insurance needs"]
  },
  {
    industry: "photography-video",
    multiple: 2.6,
    description: "Photography & Video",
    factors: ["Equipment value", "Portfolio quality", "Client relationships", "Market competition"]
  },
  {
    industry: "plumbing-hvac",
    multiple: 2.9,
    description: "Plumbing & HVAC",
    factors: ["Technical licensing", "Equipment value", "Emergency services", "Customer contracts"]
  },
  {
    industry: "professional-services",
    multiple: 4.5,
    description: "Professional Services",
    factors: ["Expertise level", "Client relationships", "Industry reputation", "Service quality"]
  },
  {
    industry: "real-estate-services",
    multiple: 3.3,
    description: "Real Estate Services",
    factors: ["Agent retention", "Market cycles", "Brand recognition", "Territory coverage"]
  },
  {
    industry: "restaurant-food-service",
    multiple: 2.3,
    description: "Restaurant & Food Service",
    factors: ["Location premium", "Brand recognition", "Operating complexity", "Market saturation"]
  },
  {
    industry: "retail-store",
    multiple: 2.4,
    description: "Retail Store",
    factors: ["Location value", "Inventory turnover", "Brand recognition", "Customer loyalty"]
  },
  {
    industry: "software-as-a-service--saas-",
    multiple: 6.0,
    description: "Software as a Service (SaaS)",
    factors: ["Recurring revenue", "Scalability", "Technology stack", "Customer retention"]
  },
  {
    industry: "technology-software",
    multiple: 5.5,
    description: "Technology & Software",
    factors: ["Scalability", "Intellectual property", "Market growth", "Innovation potential"]
  },
  {
    industry: "transportation-logistics",
    multiple: 2.6,
    description: "Transportation & Logistics",
    factors: ["Fleet value", "Routes and contracts", "Regulatory compliance", "Fuel costs"]
  },
  {
    industry: "travel-tourism",
    multiple: 2.5,
    description: "Travel & Tourism",
    factors: ["Seasonal patterns", "Location dependence", "Service quality", "Market volatility"]
  },
  {
    industry: "veterinary-services",
    multiple: 3.5,
    description: "Veterinary Services",
    factors: ["Professional licensing", "Equipment value", "Client loyalty", "Emergency services"]
  },
  {
    industry: "web-design-development",
    multiple: 3.5,
    description: "Web Design & Development",
    factors: ["Technical expertise", "Portfolio quality", "Client retention", "Technology trends"]
  },
  {
    industry: "wholesale-distribution",
    multiple: 2.2,
    description: "Wholesale & Distribution",
    factors: ["Inventory management", "Supplier relationships", "Logistics efficiency", "Market reach"]
  },
  {
    industry: "convenience-store",
    multiple: 2.5,
    description: "Convenience Store",
    factors: ["Location value", "Inventory turnover", "Operating hours", "Competition level"]
  },
  {
    industry: "specialty-retail",
    multiple: 3.0,
    description: "Specialty Retail",
    factors: ["Brand recognition", "Customer loyalty", "Inventory management", "Market niche"]
  },
  {
    industry: "auto-repair",
    multiple: 3.0,
    description: "Auto Repair Services",
    factors: ["Equipment value", "Technical expertise", "Customer relationships", "Location"]
  },
  {
    industry: "restaurant",
    multiple: 2.5,
    description: "Restaurant",
    factors: ["Location premium", "Brand recognition", "Operating complexity", "Market saturation"]
  },
  {
    industry: "light-manufacturing",
    multiple: 3.5,
    description: "Light Manufacturing",
    factors: ["Equipment value", "Supply chain", "Quality systems", "Market demand"]
  },
  {
    industry: "heavy-manufacturing",
    multiple: 3.0,
    description: "Heavy Manufacturing",
    factors: ["Capital equipment", "Facility requirements", "Regulatory compliance", "Market cycles"]
  },
  {
    industry: "ecommerce",
    multiple: 3.25,
    description: "eCommerce Business",
    factors: ["Digital assets", "Customer base", "Supply chain", "Platform dependency"]
  },
  {
    industry: "saas",
    multiple: 4.75,
    description: "SaaS (Software as a Service)",
    factors: ["Recurring revenue", "Scalability", "Technology stack", "Customer retention"]
  },
  {
    industry: "digital-marketing",
    multiple: 3.25,
    description: "Digital Marketing Agency",
    factors: ["Client portfolio", "Creative assets", "Team expertise", "Market competition"]
  },
  {
    industry: "home-services",
    multiple: 3.0,
    description: "Home Services (HVAC, Plumbing, etc.)",
    factors: ["Technical licensing", "Equipment value", "Service contracts", "Geographic coverage"]
  },
  {
    industry: "fitness",
    multiple: 2.5,
    description: "Fitness/Gym",
    factors: ["Membership base", "Equipment value", "Location lease", "Competition"]
  },
  {
    industry: "daycare",
    multiple: 3.0,
    description: "Daycare/Childcare",
    factors: ["Licensing requirements", "Facility value", "Staff qualifications", "Waiting lists"]
  },
  {
    industry: "medical-practice",
    multiple: 4.0,
    description: "Medical/Dental Practice",
    factors: ["Professional licenses", "Patient base", "Equipment value", "Insurance contracts"]
  },
  {
    industry: "gas-station",
    multiple: 2.5,
    description: "Gas Station",
    factors: ["Location value", "Fuel margins", "Convenience store sales", "Environmental compliance"]
  },
  {
    industry: "franchise",
    multiple: 2.75,
    description: "Franchise Business",
    factors: ["Brand recognition", "Territory rights", "Franchisor support", "Operating restrictions"]
  },
  {
    industry: "construction",
    multiple: 3.0,
    description: "Construction/Contracting",
    factors: ["Equipment value", "Licensing", "Project pipeline", "Bonding capacity"]
  },
  {
    industry: "logistics",
    multiple: 3.0,
    description: "Logistics/Trucking",
    factors: ["Fleet value", "Routes and contracts", "Regulatory compliance", "Fuel costs"]
  },
  {
    industry: "pet-services",
    multiple: 2.5,
    description: "Pet Services",
    factors: ["Customer loyalty", "Service contracts", "Facility requirements", "Insurance needs"]
  },
  {
    industry: "salon",
    multiple: 2.5,
    description: "Salon/Barbershop",
    factors: ["Location lease", "Equipment value", "Stylist retention", "Customer base"]
  },
  {
    industry: "pharmacy",
    multiple: 3.5,
    description: "Pharmacy",
    factors: ["Professional licensing", "Inventory value", "Insurance contracts", "Location"]
  },
  {
    industry: "car-wash",
    multiple: 3.0,
    description: "Car Wash",
    factors: ["Equipment value", "Location traffic", "Operating model", "Environmental compliance"]
  },
  {
    industry: "laundromat",
    multiple: 3.0,
    description: "Laundromat",
    factors: ["Equipment value", "Location demographics", "Lease terms", "Utility costs"]
  },
  {
    industry: "tutoring",
    multiple: 3.0,
    description: "Tutoring/Education",
    factors: ["Instructor qualifications", "Student retention", "Curriculum value", "Market demand"]
  },
  {
    industry: "real-estate",
    multiple: 2.5,
    description: "Real Estate Brokerage",
    factors: ["Agent retention", "Market cycles", "Brand recognition", "Territory coverage"]
  },
  {
    industry: "blog-website",
    multiple: 3.25,
    description: "Blog/Content Website",
    factors: ["Traffic volume", "Revenue streams", "Content quality", "SEO ranking"]
  },
  {
    industry: "youtube-channel",
    multiple: 3.75,
    description: "YouTube Channel",
    factors: ["Subscriber base", "View consistency", "Monetization streams", "Content niche"]
  },
  {
    industry: "affiliate-marketing",
    multiple: 3.25,
    description: "Affiliate Marketing Site",
    factors: ["Traffic quality", "Conversion rates", "Partner relationships", "Content assets"]
  },
  {
    industry: "mobile-app",
    multiple: 3.75,
    description: "Mobile App",
    factors: ["User base", "Revenue model", "App store ranking", "Development complexity"]
  },
  {
    industry: "podcast",
    multiple: 2.75,
    description: "Podcast",
    factors: ["Listener base", "Sponsorship deals", "Content quality", "Distribution channels"]
  },
  {
    industry: "dropshipping",
    multiple: 2.75,
    description: "Dropshipping Store",
    factors: ["Supplier relationships", "Brand recognition", "Customer acquisition", "Platform dependency"]
  },
  {
    industry: "amazon-fba",
    multiple: 3.25,
    description: "Amazon FBA Business",
    factors: ["Product rankings", "Inventory levels", "Brand registry", "Review ratings"]
  },
  {
    industry: "online-course",
    multiple: 3.25,
    description: "Online Course Business",
    factors: ["Course quality", "Student success", "Marketing assets", "Platform independence"]
  },
  {
    industry: "membership-site",
    multiple: 4.0,
    description: "Membership/Subscription Site",
    factors: ["Member retention", "Content library", "Community engagement", "Recurring revenue"]
  },
  {
    industry: "other",
    multiple: 2.5,
    description: "Other Business Type",
    factors: ["Industry-specific factors", "Market positioning", "Operational efficiency", "Growth potential"]
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
