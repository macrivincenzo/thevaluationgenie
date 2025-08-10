import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, CheckCircle, AlertCircle, TrendingUp, Clock, DollarSign, Users } from "lucide-react";

export default function SmallBusinessSalePreparation() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb & Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-emerald-200 mb-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-emerald-200 hover:text-white hover:bg-emerald-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            How to Prepare Your Small Business for Sale: Valuation Checklist
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl">
            Essential steps to maximize your business value before selling. Financial cleanup, 
            documentation requirements, and valuation optimization strategies that can boost your sale price by 15-30%.
          </p>
          <div className="flex items-center gap-6 mt-8 text-emerald-200">
            <span>January 10, 2025</span>
            <span>15 min read</span>
            <span>Exit Planning</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Value Impact Overview */}
        <Card className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-900">
              Preparation Impact on Sale Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">15-30%</h3>
                <p className="text-slate-700">Higher sale price with proper preparation</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">30-50%</h3>
                <p className="text-slate-700">Faster sale with organized documentation</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">3-5x</h3>
                <p className="text-slate-700">More qualified buyers with clean financials</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <article className="prose prose-lg max-w-none">
          {/* Timeline Overview */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">12-Month Sale Preparation Timeline</h2>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">12 Months Before Sale</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Begin financial cleanup and organization</li>
                    <li>• Start documenting all business processes</li>
                    <li>• Address any outstanding legal or tax issues</li>
                    <li>• Begin reducing owner dependency</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">6 Months Before Sale</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Complete financial statement reviews</li>
                    <li>• Strengthen management team and operations</li>
                    <li>• Optimize key business metrics</li>
                    <li>• Get preliminary business valuation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">3 Months Before Sale</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Finalize all documentation packages</li>
                    <li>• Complete professional business valuation</li>
                    <li>• Engage business broker or M&A advisor</li>
                    <li>• Prepare marketing materials</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Financial Cleanup Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-emerald-600" />
              Financial Cleanup: First Priority
            </h2>

            <p className="text-lg text-slate-700 mb-8">
              Clean, accurate financial statements are the foundation of a successful sale. Buyers will scrutinize 
              every number, and inconsistencies can torpedo deals or significantly reduce offers.
            </p>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Step 1: Organize Financial Statements (3 Years)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Required Documents:</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Profit & Loss statements (monthly for last 3 years)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Balance sheets (year-end for last 3 years)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Cash flow statements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Tax returns (business and personal K-1s)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Bank statements and reconciliations</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Quality Standards:</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                          <span>CPA-prepared or reviewed statements preferred</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                          <span>Consistent accounting methods across all years</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                          <span>No significant unexplained variances</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                          <span>All unusual transactions documented</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Separate Business and Personal Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">
                    Create clear separation between business and personal expenses. This is crucial for 
                    accurate SDE calculations and buyer confidence.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3">Legitimate Business Expenses:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Office rent and utilities</li>
                        <li>• Business insurance premiums</li>
                        <li>• Employee salaries and benefits</li>
                        <li>• Business travel and meals</li>
                        <li>• Professional development</li>
                        <li>• Equipment and supplies</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-3">Personal Expenses to Remove:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Personal vehicle payments</li>
                        <li>• Family health insurance (if excessive)</li>
                        <li>• Personal meals and entertainment</li>
                        <li>• Home office expenses (if not exclusively business)</li>
                        <li>• Personal travel expenses</li>
                        <li>• Family member wages (if above market rate)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Step 3: Calculate Accurate SDE</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">
                    Prepare a detailed SDE calculation showing exactly how you arrived at your business's earnings. 
                    This becomes the foundation for your valuation.
                  </p>
                  
                  <div className="bg-slate-100 p-6 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-3">SDE Calculation Worksheet:</h4>
                    <div className="space-y-2 font-mono text-sm">
                      <p>Net Income (after taxes): $_______</p>
                      <p>+ Owner's Salary/Wages: $_______</p>
                      <p>+ Owner's Benefits (health, retirement): $_______</p>
                      <p>+ Interest Expense: $_______</p>
                      <p>+ Taxes: $_______</p>
                      <p>+ Depreciation/Amortization: $_______</p>
                      <p>+ One-time Expenses: $_______</p>
                      <p>+ Personal Expenses Paid by Business: $_______</p>
                      <hr className="border-slate-400 my-2" />
                      <p className="text-lg font-bold">Total SDE: $_______</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Operations Optimization */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-emerald-600" />
              Operations Optimization
            </h2>

            <p className="text-lg text-slate-700 mb-8">
              Buyers want businesses that can run without the current owner. Reducing owner dependency 
              significantly increases value and buyer appeal.
            </p>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reduce Owner Dependency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Key Areas to Address:</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Strengthen management team</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Document all processes and procedures</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Cross-train employees on critical functions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Establish vendor relationships in company name</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Create systems for customer relationship management</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Value Impact:</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded">
                          <p className="font-medium text-green-800">High Owner Dependency</p>
                          <p className="text-green-700 text-sm">SDE Multiple: 1.5x - 2.5x</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded">
                          <p className="font-medium text-blue-800">Moderate Owner Dependency</p>
                          <p className="text-blue-700 text-sm">SDE Multiple: 2.5x - 3.5x</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded">
                          <p className="font-medium text-purple-800">Low Owner Dependency</p>
                          <p className="text-purple-700 text-sm">SDE Multiple: 3.5x - 4.5x</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Base Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">
                    Buyers want diversified, stable customer bases. Analyze and optimize your customer concentration.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">High Risk</h4>
                      <p className="text-red-700 text-sm">Top customer &gt;30% of revenue</p>
                      <p className="text-red-700 text-xs mt-1">Significant valuation discount</p>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <h4 className="font-semibold text-amber-800 mb-2">Moderate Risk</h4>
                      <p className="text-amber-700 text-sm">Top customer 15-30% of revenue</p>
                      <p className="text-amber-700 text-xs mt-1">Some valuation impact</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Low Risk</h4>
                      <p className="text-green-700 text-sm">Top customer &lt;15% of revenue</p>
                      <p className="text-green-700 text-xs mt-1">Optimal for valuation</p>
                    </div>
                  </div>

                  <h4 className="font-semibold text-slate-900 mb-3">Customer Diversification Strategies:</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Expand marketing to attract new customer segments</li>
                    <li>• Develop products/services to reduce single-customer dependency</li>
                    <li>• Implement long-term contracts with multiple customers</li>
                    <li>• Create recurring revenue streams</li>
                    <li>• Document customer retention rates and loyalty programs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Documentation Package */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-emerald-600" />
              Complete Documentation Package
            </h2>

            <p className="text-lg text-slate-700 mb-8">
              Organized documentation speeds up due diligence and builds buyer confidence. 
              Prepare these materials in advance to demonstrate professionalism.
            </p>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Historical Financials:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• 3 years of profit & loss statements</li>
                        <li>• 3 years of balance sheets</li>
                        <li>• 3 years of tax returns</li>
                        <li>• Current year-to-date financials</li>
                        <li>• Bank statements (last 12 months)</li>
                        <li>• Accounts receivable aging</li>
                        <li>• Accounts payable summary</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Analysis & Projections:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• SDE calculation worksheets</li>
                        <li>• Financial trend analysis</li>
                        <li>• Budget vs. actual comparisons</li>
                        <li>• Future projections (conservative)</li>
                        <li>• Key financial ratios</li>
                        <li>• Seasonal analysis (if applicable)</li>
                        <li>• Capital expenditure history</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legal & Operational Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Legal Documents:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Articles of incorporation/LLC operating agreement</li>
                        <li>• Business licenses and permits</li>
                        <li>• Material contracts and agreements</li>
                        <li>• Lease agreements (with transfer terms)</li>
                        <li>• Employment agreements</li>
                        <li>• Non-compete agreements</li>
                        <li>• Insurance policies</li>
                        <li>• Intellectual property documentation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Operational Information:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Organization chart with roles</li>
                        <li>• Employee handbook and policies</li>
                        <li>• Operating procedures manual</li>
                        <li>• Vendor and supplier lists</li>
                        <li>• Customer analysis and contracts</li>
                        <li>• Equipment lists and maintenance records</li>
                        <li>• Marketing materials and strategy</li>
                        <li>• Technology systems documentation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Overview Package</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">
                    Create a comprehensive business overview that tells your company's story and highlights value drivers.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Executive Summary (2-3 pages):</h4>
                      <ul className="text-slate-700 text-sm space-y-1">
                        <li>• Business description and history</li>
                        <li>• Products/services overview</li>
                        <li>• Market position and competitive advantages</li>
                        <li>• Financial highlights and trends</li>
                        <li>• Growth opportunities</li>
                        <li>• Reason for sale</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Supporting Materials:</h4>
                      <ul className="text-slate-700 text-sm space-y-1">
                        <li>• Professional photos of facilities/operations</li>
                        <li>• Customer testimonials and case studies</li>
                        <li>• Awards and recognition</li>
                        <li>• Industry articles and media coverage</li>
                        <li>• Market research and industry data</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Value Enhancement Strategies */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              Value Enhancement Strategies
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Wins (30-90 days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Financial Improvements:</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Collect outstanding receivables</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Eliminate unnecessary expenses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Optimize pricing strategies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Improve gross margins</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Operational Improvements:</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Clean and organize facilities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Update marketing materials</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Refresh website and online presence</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Organize inventory and equipment</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Medium-term Strategies (3-6 months)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Revenue Enhancement:</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li>• Launch new products or services with strong margins</li>
                        <li>• Implement recurring revenue streams</li>
                        <li>• Expand into complementary markets</li>
                        <li>• Improve customer retention programs</li>
                        <li>• Optimize sales processes and conversion rates</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Cost Management:</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li>• Renegotiate supplier contracts</li>
                        <li>• Improve operational efficiency</li>
                        <li>• Invest in productivity-enhancing technology</li>
                        <li>• Optimize staffing levels</li>
                        <li>• Reduce overhead expenses</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-amber-800 mb-2">Caution: Avoid Over-Optimization</h4>
                      <p className="text-amber-700">
                        While improvements are good, dramatic last-minute changes can raise buyer suspicion. 
                        Focus on sustainable improvements that reflect the business's true potential, not artificial inflation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Final Checklist */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Final Pre-Sale Checklist</h2>

            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Financial Readiness</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-slate-700">3 years of clean financial statements</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-slate-700">Accurate SDE calculation documented</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-slate-700">Personal vs. business expenses separated</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-slate-700">All accounting irregularities explained</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-slate-700">Tax compliance up to date</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Operational Readiness</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-slate-700">Management team strengthened</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-slate-700">Business processes documented</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-slate-700">Customer concentration analyzed</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-slate-700">Legal documents organized</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-slate-700">Professional valuation completed</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Next Steps */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Get Started Today</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Assess Your Current Value</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <p className="text-slate-700 mb-4">
                    Start with a free business valuation to understand your baseline value before improvements.
                  </p>
                  <Link href="/valuation">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Get Free Estimate
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Download Preparation Guide</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-slate-700 mb-4">
                    Get our comprehensive PDF checklist with timelines, templates, and detailed instructions.
                  </p>
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    Download PDF Guide
                  </Button>
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
                <p className="text-slate-600 text-sm">Learn how to calculate SDE and understand valuation multiples.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  <Link href="/blog/business-valuation-vs-market-appraisal" className="text-blue-600 hover:text-blue-800">
                    Valuation vs Market Appraisal
                  </Link>
                </h4>
                <p className="text-slate-600 text-sm">Understand which approach is right for your situation.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  <Link href="/blog/industry-valuation-multiples-2025" className="text-blue-600 hover:text-blue-800">
                    Industry Valuation Multiples 2025
                  </Link>
                </h4>
                <p className="text-slate-600 text-sm">See current market benchmarks for your industry sector.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}