import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Info, Calculator } from "lucide-react";
import { ValuationData } from "@/pages/valuation-flow";

interface BusinessDataFormProps {
  data: ValuationData;
  onChange: (updates: Partial<ValuationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const industries = [
  { value: "cleaning", label: "Cleaning Services" },
  { value: "landscaping", label: "Landscaping Services" },
  { value: "consulting", label: "Consulting Services" },
  { value: "healthcare", label: "Healthcare Services" },
  { value: "technology", label: "Technology Services" },
  { value: "convenience-store", label: "Convenience Store" },
  { value: "specialty-retail", label: "Specialty Retail" },
  { value: "auto-repair", label: "Auto Repair Services" },
  { value: "restaurant", label: "Restaurant" },
  { value: "light-manufacturing", label: "Light Manufacturing" },
  { value: "heavy-manufacturing", label: "Heavy Manufacturing" },
  { value: "ecommerce", label: "eCommerce Business" },
  { value: "saas", label: "SaaS (Software as a Service)" },
  { value: "digital-marketing", label: "Digital Marketing Agency" },
  { value: "home-services", label: "Home Services (HVAC, Plumbing, etc.)" },
  { value: "fitness", label: "Fitness/Gym" },
  { value: "daycare", label: "Daycare/Childcare" },
  { value: "medical-practice", label: "Medical/Dental Practice" },
  { value: "gas-station", label: "Gas Station" },
  { value: "franchise", label: "Franchise Business" },
  { value: "construction", label: "Construction/Contracting" },
  { value: "logistics", label: "Logistics/Trucking" },
  { value: "pet-services", label: "Pet Services" },
  { value: "salon", label: "Salon/Barbershop" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "car-wash", label: "Car Wash" },
  { value: "laundromat", label: "Laundromat" },
  { value: "tutoring", label: "Tutoring/Education" },
  { value: "real-estate", label: "Real Estate Brokerage" },
  { value: "blog-website", label: "Blog/Content Website" },
  { value: "youtube-channel", label: "YouTube Channel" },
  { value: "affiliate-marketing", label: "Affiliate Marketing Site" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "podcast", label: "Podcast" },
  { value: "dropshipping", label: "Dropshipping Store" },
  { value: "amazon-fba", label: "Amazon FBA Business" },
  { value: "online-course", label: "Online Course Business" },
  { value: "membership-site", label: "Membership/Subscription Site" },
  { value: "other", label: "Other Business Type" },
];

const states = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export default function BusinessDataForm({ data, onChange, onNext, onPrevious }: BusinessDataFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!data.industry) newErrors.industry = "Industry is required";
    if (!data.location) newErrors.location = "Location is required";
    if (!data.yearsInBusiness || data.yearsInBusiness <= 0) newErrors.yearsInBusiness = "Years in business must be greater than 0";
    if (!data.annualRevenue || data.annualRevenue <= 0) newErrors.annualRevenue = "Annual revenue must be greater than 0";
    if (!data.sde || data.sde <= 0) newErrors.sde = "SDE must be greater than 0";
    if (!data.ownerInvolvement) newErrors.ownerInvolvement = "Owner involvement is required";
    if (!data.growthTrend) newErrors.growthTrend = "Growth trend is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <div className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <Info className="w-5 h-5 inline mr-2" />
              <strong>To provide the most accurate valuation,</strong> we'll ask you a series of questions about your business. Each question is designed to capture factors that affect your business's value. We'll explain why we ask each question along the way.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Business Basics */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2">Business Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={data.businessName}
                  onChange={(e) => onChange({ businessName: e.target.value })}
                  placeholder="Enter business name"
                  className={errors.businessName ? "border-red-500" : ""}
                />
                {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
              </div>
              <div>
                <Label htmlFor="industry" className="flex items-center">
                  Industry
                  <Info className="w-4 h-4 text-blue-500 ml-1" title="Why we ask this: Different industries have different valuation multiples based on market conditions and risk factors." />
                </Label>
                <Select value={data.industry} onValueChange={(value) => onChange({ industry: value })}>
                  <SelectTrigger className={errors.industry ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="location">Location (State)</Label>
                <Select value={data.location} onValueChange={(value) => onChange({ location: value })}>
                  <SelectTrigger className={errors.location ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>
              <div>
                <Label htmlFor="yearsInBusiness" className="flex items-center">
                  Years in Business
                  <Info className="w-4 h-4 text-blue-500 ml-1" title="Why we ask this: Established businesses typically command higher multiples due to proven track record and reduced risk." />
                </Label>
                <Input
                  id="yearsInBusiness"
                  type="number"
                  value={data.yearsInBusiness || ''}
                  onChange={(e) => onChange({ yearsInBusiness: parseInt(e.target.value) || 0 })}
                  placeholder="5"
                  className={errors.yearsInBusiness ? "border-red-500" : ""}
                />
                {errors.yearsInBusiness && <p className="text-red-500 text-sm mt-1">{errors.yearsInBusiness}</p>}
              </div>
              <div>
                <Label htmlFor="annualRevenue">Annual Revenue ($)</Label>
                <Input
                  id="annualRevenue"
                  type="number"
                  value={data.annualRevenue || ''}
                  onChange={(e) => onChange({ annualRevenue: parseInt(e.target.value) || 0 })}
                  placeholder="500000"
                  className={errors.annualRevenue ? "border-red-500" : ""}
                />
                {errors.annualRevenue && <p className="text-red-500 text-sm mt-1">{errors.annualRevenue}</p>}
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2">Financial Details</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <Calculator className="w-5 h-5 inline mr-2" />
                <strong>SDE (Seller's Discretionary Earnings)</strong> is your business profit plus owner's salary, benefits, and personal expenses run through the business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="sde" className="flex items-center">
                  SDE/Owner's Profit ($)
                  <Info className="w-4 h-4 text-blue-500 ml-1" title="Why we ask this: SDE is the primary metric used in small business valuations as it represents the true earning potential for a new owner." />
                </Label>
                <Input
                  id="sde"
                  type="number"
                  value={data.sde || ''}
                  onChange={(e) => onChange({ sde: parseInt(e.target.value) || 0 })}
                  placeholder="150000"
                  className={errors.sde ? "border-red-500" : ""}
                />
                {errors.sde && <p className="text-red-500 text-sm mt-1">{errors.sde}</p>}
              </div>
              <div>
                <Label htmlFor="addBacks" className="flex items-center">
                  Add-backs (Annual) ($)
                  <Info className="w-4 h-4 text-blue-500 ml-1" title="Why we ask this: Add-backs are personal expenses that increase the true profitability for a buyer, affecting the valuation positively." />
                </Label>
                <Input
                  id="addBacks"
                  type="number"
                  value={data.addBacks || ''}
                  onChange={(e) => onChange({ addBacks: parseInt(e.target.value) || 0 })}
                  placeholder="25000"
                />
              </div>
            </div>
          </div>

          {/* Qualitative Factors */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2">Business Quality Factors</h3>
            
            <div>
              <Label htmlFor="ownerInvolvement" className="flex items-center">
                Owner Involvement
                <Info className="w-4 h-4 text-blue-500 ml-1" title="Why we ask this: Businesses that run independently of the owner are often valued higher due to reduced transition risk." />
              </Label>
              <Select value={data.ownerInvolvement} onValueChange={(value) => onChange({ ownerInvolvement: value })}>
                <SelectTrigger className={errors.ownerInvolvement ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal - Business runs without me</SelectItem>
                  <SelectItem value="moderate">Moderate - I work part-time</SelectItem>
                  <SelectItem value="high">High - I'm essential to operations</SelectItem>
                </SelectContent>
              </Select>
              {errors.ownerInvolvement && <p className="text-red-500 text-sm mt-1">{errors.ownerInvolvement}</p>}
            </div>

            <div>
              <Label htmlFor="growthTrend" className="flex items-center">
                Growth Trend (Last 3 Years)
                <Info className="w-4 h-4 text-blue-500 ml-1" title="Why we ask this: Growth trends can increase or decrease your business's value based on future potential." />
              </Label>
              <Select value={data.growthTrend} onValueChange={(value) => onChange({ growthTrend: value })}>
                <SelectTrigger className={errors.growthTrend ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select trend" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="growing">Growing (10%+ annually)</SelectItem>
                  <SelectItem value="stable">Stable (±5% annually)</SelectItem>
                  <SelectItem value="declining">Declining (-5%+ annually)</SelectItem>
                </SelectContent>
              </Select>
              {errors.growthTrend && <p className="text-red-500 text-sm mt-1">{errors.growthTrend}</p>}
            </div>

            <div>
              <Label htmlFor="majorRisks" className="flex items-center">
                Major Business Risks
                <Info className="w-4 h-4 text-blue-500 ml-1" title="Why we ask this: Identifying risks helps provide a more accurate valuation range and alerts potential buyers to important factors." />
              </Label>
              <Textarea
                id="majorRisks"
                rows={3}
                value={data.majorRisks}
                onChange={(e) => onChange({ majorRisks: e.target.value })}
                placeholder="Describe any major risks (customer concentration, key employee dependency, market changes, etc.)"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button variant="ghost" onClick={onPrevious}>
            Previous
          </Button>
          <Button onClick={handleNext}>
            Continue to File Upload
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
