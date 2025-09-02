import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { LazyStripe } from "@/components/performance/LazyStripe";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { usePerformanceOptimization } from "@/hooks/use-performance";
import { useWebVitals } from "@/hooks/use-web-vitals";
import { useState, useEffect, lazy, Suspense } from "react";
import { SkipLink } from "@/components/accessibility/SkipLink";
import { LiveRegion } from "@/components/accessibility/LiveRegion";
import { ResourcePreloader } from "@/components/performance/ResourcePreloader";
import ProfileCompletionModal from "@/components/auth/profile-completion-modal";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
// Lazy load heavy authenticated pages
const ValuationFlow = lazy(() => import("@/pages/valuation-flow"));
const Checkout = lazy(() => import("@/pages/checkout"));
const CheckoutSuccess = lazy(() => import("@/pages/checkout-success"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Admin = lazy(() => import("@/pages/admin"));
const CustomerData = lazy(() => import("@/pages/customer-data"));
const StripeTest = lazy(() => import("@/pages/stripe-test"));

// Lazy load all static pages to reduce initial bundle
const Terms = lazy(() => import("@/pages/terms"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Contact = lazy(() => import("@/pages/contact"));
const Services = lazy(() => import("@/pages/services"));
const IndustryAnalysis = lazy(() => import("@/pages/industry-analysis"));
const Pricing = lazy(() => import("@/pages/pricing"));
const About = lazy(() => import("@/pages/about"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Login = lazy(() => import("@/pages/auth/login"));
const Signup = lazy(() => import("@/pages/auth/signup"));
const LifetimeSetup = lazy(() => import("@/pages/lifetime-setup"));

// Lazy load blog pages for better performance
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
const DownloadLogos = lazy(() => import("@/pages/download-logos"));

// Loading fallback for lazy loaded components
const PageLoadingFallback = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
  </div>
);

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [announceMessage, setAnnounceMessage] = useState('');
  
  // Apply performance optimizations
  usePerformanceOptimization();
  useWebVitals();

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

  // Critical resources to preload - only core app pages
  const criticalResources: Array<{ href: string; as: 'script' | 'style' | 'font' }> = [
    // Note: With lazy loading, these chunks will be requested on demand
    // Preloading core fonts and styles instead
  ];

  return (
    <>
      {/* Performance optimizations */}
      <ResourcePreloader resources={criticalResources} priority="high" />
      
      {/* Accessibility improvements */}
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <LiveRegion message={announceMessage} />
      
      <Switch>
        {/* Blog routes - must be first to avoid authentication conflicts */}
        <Route path="/blog" component={() => <Suspense fallback={<PageLoadingFallback />}><BlogIndex /></Suspense>} />
        <Route path="/blog/" component={() => <Suspense fallback={<PageLoadingFallback />}><BlogIndex /></Suspense>} />
        <Route path="/blog/sde-business-valuation-guide" component={() => <Suspense fallback={<PageLoadingFallback />}><SdeBusinessValuationGuide /></Suspense>} />
        <Route path="/blog/business-valuation-vs-market-appraisal" component={() => <Suspense fallback={<PageLoadingFallback />}><BusinessValuationVsMarketAppraisal /></Suspense>} />
        <Route path="/blog/small-business-sale-preparation" component={() => <Suspense fallback={<PageLoadingFallback />}><SmallBusinessSalePreparation /></Suspense>} />
        <Route path="/blog/industry-valuation-multiples-2025" component={() => <Suspense fallback={<PageLoadingFallback />}><IndustryValuationMultiples2025 /></Suspense>} />
        <Route path="/blog/how-to-value-service-business" component={() => <Suspense fallback={<PageLoadingFallback />}><HowToValueServiceBusiness /></Suspense>} />
        <Route path="/blog/business-valuation-mistakes" component={() => <Suspense fallback={<PageLoadingFallback />}><BusinessValuationMistakes /></Suspense>} />
        <Route path="/blog/ecommerce-business-valuation" component={() => <Suspense fallback={<PageLoadingFallback />}><EcommerceBusinessValuation /></Suspense>} />
        <Route path="/blog/sde-vs-ebitda-guide" component={() => <Suspense fallback={<PageLoadingFallback />}><SdeVsEbitdaGuide /></Suspense>} />
        <Route path="/blog/restaurant-valuation-guide" component={() => <Suspense fallback={<PageLoadingFallback />}><RestaurantValuationGuide /></Suspense>} />
        <Route path="/blog/business-valuation-calculator" component={() => <Suspense fallback={<PageLoadingFallback />}><BusinessValuationCalculator /></Suspense>} />
        <Route path="/blog/business-broker-vs-diy-valuation" component={() => <Suspense fallback={<PageLoadingFallback />}><BusinessBrokerVsDiyValuation /></Suspense>} />
        <Route path="/blog/business-appraisal-cost-guide" component={() => <Suspense fallback={<PageLoadingFallback />}><BusinessAppraisalCostGuide /></Suspense>} />
        <Route path="/blog/family-business-valuation-estate-planning" component={() => <Suspense fallback={<PageLoadingFallback />}><FamilyBusinessValuationEstatePlanning /></Suspense>} />
        <Route path="/blog/manufacturing-business-valuation-multiples" component={() => <Suspense fallback={<PageLoadingFallback />}><ManufacturingBusinessValuationMultiples /></Suspense>} />
        <Route path="/blog/business-valuation-divorce-proceedings" component={() => <Suspense fallback={<PageLoadingFallback />}><BusinessValuationDivorceProceedings /></Suspense>} />
        <Route path="/blog/restaurant-employee-buyout-valuation" component={() => <Suspense fallback={<PageLoadingFallback />}><RestaurantEmployeeBuyoutValuation /></Suspense>} />
        <Route path="/blog/saas-startup-valuation-calculator" component={() => <Suspense fallback={<PageLoadingFallback />}><SaaSStartupValuationCalculator /></Suspense>} />
        
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
            <Route path="/valuation" component={() => <Suspense fallback={<PageLoadingFallback />}><ValuationFlow /></Suspense>} />
            <Route path="/checkout/:id" component={() => <Suspense fallback={<PageLoadingFallback />}><Checkout /></Suspense>} />
            <Route path="/checkout-success" component={() => <Suspense fallback={<PageLoadingFallback />}><CheckoutSuccess /></Suspense>} />
            <Route path="/dashboard" component={() => <Suspense fallback={<PageLoadingFallback />}><Dashboard /></Suspense>} />


            <Route path="/admin" component={() => <Suspense fallback={<PageLoadingFallback />}><Admin /></Suspense>} />
            <Route path="/customer-data" component={() => <Suspense fallback={<PageLoadingFallback />}><CustomerData /></Suspense>} />
            <Route path="/stripe-test" component={() => <Suspense fallback={<PageLoadingFallback />}><StripeTest /></Suspense>} />
            <Route path="/lifetime" component={() => <Suspense fallback={<PageLoadingFallback />}><LifetimeSetup /></Suspense>} />
            <Route path="/terms" component={() => <Suspense fallback={<PageLoadingFallback />}><Terms /></Suspense>} />
            <Route path="/privacy" component={() => <Suspense fallback={<PageLoadingFallback />}><Privacy /></Suspense>} />
            <Route path="/contact" component={() => <Suspense fallback={<PageLoadingFallback />}><Contact /></Suspense>} />
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
        <LazyStripe enableStripe={false}>
          <Toaster />
          <Router />
        </LazyStripe>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
