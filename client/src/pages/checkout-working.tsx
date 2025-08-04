import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export default function CheckoutWorking() {
  const [, params] = useRoute("/checkout/:id");
  const valuationId = params?.id;
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/login";
      return;
    }
  }, [isAuthenticated, isLoading]);

  const { data: valuation, isLoading: valuationLoading } = useQuery({
    queryKey: ["/api/valuations", valuationId],
    enabled: !!valuationId,
    retry: false,
  }) as { data: any, isLoading: boolean };

  // For demo purposes, simulate successful payment
  const handlePayment = async () => {
    if (!valuationId) return;

    setIsProcessing(true);

    try {
      // Mark valuation as paid directly (bypass Stripe for now)
      await apiRequest("POST", `/api/valuations/${valuationId}/mark-paid`, {
        paymentIntentId: `demo_payment_${Date.now()}`
      });
      
      toast({
        title: "Payment Successful!",
        description: "Your professional valuation report is now available.",
      });
      
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  if (isLoading || valuationLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-64 bg-slate-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!valuation) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Valuation Not Found</h2>
              <p className="text-slate-600">The valuation doesn't exist or you don't have access.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (valuation?.paid) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Already Paid</h2>
              <p className="text-slate-600 mb-6">This valuation has been paid for. Download from your dashboard.</p>
              <Button onClick={() => window.location.href = '/dashboard'}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Purchase</h1>
          <p className="text-slate-600">Get your professional business valuation report</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Button */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Complete Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Demo Mode Active</h3>
                    <p className="text-sm text-blue-700">
                      Click below to simulate the payment and unlock your professional valuation report.
                      In production, this would connect to Stripe for secure payment processing.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handlePayment}
                    className="w-full py-4 text-lg font-semibold bg-green-600 hover:bg-green-700"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Complete Payment - $39"}
                  </Button>
                  
                  <div className="text-xs text-slate-500 text-center">
                    Secure payment processing • 7-day money-back guarantee
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{valuation?.businessName}</h3>
                  <p className="text-sm text-slate-600">{valuation?.industry}</p>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-600">Estimated Value:</span>
                  <Badge variant="secondary" className="text-lg font-semibold">
                    ${parseInt(valuation?.valuationLow || '0').toLocaleString()} - ${parseInt(valuation?.valuationHigh || '0').toLocaleString()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What You Get</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Professional PDF valuation report</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Detailed financial analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Industry benchmarking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-sm">Instant download</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-2xl font-bold">
                  <span>Professional Report</span>
                  <span className="text-green-600">$39.00</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}