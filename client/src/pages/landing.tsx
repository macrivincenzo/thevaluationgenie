import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
    window.location.href = "/api/login";
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Instant Business Valuation<br />
              <span className="text-primary">for Buyers & Sellers</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Get a credible, data-driven business valuation in minutes—whether you're buying or selling. 
              Professional-grade valuations without the wait or high cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={handleGetStarted}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Get Valuation - $99
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={scrollToHowItWorks}
              >
                Learn More
              </Button>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
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
                <h4 className="font-semibold text-slate-900 mb-3">What's Included:</h4>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Professional Valuation Report</h2>
            <p className="text-xl text-slate-600">Get everything you need for just $99</p>
          </div>

          <div className="max-w-lg mx-auto">
            <Card className="shadow-xl border-2 border-primary">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Complete Valuation Report</h3>
                  <div className="text-5xl font-bold text-primary mb-2">$99</div>
                  <p className="text-slate-600">One-time payment • Instant download</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-slate-700">Professional PDF valuation report</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-slate-700">Valuation range based on industry multiples</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-slate-700">Key financial ratios and benchmarks</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-slate-700">Industry comparison analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-slate-700">Factors affecting your business value</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-slate-700">Secure data handling & deletion option</span>
                  </li>
                </ul>

                <Button 
                  className="w-full py-4 text-lg font-semibold mb-4"
                  onClick={handleGetStarted}
                >
                  Start Your Valuation
                </Button>

                <p className="text-center text-sm text-slate-500">
                  Secure payment via Stripe • 30-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center text-slate-600 mb-4">
              <Shield className="w-5 h-5 text-secondary mr-2" />
              <p>
                <strong>Professional Disclaimer:</strong> This valuation is for informational purposes only and is not a formal business appraisal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">Get tips on business valuation and updates on new features</p>
          
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
          
          <p className="text-blue-100 text-sm mt-4">
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
                Yes, we offer a 30-day money-back guarantee. If you're not satisfied with your valuation report, contact us for a full refund.
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
