import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Info } from "lucide-react";
import { useEffect } from "react";

interface BuyerSellerSelectionProps {
  value: 'buying' | 'selling' | '';
  onChange: (value: 'buying' | 'selling') => void;
  onNext: () => void;
}

export default function BuyerSellerSelection({ value, onChange, onNext }: BuyerSellerSelectionProps) {
  
  // Automatically set the value to "selling" since we're using the same questions for everyone
  useEffect(() => {
    if (!value) {
      onChange('selling');
    }
  }, [value, onChange]);

  const handleContinue = () => {
    console.log("Continue button clicked, proceeding to business questions");
    onNext();
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Business Valuation</h2>
          <div className="flex items-start justify-center mb-6">
            <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-slate-600 text-left">
              Get a professional business valuation using industry-standard methodologies. We'll ask questions about your business to provide an accurate assessment.
            </p>
          </div>
        </div>

        <div className="border-2 border-blue-500 bg-blue-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center">
            <Calculator className="w-8 h-8 text-blue-600 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Professional Business Valuation</h3>
              <p className="text-slate-600">
                Our comprehensive questionnaire will gather the necessary information to calculate your business value using proven methodologies and industry multiples.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-6 mb-8">
          <h4 className="font-semibold text-slate-900 mb-3">What's Included:</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              SDE (Seller's Discretionary Earnings) analysis
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Industry-specific multiplier application
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Comprehensive PDF valuation report
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Risk assessment and market analysis
            </li>
          </ul>
        </div>

        <div className="flex justify-between">
          <Button variant="ghost" disabled>
            Previous
          </Button>
          <Button 
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start Valuation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}