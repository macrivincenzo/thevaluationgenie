import { useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  ArrowLeft, 
  Target, 
  Users, 
  TrendingUp, 
  Shield,
  Calculator,
  FileText,
  Clock,
  DollarSign
} from "lucide-react";

export default function About() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // SEO Meta Tags Setup
    document.title = "About TheValuationGenie | Business Valuation Experts";
    
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

    setMeta("description", "Learn about TheValuationGenie, your trusted partner for professional business valuations and company appraisals.");
    setMeta("keywords", "about valuationgenie, business valuation experts, company appraisal professionals");
    setMeta("author", "ValuationGenie");
    setMeta("robots", "index, follow");

    // Open Graph Meta Tags
    setOgMeta("og:title", "About TheValuationGenie | Business Valuation Experts");
    setOgMeta("og:description", "Learn about TheValuationGenie, your trusted partner for professional business valuations.");
    setOgMeta("og:type", "website");
    setOgMeta("og:url", "https://thevaluationgenie.com/about");

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://thevaluationgenie.com/about');

    window.scrollTo(0, 0);
  }, []);

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
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              About TheValuationGenie
            </h2>
            <h2 className="text-2xl lg:text-3xl font-semibold text-slate-700 mb-6">
              Revolutionizing Business Valuation with SDE Methodology
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              ValuationGenie is the leading provider of business valuation software, specializing in SDE (Seller's Discretionary Earnings) methodology for small businesses. Our business worth calculator delivers instant, accurate results.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>
                <h3 className="text-3xl font-bold text-slate-900">Our Mission</h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                To make professional business valuation accessible and affordable for every business owner through our advanced business appraisal software. We believe every entrepreneur deserves access to accurate, professional-grade valuation tools without the high costs of traditional appraisers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our Business Valuation Software
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built by valuation experts, powered by AI, and trusted by business owners nationwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg text-center">
              <CardContent className="p-6">
                <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-900 mb-2">AI-Powered SDE Valuation Accuracy</h4>
                <p className="text-slate-600 text-sm">
                  Advanced algorithms ensure precise calculations using industry-standard SDE methodology
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg text-center">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-900 mb-2">Instant Business Worth Calculator Results</h4>
                <p className="text-slate-600 text-sm">
                  Get your business valuation in minutes, not weeks or months like traditional methods
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg text-center">
              <CardContent className="p-6">
                <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-900 mb-2">Professional-Grade Business Appraisal Reports</h4>
                <p className="text-slate-600 text-sm">
                  Comprehensive PDF reports suitable for business decisions, lending, and transactions
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg text-center">
              <CardContent className="p-6">
                <DollarSign className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-900 mb-2">Affordable Pricing at $39</h4>
                <p className="text-slate-600 text-sm">
                  Save thousands compared to traditional appraisals while getting professional results
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              What Sets Us Apart
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Trusted & Secure</h4>
              <p className="text-slate-600">
                Your business data is protected with enterprise-grade security. We never share or sell your information.
              </p>
            </div>

            <div className="text-center">
              <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Expert-Built</h4>
              <p className="text-slate-600">
                Developed by certified business appraisers and valuation professionals with decades of experience.
              </p>
            </div>

            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-slate-900 mb-3">Proven Results</h4>
              <p className="text-slate-600">
                Trusted by thousands of business owners, brokers, and financial professionals nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Value Your Business?
          </h3>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Join thousands of business owners who trust ValuationGenie for accurate, professional business valuations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => setLocation("/signup")}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
              onClick={() => setLocation("/pricing")}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Button 
            variant="ghost" 
            onClick={handleBackHome}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Business Valuation Software Home
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}