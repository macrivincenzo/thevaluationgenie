import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, FileText, Download, ArrowRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

export default function CheckoutSuccess() {
  const [, navigate] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  const valuationId = urlParams.get('valuation_id');

  // Verify payment mutation
  const verifyPayment = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/verify-payment", {
        sessionId,
        valuationId,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setStatus('success');
      setMessage('Payment verified successfully!');
    },
    onError: (error: any) => {
      setStatus('error');
      setMessage(error.message || 'Payment verification failed');
    },
  });

  useEffect(() => {
    if (sessionId && valuationId) {
      verifyPayment.mutate();
    } else {
      setStatus('error');
      setMessage('Missing payment information');
    }
  }, [sessionId, valuationId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
            <p className="text-muted-foreground">Please wait while we confirm your payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">✕</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Payment Error</h2>
            <p className="text-muted-foreground mb-4">{message}</p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href={`/checkout/${valuationId}`}>Try Again</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
      <div className="w-full max-w-2xl px-4">
        <Card className="text-center">
          <CardHeader>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your professional valuation report is now available.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="font-medium text-green-800 dark:text-green-200">
                    Professional Report Generated
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    Your comprehensive business valuation report is ready for download
                  </p>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="text-left space-y-2">
              <h3 className="font-semibold">Your Professional Report Includes:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Professional PDF Report
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Enterprise Valuation Range
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Company Overview
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  SDE Analysis
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Value Drivers Assessment
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Risk Factors Evaluation
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button asChild className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                <Link href="/dashboard">
                  <Download className="w-4 h-4 mr-2" />
                  View & Download Report
                </Link>
              </Button>
              
              <div className="flex gap-3">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/valuation">
                    Create New Valuation
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>

            {/* Receipt Info */}
            <div className="text-xs text-muted-foreground border-t pt-4">
              <p>A receipt has been sent to your email address.</p>
              <p>Questions? Contact support at info@thevaluationgenie.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}