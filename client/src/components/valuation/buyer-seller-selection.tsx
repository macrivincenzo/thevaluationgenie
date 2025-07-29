import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Info } from "lucide-react";

interface BuyerSellerSelectionProps {
  value: 'buying' | 'selling' | '';
  onChange: (value: 'buying' | 'selling') => void;
  onNext: () => void;
}

export default function BuyerSellerSelection({ value, onChange, onNext }: BuyerSellerSelectionProps) {
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as 'buying' | 'selling';
    console.log('Dropdown selection changed to:', selectedValue);
    console.log('Event target value:', event.target.value);
    onChange(selectedValue);
  };

  const handleContinueClick = () => {
    console.log('Continue button clicked with value:', value);
    if (value) {
      console.log('Proceeding to next step with selection:', value);
      onNext();
    } else {
      console.log('Cannot proceed - no selection made');
    }
  };

  console.log('Component rendered with current value:', value);

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

        {/* Debug information */}
        <div className="mb-4 p-3 bg-gray-100 border rounded text-sm">
          <strong>Debug Info:</strong> Current selection = "{value || 'none'}"
        </div>

        {/* Standard HTML Form with Select Dropdown */}
        <form onSubmit={(e) => { e.preventDefault(); handleContinueClick(); }}>
          <div className="mb-6">
            <label htmlFor="buyer-seller-select" className="block text-lg font-semibold mb-3 text-slate-900">
              Select your role:
            </label>
            <select 
              id="buyer-seller-select"
              name="buyerSeller"
              value={value}
              onChange={handleDropdownChange}
              className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              style={{ minHeight: '56px' }}
            >
              <option value="" disabled>Choose an option...</option>
              <option value="buying">I'm Buying a Business</option>
              <option value="selling">I'm Selling a Business</option>
            </select>
          </div>

          {/* Visual confirmation cards */}
          {value && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-slate-900">Your Selection:</h4>
              <div className="grid gap-4">
                {value === 'buying' && (
                  <div className="p-4 border-2 border-blue-500 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="w-8 h-8 text-blue-600 mr-3" />
                      <div>
                        <h5 className="text-lg font-bold text-blue-900">I'm Buying a Business</h5>
                        <p className="text-blue-700">We'll focus on risk assessment and fair market value</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {value === 'selling' && (
                  <div className="p-4 border-2 border-green-500 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                      <div>
                        <h5 className="text-lg font-bold text-green-900">I'm Selling a Business</h5>
                        <p className="text-green-700">We'll help maximize your business value</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form buttons */}
          <div className="flex justify-between items-center">
            <Button type="button" variant="ghost" disabled>
              Previous
            </Button>
            <Button 
              type="button"
              onClick={handleContinueClick}
              disabled={!value}
              className={`${!value ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Continue {value && `(${value === 'buying' ? 'Buyer' : 'Seller'})`}
            </Button>
          </div>
        </form>


      </CardContent>
    </Card>
  );
}