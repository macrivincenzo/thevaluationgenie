import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lock, CreditCard } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Simple Payment Form Component
function SimplePaymentForm({ valuationId }: { valuationId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isReady, setIsReady] = useState(false);
  const { toast } = useToast();

  // Create payment intent when component loads
  useEffect(() => {
    if (valuationId) {
      console.log('Creating payment intent for:', valuationId);
      apiRequest("POST", "/api/create-payment-intent", { valuationId })
        .then((data: any) => {
          console.log('Payment intent created:', data.clientSecret ? 'Success' : 'Failed');
          setClientSecret(data.clientSecret);
          setIsReady(true);
        })
        .catch((error) => {
          console.error('Payment intent error:', error);
          toast({
            title: "Error",
            description: "Failed to initialize payment. Please refresh and try again.",
            variant: "destructive",
          });
        });
    }
  }, [valuationId]);

  const handlePayment = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('PAYMENT BUTTON CLICKED!');
    
    if (!stripe || !elements || !clientSecret) {
      console.log('Payment not ready:', { stripe: !!stripe, elements: !!elements, clientSecret: !!clientSecret });
      toast({
        title: "Please Wait",
        description: "Payment system is still loading. Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    console.log('Starting payment process...');

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      console.log('Confirming payment with Stripe...');
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Customer',
          },
        }
      });

      if (error) {
        console.error('Stripe error:', error);
        toast({
          title: "Payment Failed",
          description: error.message || "Something went wrong with the payment.",
          variant: "destructive",
        });
      } else if (paymentIntent?.status === "succeeded") {
        console.log('Payment succeeded:', paymentIntent.id);
        
        // Mark valuation as paid
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
      console.error('Payment error:', error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  const buttonDisabled = isProcessing || !stripe || !clientSecret || !isReady;

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <Lock className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="font-semibold text-green-900">Live Payment Processing</h3>
        </div>
        <p className="text-sm text-green-700">
          Enter your card details below to complete your $39 payment securely through Stripe.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <CreditCard className="w-5 h-5 text-slate-600 mr-2" />
          <span className="font-medium text-slate-900">Card Information</span>
        </div>
        
        <div className="border border-slate-300 rounded-md p-3 bg-white">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1e293b',
                  '::placeholder': {
                    color: '#64748b',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
            }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Test with: 4242 4242 4242 4242, any future expiry, any CVC
        </p>
      </div>
      
      <div className="space-y-2">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            console.log('DIRECT BUTTON CLICK DETECTED!');
            handlePayment(e);
          }}
          disabled={buttonDisabled}
          className={`w-full py-4 text-lg font-semibold rounded-md transition-colors ${
            buttonDisabled 
              ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
              : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
          }`}
          data-testid="button-pay-now"
          style={{ pointerEvents: buttonDisabled ? 'none' : 'auto' }}
        >
          {isProcessing ? "Processing Payment..." : 
           !isReady ? "Loading..." :
           "Pay $39.00 Now"}
        </button>
        
        {/* Alternative direct payment button for testing */}
        <button
          type="button"
          onClick={() => {
            console.log('BACKUP BUTTON CLICKED!');
            if (stripe && elements && clientSecret) {
              handlePayment({ preventDefault: () => {} } as any);
            } else {
              alert('Payment not ready. Please wait...');
            }
          }}
          className="w-full py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          data-testid="button-backup-pay"
        >
          Backup Payment Button (Click if main button doesn't work)
        </button>
        
        {/* Debug info */}
        <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
          Debug: Stripe={!!stripe ? 'Ready' : 'Not Ready'} | 
          Elements={!!elements ? 'Ready' : 'Not Ready'} | 
          Secret={!!clientSecret ? 'Ready' : 'Not Ready'} | 
          Processing={isProcessing ? 'Yes' : 'No'}
        </div>
      </div>
      
      <div className="text-center text-xs text-slate-500">
        <Lock className="w-3 h-3 inline mr-1" />
        256-bit SSL encryption • 7-day money-back guarantee
      </div>
    </div>
  );
}

export default function SimpleCheckout() {
  const [, params] = useRoute("/checkout/:id");
  const valuationId = params?.id;
  const { isAuthenticated, isLoading } = useAuth();
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);

  // Initialize Stripe
  useEffect(() => {
    fetch('/api/stripe/config')
      .then(res => res.json())
      .then(({ publicKey }) => {
        console.log('Stripe public key loaded:', publicKey ? 'Success' : 'Failed');
        setStripePromise(loadStripe(publicKey));
      })
      .catch(error => {
        console.error('Failed to load Stripe config:', error);
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded w-1/2"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!valuation) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Complete!</h2>
              <p className="text-slate-600 mb-6">Your valuation report is ready for download.</p>
              <Button onClick={() => window.location.href = '/dashboard'}>
                View Dashboard
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Payment</h1>
          <p className="text-slate-600">Get your professional business valuation report</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">{valuation?.businessName}</h3>
              <p className="text-sm text-slate-600">{valuation?.industry}</p>
            </div>
            
            <div className="flex items-center justify-between py-2 border-t">
              <span className="text-slate-600">Professional Valuation Report:</span>
              <span className="text-2xl font-bold text-green-600">$39.00</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              {stripePromise ? (
                <Elements stripe={stripePromise}>
                  <SimplePaymentForm valuationId={valuationId!} />
                </Elements>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500">Loading payment system...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}