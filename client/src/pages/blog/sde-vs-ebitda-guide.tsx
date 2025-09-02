import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, TrendingUp, FileText, CheckCircle, XCircle, Users, Building } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogSEO, InternalLinks, FAQSchema } from "@/components/seo/BlogSEO";

export default function SdeVsEbitdaGuide() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "SDE vs EBITDA: Complete Business Valuation Comparison Guide",
    "description": "Understand when to use SDE vs EBITDA for business valuation. Complete comparison with examples, calculations, and industry standards for small vs large businesses.",
    "author": { "@type": "Organization", "name": "ValuationGenie" },
    "publisher": { "@type": "Organization", "name": "ValuationGenie", "url": "https://thevaluationgenie.com" },
    "datePublished": "2025-01-17",
    "dateModified": "2025-01-22",
    "url": "https://thevaluationgenie.com/blog/sde-vs-ebitda-guide"
  };

  const seoData = {
    title: "SDE vs EBITDA: Complete Business Valuation Comparison Guide 2025",
    description: "Understand when to use SDE vs EBITDA for business valuation. Complete comparison with examples, calculations, and industry standards for small vs large businesses.",
    keywords: "SDE vs EBITDA, seller discretionary earnings vs EBITDA, business valuation methods, SDE EBITDA comparison, small business valuation",
    url: "https://thevaluationgenie.com/blog/sde-vs-ebitda-guide"
  };

  const internalLinks = [
    { href: "/blog/business-valuation-calculator", text: "Free Business Valuation Calculator", category: "Valuation Tools" },
    { href: "/blog/sde-business-valuation-guide", text: "Complete SDE Valuation Guide", category: "Valuation Tools" },
    { href: "/blog/business-valuation-mistakes", text: "Avoid Valuation Mistakes", category: "Valuation Tools" },
    { href: "/blog/how-to-value-service-business", text: "Service Business Valuation", category: "Industry Guides" },
    { href: "/blog/industry-valuation-multiples-2025", text: "2025 Industry Multiples", category: "Industry Guides" },
    { href: "/blog/business-broker-vs-diy-valuation", text: "Professional vs DIY Valuation", category: "Industry Guides" }
  ];

  const faqData = [
    {
      question: "What's the main difference between SDE and EBITDA?",
      answer: "SDE includes owner compensation and benefits, making it ideal for owner-operated businesses. EBITDA excludes owner compensation and is used for businesses with professional management teams."
    },
    {
      question: "When should I use SDE vs EBITDA for my business valuation?",
      answer: "Use SDE for businesses under $5M with active owner involvement. Use EBITDA for businesses over $5M with professional management and minimal owner dependence."
    },
    {
      question: "Which gives a higher business valuation: SDE or EBITDA?",
      answer: "Neither is inherently higher - they're different metrics for different business types. SDE includes owner benefits, while EBITDA uses different multiples. The choice depends on your business characteristics."
    },
    {
      question: "Can I use both SDE and EBITDA for my business?",
      answer: "You can calculate both, but use the method that best fits your business size and structure. Most buyers and brokers will expect the industry-standard method for your business type."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <BlogSEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
        schemaMarkup={schemaMarkup}
      />
      <FAQSchema faqs={faqData} />
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-700">Expert Comparison</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            SDE vs EBITDA: Complete Business Valuation Comparison Guide
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Understand when to use SDE vs EBITDA for business valuation. Complete comparison with examples, calculations, and industry standards for small vs large businesses.
          </p>
          
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Choose the Right Valuation Method</h3>
              <p className="text-slate-600 mb-4">
                Get professional business valuation using the correct method for your business size and structure.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <a href="https://thevaluationgenie.com/" className="inline-flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Professional Valuation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Decision Tool */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-900">
              Quick Decision: SDE or EBITDA?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Use SDE If Your Business:</h3>
                  <ul className="text-left space-y-2 text-slate-700">
                    <li>✓ Revenue under $5 million</li>
                    <li>✓ Owner actively works in business</li>
                    <li>✓ Significant owner benefits/perks</li>
                    <li>✓ Family-owned or sole proprietorship</li>
                    <li>✓ Service-based business model</li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200">
                  <Building className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Use EBITDA If Your Business:</h3>
                  <ul className="text-left space-y-2 text-slate-700">
                    <li>✓ Revenue over $5 million</li>
                    <li>✓ Professional management team</li>
                    <li>✓ Minimal owner involvement</li>
                    <li>✓ Corporate structure</li>
                    <li>✓ Manufacturing or tech business</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          <h2>Understanding SDE vs EBITDA: The Fundamental Difference</h2>
          
          <p>The choice between SDE (Seller's Discretionary Earnings) and EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) isn't just about preference—it's about matching the right valuation method to your business characteristics.</p>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">SDE (Seller's Discretionary Earnings)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 mb-4">Represents total financial benefit available to business owner</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Best for:</strong> Owner-operated businesses under $5M</p>
                  <p><strong>Includes:</strong> Owner salary, benefits, personal expenses</p>
                  <p><strong>Typical multiples:</strong> 0.5x - 6.0x</p>
                  <p><strong>Industry standard:</strong> Small business sales</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg text-purple-800">EBITDA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-700 mb-4">Measures company's operational profitability</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Best for:</strong> Larger businesses with professional management</p>
                  <p><strong>Excludes:</strong> Owner compensation (management hired separately)</p>
                  <p><strong>Typical multiples:</strong> 3x - 15x+</p>
                  <p><strong>Industry standard:</strong> Corporate acquisitions, PE deals</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2>SDE vs EBITDA Calculation Comparison</h2>
          
          <p>Let's see how the same business looks using both methods:</p>
          
          <h3>Example: $2M Revenue Consulting Business</h3>
          
          <div className="overflow-x-auto my-8">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Metric</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-blue-600">SDE Calculation</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-purple-600">EBITDA Calculation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Revenue</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$2,000,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$2,000,000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Operating Expenses</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">($1,400,000)</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">($1,400,000)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Owner Salary</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">($150,000)</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">($150,000)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Interest</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">($15,000)</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">($15,000)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Taxes</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">($45,000)</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">($45,000)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Depreciation</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">($25,000)</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">($25,000)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Net Income</td>
                  <td className="border border-gray-300 px-4 py-3 text-center font-semibold">$365,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-center font-semibold">$365,000</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Add Back Owner Salary</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-blue-600">+$150,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-purple-600">$0</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Add Back Interest</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-blue-600">+$15,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-purple-600">+$15,000</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Add Back Taxes</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-blue-600">+$45,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-purple-600">+$45,000</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Add Back Depreciation</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-blue-600">+$25,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-purple-600">+$25,000</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold">Final Metric</td>
                  <td className="border border-gray-300 px-4 py-3 text-center font-bold text-blue-900">SDE: $600,000</td>
                  <td className="border border-gray-300 px-4 py-3 text-center font-bold text-purple-900">EBITDA: $450,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Valuation Comparison</h3>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">SDE Valuation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p><strong>SDE:</strong> $600,000</p>
                  <p><strong>Industry Multiple:</strong> 1.5x - 2.5x (consulting)</p>
                  <div className="border-t pt-3">
                    <p><strong>Business Value Range:</strong></p>
                    <p className="text-blue-800 font-semibold">$900,000 - $1,500,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-lg text-purple-800">EBITDA Valuation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p><strong>EBITDA:</strong> $450,000</p>
                  <p><strong>Industry Multiple:</strong> 3x - 5x (professional services)</p>
                  <div className="border-t pt-3">
                    <p><strong>Business Value Range:</strong></p>
                    <p className="text-purple-800 font-semibold">$1,350,000 - $2,250,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Important Note</h3>
            <p className="text-yellow-700">The different valuation ranges don't mean EBITDA is "better." SDE multiples are based on owner-operator businesses, while EBITDA multiples assume professional management. For a $2M consulting business with active owner involvement, SDE is the appropriate method.</p>
          </div>

          <h2>When to Use SDE vs EBITDA: Detailed Guidelines</h2>
          
          <h3>Choose SDE When:</h3>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div>
              <h4 className="font-semibold text-blue-600 mb-3">Business Characteristics:</h4>
              <ul className="space-y-2 text-slate-700">
                <li>• Annual revenue under $5 million</li>
                <li>• Owner works 20+ hours per week in business</li>
                <li>• Significant owner perks (auto, health insurance, etc.)</li>
                <li>• Personal expenses run through business</li>
                <li>• Family-owned or sole proprietorship</li>
                <li>• Limited management infrastructure</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-3">Industry Examples:</h4>
              <ul className="space-y-2 text-slate-700">
                <li>• Professional services (law, accounting, consulting)</li>
                <li>• Small retail operations</li>
                <li>• Restaurants and food service</li>
                <li>• Service-based businesses</li>
                <li>• Small manufacturing</li>
                <li>• Local franchises</li>
              </ul>
            </div>
          </div>

          <h3>Choose EBITDA When:</h3>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div>
              <h4 className="font-semibold text-purple-600 mb-3">Business Characteristics:</h4>
              <ul className="space-y-2 text-slate-700">
                <li>• Annual revenue over $5 million</li>
                <li>• Professional management team in place</li>
                <li>• Owner works minimal hours in operations</li>
                <li>• Clear separation of owner and business finances</li>
                <li>• Corporate structure (C-Corp, larger LLCs)</li>
                <li>• Multiple locations or complex operations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600 mb-3">Transaction Types:</h4>
              <ul className="space-y-2 text-slate-700">
                <li>• Strategic acquisitions</li>
                <li>• Private equity transactions</li>
                <li>• Public company acquisitions</li>
                <li>• Management buyouts</li>
                <li>• Institutional investor sales</li>
                <li>• Investment banking deals</li>
              </ul>
            </div>
          </div>

          <h2>Industry Standards: SDE vs EBITDA Usage</h2>
          
          <div className="overflow-x-auto my-8">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Business Type</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Revenue Range</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Preferred Method</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Typical Multiple</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Small Service Business</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$500K - $2M</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-blue-600">SDE</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">0.5x - 2.5x</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">E-commerce Store</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$1M - $5M</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-blue-600">SDE</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">1.5x - 4.2x</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">SaaS Company</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$2M - $10M</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-purple-600">EBITDA</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">5x - 15x</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Manufacturing</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$5M+</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-purple-600">EBITDA</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">4x - 8x</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Tech/Software</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$10M+</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-purple-600">EBITDA</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">8x - 25x</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Buyer Preferences: What Different Buyers Expect</h2>
          
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Individual Buyers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">Buying to own and operate</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Prefers:</strong> SDE</p>
                  <p><strong>Reasoning:</strong> Wants to see total benefit package</p>
                  <p><strong>Focus:</strong> Lifestyle and income replacement</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Strategic Buyers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">Acquiring for synergies</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Prefers:</strong> EBITDA (usually)</p>
                  <p><strong>Reasoning:</strong> Has existing management</p>
                  <p><strong>Focus:</strong> Operational integration</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Private Equity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">Financial investment focus</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Prefers:</strong> EBITDA</p>
                  <p><strong>Reasoning:</strong> Standardized across portfolio</p>
                  <p><strong>Focus:</strong> Scalability and returns</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2>Common Mistakes When Choosing SDE vs EBITDA</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-red-800 mb-4">Avoid These Errors</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-red-700">1. Using EBITDA for Small, Owner-Operated Businesses</h4>
                <p className="text-red-600">A $1M consulting business with active owner involvement should use SDE, not EBITDA. EBITDA multiples assume professional management.</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700">2. Using SDE for Large, Professionally Managed Businesses</h4>
                <p className="text-red-600">A $10M manufacturing company with a full management team should use EBITDA. SDE doesn't reflect the true operational earnings.</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700">3. Mixing Methodologies</h4>
                <p className="text-red-600">Don't calculate SDE but use EBITDA multiples, or vice versa. Each metric has corresponding industry multiples.</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700">4. Ignoring Buyer Expectations</h4>
                <p className="text-red-600">Know your likely buyer type. Individual buyers expect SDE analysis, while strategic buyers typically want EBITDA.</p>
              </div>
            </div>
          </div>

          <h2>Converting Between SDE and EBITDA</h2>
          
          <p>Sometimes you may need to show both metrics. Here's how they relate:</p>
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">Conversion Formulas</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-700">SDE to EBITDA:</h4>
                <p className="text-slate-600">EBITDA = SDE - Owner Compensation - Owner Benefits - Personal Expenses + Market-Rate Management Cost</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700">EBITDA to SDE:</h4>
                <p className="text-slate-600">SDE = EBITDA + Owner Compensation + Owner Benefits + Personal Expenses - Market-Rate Management Cost</p>
              </div>
            </div>
          </div>

          <InternalLinks 
            title="Related Valuation Resources"
            links={internalLinks}
          />

          <h2>Frequently Asked Questions</h2>
          
          {faqData.map((faq, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-green-800 mb-2">💡 Professional Tip</h3>
            <p className="text-green-700">When in doubt, use SDE for businesses under $5M with active owners, and EBITDA for larger businesses with professional management. Our professional reports automatically use the correct methodology based on your business characteristics.</p>
          </div>

          <h2>Get Professional Valuation Using the Right Method</h2>
          <p>Choosing the wrong valuation method can significantly impact your business's perceived value. Our professional valuation platform automatically selects the appropriate methodology based on your business size, structure, and industry.</p>
          
          <p><strong>Ready to get your business valued using the correct method?</strong> Our experts ensure you use SDE or EBITDA appropriately for accurate, market-standard valuations.</p>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl text-white">
          <h3 className="text-2xl font-bold mb-4">Get Professional Valuation with Correct Methodology</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            We automatically use SDE or EBITDA based on your business characteristics, ensuring accurate, industry-standard valuations every time.
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <a href="https://thevaluationgenie.com/" className="inline-flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Get Professional Report - $39
            </a>
          </Button>
          <p className="text-purple-100 text-sm mt-4">✨ 7-day money-back guarantee • Correct methodology guaranteed • Professional quality</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}