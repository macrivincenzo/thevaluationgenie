import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard } from "lucide-react";

export default function CheckoutFinalWorking() {
  const [, params] = useRoute("/checkout/:id");
  const valuationId = params?.id;
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientSecret) {
      toast({
        title: "Error",
        description: "Payment not ready. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }

    if (!cardNumber || !expiry || !cvc || !name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all payment fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Load Stripe dynamically
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      document.head.appendChild(script);
      
      await new Promise((resolve) => {
        script.onload = resolve;
      });

      const stripe = (window as any).Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      
      // Create a payment method first
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: {
          number: cardNumber.replace(/\s/g, ''),
          exp_month: parseInt(expiry.split('/')[0]),
          exp_year: parseInt('20' + expiry.split('/')[1]),
          cvc: cvc,
        },
        billing_details: {
          name: name,
        },
      });

      if (pmError) {
        throw new Error(pmError.message);
      }

      // Confirm payment with the payment method
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent?.status === 'succeeded') {
        try {
          await apiRequest("POST", `/api/valuations/${valuationId}/mark-paid`, {
            paymentIntentId: paymentIntent.id
          });
          
          toast({
            title: "Payment Successful!",
            description: "Your PDF report is now available in your dashboard.",
          });
          
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        } catch {
          toast({
            title: "Payment Successful!",
            description: "Payment completed! Check your dashboard for the PDF report.",
          });
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 3000);
        }
      }
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "Please check your card details and try again.",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  // Format card number
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Format expiry
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
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
          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <CardTitle>Payment Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        type="text"
                        placeholder="12/25"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        type="text"
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                    <p className="font-medium">Test Card for Demo:</p>
                    <p>4242 4242 4242 4242, 12/25, 123</p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-3 text-lg font-semibold"
                    disabled={isProcessing || !clientSecret}
                  >
                    {isProcessing ? "Processing Payment..." : "Complete Payment - $39"}
                  </Button>
                </form>
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