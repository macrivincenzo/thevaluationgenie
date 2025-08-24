import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, Users, FileText, Shield, Heart, Scale, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogSEO, InternalLinks, FAQSchema } from "@/components/seo/BlogSEO";

export default function FamilyBusinessValuationEstatePlanning() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Family Business Valuation for Estate Planning: Complete 2025 Guide",
    "description": "Essential guide to valuing family businesses for estate planning, succession, and inheritance. Learn SDE methodology, tax implications, and professional valuation requirements for family-owned enterprises.",
    "author": { "@type": "Organization", "name": "ValuationGenie" },
    "publisher": { "@type": "Organization", "name": "ValuationGenie", "url": "https://thevaluationgenie.com" },
    "datePublished": "2025-01-22",
    "dateModified": "2025-01-22",
    "url": "https://thevaluationgenie.com/blog/family-business-valuation-estate-planning"
  };

  const seoData = {
    title: "Family Business Valuation for Estate Planning: Complete 2025 Guide | SDE Method & Tax Strategies",
    description: "Essential guide to valuing family businesses for estate planning, succession, and inheritance. Learn SDE methodology, tax implications, and professional valuation requirements for family-owned enterprises.",
    keywords: "family business valuation estate planning, family business succession valuation, estate planning business valuation, family-owned business valuation, business succession planning valuation",
    url: "https://thevaluationgenie.com/blog/family-business-valuation-estate-planning"
  };

  const internalLinks = [
    { href: "/blog/business-valuation-calculator", text: "Free Business Valuation Calculator", category: "Valuation Tools" },
    { href: "/blog/sde-business-valuation-guide", text: "Complete SDE Valuation Guide", category: "Valuation Tools" },
    { href: "/blog/small-business-sale-preparation", text: "Business Sale Preparation", category: "Planning Resources" },
    { href: "/blog/business-appraisal-cost-guide", text: "Professional Appraisal Costs", category: "Planning Resources" },
    { href: "/blog/industry-valuation-multiples-2025", text: "2025 Industry Multiples", category: "Planning Resources" },
    { href: "/blog/how-to-value-service-business", text: "Service Business Valuation", category: "Planning Resources" }
  ];

  const faqData = [
    {
      question: "How often should family businesses be valued for estate planning?",
      answer: "Family businesses should be professionally valued every 3-5 years for estate planning, or whenever significant changes occur (major acquisitions, ownership transfers, market shifts). Annual updates using standardized methods help track value trends."
    },
    {
      question: "What valuation method works best for family business estate planning?",
      answer: "SDE (Seller's Discretionary Earnings) method is most appropriate for family businesses under $10M. It accounts for family member salaries, personal expenses, and owner benefits that are common in family enterprises."
    },
    {
      question: "Can family members perform business valuations for estate planning?",
      answer: "While family members can use valuation tools for planning purposes, professional certified appraisals are required for tax filings, legal proceedings, and formal estate documentation. DIY valuations serve as helpful starting points."
    },
    {
      question: "How do family employment arrangements affect business valuation?",
      answer: "Above-market family member salaries must be adjusted to market rates in valuation calculations. This increases the business's SDE and overall value by removing excess compensation expenses."
    },
    {
      question: "What documentation is required for family business estate valuations?",
      answer: "Essential documents include 3-5 years of financial statements, tax returns, family employment agreements, ownership structure details, buy-sell agreements, and any succession plans or family constitutions."
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
          <Badge className="mb-4 bg-purple-100 text-purple-700">Estate Planning</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Family Business Valuation for Estate Planning: Complete 2025 Guide
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Essential guide to valuing family businesses for estate planning, succession, and inheritance. Learn SDE methodology, tax implications, and professional valuation requirements for family-owned enterprises.
          </p>
          
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Get Your Family Business Valuation</h3>
              <p className="text-slate-600 mb-4">
                Professional estate planning valuation using SDE methodology. Essential for succession planning and family wealth management.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <Link href="/" className="inline-flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Start Family Business Valuation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Estate Planning Importance */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-900">
              Why Family Business Valuation Matters for Estate Planning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
                  <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Tax Planning</h3>
                  <p className="text-slate-700 text-sm">
                    Accurate valuations enable optimal estate tax strategies, gift planning, and generation-skipping transfer arrangements for family wealth preservation.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Succession Planning</h3>
                  <p className="text-slate-700 text-sm">
                    Fair valuation ensures equitable distribution among family members, whether active in business or passive inheritors.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
                  <Scale className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Legal Protection</h3>
                  <p className="text-slate-700 text-sm">
                    Professional valuations defend against family disputes, tax authority challenges, and legal complications during transfers.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          <h2>Understanding Family Business Valuation Complexity</h2>
          
          <p>Family businesses present unique valuation challenges that differ significantly from arm's-length commercial enterprises. Unlike traditional business sales, family business valuations for estate planning must account for complex family dynamics, non-market compensation structures, and long-term succession objectives.</p>
          
          <p>The <strong>SDE (Seller's Discretionary Earnings) methodology</strong> proves most effective for family business estate planning because it properly adjusts for the personal benefits and family employment arrangements common in these enterprises.</p>

          <h3>Key Family Business Valuation Factors</h3>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">Family-Specific Adjustments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-700">
                  <li>✓ Above-market family member salaries</li>
                  <li>✓ Personal expenses run through business</li>
                  <li>✓ Family benefit programs and perquisites</li>
                  <li>✓ Related-party transactions at non-market rates</li>
                  <li>✓ Excess property holdings for family use</li>
                  <li>✓ Conservative financial management styles</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg text-purple-800">Estate Planning Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-purple-700">
                  <li>✓ Ownership transfer timing strategies</li>
                  <li>✓ Minority vs. controlling interest valuations</li>
                  <li>✓ Voting vs. non-voting share structures</li>
                  <li>✓ Buy-sell agreement provisions</li>
                  <li>✓ Generation-skipping considerations</li>
                  <li>✓ Charitable giving integration</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2>SDE Calculation for Family Businesses</h2>
          
          <p>Calculating SDE for family businesses requires careful analysis of family-related expenses and benefits that may not exist in non-family enterprises.</p>
          
          <h3>Standard SDE Formula + Family Adjustments</h3>
          
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 my-8">
            <h4 className="text-xl font-semibold mb-4 text-slate-800">Family Business SDE Calculation</h4>
            <div className="space-y-3 text-slate-700">
              <p><strong>Base SDE =</strong> Net Income + Owner Salary + Benefits + Depreciation + Interest + Taxes</p>
              <p><strong>+ Family Employment Adjustments:</strong></p>
              <ul className="ml-6 space-y-1">
                <li>• Excess family member compensation</li>
                <li>• Family health/insurance benefits above market</li>
                <li>• Educational expenses for family members</li>
                <li>• Family travel and entertainment</li>
                <li>• Personal vehicle expenses</li>
                <li>• Family property/asset usage costs</li>
              </ul>
              <p><strong>- Market Rate Adjustments:</strong></p>
              <ul className="ml-6 space-y-1">
                <li>• Professional management cost for owner replacement</li>
                <li>• Market-rate compensation for family roles</li>
                <li>• Professional advisory fees</li>
              </ul>
            </div>
          </div>

          <h3>Family Business SDE Example</h3>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
            <h4 className="text-lg font-semibold text-green-800 mb-4">Johnson Family Manufacturing Company</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-green-700 mb-3">Financial Base (Annual)</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Net Income</span>
                    <span className="font-medium">$285,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Owner Salary (Father)</span>
                    <span className="font-medium">$120,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Son (Operations Manager)</span>
                    <span className="font-medium">$95,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daughter (Marketing)</span>
                    <span className="font-medium">$75,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Family Health Benefits</span>
                    <span className="font-medium">$32,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Personal Auto Expenses</span>
                    <span className="font-medium">$18,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Family Travel/Entertainment</span>
                    <span className="font-medium">$25,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Depreciation & Interest</span>
                    <span className="font-medium">$45,000</span>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-green-700 mb-3">SDE Calculation</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Income</span>
                    <span className="font-medium">$285,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>+ Owner Salary</span>
                    <span className="font-medium">$120,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>+ Excess Son Salary*</span>
                    <span className="font-medium">$25,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>+ Excess Daughter Salary*</span>
                    <span className="font-medium">$20,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>+ Personal Benefits</span>
                    <span className="font-medium">$75,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>+ Depreciation/Interest</span>
                    <span className="font-medium">$45,000</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-green-600">
                    <span>Total SDE</span>
                    <span>$570,000</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">*Above market rate for similar roles</p>
                </div>
              </div>
            </div>
          </div>

          <h2>Estate Planning Valuation Considerations</h2>
          
          <h3>Ownership Structure Impact</h3>
          
          <p>Family business valuations vary significantly based on ownership structure and transfer mechanisms. Understanding these distinctions is crucial for effective estate planning.</p>
          
          <div className="overflow-x-auto my-8">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Ownership Type</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Valuation Impact</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Estate Planning Benefits</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Controlling Interest (&gt;50%)</td>
                  <td className="border border-gray-300 px-4 py-3 text-green-600">Higher multiple (no discount)</td>
                  <td className="border border-gray-300 px-4 py-3">Strategic gifting of minority interests</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Minority Interest (&lt;50%)</td>
                  <td className="border border-gray-300 px-4 py-3 text-blue-600">15-30% discount applied</td>
                  <td className="border border-gray-300 px-4 py-3">Reduced gift and estate tax values</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Non-Voting Shares</td>
                  <td className="border border-gray-300 px-4 py-3 text-blue-600">Additional 5-15% discount</td>
                  <td className="border border-gray-300 px-4 py-3">Maximize transfer opportunities</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Family Limited Partnership</td>
                  <td className="border border-gray-300 px-4 py-3 text-blue-600">20-40% total discounts</td>
                  <td className="border border-gray-300 px-4 py-3">Optimal for multi-generational planning</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Succession Planning Timeline</h3>
          
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Years 1-3: Foundation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Initial business valuation</li>
                  <li>• Family governance structure</li>
                  <li>• Next-generation development</li>
                  <li>• Buy-sell agreement creation</li>
                  <li>• Estate planning attorney consultation</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Years 4-7: Transition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Leadership transition planning</li>
                  <li>• Ownership transfer initiation</li>
                  <li>• Updated valuations (every 2-3 years)</li>
                  <li>• Tax optimization strategies</li>
                  <li>• Family member role definition</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Years 8+: Implementation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Complete ownership transition</li>
                  <li>• Final estate valuation</li>
                  <li>• Next-generation leadership</li>
                  <li>• Legacy preservation planning</li>
                  <li>• Ongoing family governance</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2>Family Business Valuation Challenges</h2>
          
          <h3>Common Valuation Complications</h3>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-8">
            <h4 className="text-lg font-semibold text-red-800 mb-4">Typical Family Business Valuation Issues</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-red-700">1. Emotional vs. Financial Decision Making</h5>
                <p className="text-red-600 text-sm">Family relationships can cloud objective valuation assessment, leading to unrealistic value expectations or family conflict.</p>
              </div>
              <div>
                <h5 className="font-semibold text-red-700">2. Inadequate Financial Documentation</h5>
                <p className="text-red-600 text-sm">Family businesses often lack the formal financial reporting needed for accurate valuations, mixing personal and business expenses.</p>
              </div>
              <div>
                <h5 className="font-semibold text-red-700">3. Succession Uncertainty</h5>
                <p className="text-red-600 text-sm">Unclear future leadership impacts valuation multiples, as buyers/inheritors face operational risk.</p>
              </div>
              <div>
                <h5 className="font-semibold text-red-700">4. Family Employment Dependencies</h5>
                <p className="text-red-600 text-sm">High dependence on family members creates valuation challenges when estimating true operational costs and transferability.</p>
              </div>
            </div>
          </div>

          <h3>Solutions and Best Practices</h3>
          
          <div className="space-y-6 my-8">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900">Professional Valuation Standards</h4>
                <p className="text-slate-600">Engage certified business appraisers experienced in family enterprise valuations and estate planning requirements.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900">Regular Valuation Updates</h4>
                <p className="text-slate-600">Conduct formal valuations every 3-5 years, with annual updates using simplified methodologies to track value trends.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900">Family Governance Structure</h4>
                <p className="text-slate-600">Establish family councils, employment policies, and decision-making frameworks that support objective valuation processes.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900">Tax Planning Integration</h4>
                <p className="text-slate-600">Coordinate valuations with estate planning attorneys and tax advisors to optimize transfer strategies and minimize tax burden.</p>
              </div>
            </div>
          </div>

          <h2>Professional vs. DIY Family Business Valuations</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">When DIY Valuations Work</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Initial estate planning discussions</li>
                  <li>• Annual family meeting updates</li>
                  <li>• Succession planning conversations</li>
                  <li>• Insurance needs assessment</li>
                  <li>• Buy-sell agreement triggers</li>
                  <li>• Family member education</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded border border-green-200">
                  <p className="text-green-700 text-sm"><strong>Best Practice:</strong> Use professional tools like ValuationGenie for consistent methodology and tracking value trends over time.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">When Professional Appraisals Required</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-700 text-sm">
                  <li>• Estate tax return filings</li>
                  <li>• Gift tax documentation</li>
                  <li>• Legal dispute resolution</li>
                  <li>• Court-ordered valuations</li>
                  <li>• Buy-sell agreement execution</li>
                  <li>• Charitable donation deductions</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded border border-blue-200">
                  <p className="text-blue-700 text-sm"><strong>Important:</strong> Professional appraisals provide legal defensibility and tax authority acceptance for formal proceedings.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2>Tax Implications and Strategies</h2>
          
          <h3>Estate Tax Considerations</h3>
          
          <p>Family business valuations directly impact estate tax liability and planning opportunities. Understanding these implications helps optimize transfer strategies.</p>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 my-8">
            <h4 className="text-lg font-semibold text-purple-800 mb-4">Key Estate Tax Factors</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-purple-700 mb-3">Valuation Timing Strategies</h5>
                <ul className="space-y-2 text-purple-600 text-sm">
                  <li>• Gift during business downturns for lower values</li>
                  <li>• Time transfers before major growth events</li>
                  <li>• Coordinate with family member life events</li>
                  <li>• Plan around tax law changes</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-purple-700 mb-3">Discount Maximization</h5>
                <ul className="space-y-2 text-purple-600 text-sm">
                  <li>• Create minority interest positions</li>
                  <li>• Establish voting vs. non-voting shares</li>
                  <li>• Use family limited partnerships</li>
                  <li>• Implement transfer restrictions</li>
                </ul>
              </div>
            </div>
          </div>

          <h3>Generation-Skipping Transfer Planning</h3>
          
          <p>Multi-generational family businesses benefit from generation-skipping transfer strategies that maximize wealth preservation across multiple family generations.</p>
          
          <div className="space-y-4 my-8">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Dynasty Trust Structures</h4>
              <p className="text-slate-700 text-sm">Family business interests transferred to dynasty trusts can provide long-term wealth preservation while maintaining family business control across multiple generations.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Grantor Retained Annuity Trusts (GRATs)</h4>
              <p className="text-slate-700 text-sm">Family business growth transferred to younger generations while seniors retain income streams, particularly effective for high-growth family enterprises.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Charitable Strategies</h4>
              <p className="text-slate-700 text-sm">Charitable remainder trusts and family foundations provide tax benefits while maintaining family involvement in business philanthropy and community engagement.</p>
            </div>
          </div>

          <InternalLinks 
            title="Family Business Valuation Resources"
            links={internalLinks}
          />

          <h2>Frequently Asked Questions</h2>
          
          {faqData.map((faq, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">💡 Estate Planning Success Tip</h3>
            <p className="text-purple-700">Start family business valuations early in the estate planning process. Regular valuations help families understand value trends, optimize transfer timing, and build consensus around business worth for smooth succession transitions.</p>
          </div>

          <h2>Start Your Family Business Estate Planning</h2>
          <p>Effective family business estate planning begins with understanding your current business value and tracking value trends over time. Professional valuation tools provide the foundation for informed succession decisions.</p>
          
          <p><strong>Begin your family estate planning journey</strong> with a comprehensive business valuation that serves as the cornerstone for succession planning, tax optimization, and family wealth preservation.</p>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl text-white">
          <h3 className="text-2xl font-bold mb-4">Get Your Family Business Estate Planning Valuation</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Professional family business valuation designed for estate planning. SDE methodology accounts for family employment, benefits, and succession planning requirements.
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link href="/" className="inline-flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Start Estate Planning Valuation - $39
            </Link>
          </Button>
          <p className="text-purple-100 text-sm mt-4">✨ 7-day money-back guarantee • Family business expertise • Professional methodology</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}