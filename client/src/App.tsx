import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import Landing from "@/pages/landing";

// Lazy load pages
const Home = lazy(() => import("@/pages/home"));
const ValuationFlow = lazy(() => import("@/pages/valuation-flow"));
const Checkout = lazy(() => import("@/pages/checkout"));
const CheckoutSuccess = lazy(() => import("@/pages/checkout-success"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Admin = lazy(() => import("@/pages/admin"));
const CustomerData = lazy(() => import("@/pages/customer-data"));
const StripeTest = lazy(() => import("@/pages/stripe-test"));
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

// Blog pages
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

// Loading fallback
const PageLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="text-slate-600 text-sm">Loading ValuationGenie...</p>
    </div>
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/home" component={() => <Suspense fallback={<PageLoadingFallback />}><Home /></Suspense>} />
      
      {/* Blog routes */}
      <Route path="/blog" component={() => <Suspense fallback={<PageLoadingFallback />}><BlogIndex /></Suspense>} />
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
      
      {/* Public pages */}
      <Route path="/services" component={() => <Suspense fallback={<PageLoadingFallback />}><Services /></Suspense>} />
      <Route path="/industry-analysis" component={() => <Suspense fallback={<PageLoadingFallback />}><IndustryAnalysis /></Suspense>} />
      <Route path="/pricing" component={() => <Suspense fallback={<PageLoadingFallback />}><Pricing /></Suspense>} />
      <Route path="/about" component={() => <Suspense fallback={<PageLoadingFallback />}><About /></Suspense>} />
      
      {/* Authentication routes */}
      <Route path="/login" component={() => <Suspense fallback={<PageLoadingFallback />}><Login /></Suspense>} />
      <Route path="/signup" component={() => <Suspense fallback={<PageLoadingFallback />}><Signup /></Suspense>} />
      
      {/* Protected routes */}
      <Route path="/valuation" component={() => <Suspense fallback={<PageLoadingFallback />}><ValuationFlow /></Suspense>} />
      <Route path="/checkout" component={() => <Suspense fallback={<PageLoadingFallback />}><Checkout /></Suspense>} />
      <Route path="/checkout/success" component={() => <Suspense fallback={<PageLoadingFallback />}><CheckoutSuccess /></Suspense>} />
      <Route path="/dashboard" component={() => <Suspense fallback={<PageLoadingFallback />}><Dashboard /></Suspense>} />
      <Route path="/stripe-test" component={() => <Suspense fallback={<PageLoadingFallback />}><StripeTest /></Suspense>} />
      <Route path="/admin" component={() => <Suspense fallback={<PageLoadingFallback />}><Admin /></Suspense>} />
      <Route path="/customer-data" component={() => <Suspense fallback={<PageLoadingFallback />}><CustomerData /></Suspense>} />
      
      {/* Static pages */}
      <Route path="/lifetime" component={() => <Suspense fallback={<PageLoadingFallback />}><LifetimeSetup /></Suspense>} />
      <Route path="/terms" component={() => <Suspense fallback={<PageLoadingFallback />}><Terms /></Suspense>} />
      <Route path="/privacy" component={() => <Suspense fallback={<PageLoadingFallback />}><Privacy /></Suspense>} />
      <Route path="/contact" component={() => <Suspense fallback={<PageLoadingFallback />}><Contact /></Suspense>} />
      
      <Route component={() => <Suspense fallback={<PageLoadingFallback />}><NotFound /></Suspense>} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;