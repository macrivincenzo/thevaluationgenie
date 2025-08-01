import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from "@/lib/stripe";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
// Removed useAuth hook - using direct state management for speed
import { useState, useEffect } from "react";
// Removed ProfileCompletionModal for faster loading
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import ValuationFlow from "@/pages/valuation-flow";
import CheckoutNew from "@/pages/checkout-new";
import Dashboard from "@/pages/dashboard";
import Admin from "@/pages/admin";
import CustomerData from "@/pages/customer-data";
import StripeTest from "@/pages/stripe-test";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";

function Router() {
  // Always show unauthenticated view by default - no delays
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Optional: Check auth in background (non-blocking)
  useEffect(() => {
    fetch("/api/auth/user", { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(userData => {
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        }
      })
      .catch(() => {}); // Ignore errors
  }, []);

  return (
    <>
      <Switch>
        {!isAuthenticated ? (
          <>
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/contact" component={Contact} />
          </>
        ) : (
          <>
            <Route path="/" component={Home} />
            <Route path="/valuation" component={ValuationFlow} />
            <Route path="/checkout/:id" component={CheckoutNew} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/admin" component={Admin} />
            <Route path="/customer-data" component={CustomerData} />
            <Route path="/stripe-test" component={StripeTest} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/contact" component={Contact} />
          </>
        )}
        <Route component={NotFound} />
      </Switch>
      
      {/* Profile modal removed for speed */}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Elements stripe={stripePromise}>
          <Toaster />
          <Router />
        </Elements>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
