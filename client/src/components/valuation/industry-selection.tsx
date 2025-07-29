import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Building2 } from "lucide-react";
import { getAllIndustries } from "@/lib/industry-multiples";

interface IndustrySelectionProps {
  data: any;
  onChange: (updates: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function IndustrySelection({ data, onChange, onNext, onPrevious }: IndustrySelectionProps) {
  const industries = getAllIndustries();
  const selectedIndustry = industries.find(ind => ind.industry === data.industry);

  const states = [
    { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" }, { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" }, { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" }, { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" }, { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" }, { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" }, { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" }, { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" }, { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" }, { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" }, { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" }, { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" }, { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" }, { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" }, { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" }, { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" }, { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" }
  ];

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Business Details & Industry</h3>
          <p className="text-slate-600">Complete your business profile with industry and location information.</p>
        </div>

        <div className="space-y-8">
          {/* Basic Business Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Building2 className="w-6 h-6 text-blue-600 mr-3" />
              <h4 className="text-xl font-semibold text-blue-900">Business Information</h4>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="businessName" className="text-lg font-medium">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  value={data.businessName || ''}
                  onChange={(e) => onChange({ businessName: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location" className="text-lg font-medium">
                    Business Location (State)
                  </Label>
                  <Select
                    value={data.location}
                    onValueChange={(value) => onChange({ location: value })}
                  >
                    <SelectTrigger>
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
                </div>

                <div>
                  <Label htmlFor="yearsInBusiness" className="text-lg font-medium">
                    Years in Business
                  </Label>
                  <Input
                    id="yearsInBusiness"
                    type="number"
                    placeholder="5"
                    value={data.yearsInBusiness || ''}
                    onChange={(e) => onChange({ yearsInBusiness: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Industry Selection */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Info className="w-6 h-6 text-green-600 mr-3" />
              <h4 className="text-xl font-semibold text-green-900">Industry Classification</h4>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="industry" className="text-lg font-medium">
                  What is your business's industry?
                </Label>
                <p className="text-sm text-gray-600 mb-3">
                  Different industries have different typical valuation multiples based on market conditions and risk factors.
                </p>
                <Select
                  value={data.industry}
                  onValueChange={(value) => onChange({ industry: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.industry} value={industry.industry}>
                        {industry.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Industry Information Display */}
              {selectedIndustry && (
                <div className="bg-white border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-900 mb-2">
                    {selectedIndustry.description}
                  </h5>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Typical SDE Multiple:</strong> {selectedIndustry.multiple}x
                  </p>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Valuation Factors:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedIndustry.factors.map((factor, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Industry Multipliers Reference Table */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Industry Multipliers Reference</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-2 font-semibold">Industry Type</th>
                    <th className="text-left py-2 font-semibold">Typical SDE Multiple</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {industries.slice(0, 10).map((industry) => ( // Show first 10 for space
                    <tr key={industry.industry} className={data.industry === industry.industry ? "bg-blue-50" : ""}>
                      <td className="py-2">{industry.description}</td>
                      <td className="py-2 font-medium">{industry.multiple}x</td>
                    </tr>
                  ))}
                  <tr className="text-gray-500 italic">
                    <td colSpan={2} className="py-2 text-center">
                      ... and {industries.length - 10} more industries available in the dropdown above
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              * Actual multiples may vary based on specific business factors, market conditions, and financial performance.
            </p>
          </div>
        </div>

        <div className="flex justify-between pt-8">
          <Button variant="ghost" onClick={onPrevious}>
            Previous
          </Button>
          <Button onClick={onNext}>
            Continue to File Upload
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}