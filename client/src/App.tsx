import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from "@/lib/stripe";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import ProfileCompletionModal from "@/components/auth/profile-completion-modal";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import ValuationFlow from "@/pages/valuation-flow";
import Checkout from "@/pages/checkout";
import CheckoutSuccess from "@/pages/checkout-success";
import Dashboard from "@/pages/dashboard";
import Admin from "@/pages/admin";
import CustomerData from "@/pages/customer-data";
import StripeTest from "@/pages/stripe-test";

import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";
import Contact from "@/pages/contact";
import Services from "@/pages/services";
import IndustryAnalysis from "@/pages/industry-analysis";
import NotFound from "@/pages/not-found";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";
import LifetimeSetup from "@/pages/lifetime-setup";
import BlogIndex from "@/pages/blog/index";
import SdeBusinessValuationGuide from "@/pages/blog/sde-business-valuation-guide";
import BusinessValuationVsMarketAppraisal from "@/pages/blog/business-valuation-vs-market-appraisal";
import SmallBusinessSalePreparation from "@/pages/blog/small-business-sale-preparation";
import IndustryValuationMultiples2025 from "@/pages/blog/industry-valuation-multiples-2025";
import HowToValueServiceBusiness from "@/pages/blog/how-to-value-service-business";
import BusinessValuationMistakes from "@/pages/blog/business-valuation-mistakes";
import EcommerceBusinessValuation from "@/pages/blog/ecommerce-business-valuation";
import SdeVsEbitdaGuide from "@/pages/blog/sde-vs-ebitda-guide";
import RestaurantValuationGuide from "@/pages/blog/restaurant-valuation-guide";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Check if user needs to complete profile
  useEffect(() => {
    if (isAuthenticated && user && !(user as any).profileComplete) {
      // Show profile completion modal if user hasn't completed required info
      if (!(user as any).firstName || !(user as any).lastName || !(user as any).email) {
        setShowProfileModal(true);
      }
    }
  }, [isAuthenticated, user]);

  // Show loading state briefly - prevent 404 flash during auth check
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <Switch>
        {!isAuthenticated ? (
          <>
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/services" component={Services} />
            <Route path="/industry-analysis" component={IndustryAnalysis} />
            <Route path="/lifetime" component={LifetimeSetup} />
            <Route path="/blog" component={BlogIndex} />
            <Route path="/blog/sde-business-valuation-guide" component={SdeBusinessValuationGuide} />
            <Route path="/blog/business-valuation-vs-market-appraisal" component={BusinessValuationVsMarketAppraisal} />
            <Route path="/blog/small-business-sale-preparation" component={SmallBusinessSalePreparation} />
            <Route path="/blog/industry-valuation-multiples-2025" component={IndustryValuationMultiples2025} />
            <Route path="/blog/how-to-value-service-business" component={HowToValueServiceBusiness} />
            <Route path="/blog/business-valuation-mistakes" component={BusinessValuationMistakes} />
            <Route path="/blog/ecommerce-business-valuation" component={EcommerceBusinessValuation} />
            <Route path="/blog/sde-vs-ebitda-guide" component={SdeVsEbitdaGuide} />
            <Route path="/blog/restaurant-valuation-guide" component={RestaurantValuationGuide} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/contact" component={Contact} />
          </>
        ) : (
          <>
            <Route path="/" component={Home} />
            <Route path="/valuation" component={ValuationFlow} />
            <Route path="/checkout/:id" component={Checkout} />
            <Route path="/checkout-success" component={CheckoutSuccess} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/services" component={Services} />
            <Route path="/industry-analysis" component={IndustryAnalysis} />
            <Route path="/blog" component={BlogIndex} />
            <Route path="/blog/sde-business-valuation-guide" component={SdeBusinessValuationGuide} />
            <Route path="/blog/business-valuation-vs-market-appraisal" component={BusinessValuationVsMarketAppraisal} />
            <Route path="/blog/small-business-sale-preparation" component={SmallBusinessSalePreparation} />
            <Route path="/blog/industry-valuation-multiples-2025" component={IndustryValuationMultiples2025} />
            <Route path="/blog/how-to-value-service-business" component={HowToValueServiceBusiness} />
            <Route path="/blog/business-valuation-mistakes" component={BusinessValuationMistakes} />
            <Route path="/blog/ecommerce-business-valuation" component={EcommerceBusinessValuation} />
            <Route path="/blog/sde-vs-ebitda-guide" component={SdeVsEbitdaGuide} />
            <Route path="/blog/restaurant-valuation-guide" component={RestaurantValuationGuide} />

            <Route path="/admin" component={Admin} />
            <Route path="/customer-data" component={CustomerData} />
            <Route path="/stripe-test" component={StripeTest} />
            <Route path="/lifetime" component={LifetimeSetup} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/contact" component={Contact} />
          </>
        )}
        <Route component={NotFound} />
      </Switch>
      
      {showProfileModal && user && (
        <ProfileCompletionModal 
          isOpen={showProfileModal}
          user={user}
          onClose={() => setShowProfileModal(false)}
        />
      )}
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
