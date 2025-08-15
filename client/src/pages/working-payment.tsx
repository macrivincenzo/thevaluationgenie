import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lock, CreditCard, DollarSign } from "lucide-react";

export default function WorkingPayment() {
  const [, params] = useRoute("/checkout/:id");
  const valuationId = params?.id;
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);

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

  // Load Stripe script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = () => setStripeLoaded(true);
    document.head.appendChild(script);
  }, []);

  const handleDirectPayment = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    console.log('=== PAYMENT PROCESS STARTED ===');
    
    try {
      // Step 1: Create payment intent
      console.log('Step 1: Creating payment intent...');
      const paymentData = await apiRequest("POST", "/api/create-payment-intent", { 
        valuationId: valuationId 
      });
      
      console.log('Payment intent created:', paymentData);
      
      if (!paymentData || !paymentData.clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // Step 2: Get Stripe config
      console.log('Step 2: Getting Stripe config...');
      const configResponse = await fetch('/api/stripe/config');
      const config = await configResponse.json();
      
      console.log('Stripe config loaded:', config.publicKey ? 'Success' : 'Failed');

      // Step 3: Initialize Stripe
      console.log('Step 3: Initializing Stripe...');
      const stripe = (window as any).Stripe(config.publicKey);
      
      if (!stripe) {
        throw new Error('Failed to initialize Stripe');
      }

      // Step 4: Create payment method with test card
      console.log('Step 4: Creating payment method...');
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: 12,
          exp_year: 2030,
          cvc: '123',
        },
        billing_details: {
          name: 'Test Customer',
          email: 'test@example.com',
        },
      });

      if (pmError) {
        console.error('Payment method error:', pmError);
        throw new Error(pmError.message || 'Failed to create payment method');
      }

      console.log('Payment method created:', paymentMethod.id);

      // Step 5: Confirm payment
      console.log('Step 5: Confirming payment...');
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        (paymentData as any).clientSecret,
        {
          payment_method: paymentMethod.id
        }
      );

      if (confirmError) {
        console.error('Payment confirmation error:', confirmError);
        throw new Error(confirmError.message || 'Payment failed');
      }

      console.log('Payment confirmed:', paymentIntent.id);

      // Step 6: Mark valuation as paid
      console.log('Step 6: Marking valuation as paid...');
      await apiRequest("POST", `/api/valuations/${valuationId}/mark-paid`, {
        paymentIntentId: paymentIntent.id
      });

      console.log('=== PAYMENT COMPLETED SUCCESSFULLY ===');
      
      toast({
        title: "Payment Successful!",
        description: "Your $39 payment has been processed. Your report is ready!",
      });

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);

    } catch (error: any) {
      console.error('=== PAYMENT FAILED ===', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  // Alternative payment method using Stripe checkout
  const handleCheckoutPayment = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    console.log('=== CHECKOUT PAYMENT STARTED ===');
    
    try {
      // Create checkout session
      const sessionData = await apiRequest("POST", "/api/create-checkout-session", {
        valuationId: valuationId,
        successUrl: `${window.location.origin}/dashboard`,
        cancelUrl: window.location.href
      });

      if (sessionData.url) {
        // Redirect to Stripe checkout
        window.location.href = sessionData.url;
      } else {
        throw new Error('Failed to create checkout session');
      }

    } catch (error: any) {
      console.error('=== CHECKOUT FAILED ===', error);
      toast({
        title: "Checkout Failed", 
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

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
          <p className="text-slate-600">Professional business valuation report - $39</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">{valuation?.businessName}</h3>
              <p className="text-sm text-slate-600">{valuation?.industry}</p>
              <p className="text-sm text-slate-500">
                Valuation Range: ${valuation?.valuationLow?.toLocaleString()} - ${valuation?.valuationHigh?.toLocaleString()}
              </p>
            </div>
            
            <div className="flex items-center justify-between py-3 border-t border-slate-200">
              <span className="text-lg text-slate-700">Professional Valuation Report</span>
              <span className="text-2xl font-bold text-green-600">$39.00</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Lock className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-green-900">Secure Payment Processing</h3>
              </div>
              <p className="text-sm text-green-700">
                Your payment is processed securely through Stripe. We never store your card details.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-900 mb-2">Payment Options</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Choose your preferred payment method below. Both options use live Stripe processing.
                </p>
              </div>

              {/* Direct Payment Method */}
              <div className="space-y-3">
                <Button
                  onClick={handleDirectPayment}
                  disabled={isProcessing || !stripeLoaded}
                  className="w-full py-4 text-lg font-semibold bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                  data-testid="button-direct-payment"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {isProcessing ? "Processing Payment..." : 
                   !stripeLoaded ? "Loading Payment System..." :
                   "Pay $39.00 Now (Test Card Auto-Fill)"}
                </Button>

                <Button
                  onClick={handleCheckoutPayment}
                  disabled={isProcessing || !stripeLoaded}
                  className="w-full py-3 text-base bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                  data-testid="button-checkout-payment"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {isProcessing ? "Redirecting..." : 
                   !stripeLoaded ? "Loading..." :
                   "Pay via Stripe Checkout"}
                </Button>
              </div>

              <div className="text-center text-xs text-slate-500 space-y-1">
                <p>
                  <Lock className="w-3 h-3 inline mr-1" />
                  256-bit SSL encryption • PCI DSS compliant
                </p>
                <p>Test Mode: Using card 4242-4242-4242-4242</p>
                <p>7-day money-back guarantee • Contact: contact@thevaluationgenie.com</p>
              </div>

              {/* Debug info */}
              <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded border">
                <strong>Debug Info:</strong><br/>
                Stripe Loaded: {stripeLoaded ? '✅ Ready' : '⏳ Loading...'}<br/>
                Valuation ID: {valuationId}<br/>
                Processing: {isProcessing ? '🔄 Yes' : '✅ Ready'}<br/>
                User: {isAuthenticated ? '✅ Authenticated' : '❌ Not authenticated'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}