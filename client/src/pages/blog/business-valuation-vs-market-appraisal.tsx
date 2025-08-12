import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calculator, Scale, DollarSign, FileText, CheckCircle, AlertTriangle, Clock } from "lucide-react";

export default function BusinessValuationVsMarketAppraisal() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb & Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-indigo-200 mb-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-indigo-200 hover:text-white hover:bg-indigo-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Business Valuation vs Market Appraisal: Which Do You Need?
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Understand the key differences between business valuations and market appraisals, when to use each approach, 
            and how they impact your SME's financial decisions.
          </p>
          <div className="flex items-center gap-6 mt-8 text-indigo-200">
            <span>January 10, 2025</span>
            <span>8 min read</span>
            <span>Business Fundamentals</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Decision Tool */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-900">
              Quick Decision: What Do You Need?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <Scale className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Choose Business Valuation If:</h3>
                  <ul className="text-left space-y-2 text-slate-700">
                    <li>✓ Selling your business</li>
                    <li>✓ Bringing in investors/partners</li>
                    <li>✓ Estate planning or divorce</li>
                    <li>✓ SBA loan application</li>
                    <li>✓ Tax or legal compliance</li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Choose Market Appraisal If:</h3>
                  <ul className="text-left space-y-2 text-slate-700">
                    <li>✓ Exploring sale options</li>
                    <li>✓ Understanding market position</li>
                    <li>✓ Initial price guidance</li>
                    <li>✓ Quick market assessment</li>
                    <li>✓ Broker listing preparation</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <article className="prose prose-lg max-w-none">
          {/* Understanding the Basics */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Understanding the Key Differences</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <Scale className="w-6 h-6" />
                    Business Valuation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-700 mb-4">
                    A <strong>comprehensive financial analysis</strong> that determines the economic value of a business 
                    using multiple methodologies and detailed financial review.
                  </p>
                  <h4 className="font-semibold text-slate-900 mb-2">Key Characteristics:</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Detailed financial statement analysis</li>
                    <li>• Multiple valuation approaches (SDE, asset, market)</li>
                    <li>• Industry and economic risk assessment</li>
                    <li>• Formal written report</li>
                    <li>• Defendable in legal/tax situations</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <DollarSign className="w-6 h-6" />
                    Market Appraisal
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-700 mb-4">
                    A <strong>market-based assessment</strong> that estimates what buyers would likely pay 
                    based on recent comparable sales and current market conditions.
                  </p>
                  <h4 className="font-semibold text-slate-900 mb-2">Key Characteristics:</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Comparable sales analysis</li>
                    <li>• Current market trends review</li>
                    <li>• Buyer demand assessment</li>
                    <li>• Informal market opinion</li>
                    <li>• Quick turnaround (days vs weeks)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-amber-800 mb-2">Important Distinction:</h4>
                    <p className="text-amber-700">
                      A market appraisal tells you what buyers might pay <em>today</em>, while a business valuation 
                      tells you what your business is <em>fundamentally worth</em> based on its financial performance and assets.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* When to Use Each */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">When to Use Each Approach</h2>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Use Business Valuation For:</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Legal & Compliance Situations:</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Divorce proceedings (asset division)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Estate planning and inheritance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Tax compliance (gift tax, estate tax)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Partnership disputes or buyouts</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Business Transactions:</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>SBA loan applications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Investor due diligence</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Insurance coverage decisions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Strategic planning and benchmarking</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Use Market Appraisal For:</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Sale Preparation:</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Initial listing price guidance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Understanding buyer expectations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Competitive positioning research</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Broker selection discussions</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Market Intelligence:</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Exploring "what if" sale scenarios</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Annual business check-ups</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Industry trend monitoring</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Quick feasibility assessments</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Cost and Timeline Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-600" />
              Cost and Timeline Comparison
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-800">Business Valuation</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900">Timeline:</h4>
                      <p className="text-slate-700">2-4 weeks for comprehensive analysis</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Cost Range:</h4>
                      <p className="text-slate-700">$39 (basic SDE report) to $5,000+ (certified appraisal)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">What You Get:</h4>
                      <ul className="list-disc list-inside text-slate-700 space-y-1">
                        <li>Detailed financial analysis</li>
                        <li>Multiple valuation methods</li>
                        <li>Industry benchmark comparisons</li>
                        <li>Risk assessment</li>
                        <li>Professional written report</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-800">Market Appraisal</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900">Timeline:</h4>
                      <p className="text-slate-700">1-5 days for market analysis</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Cost Range:</h4>
                      <p className="text-slate-700">Free (basic online tools) to $1,500 (broker analysis)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">What You Get:</h4>
                      <ul className="list-disc list-inside text-slate-700 space-y-1">
                        <li>Comparable sales data</li>
                        <li>Market trend analysis</li>
                        <li>Pricing recommendations</li>
                        <li>Marketability assessment</li>
                        <li>Brief summary report</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-indigo-800 mb-3">ValuationGenie Approach:</h4>
                <p className="text-indigo-700 mb-4">
                  We bridge the gap by offering <strong>instant business valuations with professional reports for just $39</strong>. 
                  You get the analytical rigor of a formal valuation with the speed and affordability of a market appraisal.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-indigo-800">Speed</div>
                    <div className="text-indigo-700">Instant results</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-indigo-800">Cost</div>
                    <div className="text-indigo-700">$39 professional report</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-indigo-800">Quality</div>
                    <div className="text-indigo-700">SDE-based analysis</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Decision Framework */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Decision Framework: 4 Key Questions</h2>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">1. What's Your Primary Purpose?</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">Choose Business Valuation If:</h4>
                      <ul className="text-slate-700 space-y-1">
                        <li>• Legal or tax compliance required</li>
                        <li>• Formal documentation needed</li>
                        <li>• Investment or loan application</li>
                        <li>• Detailed financial analysis required</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Choose Market Appraisal If:</h4>
                      <ul className="text-slate-700 space-y-1">
                        <li>• Exploring sale possibilities</li>
                        <li>• Understanding market position</li>
                        <li>• Quick price guidance needed</li>
                        <li>• Initial feasibility assessment</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">2. How Precise Do You Need to Be?</h3>
                  <p className="text-slate-700 mb-4">
                    Market appraisals typically provide price ranges (±20-30%), while business valuations 
                    offer more precise estimates (±10-15%) based on detailed financial analysis.
                  </p>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <p className="text-slate-700">
                      <strong>Example:</strong> A $500K business might appraise at $350K-$650K (market appraisal) 
                      vs. $475K-$525K (business valuation).
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">3. What's Your Timeline?</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Need Results This Week?</h4>
                      <p className="text-slate-700">Market appraisal or instant valuation tool like ValuationGenie</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Can Wait 2-4 Weeks?</h4>
                      <p className="text-slate-700">Full business valuation for comprehensive analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">4. What's Your Budget?</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">Free - $100:</span>
                      <span className="text-slate-700">Online calculators, basic market research</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-medium">$100 - $1,000:</span>
                      <span className="text-slate-700">Professional market appraisal, basic valuation report</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="font-medium">$1,000 - $5,000+:</span>
                      <span className="text-slate-700">Certified business valuation, expert testimony</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Real-World Scenarios */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Real-World Scenarios</h2>

            <div className="space-y-6">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Scenario 1: Considering a Sale</h3>
                  <p className="text-slate-700 mb-3">
                    <strong>Situation:</strong> Restaurant owner wondering if it's a good time to sell after 10 years.
                  </p>
                  <p className="text-slate-700 mb-3">
                    <strong>Best Choice:</strong> Start with a market appraisal to understand current buyer demand 
                    and pricing trends in the restaurant industry.
                  </p>
                  <p className="text-slate-700">
                    <strong>Next Step:</strong> If market conditions look favorable, get a business valuation 
                    to set an accurate listing price.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Scenario 2: Partnership Buyout</h3>
                  <p className="text-slate-700 mb-3">
                    <strong>Situation:</strong> Two partners in an IT services firm need to determine buyout price 
                    for departing partner.
                  </p>
                  <p className="text-slate-700 mb-3">
                    <strong>Best Choice:</strong> Business valuation required for legal protection and fairness. 
                    Both parties need defendable analysis.
                  </p>
                  <p className="text-slate-700">
                    <strong>Why:</strong> Partnership agreements typically require formal valuations for buyouts, 
                    and both parties want objective, detailed analysis.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Scenario 3: SBA Loan Application</h3>
                  <p className="text-slate-700 mb-3">
                    <strong>Situation:</strong> Manufacturing business needs $250K SBA loan for equipment and expansion.
                  </p>
                  <p className="text-slate-700 mb-3">
                    <strong>Best Choice:</strong> Business valuation required by lender to justify loan amount 
                    and assess collateral value.
                  </p>
                  <p className="text-slate-700">
                    <strong>Requirement:</strong> SBA lenders typically require professional valuations for loans 
                    over $150K or when business serves as collateral.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Your Next Steps</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Start with Free Estimate</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-slate-700 mb-4">
                    Get an instant SDE-based valuation to understand your business value baseline.
                  </p>
                  <Link href="/">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Get Free Estimate
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Professional Report ($39)</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <p className="text-slate-700 mb-4">
                    Download comprehensive PDF with detailed analysis, comparable sales, and recommendations.
                  </p>
                  <Link href="/">
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                      Get Professional Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Expert Consultation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Scale className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <p className="text-slate-700 mb-4">
                    Need certified valuation or complex analysis? We can connect you with qualified professionals.
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                      Contact Expert
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
                  <Link href="/blog/sde-business-valuation-guide" className="text-blue-600 hover:text-blue-800">
                    SDE Business Valuation Guide
                  </Link>
                </h4>
                <p className="text-slate-600 text-sm">Master the SDE valuation method with step-by-step calculations.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  <Link href="/blog/small-business-sale-preparation" className="text-blue-600 hover:text-blue-800">
                    Prepare Your Business for Sale
                  </Link>
                </h4>
                <p className="text-slate-600 text-sm">Essential steps to maximize your business value before selling.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  <Link href="/blog/industry-valuation-multiples-2025" className="text-blue-600 hover:text-blue-800">
                    Industry Valuation Multiples 2025
                  </Link>
                </h4>
                <p className="text-slate-600 text-sm">Current SDE multiples and benchmarks by industry sector.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}