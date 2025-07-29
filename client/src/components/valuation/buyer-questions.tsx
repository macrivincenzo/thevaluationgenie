import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DollarSign, Target, Users, FileText, Handshake } from "lucide-react";

interface BuyerQuestionsProps {
  data: any;
  onChange: (updates: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const financialRecordOptions = [
  "Profit & Loss Statements",
  "Balance Sheets", 
  "Cash Flow Statements",
  "Tax Returns",
  "Customer Lists",
  "Accounts Receivable/Payable",
  "Bank Statements",
  "Contracts and Agreements"
];

export default function BuyerQuestions({ data, onChange, onNext, onPrevious }: BuyerQuestionsProps) {
  const handleFinancialRecordChange = (option: string, checked: boolean) => {
    const current = data.financialRecordPriorities || [];
    if (checked) {
      onChange({ financialRecordPriorities: [...current, option] });
    } else {
      onChange({ financialRecordPriorities: current.filter((item: string) => item !== option) });
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Buyer Questionnaire</h3>
          <p className="text-slate-600">Help us understand your investment goals and requirements to provide the most relevant valuation insights.</p>
        </div>

        <div className="space-y-8">
          {/* Investment Capacity Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="w-6 h-6 text-blue-600 mr-3" />
              <h4 className="text-xl font-semibold text-blue-900">Investment Capacity</h4>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="maxInvestment" className="text-lg font-medium">
                  What is your maximum investment budget? ($)
                </Label>
                <Input
                  id="maxInvestment"
                  type="number"
                  placeholder="1000000"
                  value={data.maxInvestmentBudget || ''}
                  onChange={(e) => onChange({ maxInvestmentBudget: parseInt(e.target.value) || 0 })}
                  className="max-w-xs"
                />
              </div>

              <div>
                <Label htmlFor="availableCash" className="text-lg font-medium">
                  How much cash do you have available for the purchase? ($)
                </Label>
                <Input
                  id="availableCash"
                  type="number"
                  placeholder="500000"
                  value={data.availableCash || ''}
                  onChange={(e) => onChange({ availableCash: parseInt(e.target.value) || 0 })}
                  className="max-w-xs"
                />
              </div>

              <div>
                <Label className="text-lg font-medium mb-3 block">
                  Do you have experience in this industry?
                </Label>
                <RadioGroup
                  value={data.hasIndustryExperience?.toString()}
                  onValueChange={(value) => onChange({ hasIndustryExperience: value === 'true' })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="experience-yes" />
                    <Label htmlFor="experience-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="experience-no" />
                    <Label htmlFor="experience-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Operational Capability Section */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-orange-600 mr-3" />
              <h4 className="text-xl font-semibold text-orange-900">Operational Capability</h4>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="timeCommitment" className="text-lg font-medium">
                  How much time can you dedicate to running this business? (hours/week)
                </Label>
                <Input
                  id="timeCommitment"
                  type="number"
                  placeholder="40"
                  value={data.timeCommitmentHours || ''}
                  onChange={(e) => onChange({ timeCommitmentHours: parseInt(e.target.value) || 0 })}
                  className="max-w-xs"
                />
              </div>

              <div>
                <Label className="text-lg font-medium mb-3 block">
                  Do you have a management team or will you hire one?
                </Label>
                <RadioGroup
                  value={data.managementPlan}
                  onValueChange={(value) => onChange({ managementPlan: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="have" id="team-have" />
                    <Label htmlFor="team-have">I have a management team</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="will-hire" id="team-hire" />
                    <Label htmlFor="team-hire">I will hire a management team</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-lg font-medium mb-3 block">
                  What is your risk tolerance?
                </Label>
                <RadioGroup
                  value={data.riskTolerance}
                  onValueChange={(value) => onChange({ riskTolerance: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="risk-low" />
                    <Label htmlFor="risk-low">Low - I prefer stable, predictable businesses</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="risk-medium" />
                    <Label htmlFor="risk-medium">Medium - I'm comfortable with some uncertainty</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="risk-high" />
                    <Label htmlFor="risk-high">High - I'm willing to take significant risks for higher returns</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Strategic Fit Section */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-green-600 mr-3" />
              <h4 className="text-xl font-semibold text-green-900">Strategic Fit</h4>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="buyingMotivation" className="text-lg font-medium">
                  Why do you want to buy this type of business?
                </Label>
                <Textarea
                  id="buyingMotivation"
                  rows={3}
                  placeholder="Describe your motivation for acquiring this business..."
                  value={data.buyingMotivation || ''}
                  onChange={(e) => onChange({ buyingMotivation: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="plannedChanges" className="text-lg font-medium">
                  What changes do you plan to make?
                </Label>
                <Textarea
                  id="plannedChanges"
                  rows={3}
                  placeholder="Describe any operational, strategic, or expansion plans..."
                  value={data.plannedChanges || ''}
                  onChange={(e) => onChange({ plannedChanges: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-lg font-medium mb-3 block">
                  What is your timeline for this investment?
                </Label>
                <RadioGroup
                  value={data.investmentTimeline}
                  onValueChange={(value) => onChange({ investmentTimeline: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-3" id="timeline-short" />
                    <Label htmlFor="timeline-short">1-3 years - Looking for quick returns</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3-5" id="timeline-medium" />
                    <Label htmlFor="timeline-medium">3-5 years - Medium-term growth</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5+" id="timeline-long" />
                    <Label htmlFor="timeline-long">5+ years - Long-term investment</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Due Diligence Priorities Section */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-purple-600 mr-3" />
              <h4 className="text-xl font-semibold text-purple-900">Due Diligence Priorities</h4>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-lg font-medium mb-4 block">
                  What financial records are most important to verify? (Select all that apply)
                </Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {financialRecordOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`record-${option}`}
                        checked={data.financialRecordPriorities?.includes(option) || false}
                        onCheckedChange={(checked) => handleFinancialRecordChange(option, checked as boolean)}
                      />
                      <Label htmlFor={`record-${option}`} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="customerRelationships" className="text-lg font-medium">
                  What customer relationships are critical to maintain?
                </Label>
                <Textarea
                  id="customerRelationships"
                  rows={3}
                  placeholder="Describe key customer relationships and retention concerns..."
                  value={data.customerRelationshipConcerns || ''}
                  onChange={(e) => onChange({ customerRelationshipConcerns: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="legalIssues" className="text-lg font-medium">
                  What legal or regulatory issues concern you most?
                </Label>
                <Textarea
                  id="legalIssues"
                  rows={3}
                  placeholder="Describe any legal, regulatory, or compliance concerns..."
                  value={data.legalRegulatoryIssues || ''}
                  onChange={(e) => onChange({ legalRegulatoryIssues: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Deal Structure Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Handshake className="w-6 h-6 text-gray-600 mr-3" />
              <h4 className="text-xl font-semibold text-gray-900">Deal Structure</h4>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-lg font-medium mb-3 block">
                  Do you prefer cash purchase or seller financing?
                </Label>
                <RadioGroup
                  value={data.preferredPurchaseMethod}
                  onValueChange={(value) => onChange({ preferredPurchaseMethod: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="payment-cash" />
                    <Label htmlFor="payment-cash">Cash purchase - I prefer to pay in full upfront</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seller-financing" id="payment-financing" />
                    <Label htmlFor="payment-financing">Seller financing - I prefer structured payments over time</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-lg font-medium mb-3 block">
                  Are you open to earn-out or performance-based payments?
                </Label>
                <RadioGroup
                  value={data.openToEarnOut?.toString()}
                  onValueChange={(value) => onChange({ openToEarnOut: value === 'true' })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="earnout-yes" />
                    <Label htmlFor="earnout-yes">Yes - I'm open to performance-based structures</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="earnout-no" />
                    <Label htmlFor="earnout-no">No - I prefer fixed payment terms</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="minROI" className="text-lg font-medium">
                  What is your minimum acceptable return on investment? (%)
                </Label>
                <Input
                  id="minROI"
                  type="number"
                  placeholder="20"
                  value={data.minAcceptableROI || ''}
                  onChange={(e) => onChange({ minAcceptableROI: parseFloat(e.target.value) || 0 })}
                  className="max-w-xs"
                />
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