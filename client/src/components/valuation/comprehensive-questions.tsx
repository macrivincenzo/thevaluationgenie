import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building, DollarSign, Users, TrendingUp, Shield, Lightbulb, Package, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ComprehensiveQuestionsProps {
  data: any;
  onChange: (updates: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function ComprehensiveQuestions({ data, onChange, onNext, onPrevious }: ComprehensiveQuestionsProps) {
  const [currentSection, setCurrentSection] = useState(1);
  const totalSections = 8;

  const handleInputChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };

  const handleCheckboxArrayChange = (field: string, option: string, checked: boolean) => {
    const current = data[field] || [];
    if (checked) {
      onChange({ [field]: [...current, option] });
    } else {
      onChange({ [field]: current.filter((item: string) => item !== option) });
    }
  };

  const canProceedToNextSection = () => {
    switch (currentSection) {
      case 1:
        return data.businessName && data.industry && data.foundedYear && data.location && data.employeeCount >= 0;
      case 2:
        return data.annualRevenue > 0 && data.ebitda !== undefined;
      case 3:
        return true; // All optional
      case 4:
        return data.ownerInvolvement;
      case 5:
        return true; // All optional
      case 6:
        return true; // All optional
      case 7:
        return true; // All optional
      case 8:
        return true; // All optional
      default:
        return true;
    }
  };

  const industryOptions = [
    "Software as a Service (SaaS)",
    "Professional Services", 
    "Manufacturing",
    "Retail/E-commerce",
    "Healthcare Services",
    "Financial Services",
    "Construction",
    "Food & Beverage",
    "Transportation & Logistics",
    "Real Estate Services",
    "Technology/Software",
    "Other"
  ];

  const competitiveAdvantageOptions = [
    "Superior product/service quality",
    "Better customer service",
    "Lower prices",
    "Proprietary technology",
    "Strong brand recognition",
    "Exclusive relationships",
    "First-mover advantage",
    "Other"
  ];

  const riskFactorOptions = [
    "Customer concentration",
    "Supplier dependency",
    "Regulatory changes",
    "Technology disruption",
    "Key person risk",
    "Economic sensitivity",
    "Competition",
    "Other"
  ];

  const growthOpportunityOptions = [
    "New geographic markets",
    "New products/services",
    "Market share expansion",
    "Operational efficiency",
    "Acquisitions",
    "New customer segments",
    "Online expansion",
    "Other"
  ];

  const intellectualPropertyOptions = [
    "Patents",
    "Trademarks",
    "Copyrights",
    "Trade secrets",
    "Proprietary processes",
    "None"
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Building className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900">Basic Business Information</h3>
            </div>

            <div className="grid gap-6">
              <div>
                <Label htmlFor="businessName">Company Name *</Label>
                <Input
                  id="businessName"
                  value={data.businessName || ''}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select value={data.industry || ''} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industryOptions.map((option) => (
                      <SelectItem key={option} value={option.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  value={data.businessDescription || ''}
                  onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                  placeholder="Briefly describe what your business does (2-3 sentences)"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="foundedYear">Year Founded *</Label>
                  <Input
                    id="foundedYear"
                    type="number"
                    value={data.foundedYear || ''}
                    onChange={(e) => handleInputChange('foundedYear', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 2020"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>

                <div>
                  <Label htmlFor="employeeCount">Number of Employees *</Label>
                  <Input
                    id="employeeCount"
                    type="number"
                    value={data.employeeCount || ''}
                    onChange={(e) => handleInputChange('employeeCount', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 10"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Business Location *</Label>
                <Input
                  id="location"
                  value={data.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State (e.g., Austin, TX)"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <DollarSign className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900">Financial Performance (Last 12 Months)</h3>
            </div>

            <div className="grid gap-6">
              <div>
                <Label htmlFor="annualRevenue">Annual Revenue *</Label>
                <Input
                  id="annualRevenue"
                  type="number"
                  value={data.annualRevenue || ''}
                  onChange={(e) => handleInputChange('annualRevenue', parseFloat(e.target.value) || 0)}
                  placeholder="Total revenue for last 12 months"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recurringRevenuePct">Recurring Revenue %</Label>
                  <Input
                    id="recurringRevenuePct"
                    type="number"
                    value={data.recurringRevenuePct || ''}
                    onChange={(e) => handleInputChange('recurringRevenuePct', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 80"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <Label htmlFor="oneTimeRevenuePct">One-time Revenue %</Label>
                  <Input
                    id="oneTimeRevenuePct"
                    type="number"
                    value={data.oneTimeRevenuePct || ''}
                    onChange={(e) => handleInputChange('oneTimeRevenuePct', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 20"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ebitda">EBITDA (Earnings Before Interest, Taxes, Depreciation, Amortization) *</Label>
                <Input
                  id="ebitda"
                  type="number"
                  value={data.ebitda || ''}
                  onChange={(e) => handleInputChange('ebitda', parseFloat(e.target.value) || 0)}
                  placeholder="EBITDA for last 12 months"
                />
              </div>

              <div>
                <Label htmlFor="ebitdaMargin">EBITDA Margin %</Label>
                <Input
                  id="ebitdaMargin"
                  type="number"
                  value={data.ebitdaMargin || ''}
                  onChange={(e) => handleInputChange('ebitdaMargin', parseFloat(e.target.value) || 0)}
                  placeholder="Auto-calculated or enter manually"
                  min="0"
                  max="100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ownerSalary">Owner's Annual Salary/Draw</Label>
                  <Input
                    id="ownerSalary"
                    type="number"
                    value={data.ownerSalary || ''}
                    onChange={(e) => handleInputChange('ownerSalary', parseFloat(e.target.value) || 0)}
                    placeholder="Your annual compensation"
                  />
                </div>

                <div>
                  <Label htmlFor="addBacks">Add-backs (One-time/Personal Expenses)</Label>
                  <Input
                    id="addBacks"
                    type="number"
                    value={data.addBacks || ''}
                    onChange={(e) => handleInputChange('addBacks', parseFloat(e.target.value) || 0)}
                    placeholder="Non-recurring business expenses"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900">Customer & Market Metrics</h3>
            </div>

            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerRetentionRate">Customer Retention Rate %</Label>
                  <Input
                    id="customerRetentionRate"
                    type="number"
                    value={data.customerRetentionRate || ''}
                    onChange={(e) => handleInputChange('customerRetentionRate', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 95"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <Label htmlFor="top5CustomersPct">Top 5 Customers Revenue %</Label>
                  <Input
                    id="top5CustomersPct"
                    type="number"
                    value={data.top5CustomersPct || ''}
                    onChange={(e) => handleInputChange('top5CustomersPct', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 30"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerLifetimeValue">Customer Lifetime Value (LTV)</Label>
                  <Input
                    id="customerLifetimeValue"
                    type="number"
                    value={data.customerLifetimeValue || ''}
                    onChange={(e) => handleInputChange('customerLifetimeValue', parseFloat(e.target.value) || 0)}
                    placeholder="Average LTV per customer"
                  />
                </div>

                <div>
                  <Label htmlFor="customerAcquisitionCost">Customer Acquisition Cost (CAC)</Label>
                  <Input
                    id="customerAcquisitionCost"
                    type="number"
                    value={data.customerAcquisitionCost || ''}
                    onChange={(e) => handleInputChange('customerAcquisitionCost', parseFloat(e.target.value) || 0)}
                    placeholder="Cost to acquire new customer"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="revenueGrowthRate">Annual Revenue Growth Rate %</Label>
                <Input
                  id="revenueGrowthRate"
                  type="number"
                  value={data.revenueGrowthRate || ''}
                  onChange={(e) => handleInputChange('revenueGrowthRate', parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 25"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900">Operational Metrics</h3>
            </div>

            <div className="grid gap-6">
              <div>
                <Label htmlFor="ownerInvolvement">Owner Involvement *</Label>
                <Select value={data.ownerInvolvement || ''} onValueChange={(value) => handleInputChange('ownerInvolvement', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How involved are you in daily operations?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hands-on">Hands-on (I handle most daily tasks)</SelectItem>
                    <SelectItem value="semi-absentee">Semi-absentee (I manage but have good systems)</SelectItem>
                    <SelectItem value="absentee">Absentee (Business runs without my daily involvement)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="managementTeam">Management Team</Label>
                <Select value={data.managementTeam || ''} onValueChange={(value) => handleInputChange('managementTeam', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Do you have a management team?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strong">Yes, strong management team</SelectItem>
                    <SelectItem value="some">Yes, some key employees</SelectItem>
                    <SelectItem value="none">No, I'm essential to operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="systemsProcesses">Systems & Processes Documentation</Label>
                <Select value={data.systemsProcesses || ''} onValueChange={(value) => handleInputChange('systemsProcesses', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How well documented are your systems?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fully">Fully documented (SOPs for everything)</SelectItem>
                    <SelectItem value="well">Well documented (most processes)</SelectItem>
                    <SelectItem value="partially">Partially documented</SelectItem>
                    <SelectItem value="minimal">Minimal documentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900">Market & Competition</h3>
            </div>

            <div className="grid gap-6">
              <div>
                <Label htmlFor="marketPosition">Market Position</Label>
                <Select value={data.marketPosition || ''} onValueChange={(value) => handleInputChange('marketPosition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="What is your position in the market?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leader">Market leader</SelectItem>
                    <SelectItem value="strong">Strong competitor</SelectItem>
                    <SelectItem value="niche">Niche player</SelectItem>
                    <SelectItem value="follower">Follower</SelectItem>
                    <SelectItem value="new">New entrant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Competitive Advantages (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {competitiveAdvantageOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`advantage-${option}`}
                        checked={(data.competitiveAdvantages || []).includes(option)}
                        onCheckedChange={(checked) => handleCheckboxArrayChange('competitiveAdvantages', option, checked as boolean)}
                      />
                      <Label htmlFor={`advantage-${option}`} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="marketGrowth">Market Growth</Label>
                <Select value={data.marketGrowth || ''} onValueChange={(value) => handleInputChange('marketGrowth', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Is your target market growing?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rapidly">Rapidly growing</SelectItem>
                    <SelectItem value="moderately">Moderately growing</SelectItem>
                    <SelectItem value="stable">Stable</SelectItem>
                    <SelectItem value="declining">Declining</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900">Risk Assessment</h3>
            </div>

            <div className="grid gap-6">
              <div>
                <Label>Major Risk Factors (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {riskFactorOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`risk-${option}`}
                        checked={(data.majorRiskFactors || []).includes(option)}
                        onCheckedChange={(checked) => handleCheckboxArrayChange('majorRiskFactors', option, checked as boolean)}
                      />
                      <Label htmlFor={`risk-${option}`} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="technologyRisk">Technology Risk</Label>
                <Select value={data.technologyRisk || ''} onValueChange={(value) => handleInputChange('technologyRisk', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How vulnerable is your business to technology changes?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High risk (technology changes rapidly)</SelectItem>
                    <SelectItem value="moderate">Moderate risk</SelectItem>
                    <SelectItem value="low">Low risk (stable technology)</SelectItem>
                    <SelectItem value="none">No significant risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Lightbulb className="w-6 h-6 text-yellow-600 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900">Growth & Future Potential</h3>
            </div>

            <div className="grid gap-6">
              <div>
                <Label>Growth Opportunities (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {growthOpportunityOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`growth-${option}`}
                        checked={(data.growthOpportunities || []).includes(option)}
                        onCheckedChange={(checked) => handleCheckboxArrayChange('growthOpportunities', option, checked as boolean)}
                      />
                      <Label htmlFor={`growth-${option}`} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="expansionPlans">Expansion Plans</Label>
                <Select value={data.expansionPlans || ''} onValueChange={(value) => handleInputChange('expansionPlans', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Do you have specific expansion plans?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detailed">Yes, detailed plans</SelectItem>
                    <SelectItem value="general">Yes, general plans</SelectItem>
                    <SelectItem value="considering">Considering expansion</SelectItem>
                    <SelectItem value="none">No plans</SelectItem>
                    <SelectItem value="scaling-back">Planning to scale back</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Package className="w-6 h-6 text-gray-600 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900">Assets & Liabilities</h3>
            </div>

            <div className="grid gap-6">
              <div>
                <Label htmlFor="majorAssets">Major Assets</Label>
                <Textarea
                  id="majorAssets"
                  value={data.majorAssets || ''}
                  onChange={(e) => handleInputChange('majorAssets', e.target.value)}
                  placeholder="Describe major assets your business owns (equipment, property, inventory, etc.)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="outstandingDebt">Outstanding Business Debt</Label>
                <Input
                  id="outstandingDebt"
                  type="number"
                  value={data.outstandingDebt || ''}
                  onChange={(e) => handleInputChange('outstandingDebt', parseFloat(e.target.value) || 0)}
                  placeholder="Total business debt amount"
                />
              </div>

              <div>
                <Label>Intellectual Property (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {intellectualPropertyOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`ip-${option}`}
                        checked={(data.intellectualProperty || []).includes(option)}
                        onCheckedChange={(checked) => handleCheckboxArrayChange('intellectualProperty', option, checked as boolean)}
                      />
                      <Label htmlFor={`ip-${option}`} className="text-sm">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
    } else {
      // Calculate years in business from founded year
      const yearsInBusiness = new Date().getFullYear() - (data.foundedYear || new Date().getFullYear());
      
      // Set SDE from EBITDA for compatibility
      const sde = data.ebitda || 0;
      
      // Set compatibility fields
      onChange({
        yearsInBusiness,
        sde,
        growthTrend: data.revenueGrowthRate > 20 ? 'growing' : data.revenueGrowthRate > 0 ? 'stable' : 'declining',
        majorRisks: (data.majorRiskFactors || []).join(', ')
      });
      
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    } else {
      onPrevious();
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Comprehensive Business Assessment</h2>
            <span className="text-sm text-slate-500">Section {currentSection} of {totalSections}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentSection / totalSections) * 100}%` }}
            />
          </div>
        </div>

        {/* Current section content */}
        {renderSection()}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="ghost" 
            onClick={handlePrevious}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentSection === 1 ? 'Back' : 'Previous'}
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceedToNextSection()}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
          >
            {currentSection === totalSections ? 'Continue to Industry Selection' : 'Next Section'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}