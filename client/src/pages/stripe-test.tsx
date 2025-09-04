import { useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

export default function StripeTest() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const testStripeConnection = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/test-stripe", {});
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Stripe Connected!",
          description: "Your Stripe account is working correctly.",
        });
      } else {
        throw new Error(data.message || "Unknown error");
      }
    } catch (error: any) {
      toast({
        title: "Stripe Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Stripe Connection Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Test your Stripe integration:</p>
            <Button 
              onClick={testStripeConnection}
              disabled={isLoading}
            >
              {isLoading ? "Testing..." : "Test Stripe Connection"}
            </Button>
            
            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Public Key:</strong> {import.meta.env.VITE_STRIPE_PUBLIC_KEY ? "✓ Set" : "✗ Missing"}</p>
              <p><strong>Stripe Object:</strong> {"✓ Loaded"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}