import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Info } from "lucide-react";

interface BuyerSellerSelectionProps {
  value: 'buying' | 'selling' | '';
  onChange: (value: 'buying' | 'selling') => void;
  onNext: () => void;
}

export default function BuyerSellerSelection({ value, onChange, onNext }: BuyerSellerSelectionProps) {
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

        {/* Simple dropdown approach */}
        <div className="mb-6">
          <label htmlFor="buyerSeller" className="block text-lg font-semibold mb-3">
            Select your role:
          </label>
          <select 
            id="buyerSeller"
            value={value}
            onChange={(e) => onChange(e.target.value as 'buying' | 'selling')}
            className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
          >
            <option value="">Choose an option...</option>
            <option value="buying">I'm Buying a Business</option>
            <option value="selling">I'm Selling a Business</option>
          </select>
        </div>

        {/* Visual cards for better UX */}
        {value && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className={`p-6 border-2 rounded-lg ${value === 'buying' ? 'border-blue-500 bg-blue-50' : 'opacity-50'}`}>
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h4 className="text-xl font-bold">I'm Buying</h4>
                  <p className="text-gray-600">Looking to acquire a business</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">We'll focus on risk assessment, growth potential, and fair market value to help you make an informed offer.</p>
            </div>

            <div className={`p-6 border-2 rounded-lg ${value === 'selling' ? 'border-green-500 bg-green-50' : 'opacity-50'}`}>
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h4 className="text-xl font-bold">I'm Selling</h4>
                  <p className="text-gray-600">Ready to sell my business</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">We'll help you understand your business's market value and identify factors that could increase its worth.</p>
            </div>
          </div>
        )}

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