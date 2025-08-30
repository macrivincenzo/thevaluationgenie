import { useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calculator, FileText, ArrowLeft } from "lucide-react";

export default function Pricing() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // SEO Meta Tags Setup
    document.title = "Business Valuation Pricing | Professional Reports $39 | TheValuationGenie";
    
    const setMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const setOgMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    setMeta("description", "Professional business valuation reports for just $39. Get comprehensive SDE analysis, market comparisons, and expert insights.");
    setMeta("keywords", "business valuation pricing, valuation report cost, SDE valuation price, business appraisal cost");
    setMeta("author", "ValuationGenie");
    setMeta("robots", "index, follow");

    // Open Graph Meta Tags
    setOgMeta("og:title", "Business Valuation Pricing | Professional Reports $39");
    setOgMeta("og:description", "Professional business valuation reports for just $39. Get comprehensive SDE analysis and expert insights.");
    setOgMeta("og:type", "website");
    setOgMeta("og:url", "https://thevaluationgenie.com/pricing");
    setOgMeta("og:image", "https://thevaluationgenie.com/valuation-genie-logo.jpg");

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://thevaluationgenie.com/pricing');

    window.scrollTo(0, 0);
  }, []);

  const handleGetStarted = () => {
    setLocation("/signup");
  };

  const handleBackHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Business Valuation Pricing
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-slate-700 mb-6">
              Get Your Business Valued Today
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business valuation needs. Start with a free estimate or get a comprehensive professional report.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Free Estimate Card */}
            <Card className="shadow-lg border-2 border-slate-200">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">
                  <h2>Free Business Valuation Estimate</h2>
                </CardTitle>
                <div className="text-4xl font-bold text-blue-600 my-4">$0</div>
                <p className="text-slate-600">Perfect for getting started</p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Quick business worth calculator estimate</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Basic SDE valuation range</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>No commitment required</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Instant results in minutes</span>
                  </li>
                </ul>
                <Button 
                  className="w-full text-lg py-3"
                  variant="outline"
                  onClick={handleGetStarted}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Free Estimate
                </Button>
              </CardContent>
            </Card>

            {/* Professional Report Card */}
            <Card className="shadow-xl border-2 border-blue-500 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1">
                Most Popular
              </Badge>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">
                  <h2>Professional Report</h2>
                </CardTitle>
                <div className="text-4xl font-bold text-blue-600 my-4">$39</div>
                <p className="text-slate-600">Comprehensive business appraisal</p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Comprehensive SDE valuation analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Professional-grade business appraisal report</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Detailed financial analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Ready for business decisions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Industry comparisons & multiples</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>7-day money-back guarantee</span>
                  </li>
                </ul>
                <Button 
                  className="w-full text-lg py-3 bg-blue-600 hover:bg-blue-700"
                  onClick={handleGetStarted}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Get Professional Report
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Value Proposition */}
          <div className="text-center mt-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Why Choose ValuationGenie?</h3>
              <p className="text-blue-800">
                Save thousands compared to traditional appraisals. Get professional SDE valuation results in minutes, not months. Trusted by business owners nationwide.
              </p>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="text-center mt-8">
            <Button 
              variant="ghost" 
              onClick={handleBackHome}
              className="text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Business Valuation Software Home
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}