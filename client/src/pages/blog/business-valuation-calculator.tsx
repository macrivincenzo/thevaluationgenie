import React, { useState } from "react";
import { Calculator, TrendingUp, FileText, CheckCircle, ArrowRight, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogSEO, InternalLinks, FAQSchema } from "@/components/seo/BlogSEO";

export default function BusinessValuationCalculator() {
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [ownerSalary, setOwnerSalary] = useState("");
  const [industry, setIndustry] = useState("");
  const [result, setResult] = useState<{sde: number, lowValue: number, highValue: number, midValue: number} | null>(null);

  // SEO Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Business Valuation Calculator",
    "description": "Free online business valuation calculator using SDE methodology. Get instant estimates with professional upgrade options.",
    "url": "https://thevaluationgenie.com/blog/business-valuation-calculator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free business valuation calculator"
    },
    "provider": {
      "@type": "Organization",
      "name": "ValuationGenie",
      "url": "https://thevaluationgenie.com"
    }
  };

  const industryMultipliers: Record<string, {low: number, high: number}> = {
    "consulting": { low: 0.5, high: 2.5 },
    "marketing": { low: 0.8, high: 2.8 },
    "it-services": { low: 1.0, high: 3.2 },
    "accounting": { low: 0.6, high: 2.2 },
    "legal": { low: 0.4, high: 1.8 },
    "healthcare": { low: 1.2, high: 3.5 },
    "ecommerce": { low: 1.5, high: 4.2 },
    "saas": { low: 2.0, high: 6.0 },
    "restaurant": { low: 1.5, high: 3.0 },
    "retail": { low: 0.8, high: 2.5 }
  };

  const calculateValuation = () => {
    const annualRevenue = parseFloat(revenue) || 0;
    const annualExpenses = parseFloat(expenses) || 0;
    const ownerComp = parseFloat(ownerSalary) || 0;
    
    if (!industry || !annualRevenue) return;
    
    const sde = (annualRevenue - annualExpenses) + ownerComp;
    const multiplier = industryMultipliers[industry];
    
    const lowValue = sde * multiplier.low;
    const highValue = sde * multiplier.high;
    const midValue = (lowValue + highValue) / 2;
    
    setResult({ sde, lowValue, highValue, midValue });
  };

  // SEO data
  const seoData = {
    title: "Business Valuation Calculator - Free SDE Calculator Tool 2025 | ValuationGenie",
    description: "Free business valuation calculator using SDE method. Get instant estimates for businesses worth $100K-$5M. Upgrade to professional $39 reports with detailed analysis.",
    keywords: "business valuation calculator, free business valuation, SDE calculator, seller discretionary earnings, business value calculator, small business valuation tool",
    url: "https://thevaluationgenie.com/blog/business-valuation-calculator"
  };

  const internalLinks = [
    { href: "/blog/sde-business-valuation-guide", text: "Complete SDE Valuation Guide", category: "Understanding Business Valuation" },
    { href: "/blog/sde-vs-ebitda-guide", text: "SDE vs EBITDA Comparison", category: "Understanding Business Valuation" },
    { href: "/blog/business-valuation-vs-market-appraisal", text: "Valuation vs Market Appraisal", category: "Understanding Business Valuation" },
    { href: "/blog/business-broker-vs-diy-valuation", text: "Business Broker vs DIY ($127K savings)", category: "Cost Comparisons" },
    { href: "/blog/business-appraisal-cost-guide", text: "Professional Appraisal Costs ($25K vs $39)", category: "Cost Comparisons" },
    { href: "/blog/business-valuation-mistakes", text: "Avoid Costly Valuation Mistakes", category: "Cost Comparisons" }
  ];

  const faqData = [
    {
      question: "How accurate is the free business valuation calculator?",
      answer: "Our calculator provides a solid baseline estimate using industry-standard SDE methodology. However, it uses generalized multipliers and doesn't account for specific business factors that can significantly impact value. For buying, selling, or financing decisions, we recommend a professional report."
    },
    {
      question: "What's the difference between SDE and EBITDA?",
      answer: "SDE (Seller's Discretionary Earnings) includes owner compensation and benefits, making it ideal for small to medium businesses with active owners. EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is typically used for larger companies with professional management teams."
    },
    {
      question: "How often should I value my business?",
      answer: "We recommend annual valuations for strategic planning and more frequent assessments when considering major decisions like sales, investments, or significant operational changes."
    },
    {
      question: "Can I use this valuation for tax purposes?",
      answer: "While our reports provide comprehensive analysis, formal tax purposes may require certified appraisals from licensed professionals. Consult with your tax advisor for specific requirements."
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
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* SEO Optimized Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Business Valuation Calculator: Free Tool + Professional Reports (2025)
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get an instant estimate of your business value with our free SDE-based calculator, then upgrade to a comprehensive professional report for just $39.
          </p>
        </div>

        {/* Free Calculator Section */}
        <Card className="mb-12 border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Calculator className="w-6 h-6 mr-2 text-blue-600" />
              Free Business Valuation Calculator
            </CardTitle>
            <p className="text-slate-600">Enter your basic financial information to get an instant valuation estimate using the Seller's Discretionary Earnings (SDE) method.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="revenue">Annual Revenue ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  placeholder="500000"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="expenses">Annual Expenses ($)</Label>
                <Input
                  id="expenses"
                  type="number"
                  placeholder="350000"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="owner-salary">Owner Salary/Benefits ($)</Label>
                <Input
                  id="owner-salary"
                  type="number"
                  placeholder="80000"
                  value={ownerSalary}
                  onChange={(e) => setOwnerSalary(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="industry">Industry Type</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulting">Consulting Services</SelectItem>
                    <SelectItem value="marketing">Marketing Agency</SelectItem>
                    <SelectItem value="it-services">IT Services</SelectItem>
                    <SelectItem value="accounting">Accounting Services</SelectItem>
                    <SelectItem value="legal">Legal Services</SelectItem>
                    <SelectItem value="healthcare">Healthcare Services</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="saas">SaaS/Software</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={calculateValuation}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!revenue || !industry}
            >
              Calculate Business Value
            </Button>

            {result && (
              <div className="mt-6 p-6 bg-white rounded-lg border">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Your Business Valuation Estimate
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-4 bg-slate-50 rounded">
                    <p className="text-sm text-slate-600">Low Estimate</p>
                    <p className="text-2xl font-bold text-slate-900">${result.lowValue.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded border-2 border-blue-200">
                    <p className="text-sm text-blue-600">Mid-Point Value</p>
                    <p className="text-2xl font-bold text-blue-900">${result.midValue.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded">
                    <p className="text-sm text-slate-600">High Estimate</p>
                    <p className="text-2xl font-bold text-slate-900">${result.highValue.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  <strong>SDE (Seller's Discretionary Earnings):</strong> ${result.sde.toLocaleString()}
                </p>
                
                {/* Upgrade CTA */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-lg mb-2">Want a Professional Valuation Report?</h4>
                  <p className="text-slate-600 mb-4">This free calculator provides a basic estimate. Get a comprehensive 3+ page professional report with detailed analysis, risk assessment, and market comparisons for just $39.</p>
                  <Button 
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => {
                      try { sessionStorage.clear(); } catch (e) {}
                      window.location.assign('/');
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Get Professional Report - $39
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Article Content */}
        <div className="prose prose-slate max-w-none">
          <h2>How Does Our Business Valuation Calculator Work?</h2>
          <p>Our free business valuation calculator uses the <strong>Seller's Discretionary Earnings (SDE) method</strong>, the gold standard for valuing small to medium-sized businesses. This approach is preferred by business brokers, buyers, and financial professionals worldwide because it provides the most accurate picture of a business's true earning potential.</p>

          <h3>Understanding SDE (Seller's Discretionary Earnings)</h3>
          <p>SDE represents the total financial benefit a single owner-operator receives from the business. It includes:</p>
          <ul>
            <li><strong>Net Income:</strong> The business's profit after expenses</li>
            <li><strong>Owner's Salary:</strong> What the owner pays themselves</li>
            <li><strong>Owner Benefits:</strong> Health insurance, vehicle expenses, etc.</li>
            <li><strong>Non-Business Expenses:</strong> Personal expenses run through the business</li>
            <li><strong>One-Time Expenses:</strong> Non-recurring costs</li>
          </ul>

          <h3>Industry-Specific Multipliers Explained</h3>
          <p>Different industries command different valuation multiples based on factors like:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service-Based Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>Consulting:</strong> 0.5x - 2.5x SDE</li>
                  <li><strong>Marketing Agency:</strong> 0.8x - 2.8x SDE</li>
                  <li><strong>IT Services:</strong> 1.0x - 3.2x SDE</li>
                  <li><strong>Legal Services:</strong> 0.4x - 1.8x SDE</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product-Based Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>E-commerce:</strong> 1.5x - 4.2x SDE</li>
                  <li><strong>SaaS/Software:</strong> 2.0x - 6.0x SDE</li>
                  <li><strong>Restaurant:</strong> 1.5x - 3.0x SDE</li>
                  <li><strong>Retail:</strong> 0.8x - 2.5x SDE</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2>Free Calculator vs Professional Report: What's the Difference?</h2>
          
          <div className="comparison-table my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-gray-200">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Free Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Basic SDE calculation</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Industry multiplier range</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Instant results</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />General valuation estimate</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-indigo-200 bg-indigo-50">
                <CardHeader className="bg-indigo-100">
                  <CardTitle className="flex items-center text-indigo-900">
                    <FileText className="w-5 h-5 mr-2" />
                    Professional Report ($39)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />Comprehensive 3+ page analysis</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />Detailed SDE adjustments</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />Risk factor assessment</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />Market comparisons</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />Value enhancement recommendations</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-indigo-600 mr-2" />Professional formatting for lenders/investors</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <h2>When Do You Need a Professional Business Valuation?</h2>
          <p>While our free calculator provides a solid estimate, certain situations require the authority and detail of a professional report:</p>
          
          <h3>1. Selling Your Business</h3>
          <p>Serious buyers expect comprehensive documentation. A professional valuation report demonstrates you've done your homework and helps justify your asking price during negotiations.</p>
          
          <h3>2. Seeking Investment or Loans</h3>
          <p>Banks and investors require detailed financial analysis. Our professional reports include all the documentation needed for funding applications.</p>
          
          <h3>3. Partnership Discussions</h3>
          <p>Whether bringing in new partners or buying out existing ones, accurate valuation prevents disputes and ensures fair transactions.</p>
          
          <h3>4. Strategic Planning</h3>
          <p>Understanding your business value helps with long-term planning, including succession planning and growth strategy decisions.</p>

          <h2>2025 Business Valuation Trends</h2>
          <p>The business valuation landscape continues evolving in 2025:</p>
          
          <h3>Digital Transformation Impact</h3>
          <p>Businesses with strong digital presence and recurring revenue models command higher multiples. E-commerce and SaaS businesses particularly benefit from premium valuations.</p>
          
          <h3>Post-Pandemic Adjustments</h3>
          <p>Valuators now consider business resilience and adaptability as key factors. Companies that demonstrated stability during economic uncertainty receive valuation premiums.</p>
          
          <h3>ESG Considerations</h3>
          <p>Environmental, social, and governance factors increasingly impact valuations, especially for businesses targeting institutional buyers.</p>

          <h2>Common Business Valuation Mistakes to Avoid</h2>
          
          <h3>1. Ignoring SDE Adjustments</h3>
          <p>Many owners forget to add back personal expenses, one-time costs, and below-market owner compensation. These adjustments can significantly increase your business value.</p>
          
          <h3>2. Using Wrong Industry Multiples</h3>
          <p>Each industry has different risk profiles and growth expectations. Using generic multiples can drastically undervalue or overvalue your business.</p>
          
          <h3>3. Focusing Only on Financial Metrics</h3>
          <p>Qualitative factors like customer concentration, competitive position, and management depth significantly impact value but are often overlooked in DIY valuations.</p>

          <h2>How to Increase Your Business Value</h2>
          <p>Understanding your current value is just the first step. Here's how to enhance it:</p>
          
          <h3>Diversify Revenue Streams</h3>
          <p>Reduce customer concentration risk by expanding your client base. Businesses with no single customer representing more than 10% of revenue command premium multiples.</p>
          
          <h3>Document Systems and Processes</h3>
          <p>Buyers pay more for businesses that can operate without the owner's daily involvement. Create operations manuals and standard procedures.</p>
          
          <h3>Build Recurring Revenue</h3>
          <p>Subscription models, service contracts, and recurring billing increase predictability and valuation multiples significantly.</p>

          <h2>Ready for Your Professional Valuation Report?</h2>
          <p>Our free calculator gives you a starting point, but a professional valuation report provides the comprehensive analysis needed for important business decisions. For just $39, you'll receive:</p>
          
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-xl border my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />Executive summary with key findings</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />Detailed SDE calculation and adjustments</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />Industry-specific analysis and comparisons</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />Risk factor assessment</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />Value enhancement recommendations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Perfect For:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />Business sale preparation</li>
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />Bank loan applications</li>
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />Investor presentations</li>
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />Partnership negotiations</li>
                  <li className="flex items-center"><ArrowRight className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />Strategic planning</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <a href="https://thevaluationgenie.com/" className="inline-flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Get Your Professional Report - $39
                </a>
              </Button>
              <p className="text-sm text-slate-600 mt-2">✨ 7-day money-back guarantee</p>
            </div>
          </div>

          <h2>Frequently Asked Questions</h2>
          
          {faqData.map((faq, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">💡 Pro Tip</h3>
            <p className="text-yellow-700">Use our free calculator to get a baseline, then order a professional report when you need detailed analysis for important decisions. The $39 investment pays for itself by helping you avoid costly valuation mistakes.</p>
          </div>

          <h2>Start Your Business Valuation Journey Today</h2>
          <p>Whether you're curious about your business's worth or preparing for a major transaction, understanding your value is crucial. Our free calculator provides immediate insights, while our professional reports deliver the comprehensive analysis you need for confident decision-making.</p>
          
          <InternalLinks 
            title="Related Resources"
            links={internalLinks}
          />
          
          <p><strong>Ready to discover what your business is truly worth?</strong> Use our free calculator above to get started, then upgrade to a professional report for complete peace of mind.</p>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl text-white">
          <h3 className="text-2xl font-bold mb-4">Get Your Professional Business Valuation Report</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of business owners who've trusted ValuationGenie for accurate, professional business valuations. Get your comprehensive report in minutes, not weeks.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <a href="https://thevaluationgenie.com/" className="inline-flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Start Your Professional Report - $39
            </a>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}