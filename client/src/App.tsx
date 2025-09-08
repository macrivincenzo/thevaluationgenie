import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from "@/lib/stripe";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect, lazy, Suspense } from "react";
import ProfileCompletionModal from "@/components/auth/profile-completion-modal";

// Critical pages - loaded immediately
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";
import NotFound from "@/pages/not-found";

// Lazy load heavy pages to reduce initial bundle
const ValuationFlow = lazy(() => import("@/pages/valuation-flow"));
const Checkout = lazy(() => import("@/pages/checkout"));
const CheckoutSuccess = lazy(() => import("@/pages/checkout-success"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Admin = lazy(() => import("@/pages/admin"));
const CustomerData = lazy(() => import("@/pages/customer-data"));
const StripeTest = lazy(() => import("@/pages/stripe-test"));

// Lazy load static pages
const Terms = lazy(() => import("@/pages/terms"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Contact = lazy(() => import("@/pages/contact"));
const Services = lazy(() => import("@/pages/services"));
const IndustryAnalysis = lazy(() => import("@/pages/industry-analysis"));
const Pricing = lazy(() => import("@/pages/pricing"));
const About = lazy(() => import("@/pages/about"));
const LifetimeSetup = lazy(() => import("@/pages/lifetime-setup"));
const DownloadLogos = lazy(() => import("@/pages/download-logos"));

// Lazy load all blog pages (heavy content)
const BlogIndex = lazy(() => import("@/pages/blog/index"));
const SdeBusinessValuationGuide = lazy(() => import("@/pages/blog/sde-business-valuation-guide"));
const BusinessValuationVsMarketAppraisal = lazy(() => import("@/pages/blog/business-valuation-vs-market-appraisal"));
const SmallBusinessSalePreparation = lazy(() => import("@/pages/blog/small-business-sale-preparation"));
const IndustryValuationMultiples2025 = lazy(() => import("@/pages/blog/industry-valuation-multiples-2025"));
const HowToValueServiceBusiness = lazy(() => import("@/pages/blog/how-to-value-service-business"));
const BusinessValuationMistakes = lazy(() => import("@/pages/blog/business-valuation-mistakes"));
const EcommerceBusinessValuation = lazy(() => import("@/pages/blog/ecommerce-business-valuation"));
const SdeVsEbitdaGuide = lazy(() => import("@/pages/blog/sde-vs-ebitda-guide"));
const RestaurantValuationGuide = lazy(() => import("@/pages/blog/restaurant-valuation-guide"));
const BusinessValuationCalculator = lazy(() => import("@/pages/blog/business-valuation-calculator"));
const BusinessBrokerVsDiyValuation = lazy(() => import("@/pages/blog/business-broker-vs-diy-valuation"));
const BusinessAppraisalCostGuide = lazy(() => import("@/pages/blog/business-appraisal-cost-guide"));
const FamilyBusinessValuationEstatePlanning = lazy(() => import("@/pages/blog/family-business-valuation-estate-planning"));
const ManufacturingBusinessValuationMultiples = lazy(() => import("@/pages/blog/manufacturing-business-valuation-multiples"));
const BusinessValuationDivorceProceedings = lazy(() => import("@/pages/blog/business-valuation-divorce-proceedings"));
const RestaurantEmployeeBuyoutValuation = lazy(() => import("@/pages/blog/restaurant-employee-buyout-valuation"));
const SaaSStartupValuationCalculator = lazy(() => import("@/pages/blog/saas-startup-valuation-calculator"));
const RestaurantValuationCalculator = lazy(() => import("@/pages/restaurant-valuation-calculator"));

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
);

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
      <Suspense fallback={<PageLoader />}>
        <Switch>
          {/* Blog routes - must be first to avoid authentication conflicts */}
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
          <Route path="/blog/business-valuation-calculator" component={BusinessValuationCalculator} />
          <Route path="/blog/business-broker-vs-diy-valuation" component={BusinessBrokerVsDiyValuation} />
          <Route path="/blog/business-appraisal-cost-guide" component={BusinessAppraisalCostGuide} />
          <Route path="/blog/family-business-valuation-estate-planning" component={FamilyBusinessValuationEstatePlanning} />
          <Route path="/blog/manufacturing-business-valuation-multiples" component={ManufacturingBusinessValuationMultiples} />
          <Route path="/blog/business-valuation-divorce-proceedings" component={BusinessValuationDivorceProceedings} />
          <Route path="/blog/restaurant-employee-buyout-valuation" component={RestaurantEmployeeBuyoutValuation} />
          <Route path="/blog/saas-startup-valuation-calculator" component={SaaSStartupValuationCalculator} />
          
          {/* Restaurant Valuation Calculator - Available to all users */}
          <Route path="/restaurant-valuation-calculator" component={RestaurantValuationCalculator} />
          
          {/* Common routes available to both authenticated and non-authenticated users */}
          <Route path="/services" component={Services} />
          <Route path="/industry-analysis" component={IndustryAnalysis} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/download-logos" component={DownloadLogos} />
          <Route path="/lifetime" component={LifetimeSetup} />
        
        {!isAuthenticated ? (
          <>
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

          </>
        ) : (
          <>
            <Route path="/" component={Home} />
            <Route path="/valuation" component={ValuationFlow} />
            <Route path="/checkout/:id" component={Checkout} />
            <Route path="/checkout-success" component={CheckoutSuccess} />
            <Route path="/dashboard" component={Dashboard} />


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
      </Suspense>
      
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
