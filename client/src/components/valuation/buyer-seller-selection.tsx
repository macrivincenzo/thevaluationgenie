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

        {/* Debug info */}
        <div className="mb-4 p-2 bg-gray-100 text-sm">
          Current value: {value || 'none'}
        </div>

        <div className="space-y-4">
          {/* Buying Option - Simplified */}
          <div 
            className={`p-4 border-2 rounded cursor-pointer ${
              value === 'buying' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onMouseDown={() => {
              console.log('Mouse down on buying');
              onChange('buying');
            }}
            onTouchStart={() => {
              console.log('Touch start on buying');
              onChange('buying');
            }}
          >
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h4 className="text-xl font-bold">I'm Buying</h4>
                <p className="text-gray-600">Looking to acquire a business</p>
              </div>
            </div>
          </div>

          {/* Selling Option - Simplified */}
          <div 
            className={`p-4 border-2 rounded cursor-pointer ${
              value === 'selling' ? 'border-green-500 bg-green-50' : 'border-gray-300'
            }`}
            onMouseDown={() => {
              console.log('Mouse down on selling');
              onChange('selling');
            }}
            onTouchStart={() => {
              console.log('Touch start on selling');
              onChange('selling');
            }}
          >
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h4 className="text-xl font-bold">I'm Selling</h4>
                <p className="text-gray-600">Ready to sell my business</p>
              </div>
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