import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

function CheckoutForm({ valuationId, clientSecret }: { valuationId: string, clientSecret: string }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("=== PAYMENT SUBMISSION STARTED ===");

    if (!stripe || !elements) {
      console.error("Stripe not ready");
      toast({
        title: "Payment Error",
        description: "Payment system not ready. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }

    // Check if elements are ready and the payment element is complete
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error("Elements submit error:", submitError);
      toast({
        title: "Payment Error",
        description: submitError.message || "Please complete all payment details.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Confirming payment with client secret:", clientSecret);
      
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/dashboard`,
        },
        redirect: 'if_required',
      });

      console.log("Payment confirmation result:", result);

      if (result.error) {
        console.error("Payment failed:", result.error);
        toast({
          title: "Payment Failed",
          description: result.error.message || "Payment failed. Please try again.",
          variant: "destructive",
        });
      } else if (result.paymentIntent?.status === 'succeeded') {
        console.log("Payment succeeded!");
        
        // Mark valuation as paid
        try {
          await apiRequest("POST", `/api/valuations/${valuationId}/mark-paid`, {
            paymentIntentId: result.paymentIntent.id
          });
          
          toast({
            title: "Payment Successful!",
            description: "Your PDF report is now available for download.",
          });
          
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        } catch (updateError) {
          console.error("Failed to update valuation:", updateError);
          toast({
            title: "Payment Successful",
            description: "Payment completed! Check your dashboard for the PDF.",
          });
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 3000);
        }
      } else {
        console.log("Payment in unexpected state:", result.paymentIntent?.status);
        toast({
          title: "Payment Processing",
          description: "Payment is being processed. Please check your dashboard.",
        });
      }
    } catch (error) {
      console.error("Unexpected payment error:", error);
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
    console.log("=== PAYMENT SUBMISSION ENDED ===");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Purchase</h1>
        <p className="text-slate-600">Professional Business Valuation Report - $39</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            
            <Button 
              type="submit" 
              className="w-full py-3 text-lg font-semibold"
              disabled={!stripe || !elements || isProcessing}
            >
              {isProcessing ? "Processing Payment..." : "Pay $39 Now"}
            </Button>
            
            <p className="text-sm text-center text-slate-500">
              Secured by Stripe • 7-day money-back guarantee
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CheckoutSimple() {
  const [, params] = useRoute("/checkout/:id");
  const valuationId = params?.id;
  const [clientSecret, setClientSecret] = useState("");

  // Get valuation data
  const { data: valuation, isLoading: valuationLoading } = useQuery({
    queryKey: ["/api/valuations", valuationId],
    enabled: !!valuationId,
    retry: false,
  });

  // Create payment intent
  const createPaymentIntentMutation = useMutation({
    mutationFn: async (valuationId: string) => {
      console.log("Creating payment intent for valuation:", valuationId);
      const response = await apiRequest("POST", "/api/create-payment-intent", { valuationId });
      const data = await response.json();
      console.log("Payment intent response:", data);
      return data;
    },
    onSuccess: (data) => {
      console.log("Setting client secret:", data.clientSecret);
      setClientSecret(data.clientSecret);
    },
    onError: (error: Error) => {
      console.error("Payment intent creation failed:", error);
    },
  });

  // Create payment intent when component loads
  useEffect(() => {
    if (valuationId && !clientSecret && !createPaymentIntentMutation.isPending) {
      console.log("Creating payment intent for valuation:", valuationId);
      createPaymentIntentMutation.mutate(valuationId);
    }
  }, [valuationId, clientSecret]);

  if (valuationLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!valuation) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Valuation Not Found</h2>
              <p className="text-slate-600">The valuation you're looking for doesn't exist.</p>
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
        <div className="max-w-4xl mx-auto px-4 py-12">
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
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm valuationId={valuationId!} clientSecret={clientSecret} />
      </Elements>
    </div>
  );
}