import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from "@/lib/stripe";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import ValuationFlow from "@/pages/valuation-flow";
import CheckoutNew from "@/pages/checkout-new";
import Dashboard from "@/pages/dashboard";
import Admin from "@/pages/admin";
import StripeTest from "@/pages/stripe-test";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
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
          <Route path="/stripe-test" component={StripeTest} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/contact" component={Contact} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
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
