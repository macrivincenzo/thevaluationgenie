import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building,
  DollarSign,
  TrendingUp,
  Calendar,
  BarChart3,
  ArrowUpDown,
  X,
  Plus,
  FileText
} from "lucide-react";

export default function Comparison() {
  const [selectedValuations, setSelectedValuations] = useState<string[]>([]);
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: valuations = [], isLoading: valuationsLoading, error } = useQuery({
    queryKey: ["/api/valuations"],
    enabled: isAuthenticated,
    retry: false,
  });

  if (error && isUnauthorizedError(error as Error)) {
    useEffect(() => {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }, []);
  }

  const handleValuationSelect = (valuationId: string, checked: boolean) => {
    if (checked) {
      if (selectedValuations.length >= 4) {
        toast({
          title: "Limit Reached",
          description: "You can compare up to 4 businesses at once.",
          variant: "destructive",
        });
        return;
      }
      setSelectedValuations([...selectedValuations, valuationId]);
    } else {
      setSelectedValuations(selectedValuations.filter(id => id !== valuationId));
    }
  };

  const removeFromComparison = (valuationId: string) => {
    setSelectedValuations(selectedValuations.filter(id => id !== valuationId));
  };

  const selectedData = valuations.filter((v: any) => selectedValuations.includes(v.id));

  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const calculateMetrics = (valuation: any) => {
    const revenue = parseFloat(valuation.annualRevenue || '0');
    const sde = parseFloat(valuation.sde || '0');
    const multiple = parseFloat(valuation.industryMultiple || '0');
    const valuationMid = (parseFloat(valuation.valuationLow || '0') + parseFloat(valuation.valuationHigh || '0')) / 2;
    
    return {
      sdeMargin: revenue > 0 ? ((sde / revenue) * 100) : 0,
      revenueMultiple: revenue > 0 ? (valuationMid / revenue) : 0,
      sdeMultiple: multiple,
      valuationRange: `${formatCurrency(valuation.valuationLow)} - ${formatCurrency(valuation.valuationHigh)}`,
      valuationMid: formatCurrency(valuationMid),
    };
  };

  if (isLoading || valuationsLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Business Comparison Tool</h1>
          <p className="text-slate-600">
            Compare multiple business valuations side-by-side to make informed decisions.
            Select up to 4 businesses to compare their key metrics and valuations.
          </p>
        </div>

        {valuations.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No Valuations Available
              </h3>
              <p className="text-slate-600 mb-6">
                You need to create some business valuations before you can compare them.
              </p>
              <Button onClick={() => window.location.href = '/valuation'}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Valuation
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {selectedValuations.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Comparison ({selectedValuations.length}/4)</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedValuations([])}
                    >
                      Clear All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedData.map((valuation: any) => {
                      const metrics = calculateMetrics(valuation);
                      return (
                        <div key={valuation.id} className="border rounded-lg p-4 relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 h-6 w-6 p-0"
                            onClick={() => removeFromComparison(valuation.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          
                          <div className="mb-3">
                            <h4 className="font-semibold text-slate-900 truncate">
                              {valuation.businessName}
                            </h4>
                            <p className="text-sm text-slate-600">{valuation.industry}</p>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Valuation:</span>
                              <span className="font-medium">{metrics.valuationMid}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Revenue:</span>
                              <span>{formatCurrency(valuation.annualRevenue)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">SDE:</span>
                              <span>{formatCurrency(valuation.sde)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">SDE Margin:</span>
                              <span>{metrics.sdeMargin.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Multiple:</span>
                              <span>{metrics.sdeMultiple}x</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {selectedValuations.length >= 2 && (
                    <div className="mt-6">
                      <Separator className="mb-4" />
                      <h4 className="font-semibold text-slate-900 mb-4">Detailed Comparison</h4>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-2 font-medium text-slate-600">Metric</th>
                              {selectedData.map((valuation: any) => (
                                <th key={valuation.id} className="text-center py-3 px-2 font-medium text-slate-900">
                                  <div className="truncate max-w-32">{valuation.businessName}</div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            <tr>
                              <td className="py-3 px-2 font-medium text-slate-600">Industry</td>
                              {selectedData.map((valuation: any) => (
                                <td key={valuation.id} className="py-3 px-2 text-center">
                                  <Badge variant="secondary" className="text-xs">
                                    {valuation.industry}
                                  </Badge>
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="py-3 px-2 font-medium text-slate-600">Valuation Range</td>
                              {selectedData.map((valuation: any) => (
                                <td key={valuation.id} className="py-3 px-2 text-center font-medium text-blue-600">
                                  {calculateMetrics(valuation).valuationRange}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="py-3 px-2 font-medium text-slate-600">Annual Revenue</td>
                              {selectedData.map((valuation: any) => (
                                <td key={valuation.id} className="py-3 px-2 text-center">
                                  {formatCurrency(valuation.annualRevenue)}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="py-3 px-2 font-medium text-slate-600">SDE</td>
                              {selectedData.map((valuation: any) => (
                                <td key={valuation.id} className="py-3 px-2 text-center">
                                  {formatCurrency(valuation.sde)}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="py-3 px-2 font-medium text-slate-600">SDE Margin</td>
                              {selectedData.map((valuation: any) => (
                                <td key={valuation.id} className="py-3 px-2 text-center">
                                  {calculateMetrics(valuation).sdeMargin.toFixed(1)}%
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="py-3 px-2 font-medium text-slate-600">Industry Multiple</td>
                              {selectedData.map((valuation: any) => (
                                <td key={valuation.id} className="py-3 px-2 text-center">
                                  {valuation.industryMultiple}x
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="py-3 px-2 font-medium text-slate-600">Years in Business</td>
                              {selectedData.map((valuation: any) => (
                                <td key={valuation.id} className="py-3 px-2 text-center">
                                  {valuation.yearsInBusiness}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="py-3 px-2 font-medium text-slate-600">Owner Involvement</td>
                              {selectedData.map((valuation: any) => (
                                <td key={valuation.id} className="py-3 px-2 text-center">
                                  <Badge variant="outline" className="text-xs">
                                    {valuation.ownerInvolvement}
                                  </Badge>
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="py-3 px-2 font-medium text-slate-600">Growth Trend</td>
                              {selectedData.map((valuation: any) => (
                                <td key={valuation.id} className="py-3 px-2 text-center">
                                  <Badge 
                                    variant={valuation.growthTrend === 'Growing' ? 'default' : 'secondary'}
                                    className="text-xs"
                                  >
                                    {valuation.growthTrend}
                                  </Badge>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Available Valuations */}
            <Card>
              <CardHeader>
                <CardTitle>Your Business Valuations</CardTitle>
                <p className="text-sm text-slate-600">
                  Select businesses to add to your comparison (up to 4 at once)
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {valuations.map((valuation: any) => (
                    <div 
                      key={valuation.id} 
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedValuations.includes(valuation.id) 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      onClick={() => handleValuationSelect(
                        valuation.id, 
                        !selectedValuations.includes(valuation.id)
                      )}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 mb-1">
                            {valuation.businessName}
                          </h4>
                          <p className="text-sm text-slate-600">{valuation.industry}</p>
                        </div>
                        <Checkbox
                          checked={selectedValuations.includes(valuation.id)}
                          onCheckedChange={(checked) => 
                            handleValuationSelect(valuation.id, checked as boolean)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Valuation:</span>
                          <span className="font-medium text-blue-600">
                            {formatCurrency(valuation.valuationLow)} - {formatCurrency(valuation.valuationHigh)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Revenue:</span>
                          <span>{formatCurrency(valuation.annualRevenue)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Created:</span>
                          <span>{new Date(valuation.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <Badge 
                          variant={valuation.paid ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {valuation.paid ? "Paid Report" : "Unpaid"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}