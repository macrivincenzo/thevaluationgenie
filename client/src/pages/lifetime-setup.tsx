import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, Crown, Check, AlertCircle, Gift } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";



export default function LifetimeSetup() {
  const { user, isAuthenticated } = useAuth();
  const [verificationCode, setVerificationCode] = useState("");

  // Query lifetime status - only if authenticated
  const { data: lifetimeStatus, refetch } = useQuery({
    queryKey: ['/api/lifetime/status'],
    enabled: isAuthenticated,
    retry: false,
  });

  // Grant lifetime access mutation
  const grantLifetimeMutation = useMutation({
    mutationFn: async (data: { verificationCode: string; source: string }) => {
      if (!isAuthenticated) {
        throw new Error('Please sign in first to activate your lifetime membership');
      }
      
      const response = await fetch('/api/lifetime/grant-lifetime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to activate lifetime membership');
      }
      
      return response.json();
    },
    onSuccess: () => {
      if (refetch) refetch();
      setVerificationCode("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.trim()) {
      grantLifetimeMutation.mutate({
        verificationCode: verificationCode.trim(),
        source: "appsumo"
      });
    }
  };

  const isLifetimeMember = (lifetimeStatus as any)?.lifetimeAccess || false;
  const tierName = (lifetimeStatus as any)?.lifetimeTier || 'free';
  const monthlyLimit = (lifetimeStatus as any)?.monthlyReportLimit;
  const reportsUsed = (lifetimeStatus as any)?.reportsUsedThisMonth || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gift className="w-12 h-12 text-yellow-600 mr-3" />
            <h1 className="text-4xl font-bold text-slate-900">Activate Your Code</h1>
            <Sparkles className="w-12 h-12 text-yellow-600 ml-3" />
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Enter your AppSumo activation code to unlock lifetime access to ValuationGenie
          </p>
        </div>

        {!isAuthenticated ? (
          // Need to sign up first message
          <Card className="shadow-lg max-w-2xl mx-auto border-yellow-200">
            <CardHeader className="bg-yellow-50">
              <CardTitle className="text-2xl text-center text-yellow-800">
                Create Your Account First
              </CardTitle>
              <p className="text-yellow-700 text-center">
                Before activating your AppSumo code, you need to create a free account
              </p>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="text-center space-y-4">
                <div className="bg-white border-2 border-yellow-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Quick 2-Step Process:
                  </h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <p className="font-medium">Create your account</p>
                        <p className="text-sm text-slate-600">Sign up with your email and password</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <p className="font-medium">Activate your AppSumo code</p>
                        <p className="text-sm text-slate-600">Return to this page to enter your activation code</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => {
                      try { sessionStorage.clear(); } catch (e) {}
                      window.location.assign('/signup');
                    }} 
                    size="lg" 
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    Create Free Account
                  </Button>
                  <p className="text-sm text-slate-500">
                    Already have an account? <a href="/login" className="text-yellow-600 hover:underline">Sign in here</a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : isLifetimeMember ? (
          // Already activated - show status
          <Card className="shadow-lg max-w-2xl mx-auto border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-2xl text-green-800 flex items-center justify-center">
                <Crown className="w-8 h-8 mr-3" />
                Lifetime Access Activated!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="text-center">
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-green-100 text-green-800">
                  {tierName.toUpperCase()} TIER
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monthly Report Limit:</span>
                  <span>{monthlyLimit ? `${monthlyLimit} reports` : 'Unlimited'}</span>
                </div>
                
                {monthlyLimit && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Reports Used This Month:</span>
                    <span>{reportsUsed} / {monthlyLimit}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="font-medium">Features Included:</span>
                  <div className="text-right text-sm">
                    <div className="flex items-center text-green-600">
                      <Check className="w-4 h-4 mr-1" />
                      Priority PDF Generation
                    </div>
                    <div className="flex items-center text-green-600">
                      <Check className="w-4 h-4 mr-1" />
                      Premium Report Templates
                    </div>
                    <div className="flex items-center text-green-600">
                      <Check className="w-4 h-4 mr-1" />
                      Email Support
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-4">
                <Button 
                  onClick={() => {
                    try { sessionStorage.clear(); } catch (e) {}
                    window.location.assign('/valuation');
                  }} 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700"
                >
                  Start Your Business Valuation
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Activation form
          <Card className="shadow-lg max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Enter Your Activation Code
              </CardTitle>
              <p className="text-slate-600 text-center">
                Paste your AppSumo code below to activate lifetime access
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-lg font-medium">
                    Activation Code
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter your AppSumo code (e.g., APPSUMO-BASIC-2025)"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="text-lg py-3"
                    required
                  />
                  <p className="text-sm text-slate-500">
                    Your code should look like: APPSUMO-BASIC-2025, APPSUMO-PRO-2025, or APPSUMO-UNLIMITED-2025
                  </p>
                </div>

                {grantLifetimeMutation.error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription className="text-red-800">
                      {grantLifetimeMutation.error.message}
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                  disabled={grantLifetimeMutation.isPending || !verificationCode.trim()}
                >
                  {grantLifetimeMutation.isPending ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Activating...
                    </>
                  ) : (
                    <>
                      <Crown className="w-5 h-5 mr-2" />
                      Activate Lifetime Access
                    </>
                  )}
                </Button>
              </form>

              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Available Tiers:</h3>
                <div className="space-y-2 text-sm">
                  <div>• Basic Tier: 5 reports per month</div>
                  <div>• Pro Tier: 10 reports per month</div>
                  <div>• Unlimited Tier: No limits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
}