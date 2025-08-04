import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

// Debug logging
console.log('Stripe public key available:', !!import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm({ valuationId, clientSecret, valuation }: { valuationId: string, clientSecret: string, valuation: any }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  // Debug logging
  useEffect(() => {
    console.log('CheckoutForm mounted - clientSecret:', !!clientSecret);
    console.log('Stripe ready:', !!stripe);
    console.log('Elements ready:', !!elements);
  }, [stripe, elements, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
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
    } else if (paymentIntent?.status === 'succeeded') {
      try {
        await apiRequest("POST", `/api/valuations/${valuationId}/mark-paid`, {
          paymentIntentId: paymentIntent.id
        });
        
        toast({
          title: "Payment Successful",
          description: "Thank you for your purchase! Your PDF report is now available.",
        });
        
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } catch {
        toast({
          title: "Payment Successful",
          description: "Payment completed! Please check your dashboard for the PDF report.",
        });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 3000);
      }
    }

    setIsProcessing(false);
  };

  return (
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="min-h-[200px]">
                  <PaymentElement 
                    options={{
                      layout: 'tabs'
                    }}
                  />
                </div>
                
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
                <h3 className="font-semibold text-slate-900">{valuation?.businessName}</h3>
                <p className="text-sm text-slate-600">{valuation?.industry}</p>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600">Estimated Value:</span>
                <Badge variant="secondary" className="text-lg font-semibold">
                  ${parseInt(valuation?.valuationLow || '0').toLocaleString()} - ${parseInt(valuation?.valuationHigh || '0').toLocaleString()}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Annual Revenue:</span>
                  <span>${parseInt(valuation?.annualRevenue || '0').toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>SDE:</span>
                  <span>${parseInt(valuation?.sde || '0').toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Industry Multiple:</span>
                  <span>{parseFloat(valuation?.industryMultiple || '0').toFixed(1)}x</span>
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
                  <span className="text-sm">Instant download & lifetime access</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Order Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Professional Report</span>
                  <span className="line-through text-slate-500">$89.00</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Launch Price</span>
                  <span className="text-green-600">$39.00</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">Save $50 (56% off)</p>
                  <p className="text-xs text-green-600">7-day money-back guarantee</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutFinal() {
  const [, params] = useRoute("/checkout/:id");
  const valuationId = params?.id;
  const [clientSecret, setClientSecret] = useState("");
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

  const createPaymentIntentMutation = useMutation({
    mutationFn: async (valuationId: string) => {
      const response = await apiRequest("POST", "/api/create-payment-intent", { valuationId });
      return await response.json();
    },
    onSuccess: (data) => {
      setClientSecret(data.clientSecret);
    },
  });

  useEffect(() => {
    if (valuationId && !clientSecret && !createPaymentIntentMutation.isPending) {
      createPaymentIntentMutation.mutate(valuationId);
    }
  }, [valuationId, clientSecret]);

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

  if (valuation?.paid) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Already Paid</h2>
              <p className="text-slate-600 mb-6">This valuation has already been paid for. You can download the PDF from your dashboard.</p>
              <Button onClick={() => window.location.href = '/dashboard'}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-600">Initializing payment...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Elements 
        stripe={stripePromise} 
        options={{ 
          clientSecret,
          appearance: {
            theme: 'stripe'
          }
        }}
      >
        <CheckoutForm valuationId={valuationId!} clientSecret={clientSecret} valuation={valuation} />
      </Elements>
    </div>
  );
}