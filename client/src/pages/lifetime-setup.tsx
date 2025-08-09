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
import { apiRequest } from "@/lib/queryClient";
import { Sparkles, Crown, Check, AlertCircle } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function LifetimeSetup() {
  const { user } = useAuth();
  const [verificationCode, setVerificationCode] = useState("");
  const [lifetimeSource, setLifetimeSource] = useState("appsumo");

  // Query lifetime status
  const { data: lifetimeStatus, refetch } = useQuery({
    queryKey: ['/api/lifetime/status'],
    queryFn: () => apiRequest('/api/lifetime/status'),
  });

  // Grant lifetime access mutation
  const grantLifetimeMutation = useMutation({
    mutationFn: (data: { verificationCode: string; source: string }) =>
      apiRequest('/api/lifetime/grant-lifetime', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }),
    onSuccess: () => {
      refetch();
      setVerificationCode("");
    },
  });

  const isLifetimeMember = lifetimeStatus?.lifetimeAccess;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-600 mr-3" />
            <h1 className="text-4xl font-bold text-slate-900">Lifetime Membership</h1>
          </div>
          <p className="text-xl text-slate-600">
            AppSumo Lifetime Deal - Unlimited Business Valuations
          </p>
        </div>

        {isLifetimeMember ? (
          // Lifetime member status card
          <Card className="shadow-xl border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-yellow-800">
                <Crown className="w-8 h-8 mr-3" />
                Lifetime Access Activated!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Lifetime Benefits</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Unlimited business valuations</span>
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
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                      <span>Early access to new features</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Membership Details</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-slate-600">Source</Label>
                      <div className="flex items-center mt-1">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
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
                  Congratulations! You now have unlimited access to ValuationGenie. 
                  Create as many business valuations as you need - no more $39 per report fees!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        ) : (
          // Activation form
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Activate Your AppSumo Lifetime Deal</CardTitle>
              <p className="text-slate-600">
                Enter your verification code to unlock unlimited business valuations
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">What You'll Get:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm">Unlimited valuations (normally $39 each)</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm">Premium PDF reports</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm">Priority processing</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm">Email support</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm">Early feature access</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm">Lifetime updates</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="source">Lifetime Deal Source</Label>
                  <Select value={lifetimeSource} onValueChange={setLifetimeSource}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appsumo">AppSumo</SelectItem>
                      <SelectItem value="direct">Direct Purchase</SelectItem>
                      <SelectItem value="promotion">Promotional Code</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter your verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>

                <Button
                  onClick={() => grantLifetimeMutation.mutate({ 
                    verificationCode, 
                    source: lifetimeSource 
                  })}
                  disabled={!verificationCode || grantLifetimeMutation.isPending}
                  className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700"
                >
                  {grantLifetimeMutation.isPending ? (
                    "Activating..."
                  ) : (
                    <>
                      <Crown className="w-4 h-4 mr-2" />
                      Activate Lifetime Access
                    </>
                  )}
                </Button>

                {grantLifetimeMutation.error && (
                  <Alert variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>
                      {(grantLifetimeMutation.error as any)?.message || 'Invalid verification code'}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2">Need help?</h4>
                <p className="text-sm text-slate-600">
                  Valid codes: APPSUMO-LIFETIME-2025, DIRECT-LIFETIME-SPECIAL, ADMIN-GRANT-ACCESS
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Contact support if you're having trouble activating your lifetime access.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* How AppSumo Integration Works */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>How AppSumo Lifetime Deal Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Purchase on AppSumo</h4>
                <p className="text-sm text-slate-600">
                  Get your lifetime deal code from AppSumo after purchase
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-green-600">2</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Activate Here</h4>
                <p className="text-sm text-slate-600">
                  Enter your verification code to unlock lifetime access
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-yellow-600">3</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Enjoy Forever</h4>
                <p className="text-sm text-slate-600">
                  Unlimited business valuations, no monthly fees ever!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}