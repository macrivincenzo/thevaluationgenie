import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Info } from "lucide-react";

interface BuyerSellerSelectionProps {
  value: 'buying' | 'selling' | '';
  onChange: (value: 'buying' | 'selling') => void;
  onNext: () => void;
}

export default function BuyerSellerSelection({ value, onChange, onNext }: BuyerSellerSelectionProps) {
  const handleBuyingClick = () => {
    console.log('Buying option clicked');
    onChange('buying');
  };

  const handleSellingClick = () => {
    console.log('Selling option clicked');
    onChange('selling');
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Are you buying or selling?</h3>
          <div className="flex items-start text-slate-600 mb-4">
            <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            <p>
              <strong>Why we ask this:</strong> Buyers and sellers have different priorities that affect valuation approach and the questions we'll ask next.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div 
            className={`cursor-pointer transition-colors border-2 rounded-lg ${
              value === 'buying' ? 'border-primary bg-blue-50' : 'border-slate-200 hover:border-primary'
            }`}
            onClick={handleBuyingClick}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-primary w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">I'm Buying</h4>
                  <p className="text-slate-600 text-sm">Looking to acquire a business</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm">We'll focus on risk assessment, growth potential, and fair market value to help you make an informed offer.</p>
            </div>
          </div>

          <div 
            className={`cursor-pointer transition-colors border-2 rounded-lg ${
              value === 'selling' ? 'border-primary bg-blue-50' : 'border-slate-200 hover:border-primary'
            }`}
            onClick={handleSellingClick}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">I'm Selling</h4>
                  <p className="text-slate-600 text-sm">Ready to sell my business</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm">We'll help you understand your business's market value and identify factors that could increase its worth.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="ghost" disabled>
            Previous
          </Button>
          <Button onClick={onNext} disabled={!value}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}