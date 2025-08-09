import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, Crown, Check, AlertCircle } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function LifetimeSetup() {
  const { user, isAuthenticated } = useAuth();
  const [verificationCode, setVerificationCode] = useState("");
  const [lifetimeSource, setLifetimeSource] = useState("appsumo");

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
        source: lifetimeSource
      });
    }
  };

  const isLifetimeMember = lifetimeStatus?.lifetimeAccess;
  const tierName = lifetimeStatus?.lifetimeTier || 'unlimited';
  const monthlyLimit = lifetimeStatus?.monthlyReportLimit;
  const reportsUsed = lifetimeStatus?.reportsUsedThisMonth || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-600 mr-3" />
            <h1 className="text-4xl font-bold text-slate-900">AppSumo Lifetime Deals</h1>
          </div>
          <p className="text-xl text-slate-600">
            Choose the perfect lifetime plan for your business valuation needs
          </p>
        </div>

        {!isAuthenticated ? (
          // Sign in prompt for non-authenticated users
          <Card className="shadow-lg max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center">
                <Crown className="w-8 h-8 text-yellow-600 mr-3" />
                Activate Your AppSumo Lifetime Deal
              </CardTitle>
              <p className="text-slate-600 text-center">
                Sign in to your ValuationGenie account to activate your lifetime membership
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription className="text-blue-800">
                  You need to sign in first to activate your AppSumo lifetime membership. 
                  If you don't have an account yet, create one and then return to this page.
                </AlertDescription>
              </Alert>
              
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => window.location.href = '/api/login?redirect=/lifetime'} className="flex-1 max-w-xs">
                    Sign In with Replit
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/api/login?redirect=/lifetime'} className="flex-1 max-w-xs">
                    Create Account
                  </Button>
                </div>
                
                {/* Temporary test login for development */}
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-3">For testing, you can also:</p>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => {
                      // Quick test login
                      fetch('/api/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({ email: 'test@test.com', password: 'test' })
                      }).then(res => {
                        if (res.ok) {
                          window.location.reload();
                        } else {
                          console.error('Login failed');
                        }
                      });
                    }}
                  >
                    Quick Test Login (test@test.com)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : isLifetimeMember ? (
          // Lifetime member status card
          <Card className="shadow-xl border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-3xl text-yellow-800">
                <Crown className="w-10 h-10 mr-3" />
                Lifetime Access Activated!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 text-white">
                  {tierName.charAt(0).toUpperCase() + tierName.slice(1)} Plan
                </Badge>
                <p className="text-slate-600 mt-2">
                  {monthlyLimit ? `${monthlyLimit} reports per month` : 'Unlimited reports'}
                </p>
                {monthlyLimit && (
                  <p className="text-sm text-slate-500 mt-1">
                    Used this month: {reportsUsed} / {monthlyLimit}
                  </p>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Benefits</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>{monthlyLimit ? `${monthlyLimit} business valuations/month` : 'Unlimited business valuations'}</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Priority PDF generation</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Premium report templates</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Email support</span>
                    </div>
                    {(tierName === 'unlimited' || tierName === 'pro') && (
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-2" />
                        <span>Early access to new features</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Membership Details</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-slate-600">Plan</Label>
                      <div className="flex items-center mt-1">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {tierName.toUpperCase()} LIFETIME
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-slate-600">Source</Label>
                      <div className="flex items-center mt-1">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {lifetimeStatus.lifetimeSource?.toUpperCase() || 'APPSUMO'}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-slate-600">Activated</Label>
                      <p className="text-sm text-slate-800 mt-1">
                        {lifetimeStatus.lifetimePurchaseDate 
                          ? new Date(lifetimeStatus.lifetimePurchaseDate).toLocaleDateString()
                          : 'Today'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Alert className="border-green-200 bg-green-50">
                <Sparkles className="w-4 h-4" />
                <AlertDescription className="text-green-800">
                  Congratulations! Your AppSumo lifetime membership is active. 
                  {monthlyLimit 
                    ? `You can create ${monthlyLimit} business valuations per month with no additional fees.`
                    : `You now have unlimited access to business valuations - no more $39 per report fees!`
                  }
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        ) : (
          // Three-tier display and activation
          <div className="grid gap-8">
            {/* Three Tier Cards */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">AppSumo Lifetime Plans</h2>
                <p className="text-xl text-slate-600">Choose the plan that matches your verification code</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Basic Tier */}
                <Card className="shadow-lg border-2 border-gray-200 hover:border-yellow-300 transition-all">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Crown className="w-8 h-8 text-yellow-600" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">Basic</CardTitle>
                    <div className="text-3xl font-bold text-yellow-600">$69</div>
                    <p className="text-slate-600 font-medium">5 reports per month</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />5 business valuations monthly</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Premium PDF reports</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Email support</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Priority generation</li>
                    </ul>

                  </CardContent>
                </Card>

                {/* Pro Tier */}
                <Card className="shadow-xl border-2 border-indigo-300 hover:border-indigo-400 transition-all relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-indigo-600 text-white px-4 py-1">MOST POPULAR</Badge>
                  </div>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Crown className="w-8 h-8 text-indigo-600" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">Pro</CardTitle>
                    <div className="text-3xl font-bold text-indigo-600">$89</div>
                    <p className="text-slate-600 font-medium">10 reports per month</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />10 business valuations monthly</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Premium PDF reports</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Email support</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Priority generation</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Advanced templates</li>
                    </ul>

                  </CardContent>
                </Card>

                {/* Unlimited Tier */}
                <Card className="shadow-xl border-2 border-purple-300 hover:border-purple-400 transition-all">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">Unlimited</CardTitle>
                    <div className="text-3xl font-bold text-purple-600">$149</div>
                    <p className="text-slate-600 font-medium">Unlimited reports</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Unlimited business valuations</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Premium PDF reports</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Email support</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Priority generation</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Advanced templates</li>
                      <li className="flex items-center"><Check className="w-4 h-4 text-green-600 mr-2" />Early feature access</li>
                    </ul>

                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Activation Form */}
            <Card className="shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Activate Your Plan</CardTitle>
                <p className="text-slate-600 text-center">
                  Enter your verification code from AppSumo to activate your lifetime membership
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {grantLifetimeMutation.error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription className="text-red-800">
                      {(grantLifetimeMutation.error as Error).message}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode">Verification Code</Label>
                    <Input
                      id="verificationCode"
                      type="text"
                      placeholder="e.g., APPSUMO-PRO-2025"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                      className="text-center font-mono"
                    />
                    <p className="text-sm text-slate-500">
                      Enter the code you received from AppSumo
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lifetimeSource">Source</Label>
                    <Select value={lifetimeSource} onValueChange={setLifetimeSource}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="appsumo">AppSumo</SelectItem>
                        <SelectItem value="direct">Direct</SelectItem>
                        <SelectItem value="promotion">Promotion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={grantLifetimeMutation.isPending || !verificationCode.trim()}
                  >
                    {grantLifetimeMutation.isPending ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Activating...
                      </>
                    ) : (
                      <>
                        <Crown className="w-4 h-4 mr-2" />
                        Activate Lifetime Access
                      </>
                    )}
                  </Button>
                </form>

                <Alert className="border-blue-200 bg-blue-50">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription className="text-blue-800">
                    <strong>How it works:</strong> Your verification code determines which plan you get. 
                    Once activated, you'll have immediate access to your tier's benefits with no additional fees.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}