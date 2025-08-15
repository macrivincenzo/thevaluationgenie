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
import { CheckCircle, CreditCard, Shield, Lock } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Stripe setup
let stripePromise: Promise<any> | null = null;

const getStripe = () => {
  if (!stripePromise) {
    // Get Stripe config from server
    fetch('/api/stripe/config')
      .then(res => res.json())
      .then(({ publicKey }) => {
        stripePromise = loadStripe(publicKey);
      });
  }
  return stripePromise;
};

// Payment Form Component
function PaymentForm({ valuationId }: { valuationId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const { toast } = useToast();

  // Create payment intent when component loads
  useEffect(() => {
    if (valuationId) {
      apiRequest("POST", "/api/create-payment-intent", { valuationId })
        .then((data: any) => {
          setClientSecret(data.clientSecret);
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: "Failed to initialize payment. Please refresh and try again.",
            variant: "destructive",
          });
        });
    }
  }, [valuationId]);

  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) return;

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setIsProcessing(false);
      return;
    }

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message || "Something went wrong with the payment.",
          variant: "destructive",
        });
      } else if (paymentIntent?.status === "succeeded") {
        // Mark valuation as paid with verified payment
        await apiRequest("POST", `/api/valuations/${valuationId}/mark-paid`, {
          paymentIntentId: paymentIntent.id
        });
        
        toast({
          title: "Payment Successful!",
          description: "Your professional valuation report is now available.",
        });
        
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <Shield className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="font-semibold text-green-900">Live Payment Mode</h3>
        </div>
        <p className="text-sm text-green-700">
          Secure payment processing powered by Stripe. Your card information is encrypted and processed securely.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <CreditCard className="w-5 h-5 text-slate-600 mr-2" />
          <span className="font-medium text-slate-900">Payment Information</span>
        </div>
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      
      <Button 
        onClick={handlePayment}
        className="w-full py-4 text-lg font-semibold bg-green-600 hover:bg-green-700"
        disabled={isProcessing || !stripe || !clientSecret}
      >
        {isProcessing ? "Processing Payment..." : "Complete Payment - $39.00"}
      </Button>
      
      <div className="flex items-center justify-center text-xs text-slate-500">
        <Lock className="w-3 h-3 mr-1" />
        Secure payment processing • 7-day money-back guarantee
      </div>
    </div>
  );
}

export default function CheckoutWorking() {
  const [, params] = useRoute("/checkout/:id");
  const valuationId = params?.id;
  const { isAuthenticated, isLoading } = useAuth();
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);

  // Initialize Stripe
  useEffect(() => {
    fetch('/api/stripe/config')
      .then(res => res.json())
      .then(({ publicKey }) => {
        setStripePromise(loadStripe(publicKey));
      });
  }, []);

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
          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Complete Payment</CardTitle>
              </CardHeader>
              <CardContent>
                {stripePromise ? (
                  <Elements stripe={stripePromise}>
                    <PaymentForm valuationId={valuationId!} />
                  </Elements>
                ) : (
                  <div className="space-y-4">
                    <div className="animate-pulse">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-12 bg-slate-200 rounded mb-4"></div>
                      <div className="h-12 bg-slate-200 rounded"></div>
                    </div>
                    <p className="text-sm text-slate-500 text-center">Loading secure payment form...</p>
                  </div>
                )}
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