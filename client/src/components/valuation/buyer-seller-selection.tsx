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
        <div className="mb-4 p-2 bg-yellow-100 border text-sm font-mono">
          DEBUG: Current selection = "{value}"
        </div>

        {/* Radio button approach */}
        <div className="space-y-4">
          <label className="block">
            <input 
              type="radio" 
              name="buyerSeller" 
              value="buying"
              checked={value === 'buying'}
              onChange={(e) => {
                console.log('Radio buying changed:', e.target.checked);
                if (e.target.checked) {
                  onChange('buying');
                }
              }}
              className="sr-only"
            />
            <div 
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                value === 'buying' 
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 border-2 rounded-full mr-4 flex items-center justify-center">
                  {value === 'buying' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                </div>
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <h4 className="text-xl font-bold">I'm Buying</h4>
                  <p className="text-gray-600">Looking to acquire a business</p>
                </div>
              </div>
            </div>
          </label>

          <label className="block">
            <input 
              type="radio" 
              name="buyerSeller" 
              value="selling"
              checked={value === 'selling'}
              onChange={(e) => {
                console.log('Radio selling changed:', e.target.checked);
                if (e.target.checked) {
                  onChange('selling');
                }
              }}
              className="sr-only"
            />
            <div 
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                value === 'selling' 
                  ? 'border-green-500 bg-green-50 shadow-lg' 
                  : 'border-gray-300 hover:border-green-300'
              }`}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 border-2 rounded-full mr-4 flex items-center justify-center">
                  {value === 'selling' && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                </div>
                <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h4 className="text-xl font-bold">I'm Selling</h4>
                  <p className="text-gray-600">Ready to sell my business</p>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Simple button test */}
        <div className="mt-6 space-x-4">
          <button 
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => {
              console.log('Simple buying button clicked');
              onChange('buying');
            }}
          >
            Test: Set Buying
          </button>
          <button 
            type="button"
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => {
              console.log('Simple selling button clicked');
              onChange('selling');
            }}
          >
            Test: Set Selling
          </button>
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