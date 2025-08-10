import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, Crown, Check, AlertCircle, Gift, Mail, Key } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// AppSumo Login Form Component
function AppSumoLoginForm() {
  const [email, setEmail] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      return response.json();
    },
    onSuccess: () => {
      window.location.reload(); // Refresh to update auth state
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: { email: string; password: string; firstName: string; lastName: string }) => {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // After successful signup, automatically log in
      loginMutation.mutate({ email, password: activationCode });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      if (firstName.trim() && lastName.trim() && email.trim() && activationCode.trim()) {
        signupMutation.mutate({
          email: email.trim(),
          password: activationCode.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim()
        });
      }
    } else {
      if (email.trim() && activationCode.trim()) {
        loginMutation.mutate({
          email: email.trim(),
          password: activationCode.trim()
        });
      }
    }
  };

  const error = loginMutation.error || signupMutation.error;
  const isPending = loginMutation.isPending || signupMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isSignup && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-lg py-3"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="activationCode" className="flex items-center gap-2">
          <Key className="w-4 h-4" />
          AppSumo Activation Code
        </Label>
        <Input
          id="activationCode"
          type="text"
          placeholder="APPSUMO-BASIC-2025"
          value={activationCode}
          onChange={(e) => setActivationCode(e.target.value)}
          className="text-lg py-3 font-mono"
          required
        />
        <p className="text-sm text-slate-500">
          Use your AppSumo code as your password (e.g., APPSUMO-BASIC-2025, APPSUMO-PRO-2025, APPSUMO-UNLIMITED-2025)
        </p>
      </div>

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription className="text-red-800">
            {error.message}
          </AlertDescription>
        </Alert>
      )}

      <Button 
        type="submit" 
        size="lg" 
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
        disabled={isPending || !email.trim() || !activationCode.trim() || (isSignup && (!firstName.trim() || !lastName.trim()))}
      >
        {isPending ? (
          <>
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
            {isSignup ? 'Creating Account...' : 'Signing In...'}
          </>
        ) : (
          <>
            <Crown className="w-5 h-5 mr-2" />
            {isSignup ? 'Create Account & Activate' : 'Sign In & Activate'}
          </>
        )}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-600 hover:text-blue-800 text-sm underline"
        >
          {isSignup ? 'Already have an account? Sign in instead' : 'New to ValuationGenie? Create an account'}
        </button>
      </div>
    </form>
  );
}

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

  const isLifetimeMember = lifetimeStatus?.lifetimeAccess;
  const tierName = lifetimeStatus?.lifetimeTier || 'unlimited';
  const monthlyLimit = lifetimeStatus?.monthlyReportLimit;
  const reportsUsed = lifetimeStatus?.reportsUsedThisMonth || 0;

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
          // AppSumo activation form for non-authenticated users
          <Card className="shadow-lg max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Activate Your AppSumo Lifetime Access
              </CardTitle>
              <p className="text-slate-600 text-center">
                Enter your email address and use your AppSumo code as the password
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <AppSumoLoginForm />
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
                <Button onClick={() => window.location.href = '/valuation'} size="lg" className="bg-green-600 hover:bg-green-700">
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
                  <div className="flex justify-between">
                    <span>Basic Tier (5 reports/month):</span>
                    <span className="font-mono">APPSUMO-BASIC-2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pro Tier (10 reports/month):</span>
                    <span className="font-mono">APPSUMO-PRO-2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unlimited Tier:</span>
                    <span className="font-mono">APPSUMO-UNLIMITED-2025</span>
                  </div>
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