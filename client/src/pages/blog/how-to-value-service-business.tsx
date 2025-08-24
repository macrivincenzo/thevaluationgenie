import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, TrendingUp, FileText, Users, Clock, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogSEO, InternalLinks, FAQSchema } from "@/components/seo/BlogSEO";

export default function HowToValueServiceBusiness() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Value a Service Business for Sale: Complete 2025 Guide",
    "description": "Learn professional valuation methods for service businesses using Seller's Discretionary Earnings (SDE) and industry-standard multiples. Get accurate valuations in minutes.",
    "author": { "@type": "Organization", "name": "ValuationGenie" },
    "publisher": { "@type": "Organization", "name": "ValuationGenie", "url": "https://thevaluationgenie.com" },
    "datePublished": "2025-01-17",
    "dateModified": "2025-01-22",
    "url": "https://thevaluationgenie.com/blog/how-to-value-service-business"
  };

  const seoData = {
    title: "How to Value a Service Business for Sale: Complete 2025 Guide | SDE Method",
    description: "Learn professional valuation methods for service businesses using Seller's Discretionary Earnings (SDE) and industry-standard multiples. Get accurate valuations in minutes.",
    keywords: "service business valuation, how to value service business, consulting business valuation, professional services valuation, SDE method",
    url: "https://thevaluationgenie.com/blog/how-to-value-service-business"
  };

  const internalLinks = [
    { href: "/blog/business-valuation-calculator", text: "Free Business Valuation Calculator", category: "Free Tools" },
    { href: "/blog/sde-business-valuation-guide", text: "Complete SDE Valuation Guide", category: "Free Tools" },
    { href: "/blog/business-valuation-mistakes", text: "Avoid Costly Valuation Mistakes", category: "Free Tools" },
    { href: "/blog/industry-valuation-multiples-2025", text: "2025 Industry Multiples", category: "Professional Resources" },
    { href: "/blog/business-broker-vs-diy-valuation", text: "Business Broker vs DIY", category: "Professional Resources" },
    { href: "/blog/business-appraisal-cost-guide", text: "Professional Appraisal Costs", category: "Professional Resources" }
  ];

  const faqData = [
    {
      question: "What is the best method to value a service business?",
      answer: "The SDE (Seller's Discretionary Earnings) method is the gold standard for service businesses. It accounts for owner compensation and provides realistic valuations for businesses with active owner involvement."
    },
    {
      question: "What multiple do service businesses sell for?",
      answer: "Service businesses typically sell for 0.5x-2.8x SDE depending on industry. Consulting and IT services command higher multiples (1.0x-2.8x) while traditional services range from 0.5x-2.0x."
    },
    {
      question: "How do you calculate SDE for a service business?",
      answer: "SDE = Net Income + Owner Salary + Benefits + Personal Expenses + One-time Costs + Depreciation. This shows the true earning power available to a new owner."
    },
    {
      question: "Why do service businesses have lower valuations than product businesses?",
      answer: "Service businesses often depend heavily on owner relationships and expertise, making them harder to transfer. However, well-systematized service businesses can command premium valuations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <BlogSEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
        schemaMarkup={schemaMarkup}
      />
      <FAQSchema faqs={faqData} />
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4">Expert Guide</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            How to Value a Service Business for Sale: Complete 2025 Guide
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Learn professional valuation methods for service businesses using Seller's Discretionary Earnings (SDE) and industry-standard multiples. Get accurate valuations in minutes, not months.
          </p>
          
          {/* CTA Button */}
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-6 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Get Your Free Business Valuation Estimate</h3>
              <p className="text-muted-foreground mb-4">
                Professional service business valuation in under 10 minutes. No registration required.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                <a href="https://thevaluationgenie.com/" className="inline-flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Start Free Valuation Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </Card>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-indigo-600">Why Service Business Valuation is Different</h2>
              <p className="mb-4">
                Service businesses represent over 65% of all small business sales, yet they're often the most challenging to value accurately. Unlike asset-heavy businesses, service companies derive their worth from intangible assets: customer relationships, expertise, systems, and recurring revenue streams.
              </p>
              <p className="mb-4">
                The key to service business valuation lies in understanding Seller's Discretionary Earnings (SDE) - the total financial benefit a single owner-operator receives from the business. This halal-compliant approach focuses on actual cash flow rather than debt-based calculations.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Quick Valuation Preview
                </h3>
                <p className="text-sm text-muted-foreground">
                  A consulting business with $300,000 annual SDE typically sells for $900,000 - $1,500,000 using industry multiples of 3.0x - 5.0x.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SDE Calculation Method */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-indigo-600">Step 1: Calculate Seller's Discretionary Earnings (SDE)</h2>
              <p className="mb-4">
                SDE forms the foundation of service business valuation. It represents the true earning power available to a new owner-operator.
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-3">SDE Calculation Formula:</h3>
                <div className="space-y-2 text-sm font-mono">
                  <p>Net Income (Profit/Loss)</p>
                  <p>+ Owner's Salary & Benefits</p>
                  <p>+ Owner's Personal Expenses</p>
                  <p>+ One-time/Unusual Expenses</p>
                  <p>+ Depreciation & Amortization</p>
                  <p className="border-t pt-2 font-bold">= Seller's Discretionary Earnings</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">Common SDE Adjustments for Service Businesses:</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Owner's Full Compensation</p>
                      <p className="text-sm text-muted-foreground">Salary, bonuses, benefits, perks</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Personal Vehicle Expenses</p>
                      <p className="text-sm text-muted-foreground">Business use of personal car</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Travel & Entertainment</p>
                      <p className="text-sm text-muted-foreground">Personal trips, meals, entertainment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">One-time Professional Fees</p>
                      <p className="text-sm text-muted-foreground">Legal, consulting, setup costs</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industry Multiples */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-indigo-600">Step 2: Apply Industry-Specific SDE Multiples</h2>
              <p className="mb-6">
                Service businesses command different multiples based on recurring revenue, scalability, and market demand. Here are 2025 industry benchmarks:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-slate-300 dark:border-slate-700">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left">Service Type</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">SDE Multiple Range</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">Average Multiple</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Digital Marketing Agency</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">3.5x - 6.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">4.8x</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">IT Consulting</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">3.0x - 5.5x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">4.2x</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Business Consulting</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">2.8x - 4.5x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">3.6x</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Professional Services</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">3.2x - 5.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">4.1x</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Creative Services</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">2.5x - 4.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">3.2x</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Multiple Adjustment Factors:</h4>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• <strong>Higher multiples:</strong> Recurring contracts, documented processes, diverse client base</li>
                  <li>• <strong>Lower multiples:</strong> Owner dependency, limited client base, irregular revenue</li>
                  <li>• <strong>Premium multiples:</strong> Strong growth trajectory, proprietary systems, high barriers to entry</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Valuation Example */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-indigo-600">Step 3: Real-World Valuation Example</h2>
              
              <div className="bg-indigo-50 dark:bg-indigo-950 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Case Study: Digital Marketing Agency</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Financial Profile:</h4>
                    <div className="space-y-2 text-sm">
                      <p>Annual Revenue: $850,000</p>
                      <p>Net Income: $180,000</p>
                      <p>Owner Salary: $120,000</p>
                      <p>Owner Benefits: $15,000</p>
                      <p>Personal Expenses: $8,000</p>
                      <p>One-time Costs: $12,000</p>
                      <p className="border-t pt-2 font-bold">SDE: $335,000</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Valuation Range:</h4>
                    <div className="space-y-2 text-sm">
                      <p>Industry Multiple: 3.5x - 6.0x</p>
                      <p>Low Estimate: $1,172,500</p>
                      <p>High Estimate: $2,010,000</p>
                      <p className="border-t pt-2 font-bold text-lg">Average Value: $1,608,000</p>
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        Applied Multiple: 4.8x (strong recurring revenue)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Value Drivers */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-indigo-600">Key Value Drivers for Service Businesses</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">Positive Value Drivers</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Recurring Revenue Model</p>
                        <p className="text-sm text-muted-foreground">Monthly retainers, annual contracts</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Documented Processes</p>
                        <p className="text-sm text-muted-foreground">Systems that work without owner</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Growing Market Share</p>
                        <p className="text-sm text-muted-foreground">Increasing revenue and client base</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-600">Risk Factors</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Owner Dependency</p>
                        <p className="text-sm text-muted-foreground">Business can't operate without owner</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Client Concentration</p>
                        <p className="text-sm text-muted-foreground">Over 20% revenue from single client</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Declining Industry</p>
                        <p className="text-sm text-muted-foreground">Market shrinking or being disrupted</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <InternalLinks 
            title="Service Business Valuation Resources"
            links={internalLinks}
          />

          {/* Call to Action */}
          <Card className="border-2 border-primary bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
            <CardContent className="pt-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Value Your Service Business?</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get a professional valuation estimate using the same SDE methodology and industry multiples covered in this guide. Our tool provides instant results with detailed calculations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Free Estimate</h3>
                  <p className="text-sm text-muted-foreground">No registration required</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">10 Minutes</h3>
                  <p className="text-sm text-muted-foreground">Quick and easy process</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Professional Results</h3>
                  <p className="text-sm text-muted-foreground">Industry-standard methodology</p>
                </div>
              </div>
              
              <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg px-8 py-4">
                <Link href="/">
                  <Calculator className="w-5 h-5 mr-2" />
                  Start Your Free Business Valuation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                Join 15,000+ business owners who've valued their service businesses with ValuationGenie
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}