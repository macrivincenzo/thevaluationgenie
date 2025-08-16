import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { Valuation } from "@shared/schema";

export default function QuickCheckout() {
  const { id } = useParams<{ id: string }>();

  // Get valuation details
  const { data: valuation, isLoading } = useQuery({
    queryKey: ['/api/valuations', id],
    enabled: !!id,
  });

  const handleQuickPayment = () => {
    // Create a simplified checkout URL that bypasses long domain issues
    const checkoutUrl = `https://buy.stripe.com/test_28o9D2bUi6nEeCceUU?prefilled_email=${encodeURIComponent('customer@example.com')}&client_reference_id=${id}`;
    window.open(checkoutUrl, '_blank');
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-center">Quick Checkout</h1>
        </div>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Professional Report - $39</CardTitle>
            <p className="text-muted-foreground">For {valuation.businessName}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Professional PDF Report (15+ pages)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Enterprise Valuation Range</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>SDE Methodology Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Risk Assessment & Value Drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>7-Day Money-Back Guarantee</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full text-lg py-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                onClick={handleQuickPayment}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Pay $39 Now (Quick Checkout)
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Opens Stripe's secure payment page in a new tab
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}