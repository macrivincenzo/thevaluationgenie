import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calculator, TrendingUp, DollarSign, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function SdeBusinessValuationGuide() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb & Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-blue-200 mb-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            SDE Business Valuation: Complete Guide for Small Business Owners
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Master Seller's Discretionary Earnings (SDE) valuation method with industry multiples, 
            calculation examples, and when to use SDE vs EBITDA for businesses under $5M.
          </p>
          <div className="flex items-center gap-6 mt-8 text-blue-200">
            <span>January 10, 2025</span>
            <span>12 min read</span>
            <span>Valuation Methods</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Table of Contents */}
        <Card className="mb-12 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li><a href="#what-is-sde" className="text-blue-600 hover:text-blue-800">What is SDE (Seller's Discretionary Earnings)?</a></li>
              <li><a href="#sde-vs-ebitda" className="text-blue-600 hover:text-blue-800">SDE vs EBITDA: When to Use Each Method</a></li>
              <li><a href="#calculating-sde" className="text-blue-600 hover:text-blue-800">How to Calculate SDE Step-by-Step</a></li>
              <li><a href="#industry-multiples" className="text-blue-600 hover:text-blue-800">SDE Multiples by Industry (2025 Data)</a></li>
              <li><a href="#valuation-example" className="text-blue-600 hover:text-blue-800">Real SDE Valuation Example</a></li>
              <li><a href="#common-mistakes" className="text-blue-600 hover:text-blue-800">Common SDE Calculation Mistakes</a></li>
              <li><a href="#next-steps" className="text-blue-600 hover:text-blue-800">Next Steps for Your Business</a></li>
            </ul>
          </CardContent>
        </Card>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          {/* What is SDE Section */}
          <section id="what-is-sde" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              What is SDE (Seller's Discretionary Earnings)?
            </h2>
            
            <p className="text-lg text-slate-700 mb-6">
              <strong>Seller's Discretionary Earnings (SDE)</strong> is the most widely used valuation method for 
              small businesses with revenues under $5 million. SDE represents the total financial benefit 
              a single owner-operator would receive from owning and operating the business.
            </p>

            <Card className="bg-blue-50 border-blue-200 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">SDE Formula:</h3>
                <div className="bg-white p-4 rounded-lg border-2 border-blue-300 font-mono text-lg">
                  <p><strong>SDE = Net Income + Owner's Salary + Owner's Benefits + Interest + Taxes + Depreciation + One-time Expenses</strong></p>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-semibold text-slate-900 mb-4">Why SDE Matters for Small Business Valuation</h3>
            <ul className="space-y-3 text-slate-700 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>Owner-operator focused:</strong> Designed for businesses where the owner actively manages operations</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>Industry standard:</strong> Used by 90%+ of business brokers for main street businesses</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>Buyer perspective:</strong> Shows total financial benefit available to a new owner</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span><strong>Financing friendly:</strong> SBA and conventional lenders understand SDE-based valuations</span>
              </li>
            </ul>
          </section>

          {/* SDE vs EBITDA Section */}
          <section id="sde-vs-ebitda" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-blue-600" />
              SDE vs EBITDA: When to Use Each Method
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-800">Use SDE When:</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                      <span>Annual revenue under $5M</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                      <span>Owner actively manages business</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                      <span>Selling to individual buyer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-1" />
                      <span>Main street business (retail, restaurant, service)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-800">Use EBITDA When:</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-1" />
                      <span>Annual revenue over $5M</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-1" />
                      <span>Professional management team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-1" />
                      <span>Strategic or private equity buyer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-1" />
                      <span>Manufacturing or technology business</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-amber-800 mb-2">Important Note:</h4>
                    <p className="text-amber-700">
                      SDE typically results in 20-40% higher earnings than EBITDA for the same business because 
                      it includes owner compensation. This is why SDE multiples are generally lower than EBITDA multiples.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Calculating SDE Section */}
          <section id="calculating-sde" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-blue-600" />
              How to Calculate SDE Step-by-Step
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Step 1: Start with Net Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">Begin with your business's net income after taxes from your profit & loss statement.</p>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <p className="font-mono">Example: Net Income = $75,000</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Add Back Owner's Total Compensation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">Include all forms of owner compensation:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li>Owner's salary/wages</li>
                    <li>Owner's health insurance</li>
                    <li>Owner's retirement contributions</li>
                    <li>Owner's vehicle expenses</li>
                    <li>Personal expenses run through business</li>
                  </ul>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <p className="font-mono">Example: Owner Compensation = $85,000</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 3: Add Back Interest, Taxes, Depreciation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">Add back non-cash and financing-related expenses:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li>Interest expense (debt will transfer differently)</li>
                    <li>Income taxes (new owner's tax situation differs)</li>
                    <li>Depreciation and amortization (non-cash expenses)</li>
                  </ul>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <p className="font-mono">Example: Interest + Taxes + Depreciation = $25,000</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 4: Add Back One-Time Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">Remove non-recurring expenses that won't continue:</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-700 mb-4">
                    <li>Legal fees for lawsuit resolution</li>
                    <li>One-time equipment repairs</li>
                    <li>Business broker/attorney fees for sale</li>
                    <li>Unusual bad debt write-offs</li>
                  </ul>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <p className="font-mono">Example: One-time Expenses = $15,000</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800">Final SDE Calculation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 font-mono text-lg">
                    <p>Net Income: $75,000</p>
                    <p>+ Owner Compensation: $85,000</p>
                    <p>+ Interest/Taxes/Depreciation: $25,000</p>
                    <p>+ One-time Expenses: $15,000</p>
                    <hr className="border-green-300 my-4" />
                    <p className="text-xl font-bold text-green-800">Total SDE: $200,000</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Industry Multiples Section */}
          <section id="industry-multiples" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              SDE Multiples by Industry (2025 Data)
            </h2>

            <p className="text-lg text-slate-700 mb-8">
              Once you have calculated SDE, multiply it by the appropriate industry multiple to estimate business value. 
              Here are current market multiples based on recent sales data:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Service-Based Businesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Professional Services</span>
                      <span className="font-semibold">2.5x - 4.0x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IT Services</span>
                      <span className="font-semibold">3.0x - 5.0x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketing Agencies</span>
                      <span className="font-semibold">2.0x - 3.5x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consulting</span>
                      <span className="font-semibold">2.5x - 4.5x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Healthcare Services</span>
                      <span className="font-semibold">3.0x - 4.5x</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Physical Businesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Restaurants</span>
                      <span className="font-semibold">1.5x - 2.5x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retail Stores</span>
                      <span className="font-semibold">1.5x - 3.0x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Manufacturing</span>
                      <span className="font-semibold">2.0x - 3.5x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Auto Services</span>
                      <span className="font-semibold">2.0x - 3.0x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Construction</span>
                      <span className="font-semibold">1.8x - 2.8x</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Factors That Increase SDE Multiples:</h4>
                <ul className="grid md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Recurring revenue streams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Diversified customer base</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Strong management team</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Growing industry/market</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Proprietary processes/IP</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>Long-term contracts</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Valuation Example */}
          <section id="valuation-example" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Real SDE Valuation Example</h2>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Case Study: Marketing Agency Valuation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Business Profile:</h4>
                    <ul className="space-y-2 text-slate-700">
                      <li>• Digital marketing agency</li>
                      <li>• 5 years in business</li>
                      <li>• $750K annual revenue</li>
                      <li>• 15 recurring clients</li>
                      <li>• Owner + 3 employees</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">SDE Calculation:</h4>
                    <div className="space-y-1 font-mono text-sm">
                      <p>Net Income: $65,000</p>
                      <p>Owner Salary: $80,000</p>
                      <p>Owner Benefits: $15,000</p>
                      <p>Interest/Taxes/Depreciation: $20,000</p>
                      <p>One-time Expenses: $5,000</p>
                      <hr className="my-2" />
                      <p className="font-bold">Total SDE: $185,000</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-4">Valuation Result:</h4>
                <div className="space-y-3">
                  <p><strong>SDE:</strong> $185,000</p>
                  <p><strong>Industry Multiple:</strong> 3.0x (marketing agency with strong recurring revenue)</p>
                  <p><strong>Estimated Business Value:</strong> $185,000 × 3.0 = <span className="text-2xl font-bold text-green-800">$555,000</span></p>
                </div>
                <p className="text-green-700 mt-4">
                  This valuation reflects the agency's strong recurring revenue base and established client relationships, 
                  placing it at the higher end of the typical 2.0x - 3.5x range for marketing agencies.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Common Mistakes */}
          <section id="common-mistakes" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Common SDE Calculation Mistakes</h2>

            <div className="space-y-6">
              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Mistake #1: Including Future Manager's Salary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-700 mb-3">
                    <strong>Wrong:</strong> Subtracting a future manager's salary when calculating SDE.
                  </p>
                  <p className="text-slate-700">
                    <strong>Correct:</strong> SDE shows total benefit available to owner-operator. If buyer plans to hire management, 
                    they'll factor that into their purchase decision and financing.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Mistake #2: Using EBITDA Multiples with SDE
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-700 mb-3">
                    <strong>Wrong:</strong> Applying 5x-8x EBITDA multiples to SDE calculations.
                  </p>
                  <p className="text-slate-700">
                    <strong>Correct:</strong> SDE multiples are typically 1.5x-4.5x. EBITDA multiples are higher because 
                    EBITDA excludes owner compensation that SDE includes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Mistake #3: Inconsistent Add-back Policies
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-700 mb-3">
                    <strong>Wrong:</strong> Adding back some personal expenses but not others, or being overly aggressive with normalizations.
                  </p>
                  <p className="text-slate-700">
                    <strong>Correct:</strong> Only add back legitimate business expenses that benefit the owner personally 
                    and won't continue under new ownership. Document all adjustments clearly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Next Steps */}
          <section id="next-steps" className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Next Steps for Your Business</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Get Your Free SDE Estimate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">
                    Use our free business valuation calculator to get an instant SDE-based estimate of your business value.
                  </p>
                  <Link href="/">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Calculator className="w-5 h-5 mr-2" />
                      Get Free Estimate
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Get Professional Report ($39)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">
                    Download a comprehensive PDF report with detailed SDE analysis, industry comparisons, and actionable recommendations.
                  </p>
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      <FileText className="w-5 h-5 mr-2" />
                      Get Professional Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </article>

        {/* Related Articles */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  <Link href="/blog/business-valuation-vs-market-appraisal" className="text-blue-600 hover:text-blue-800">
                    Business Valuation vs Market Appraisal
                  </Link>
                </h4>
                <p className="text-slate-600 text-sm">Learn when to use each approach for your SME.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  <Link href="/blog/industry-valuation-multiples-2025" className="text-blue-600 hover:text-blue-800">
                    Industry Valuation Multiples 2025
                  </Link>
                </h4>
                <p className="text-slate-600 text-sm">Current SDE benchmarks by sector with market data.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  <Link href="/blog/small-business-sale-preparation" className="text-blue-600 hover:text-blue-800">
                    Prepare Your Business for Sale
                  </Link>
                </h4>
                <p className="text-slate-600 text-sm">Maximize value with our comprehensive preparation checklist.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}