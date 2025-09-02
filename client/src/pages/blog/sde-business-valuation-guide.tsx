import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, TrendingUp, FileText, CheckCircle, DollarSign, Users, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogSEO, InternalLinks, FAQSchema } from "@/components/seo/BlogSEO";
import RelatedArticles from "@/components/seo/RelatedArticles";

export default function SdeBusinessValuationGuide() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "SDE Business Valuation: Complete Guide for Small Business Owners",
    "description": "Master Seller's Discretionary Earnings (SDE) valuation method with industry multiples, calculation examples, and when to use SDE vs EBITDA for businesses under $5M.",
    "author": { "@type": "Organization", "name": "ValuationGenie" },
    "publisher": { "@type": "Organization", "name": "ValuationGenie", "url": "https://thevaluationgenie.com" },
    "datePublished": "2025-01-17",
    "dateModified": "2025-01-22",
    "url": "https://thevaluationgenie.com/blog/sde-business-valuation-guide"
  };

  const seoData = {
    title: "SDE Business Valuation: Complete Guide for Small Business Owners 2025",
    description: "Master Seller's Discretionary Earnings (SDE) valuation method with industry multiples, calculation examples, and when to use SDE vs EBITDA for businesses under $5M.",
    keywords: "SDE business valuation, seller discretionary earnings, small business valuation method, SDE calculation, business valuation multiples",
    url: "https://thevaluationgenie.com/blog/sde-business-valuation-guide"
  };

  const internalLinks = [
    { href: "/blog/business-valuation-calculator", text: "Free SDE Calculator Tool", category: "Free Tools" },
    { href: "/blog/sde-vs-ebitda-guide", text: "SDE vs EBITDA Complete Comparison", category: "Free Tools" },
    { href: "/blog/business-valuation-mistakes", text: "Avoid Costly SDE Mistakes", category: "Free Tools" },
    { href: "/blog/industry-valuation-multiples-2025", text: "2025 SDE Industry Multiples", category: "Professional Resources" },
    { href: "/blog/how-to-value-service-business", text: "Service Business SDE Valuation", category: "Professional Resources" },
    { href: "/blog/restaurant-valuation-guide", text: "Restaurant SDE Valuation", category: "Professional Resources" }
  ];

  const faqData = [
    {
      question: "What is SDE in business valuation?",
      answer: "SDE (Seller's Discretionary Earnings) represents the total financial benefit available to a business owner, including net income, owner salary, benefits, personal expenses, and non-essential costs. It's the gold standard for valuing small businesses."
    },
    {
      question: "How do you calculate SDE for business valuation?",
      answer: "SDE = Net Income + Owner Salary + Benefits + Personal Expenses + One-time Costs + Interest + Taxes + Depreciation + Amortization. This shows the true earning power available to a new owner."
    },
    {
      question: "What is a good SDE multiple for small businesses?",
      answer: "SDE multiples typically range from 0.5x-6.0x depending on industry, size, and business quality. Service businesses average 0.5x-2.8x, while tech businesses can reach 2.0x-6.0x."
    },
    {
      question: "When should I use SDE vs EBITDA for valuation?",
      answer: "Use SDE for businesses under $5M with active owner involvement. Use EBITDA for larger businesses ($5M+) with professional management teams and minimal owner dependence."
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
          <Badge className="mb-4 bg-blue-100 text-blue-700">Expert Guide</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            SDE Business Valuation: Complete Guide for Small Business Owners
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Master Seller's Discretionary Earnings (SDE) valuation method with industry multiples, calculation examples, and when to use SDE vs EBITDA for businesses under $5M.
          </p>
          
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Get Your Free SDE Business Valuation</h3>
              <p className="text-slate-600 mb-4">
                Professional SDE-based business valuation in under 10 minutes. See your true market value now.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <a href="https://thevaluationgenie.com/" className="inline-flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate My SDE Valuation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </Card>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          <h2>What is SDE (Seller's Discretionary Earnings)?</h2>
          
          <p>Seller's Discretionary Earnings (SDE) represents the total financial benefit available to a business owner. Unlike net income, which only shows bottom-line profit, SDE includes all the perks, benefits, and discretionary expenses that an owner-operator enjoys.</p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Why SDE is the Gold Standard for Small Business Valuation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">SDE Includes:</h4>
                <ul className="space-y-2 text-blue-700">
                  <li>✓ Net income (profit after all expenses)</li>
                  <li>✓ Owner salary and benefits</li>
                  <li>✓ Personal expenses run through business</li>
                  <li>✓ One-time or extraordinary expenses</li>
                  <li>✓ Interest, taxes, depreciation, amortization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Why This Matters:</h4>
                <ul className="space-y-2 text-blue-700">
                  <li>• Shows true earning power to new owner</li>
                  <li>• Accounts for owner-operator benefits</li>
                  <li>• Provides realistic valuation basis</li>
                  <li>• Industry standard for businesses under $5M</li>
                  <li>• Preferred by business brokers and buyers</li>
                </ul>
              </div>
            </div>
          </div>

          <h2>How to Calculate SDE: Step-by-Step Formula</h2>
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-semibold mb-4 text-slate-800">SDE Calculation Formula</h3>
            <div className="space-y-3 text-slate-700">
              <p><strong>Net Income</strong> (from tax returns or financial statements)</p>
              <p>+ Owner Salary and Wages</p>
              <p>+ Owner Benefits (health insurance, retirement, etc.)</p>
              <p>+ Personal Expenses (auto, meals, travel, etc.)</p>
              <p>+ One-time/Extraordinary Expenses</p>
              <p>+ Interest Expense</p>
              <p>+ Tax Expense</p>
              <p>+ Depreciation</p>
              <p>+ Amortization</p>
              <p className="border-t pt-2 font-bold text-lg">= Seller's Discretionary Earnings (SDE)</p>
            </div>
          </div>

          <h3>SDE Calculation Example: Marketing Agency</h3>
          
          <div className="overflow-x-auto my-8">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Line Item</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Amount</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Net Income</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$75,000</td>
                  <td className="border border-gray-300 px-4 py-3">From tax returns</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Owner Salary</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$65,000</td>
                  <td className="border border-gray-300 px-4 py-3">W-2 wages to owner</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Health Insurance</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$8,400</td>
                  <td className="border border-gray-300 px-4 py-3">Owner family coverage</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Auto Expenses</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$12,000</td>
                  <td className="border border-gray-300 px-4 py-3">Personal vehicle use</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Meals & Entertainment</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$6,000</td>
                  <td className="border border-gray-300 px-4 py-3">Personal dining expenses</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Office Remodel</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$15,000</td>
                  <td className="border border-gray-300 px-4 py-3">One-time expense</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Interest Expense</td>
                  <td className="border border-gray-300 px-4 py-3 text-center">$3,600</td>
                  <td className="border border-gray-300 px-4 py-3">Business loan interest</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-4 py-3 font-bold">Total SDE</td>
                  <td className="border border-gray-300 px-4 py-3 text-center font-bold text-blue-600">$185,000</td>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Available to new owner</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>SDE Multiples by Industry (2025)</h2>
          
          <p>Once you calculate SDE, multiply it by your industry's typical multiple to estimate business value. Here are current market ranges:</p>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Professional Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Consulting</span>
                    <span className="font-semibold">0.5x - 2.5x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marketing Agency</span>
                    <span className="font-semibold">0.8x - 2.8x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>IT Services</span>
                    <span className="font-semibold">1.0x - 3.2x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accounting</span>
                    <span className="font-semibold">0.6x - 2.2x</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Other Industries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>E-commerce</span>
                    <span className="font-semibold">1.5x - 4.2x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SaaS</span>
                    <span className="font-semibold">2.0x - 6.0x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Restaurant</span>
                    <span className="font-semibold">1.5x - 3.0x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retail</span>
                    <span className="font-semibold">0.8x - 2.5x</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <h3>Valuation Example: Marketing Agency</h3>
          <p>Using our marketing agency with $185,000 SDE and industry multiple of 0.8x - 2.8x:</p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Conservative Value</h4>
                <p className="text-2xl font-bold text-green-900">$148,000</p>
                <p className="text-sm text-green-700">$185,000 × 0.8x</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Mid-Range Value</h4>
                <p className="text-2xl font-bold text-green-900">$333,000</p>
                <p className="text-sm text-green-700">$185,000 × 1.8x</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Premium Value</h4>
                <p className="text-2xl font-bold text-green-900">$518,000</p>
                <p className="text-sm text-green-700">$185,000 × 2.8x</p>
              </div>
            </div>
          </div>

          <h2>SDE vs EBITDA: When to Use Each Method</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">Use SDE When:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-700">
                  <li>✓ Business revenue under $5 million</li>
                  <li>✓ Owner actively works in business</li>
                  <li>✓ Significant owner perks/benefits</li>
                  <li>✓ Selling to individual buyer</li>
                  <li>✓ Service-based business model</li>
                  <li>✓ Family-owned business</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-800">Use EBITDA When:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-orange-700">
                  <li>✓ Business revenue over $5 million</li>
                  <li>✓ Professional management team</li>
                  <li>✓ Minimal owner involvement</li>
                  <li>✓ Selling to strategic buyer/PE</li>
                  <li>✓ Manufacturing or tech business</li>
                  <li>✓ Multiple locations/complex structure</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2>Factors That Affect SDE Multiples</h2>
          
          <h3>Business Quality Factors</h3>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div>
              <h4 className="font-semibold text-green-600 mb-3">Increase Multiples:</h4>
              <ul className="space-y-2 text-slate-700">
                <li>• Diverse customer base (no customer &gt;10%)</li>
                <li>• Recurring revenue/contracts</li>
                <li>• Strong growth trends</li>
                <li>• Skilled management team</li>
                <li>• Documented systems/processes</li>
                <li>• Strong market position</li>
                <li>• Clean financial records</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-600 mb-3">Decrease Multiples:</h4>
              <ul className="space-y-2 text-slate-700">
                <li>• Customer concentration risk</li>
                <li>• Declining revenue trends</li>
                <li>• Heavy owner dependence</li>
                <li>• Outdated equipment/technology</li>
                <li>• Poor financial records</li>
                <li>• Competitive market pressures</li>
                <li>• Regulatory/legal issues</li>
              </ul>
            </div>
          </div>

          <h2>Common SDE Calculation Mistakes</h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-red-800 mb-4">⚠️ Avoid These Costly Errors</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-red-700">1. Forgetting Owner Benefits</h4>
                <p className="text-red-600">Many owners miss health insurance, retirement contributions, and other benefits. This can undervalue a business by $20,000-$50,000+.</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700">2. Using Wrong Tax Returns</h4>
                <p className="text-red-600">Always use the business tax return (1120S, 1065, Schedule C), not personal returns. Personal returns don't show business adjustments.</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700">3. Missing Personal Expenses</h4>
                <p className="text-red-600">Cell phone, auto expenses, meals, and travel often flow through the business. These reduce taxable income but should be added back to SDE.</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-700">4. Including Non-Recurring Income</h4>
                <p className="text-red-600">PPP loans, insurance settlements, or one-time contracts shouldn't be included in SDE. Only include sustainable, recurring earnings.</p>
              </div>
            </div>
          </div>

          <h2>Improving Your SDE and Business Value</h2>
          
          <h3>Financial Improvements</h3>
          <ul className="space-y-2 text-slate-700">
            <li>• Clean up personal expenses to show true business performance</li>
            <li>• Maintain consistent, professional bookkeeping</li>
            <li>• Document all owner benefits and add-backs</li>
            <li>• Separate business and personal expenses clearly</li>
            <li>• Prepare 3-5 years of financial statements</li>
          </ul>
          
          <h3>Operational Improvements</h3>
          <ul className="space-y-2 text-slate-700 mb-8">
            <li>• Reduce customer concentration (no customer &gt;10% of revenue)</li>
            <li>• Document systems and processes</li>
            <li>• Build management team to reduce owner dependence</li>
            <li>• Secure long-term contracts where possible</li>
            <li>• Invest in technology and efficiency improvements</li>
          </ul>

          <InternalLinks 
            title="Related SDE Valuation Resources"
            links={internalLinks}
          />

          <h2>Frequently Asked Questions</h2>
          
          {faqData.map((faq, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Professional Tip</h3>
            <p className="text-blue-700">Start with our free SDE calculator to get a baseline valuation. For important decisions like selling your business, upgrade to a professional $39 report that includes detailed SDE analysis, industry comparisons, and value enhancement recommendations.</p>
          </div>

          <h2>Get Your Professional SDE Business Valuation</h2>
          <p>Understanding your SDE is crucial for making informed business decisions. Our professional valuation reports provide comprehensive SDE analysis using the same methodology as expensive business brokers and appraisers.</p>
          
          <p><strong>Ready to discover your business's true SDE-based value?</strong> Get started with our free calculator or upgrade to a professional report for detailed analysis and documentation.</p>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white">
          <h3 className="text-2xl font-bold mb-4">Get Your Professional SDE Valuation Report</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Professional SDE analysis with industry multiples, value enhancement recommendations, and comprehensive documentation. Trusted by thousands of business owners.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => {
              // Clean navigation to prevent state accumulation
              try {
                sessionStorage.clear();
              } catch (e) {}
              window.location.assign('/');
            }}
          >
            <FileText className="w-5 h-5 mr-2" />
            Get Professional SDE Report - $39
          </Button>
          <p className="text-blue-100 text-sm mt-4">✨ 7-day money-back guarantee • Instant download • Professional quality</p>
        </div>
        
        {/* Related Articles Section */}
        <RelatedArticles 
          currentPage="/blog/sde-business-valuation-guide" 
          category="methodology" 
        />
      </div>
      
      <Footer />
    </div>
  );
}