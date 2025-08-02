import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, DollarSign, FileText, Shield } from "lucide-react";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

// Payment Form Component
function CheckoutForm({ valuation, onSuccess }: { valuation: any, onSuccess: () => void }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase! Your PDF report is now available.",
      });
      onSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <div className="flex items-center space-x-2 text-sm text-slate-600">
        <Shield className="w-4 h-4" />
        <span>Secured by Stripe. Your payment information is encrypted and secure.</span>
      </div>
      
      <Button 
        type="submit" 
        className="w-full py-3 text-lg font-semibold"
        disabled={!stripe || !elements || isProcessing}
      >
        {isProcessing ? "Processing..." : "Complete Payment - $39"}
      </Button>
    </form>
  );
}

// Main Checkout Component
export default function CheckoutNew() {
  const [, params] = useRoute("/checkout/:id");
  const valuationId = params?.id;
  const [clientSecret, setClientSecret] = useState("");
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

  const { data: valuation, isLoading: valuationLoading } = useQuery({
    queryKey: ["/api/valuations", valuationId],
    enabled: !!valuationId,
    retry: false,
  });

  const createPaymentIntentMutation = useMutation({
    mutationFn: async (valuationId: string) => {
      const response = await apiRequest("POST", "/api/create-payment-intent", { valuationId });
      return await response.json();
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Create payment intent immediately when component loads, don't wait for valuation data
  useEffect(() => {
    if (valuationId && !clientSecret && !createPaymentIntentMutation.isPending) {
      createPaymentIntentMutation.mutate(valuationId);
    }
  }, [valuationId, clientSecret]);

  const handlePaymentSuccess = () => {
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
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
              <p className="text-slate-600">The valuation you're looking for doesn't exist or you don't have permission to access it.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Elements options with clientSecret
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Purchase</h1>
          <p className="text-slate-600">Secure your professional business valuation report</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                {!clientSecret ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading payment form"/>
                    <span className="ml-3 text-slate-600">Preparing payment form...</span>
                  </div>
                ) : (
                  <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm valuation={valuation} onSuccess={handlePaymentSuccess} />
                  </Elements>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Valuation Details */}
            <Card>
              <CardHeader>
                <CardTitle>Valuation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{valuation.businessName}</h3>
                  <p className="text-sm text-slate-600">{valuation.industry}</p>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-600">Estimated Value:</span>
                  <Badge variant="secondary" className="text-lg font-semibold">
                    ${parseInt(String(valuation.valuationLow) || '0').toLocaleString()} - ${parseInt(String(valuation.valuationHigh) || '0').toLocaleString()}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Annual Revenue:</span>
                    <span>${parseInt(String(valuation.annualRevenue) || '0').toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SDE:</span>
                    <span>${parseInt(String(valuation.sde) || '0').toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Industry Multiple:</span>
                    <span>{valuation.industryMultiple}x</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">Professional PDF valuation report</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">Detailed valuation methodology</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">Industry benchmarking analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">Key financial ratios & metrics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">Risk factors assessment</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">Instant download access</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Order Total */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5" />
                    <span>39.00</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-2">One-time payment • 7-day money-back guarantee</p>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-yellow-800 font-medium">Important Disclaimer</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    This valuation is for informational purposes only and is not a formal business appraisal. 
                    It should not be used as the sole basis for business decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}