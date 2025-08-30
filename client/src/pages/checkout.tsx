import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, FileText, TrendingUp, AlertTriangle, Users, Calendar, ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { Valuation } from "@shared/schema";

export default function Checkout() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Get valuation details
  const { data: valuation, isLoading } = useQuery({
    queryKey: ['/api/valuations', id],
    enabled: !!id,
  });

  // Create checkout session mutation
  const createCheckoutSession = useMutation({
    mutationFn: async () => {
      // Use simpler URLs to avoid Replit domain issues
      const baseUrl = window.location.origin;
      console.log('Creating checkout with base URL:', baseUrl);
      
      const response = await apiRequest("POST", "/api/create-checkout-session", {
        valuationId: id,
        successUrl: `${baseUrl}/checkout-success?session_id={CHECKOUT_SESSION_ID}&valuation_id=${id}`,
        cancelUrl: `${baseUrl}/checkout/${id}`,
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      window.location.href = data.url;
    },
    onError: (error: any) => {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to start checkout",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!valuation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Valuation not found</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (valuation.paid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Already Purchased</h2>
            <p className="text-muted-foreground mb-4">You have already purchased this professional report.</p>
            <Button asChild>
              <Link href={`/dashboard`}>View Report</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Upgrade to Professional Report
          </h2>
          <p className="text-center text-muted-foreground mt-2">
            Get your comprehensive business valuation report
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Business Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Valuation Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{valuation.businessName}</h3>
                <p className="text-muted-foreground">{valuation.businessType || 'Service Business'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Annual Revenue</p>
                  <p className="font-semibold">${valuation.annualRevenue?.toLocaleString() || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">SDE</p>
                  <p className="font-semibold">${valuation.sde?.toLocaleString() || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Value</p>
                  <p className="font-semibold text-green-600">${valuation.estimatedValue?.toLocaleString() || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Multiple</p>
                  <p className="font-semibold">{valuation.multiple?.toFixed(1)}x</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Report Details */}
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <Badge className="w-fit mx-auto mb-2">Most Popular</Badge>
              <CardTitle className="text-2xl">Professional Report</CardTitle>
              <CardDescription>Complete business valuation package</CardDescription>
              <div className="text-center">
                <span className="text-4xl font-bold">$39</span>
                <span className="text-muted-foreground ml-1">one-time</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Professional PDF valuation report</p>
                    <p className="text-sm text-muted-foreground">Comprehensive 3+ page document</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Enterprise valuation with confidence range</p>
                    <p className="text-sm text-muted-foreground">Statistical analysis and range estimates</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Company overview & financial metrics</p>
                    <p className="text-sm text-muted-foreground">Detailed business analysis</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">SDE multiple methodology analysis</p>
                    <p className="text-sm text-muted-foreground">Industry-standard valuation approach</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Positive value drivers assessment</p>
                    <p className="text-sm text-muted-foreground">Identify business strengths</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Key risk factors evaluation</p>
                    <p className="text-sm text-muted-foreground">Comprehensive risk analysis</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Professional presentation format</p>
                    <p className="text-sm text-muted-foreground">Suitable for investors and lenders</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">7-day money-back guarantee</p>
                    <p className="text-sm text-muted-foreground">Risk-free purchase</p>
                  </div>
                </div>
              </div>

              {/* Purchase Button */}
              <Button 
                className="w-full text-lg py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                onClick={() => createCheckoutSession.mutate()}
                disabled={createCheckoutSession.isPending}
                data-testid="button-purchase-report"
              >
                {createCheckoutSession.isPending ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Get Professional Report - $39
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure payment powered by Stripe. Your card information is encrypted and secure.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}