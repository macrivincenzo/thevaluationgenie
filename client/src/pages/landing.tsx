import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Shield, 
  Clock, 
  FileText, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Download,
  Building,
  Calendar,
  DollarSign,
  Trash2,
  UserMinus,
  Info
} from "lucide-react";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      await apiRequest("POST", "/api/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our updates.",
      });
      setEmail("");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate(email);
    }
  };

  const handleGetStarted = () => {
    setLocation("/signup");
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // SEO Meta Tags Setup
  useEffect(() => {
    // Set document title
    document.title = "Professional Business Valuation Software | ValuationGenie";
    
    // Helper function to set meta tags
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

    // Set basic meta tags
    setMeta("description", "Get instant business valuations using SDE methodology. Professional business valuation software for entrepreneurs and business owners.");
    setMeta("keywords", "business valuation, SDE valuation, business worth calculator, business appraisal, company valuation, business value");
    setMeta("robots", "index, follow");
    setMeta("author", "TheValuationGenie");
    setMeta("viewport", "width=device-width, initial-scale=1.0");

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://thevaluationgenie.com/');

    // Set Open Graph meta tags
    setOgMeta("og:title", "Professional Business Valuation Software | ValuationGenie");
    setOgMeta("og:description", "Get instant business valuations using SDE methodology. Professional business valuation software for entrepreneurs and business owners.");
    setOgMeta("og:type", "website");
    setOgMeta("og:url", "https://thevaluationgenie.com/");
    setOgMeta("og:image", "https://thevaluationgenie.com/images/og-image.jpg");

    // Set Twitter Card meta tags
    setOgMeta("twitter:card", "summary_large_image");
    setOgMeta("twitter:title", "Professional Business Valuation Software | ValuationGenie");
    setOgMeta("twitter:description", "Get instant business valuations using SDE methodology. Professional business valuation software for entrepreneurs and business owners.");
    setOgMeta("twitter:image", "https://thevaluationgenie.com/images/twitter-image.jpg");

    // Add LocalBusiness Schema Markup
    const localBusinessSchema = document.createElement('script');
    localBusinessSchema.type = 'application/ld+json';
    localBusinessSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "TheValuationGenie",
      "description": "Professional business valuation software using SDE methodology",
      "url": "https://thevaluationgenie.com",
      "telephone": "+1-555-0123",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://www.linkedin.com/company/valuationgenie"
      ]
    });

    // Add SoftwareApplication Schema Markup (additional schema for better SEO)
    const softwareSchema = document.createElement('script');
    softwareSchema.type = 'application/ld+json';
    softwareSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "ValuationGenie Business Valuation Software",
      "description": "Professional business valuation software using SDE methodology for instant business worth calculator results",
      "url": "https://thevaluationgenie.com",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "39",
        "priceCurrency": "USD",
        "description": "Professional SDE business valuation report"
      },
      "provider": {
        "@type": "Organization",
        "name": "ValuationGenie",
        "url": "https://thevaluationgenie.com",
        "logo": "https://thevaluationgenie.com/valuation-genie-logo.jpg"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127"
      }
    });

    // Remove existing schemas if present
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(schema => schema.remove());
    
    // Add both schema markups
    document.head.appendChild(localBusinessSchema);
    document.head.appendChild(softwareSchema);

    // Scroll to top when component mounts (from external links)
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Business Valuation Calculator 2025: Free SDE Calculator Tool
            </h1>
            
            {/* Pricing Highlight */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-red-100 border border-red-200 rounded-lg px-4 py-2">
                <span className="text-red-500 text-lg lg:text-xl font-semibold line-through">Ordinary price $89</span>
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-slate-400">→</div>
              <div className="bg-green-100 border border-green-200 rounded-lg px-6 py-3">
                <span className="text-green-700 text-2xl lg:text-3xl font-bold">Professional Reports $39</span>
              </div>
            </div>
            
            <div className="text-center mb-2">
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full">
                🔥 Save $50 (56% OFF) - Limited Time
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-semibold text-slate-700 mb-6">
              Get Instant Business Valuation Results with SDE Methodology
            </h2>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Free Business Valuation Estimate - Professional Reports Available</h3>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Professional business valuation software using SDE methodology. Trusted by 1000+ business owners worldwide. Start with a free estimate to understand your business value. Get comprehensive business appraisal reports for serious decisions for just $39.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="flex gap-3 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700"
                  onClick={handleGetStarted}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Free Estimate
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-4"
                  onClick={() => setLocation("/login")}
                >
                  Sign In
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={scrollToHowItWorks}
              >
                Learn More
              </Button>
            </div>
            
            {/* Value Proposition Highlight */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
              <p className="text-blue-800 text-center font-medium">
                💼 <strong>Used by buyers, sellers, and business brokers nationwide</strong>
              </p>
              <p className="text-blue-700 text-center text-sm mt-1">
                AI-driven SDE methodology • 100% halal compliant • 7 days money-back guarantee
              </p>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-secondary mr-2" />
                <span>Secure & Confidential</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-secondary mr-2" />
                <span>Results in Minutes</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-secondary mr-2" />
                <span>Professional PDF Report</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">How Our Business Appraisal Software Works</h2>
            <p className="text-xl text-slate-600">Get your business valuation in 3 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Upload/Enter Data</h3>
              <p className="text-slate-600">Provide your business financials and answer our intelligent questionnaire designed by valuation experts.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Answer Questions</h3>
              <p className="text-slate-600">Our system analyzes key factors that affect your business value, with explanations for each question.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Get Report</h3>
              <p className="text-slate-600">Receive a professional PDF report with valuation range, key ratios, and industry comparisons.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Business Valuation Software */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Why Choose Our Business Valuation Software?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our affordable business valuation tool is built for small and medium enterprises like yours
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">AI-Powered SDE Methodology Accuracy</h3>
                <p className="text-slate-600">
                  Advanced algorithms ensure precise Seller's Discretionary Earnings calculations using current market data.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Instant Results in Minutes, Not Weeks</h3>
                <p className="text-slate-600">
                  Get professional business valuations immediately - no waiting for external appraisers.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <Building className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Professional-Grade Reports for $39</h3>
                <p className="text-slate-600">
                  Comprehensive PDF reports at fraction of traditional appraisal costs ($2,000+ vs $39).
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Trusted by 1000+ Business Owners</h3>
                <p className="text-slate-600">
                  Used by buyers, sellers, brokers, and consultants across multiple industries.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Secure and Easy</h3>
                <p className="text-slate-600">
                  Upload financials securely, receive your business valuation report, and move forward with peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Perfect for SME Goals</h3>
                <p className="text-slate-600">
                  Sell with confidence, secure Sharia-compliant funding, or grow smarter with our halal business appraisal tools.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Professional SDE Valuation Report for $39</h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Don't let high costs or delays hold your business back. ValuationGenie offers fast, affordable, and reliable SME business valuations, fully compliant with Islamic finance principles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex gap-3 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700"
                  onClick={handleGetStarted}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Free Estimate
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-4"
                  onClick={() => setLocation("/login")}
                >
                  Sign In
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={scrollToHowItWorks}
              >
                Learn More
              </Button>
            </div>
            <p className="text-sm text-slate-500 mt-4">Free estimates • Professional reports $39 • No subscriptions, no hidden fees.</p>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              What You Get in Your Valuation Report
            </h2>
            <p className="text-xl text-slate-600">
              Complete business analysis in professional format
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <FileText className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Comprehensive SDE Analysis</h3>
                <ul className="text-slate-600 space-y-2">
                  <li>• Detailed Seller's Discretionary Earnings calculation</li>
                  <li>• Industry-specific multiple applications</li>
                  <li>• Risk factor assessments</li>
                  <li>• Cash flow projections</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <TrendingUp className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Market Comparison Data</h3>
                <ul className="text-slate-600 space-y-2">
                  <li>• Recent comparable business sales</li>
                  <li>• Industry benchmarking metrics</li>
                  <li>• Market trend analysis</li>
                  <li>• Competitive positioning insights</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <Building className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Professional Presentation Format</h3>
                <ul className="text-slate-600 space-y-2">
                  <li>• Banker/investor ready formatting</li>
                  <li>• Executive summary with key findings</li>
                  <li>• Charts and visual data representations</li>
                  <li>• Methodology explanation</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <CheckCircle className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Ready for Business Decisions</h3>
                <ul className="text-slate-600 space-y-2">
                  <li>• Listing price recommendations</li>
                  <li>• Negotiation strategy guidance</li>
                  <li>• Value improvement suggestions</li>
                  <li>• Due diligence preparation tips</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Valuation Flow Demo */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Valuation Process</h2>
            <p className="text-xl text-slate-600">See how our intelligent questionnaire works</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span className="ml-3 text-sm font-medium text-slate-900">Buyer/Seller</span>
              </div>
              <div className="flex-1 h-px bg-slate-300 mx-4"></div>
              <div className="flex items-center">
                <div className="bg-slate-300 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span className="ml-3 text-sm font-medium text-slate-500">Business Data</span>
              </div>
              <div className="flex-1 h-px bg-slate-300 mx-4"></div>
              <div className="flex items-center">
                <div className="bg-slate-300 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span className="ml-3 text-sm font-medium text-slate-500">File Upload</span>
              </div>
              <div className="flex-1 h-px bg-slate-300 mx-4"></div>
              <div className="flex items-center">
                <div className="bg-slate-300 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <span className="ml-3 text-sm font-medium text-slate-500">Report</span>
              </div>
            </div>
          </div>

          {/* Current Step Demo */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Business Valuation</h3>
                <div className="flex items-start text-slate-600 mb-4">
                  <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p>
                    Get a professional business valuation using industry-standard methodologies. We'll ask questions about your business to provide an accurate assessment.
                  </p>
                </div>
              </div>

              <div className="border-2 border-blue-500 bg-blue-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center">
                  <Calculator className="w-8 h-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Professional Business Valuation</h3>
                    <p className="text-slate-600">
                      Our comprehensive questionnaire will gather the necessary information to calculate your business value using proven methodologies and industry multiples.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">What You Get in Your Business Valuation Report</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    SDE (Seller's Discretionary Earnings) analysis
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Industry-specific multiplier application
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Comprehensive PDF valuation report
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Risk assessment and market analysis
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex justify-between">
                <Button variant="ghost" disabled>
                  Previous
                </Button>
                <Button onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Start Valuation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">💰 Simple Pricing</h2>
            <p className="text-xl text-slate-600">One professional report option, no complexity</p>
          </div>

          <div className="max-w-md mx-auto">
            {/* Professional Report */}
            <Card className="shadow-lg border-2 border-blue-200">
              <CardHeader className="text-center">
                <h3 className="text-2xl font-bold text-slate-900">📊 Professional Report</h3>
                <div className="text-4xl font-bold text-blue-600 my-4">$39</div>
                <p className="text-slate-600">Complete business valuation</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Professional PDF valuation report</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Enterprise valuation with confidence range</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Company overview & financial metrics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span>SDE multiple methodology analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Positive value drivers assessment</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Key risk factors evaluation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span>Professional presentation format</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    <span>7-day money-back guarantee</span>
                  </li>
                </ul>
                <Button className="w-full" onClick={handleGetStarted}>
                  Get Your Report
                </Button>
                <p className="text-center text-sm text-slate-500 mt-3">
                  Save $3,000+ vs. professional appraisers
                </p>
              </CardContent>
            </Card>


          </div>

          {/* Competitive Positioning */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-slate-900 mb-12">🏆 Competitive Positioning</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-slate-200">
                <CardHeader>
                  <h4 className="text-lg font-semibold text-slate-900">vs. Traditional Valuation Firms</h4>
                  <p className="text-slate-600">($2,000-$15,000)</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><TrendingUp className="w-4 h-4 text-green-500 mr-2" /><strong>99% cost savings</strong> - Our reports at $39 vs $5,000 average</li>
                    <li className="flex items-center"><Clock className="w-4 h-4 text-green-500 mr-2" /><strong>Instant delivery</strong> - Hours vs weeks/months</li>
                    <li className="flex items-center"><Users className="w-4 h-4 text-green-500 mr-2" /><strong>Self-service</strong> - No appointments needed</li>
                    <li className="flex items-center"><DollarSign className="w-4 h-4 text-green-500 mr-2" /><strong>Transparent pricing</strong> - No hidden fees</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader>
                  <h4 className="text-lg font-semibold text-slate-900">vs. Online Competitors</h4>
                  <p className="text-slate-600">($99-$499)</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><TrendingUp className="w-4 h-4 text-blue-500 mr-2" /><strong>Better value</strong> - More comprehensive at lower prices</li>
                    <li className="flex items-center"><FileText className="w-4 h-4 text-blue-500 mr-2" /><strong>Professional quality</strong> - Investment-grade insights</li>
                    <li className="flex items-center"><Users className="w-4 h-4 text-blue-500 mr-2" /><strong>Human support</strong> - Real assistance when needed</li>
                    <li className="flex items-center"><Shield className="w-4 h-4 text-blue-500 mr-2" /><strong>Risk-free guarantee</strong> - 7 days money back guarantee</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader>
                  <h4 className="text-lg font-semibold text-slate-900">vs. Software Tools</h4>
                  <p className="text-slate-600">($50-$200/month)</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><FileText className="w-4 h-4 text-purple-500 mr-2" /><strong>Complete reports</strong> - Ready-to-use PDFs vs raw data</li>
                    <li className="flex items-center"><Clock className="w-4 h-4 text-purple-500 mr-2" /><strong>No learning curve</strong> - Instant results, no training</li>
                    <li className="flex items-center"><TrendingUp className="w-4 h-4 text-purple-500 mr-2" /><strong>Professional deliverables</strong> - Executive-ready presentations</li>
                    <li className="flex items-center"><Calculator className="w-4 h-4 text-purple-500 mr-2" /><strong>Comprehensive analysis</strong> - Risk + strategic recommendations</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-slate-50 rounded-lg p-6 max-w-4xl mx-auto">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">🎯 Why We Chose Simple Pricing</h4>
              <p className="text-slate-600 leading-relaxed">
                We believe every business owner deserves access to professional-grade valuation insights. 
                Traditional valuations cost $2,000-$15,000 and take weeks to complete. We're democratizing business valuation by making 
                professional analysis accessible, affordable, and instant. Our single $39 Professional Report provides exceptional value 
                with our 7 days money back guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-50 mb-8">Get tips on business valuation and updates on new features</p>
          
          <form className="max-w-md mx-auto flex gap-4" onSubmit={handleSubscribe}>
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            />
            <Button 
              type="submit" 
              variant="secondary" 
              className="bg-white text-primary hover:bg-slate-100 font-semibold"
              disabled={subscribeMutation.isPending}
            >
              {subscribeMutation.isPending ? "..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-blue-50 text-sm mt-4">
            No spam, unsubscribe at any time
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">Everything you need to know about business valuations</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="accuracy" className="bg-slate-50 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">
                How accurate are your valuations?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Our valuations use industry-standard SDE multiples and are designed to provide a realistic range. While not a formal appraisal, they offer credible estimates based on current market conditions and your business's specific characteristics.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="information" className="bg-slate-50 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">
                What information do I need to provide?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                You'll need basic financial information including annual revenue, owner's profit (SDE), and details about your business operations. Optionally, you can upload financial statements for reference.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security" className="bg-slate-50 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">
                Is my information secure?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Yes, we use industry-standard encryption and security measures. You can delete your data at any time from your dashboard, and we never share your information with third parties.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="report" className="bg-slate-50 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">
                What's included in the PDF report?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Your report includes a valuation range, the industry multiple used, key financial ratios, factors affecting value, and important disclaimers. It's designed to be shared with potential buyers, lenders, or partners.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="refund" className="bg-slate-50 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900">
                Can I get a refund if I'm not satisfied?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Yes, we offer a 7 days money back guarantee. If you're not satisfied with your valuation report, contact us for a full refund.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* User Dashboard Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Your Personal Dashboard</h2>
            <p className="text-xl text-slate-600">Track your valuations and manage your data</p>
          </div>

          <Card className="shadow-lg overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-slate-900 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Welcome back, John Smith</h3>
                  <p className="text-slate-300">Member since January 2024</p>
                </div>
                <Button className="bg-primary hover:bg-blue-700">
                  <Calculator className="w-4 h-4 mr-2" />
                  New Valuation
                </Button>
              </div>
            </div>

            {/* Dashboard Content */}
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-slate-600">Total Valuations</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">$245K</div>
                  <div className="text-slate-600">Average Value</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">2 days ago</div>
                  <div className="text-slate-600">Last Report</div>
                </div>
              </div>

              {/* Previous Reports */}
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Your Valuation Reports</h4>
              
              <div className="space-y-4">
                <Card className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold text-slate-900">ABC Consulting Services</h5>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                          <span><Building className="w-4 h-4 inline mr-1" />Professional Consulting</span>
                          <span><Calendar className="w-4 h-4 inline mr-1" />January 15, 2024</span>
                          <span><DollarSign className="w-4 h-4 inline mr-1" />$180K - $220K</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-blue-700">
                          <Download className="w-4 h-4 mr-1" />Download
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-red-700">
                          <Trash2 className="w-4 h-4 mr-1" />Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold text-slate-900">XYZ Marketing Agency</h5>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                          <span><Building className="w-4 h-4 inline mr-1" />Marketing & Advertising</span>
                          <span><Calendar className="w-4 h-4 inline mr-1" />January 10, 2024</span>
                          <span><DollarSign className="w-4 h-4 inline mr-1" />$320K - $380K</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-blue-700">
                          <Download className="w-4 h-4 mr-1" />Download
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-red-700">
                          <Trash2 className="w-4 h-4 mr-1" />Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Data Management */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Data Management</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600">You can delete all your data and reports at any time.</p>
                    <p className="text-sm text-slate-500 mt-1">This action cannot be undone.</p>
                  </div>
                  <Button variant="destructive">
                    <UserMinus className="w-4 h-4 mr-2" />
                    Delete All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
