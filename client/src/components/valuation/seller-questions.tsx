import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Info, TrendingUp, DollarSign, Users, Building } from "lucide-react";

interface SellerQuestionsProps {
  data: any;
  onChange: (updates: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function SellerQuestions({ data, onChange, onNext, onPrevious }: SellerQuestionsProps) {
  const handleYearlyDataChange = (field: string, yearIndex: number, value: number) => {
    const currentData = data[field] || [0, 0, 0];
    const newData = [...currentData];
    newData[yearIndex] = value;
    onChange({ [field]: newData });
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Seller Questionnaire</h3>
          <p className="text-slate-600">Please provide detailed information about your business to generate an accurate valuation.</p>
        </div>

        <div className="space-y-8">
          {/* Financial Performance Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="w-6 h-6 text-blue-600 mr-3" />
              <h4 className="text-xl font-semibold text-blue-900">Financial Performance</h4>
            </div>

            {/* Annual Revenue for 3 years */}
            <div className="mb-6">
              <Label className="text-lg font-medium mb-3 block">Annual Revenue (Last 3 Years)</Label>
              <div className="grid md:grid-cols-3 gap-4">
                {[0, 1, 2].map((yearIndex) => (
                  <div key={yearIndex}>
                    <Label htmlFor={`revenue-year-${yearIndex}`}>
                      Year {yearIndex + 1} (Most Recent)
                    </Label>
                    <Input
                      id={`revenue-year-${yearIndex}`}
                      type="number"
                      placeholder="500000"
                      value={data.annualRevenue?.[yearIndex] || ''}
                      onChange={(e) => handleYearlyDataChange('annualRevenue', yearIndex, parseInt(e.target.value) || 0)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* SDE for 3 years */}
            <div className="mb-6">
              <Label className="text-lg font-medium mb-3 block">
                Seller's Discretionary Earnings (SDE) - Last 3 Years
              </Label>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                <p className="text-yellow-800 text-sm">
                  SDE = Net Income + Owner Salary + Owner Benefits + Personal Expenses + Depreciation + Interest
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[0, 1, 2].map((yearIndex) => (
                  <div key={yearIndex}>
                    <Label htmlFor={`sde-year-${yearIndex}`}>
                      Year {yearIndex + 1} SDE ($)
                    </Label>
                    <Input
                      id={`sde-year-${yearIndex}`}
                      type="number"
                      placeholder="150000"
                      value={data.sdeData?.[yearIndex] || ''}
                      onChange={(e) => handleYearlyDataChange('sdeData', yearIndex, parseInt(e.target.value) || 0)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Profit Margin */}
            <div>
              <Label htmlFor="profitMargin" className="text-lg font-medium">
                Current Profit Margin (%)
              </Label>
              <Input
                id="profitMargin"
                type="number"
                placeholder="25"
                value={data.profitMargin || ''}
                onChange={(e) => onChange({ profitMargin: parseFloat(e.target.value) || 0 })}
                className="max-w-xs"
              />
            </div>
          </div>

          {/* Business Dependency Section */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-orange-600 mr-3" />
              <h4 className="text-xl font-semibold text-orange-900">Business Dependency</h4>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="ownerWorkHours" className="text-lg font-medium">
                  How many hours per week do you work in the business?
                </Label>
                <Input
                  id="ownerWorkHours"
                  type="number"
                  placeholder="40"
                  value={data.ownerWorkHours || ''}
                  onChange={(e) => onChange({ ownerWorkHours: parseInt(e.target.value) || 0 })}
                  className="max-w-xs"
                />
              </div>

              <div>
                <Label className="text-lg font-medium mb-3 block">
                  Could the business run without you for 30 days?
                </Label>
                <RadioGroup
                  value={data.canRunWithoutOwner?.toString()}
                  onValueChange={(value) => onChange({ canRunWithoutOwner: value === 'true' })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="run-yes" />
                    <Label htmlFor="run-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="run-no" />
                    <Label htmlFor="run-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-lg font-medium mb-3 block">
                  Do you have key employees who could run operations in your absence?
                </Label>
                <RadioGroup
                  value={data.hasKeyEmployees?.toString()}
                  onValueChange={(value) => onChange({ hasKeyEmployees: value === 'true' })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="employees-yes" />
                    <Label htmlFor="employees-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="employees-no" />
                    <Label htmlFor="employees-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Customer Base Section */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Building className="w-6 h-6 text-green-600 mr-3" />
              <h4 className="text-xl font-semibold text-green-900">Customer Base</h4>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="topCustomersRevenue" className="text-lg font-medium">
                  What percentage of revenue comes from your top 3 customers? (%)
                </Label>
                <Input
                  id="topCustomersRevenue"
                  type="number"
                  placeholder="30"
                  value={data.topCustomersRevenuePct || ''}
                  onChange={(e) => onChange({ topCustomersRevenuePct: parseFloat(e.target.value) || 0 })}
                  className="max-w-xs"
                />
              </div>

              <div>
                <Label htmlFor="customerRetention" className="text-lg font-medium">
                  What percentage of customers stay year-over-year? (%)
                </Label>
                <Input
                  id="customerRetention"
                  type="number"
                  placeholder="85"
                  value={data.customerRetentionPct || ''}
                  onChange={(e) => onChange({ customerRetentionPct: parseFloat(e.target.value) || 0 })}
                  className="max-w-xs"
                />
              </div>

              <div>
                <Label className="text-lg font-medium mb-3 block">
                  Do you have long-term contracts with major customers?
                </Label>
                <RadioGroup
                  value={data.hasLongTermContracts?.toString()}
                  onValueChange={(value) => onChange({ hasLongTermContracts: value === 'true' })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="contracts-yes" />
                    <Label htmlFor="contracts-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="contracts-no" />
                    <Label htmlFor="contracts-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Growth & Market Section */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600 mr-3" />
              <h4 className="text-xl font-semibold text-purple-900">Growth & Market</h4>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-lg font-medium mb-3 block">
                  Year-over-year growth rate for the last 3 years (%)
                </Label>
                <div className="grid md:grid-cols-3 gap-4">
                  {[0, 1, 2].map((yearIndex) => (
                    <div key={yearIndex}>
                      <Label htmlFor={`growth-year-${yearIndex}`}>
                        Year {yearIndex + 1} Growth (%)
                      </Label>
                      <Input
                        id={`growth-year-${yearIndex}`}
                        type="number"
                        placeholder="15"
                        value={data.growthRates?.[yearIndex] || ''}
                        onChange={(e) => handleYearlyDataChange('growthRates', yearIndex, parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="competitiveAdvantage" className="text-lg font-medium">
                  What is your competitive advantage?
                </Label>
                <Textarea
                  id="competitiveAdvantage"
                  rows={3}
                  placeholder="Describe what sets your business apart from competitors..."
                  value={data.competitiveAdvantage || ''}
                  onChange={(e) => onChange({ competitiveAdvantage: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="marketSize" className="text-lg font-medium">
                  What is your geographic market size?
                </Label>
                <Select
                  value={data.marketSize}
                  onValueChange={(value) => onChange({ marketSize: value })}
                >
                  <SelectTrigger className="max-w-xs">
                    <SelectValue placeholder="Select market size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                    <SelectItem value="national">National</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Assets & Liabilities Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Building className="w-6 h-6 text-gray-600 mr-3" />
              <h4 className="text-xl font-semibold text-gray-900">Assets & Liabilities</h4>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="ownedAssets" className="text-lg font-medium">
                  What equipment/assets do you own? (with estimated value)
                </Label>
                <Textarea
                  id="ownedAssets"
                  rows={3}
                  placeholder="List equipment, vehicles, inventory, etc. with estimated values..."
                  value={data.ownedAssets || ''}
                  onChange={(e) => onChange({ ownedAssets: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="businessDebts" className="text-lg font-medium">
                  What debts/liabilities does the business have?
                </Label>
                <Textarea
                  id="businessDebts"
                  rows={3}
                  placeholder="List loans, credit lines, outstanding payables, etc..."
                  value={data.businessDebts || ''}
                  onChange={(e) => onChange({ businessDebts: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-lg font-medium mb-3 block">
                  Do you own or lease your business location?
                </Label>
                <RadioGroup
                  value={data.locationOwnership}
                  onValueChange={(value) => onChange({ locationOwnership: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="own" id="location-own" />
                    <Label htmlFor="location-own">Own</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lease" id="location-lease" />
                    <Label htmlFor="location-lease">Lease</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-8">
          <Button variant="ghost" onClick={onPrevious}>
            Previous
          </Button>
          <Button onClick={onNext}>
            Continue to Industry Selection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}