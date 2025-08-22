import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, TrendingUp, AlertCircle, CheckCircle, DollarSign, Target } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function SdeVsEbitdaGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-700">Technical Authority</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            SDE vs EBITDA: Complete Business Valuation Comparison Guide
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Master the critical differences between Seller's Discretionary Earnings (SDE) and EBITDA for small business valuation. Learn when to use each method and why SDE delivers more accurate valuations for owner-operated businesses.
          </p>
          
          {/* CTA Button */}
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 p-6 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Get SDE-Based Business Valuation</h3>
              <p className="text-muted-foreground mb-4">
                Professional small business valuation using Seller's Discretionary Earnings methodology. More accurate for owner-operated businesses.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                <a href="https://thevaluationgenie.com/" className="inline-flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Using SDE Method
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
              <h2 className="text-2xl font-bold mb-4 text-green-600">Why the SDE vs EBITDA Choice Matters</h2>
              
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-6 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-700 dark:text-red-300 mb-2">$200,000+ Valuation Error</p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Using EBITDA instead of SDE for a $150,000 profit small business can undervalue it by $200,000 to $600,000. The wrong methodology choice is one of the costliest valuation mistakes.
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="mb-4">
                For businesses with annual revenue under $10 million, particularly owner-operated enterprises, SDE provides significantly more accurate valuations than EBITDA. This halal-compliant approach focuses on actual owner benefit rather than theoretical corporate metrics.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">SDE Best For:</h3>
                  <ul className="text-sm space-y-1 text-green-600 dark:text-green-400">
                    <li>• Small businesses ($1M - $10M revenue)</li>
                    <li>• Owner-operated companies</li>
                    <li>• Service businesses</li>
                    <li>• Family businesses</li>
                    <li>• Single-location operations</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">EBITDA Best For:</h3>
                  <ul className="text-sm space-y-1 text-blue-600 dark:text-blue-400">
                    <li>• Large businesses ($10M+ revenue)</li>
                    <li>• Management-run companies</li>
                    <li>• Manufacturing businesses</li>
                    <li>• Multi-location operations</li>
                    <li>• Corporate acquisitions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Comparison */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-green-600">SDE vs EBITDA: Complete Breakdown</h2>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-slate-300 dark:border-slate-700">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left">Factor</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">SDE</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">EBITDA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 font-medium">Full Name</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">Seller's Discretionary Earnings</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">Earnings Before Interest, Taxes, Depreciation, Amortization</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 font-medium">Business Size</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-green-600">$1M - $10M revenue</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-blue-600">$10M+ revenue</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 font-medium">Owner Salary</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-green-600">Added back</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-red-600">Not added back</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 font-medium">Owner Benefits</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-green-600">Added back</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-red-600">Not added back</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 font-medium">Personal Expenses</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-green-600">Added back</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-red-600">Not added back</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 font-medium">Typical Multiple Range</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-green-600">2.5x - 6.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-blue-600">4.0x - 12.0x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Calculation Examples */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-green-600">Side-by-Side Calculation Example</h2>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-3 text-center">Sample Business: Marketing Consultancy</h3>
                <div className="text-sm text-center text-muted-foreground">
                  Annual Revenue: $500,000 • Owner-operated • 2 employees
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* SDE Calculation */}
                <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4 text-green-700 dark:text-green-300 text-center">SDE Calculation</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Net Income (after taxes)</span>
                      <span>$85,000</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>+ Owner's Salary</span>
                      <span>$75,000</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>+ Owner's Health Insurance</span>
                      <span>$8,400</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>+ Owner's Car Payment</span>
                      <span>$7,200</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>+ Personal Travel Expenses</span>
                      <span>$4,200</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>+ One-time Legal Fees</span>
                      <span>$3,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>+ Depreciation</span>
                      <span>$2,200</span>
                    </div>
                    <div className="border-t border-green-300 dark:border-green-700 pt-2 mt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>SDE Total</span>
                        <span>$185,500</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 rounded">
                    <p className="text-center font-semibold text-green-800 dark:text-green-200">
                      Business Valuation
                    </p>
                    <p className="text-center text-2xl font-bold text-green-700 dark:text-green-300">
                      $556,500 - $1,113,000
                    </p>
                    <p className="text-center text-sm text-green-600 dark:text-green-400">
                      (3.0x - 6.0x SDE multiple)
                    </p>
                  </div>
                </div>

                {/* EBITDA Calculation */}
                <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4 text-blue-700 dark:text-blue-300 text-center">EBITDA Calculation</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Net Income (after taxes)</span>
                      <span>$85,000</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span className="line-through">Owner's Salary (not added)</span>
                      <span className="line-through">$0</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span className="line-through">Owner Benefits (not added)</span>
                      <span className="line-through">$0</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span className="line-through">Personal Expenses (not added)</span>
                      <span className="line-through">$0</span>
                    </div>
                    <div className="flex justify-between text-blue-600">
                      <span>+ Interest</span>
                      <span>$0</span>
                    </div>
                    <div className="flex justify-between text-blue-600">
                      <span>+ Taxes</span>
                      <span>$25,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>+ Depreciation</span>
                      <span>$2,200</span>
                    </div>
                    <div className="border-t border-blue-300 dark:border-blue-700 pt-2 mt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>EBITDA Total</span>
                        <span>$112,200</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900 rounded">
                    <p className="text-center font-semibold text-blue-800 dark:text-blue-200">
                      Business Valuation
                    </p>
                    <p className="text-center text-2xl font-bold text-blue-700 dark:text-blue-300">
                      $448,800 - $1,346,400
                    </p>
                    <p className="text-center text-sm text-blue-600 dark:text-blue-400">
                      (4.0x - 12.0x EBITDA multiple)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">Key Difference:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-300">SDE captures true owner benefit:</p>
                    <p className="text-green-600 dark:text-green-400">$185,500 available to new owner-operator</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700 dark:text-blue-300">EBITDA misses owner value:</p>
                    <p className="text-blue-600 dark:text-blue-400">$112,200 doesn't include owner's total compensation</p>
                  </div>
                </div>
                <p className="text-center font-bold text-amber-700 dark:text-amber-300 mt-4">
                  For small businesses, SDE provides 40-65% higher and more accurate baseline for valuation
                </p>
              </div>
            </CardContent>
          </Card>

          {/* When to Use Each */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-green-600">When to Use SDE vs EBITDA</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-600">Use SDE When:</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Owner-Operated Business</p>
                        <p className="text-sm text-muted-foreground">Owner works in the business day-to-day and takes salary plus benefits</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Small to Medium Businesses</p>
                        <p className="text-sm text-muted-foreground">Annual revenue typically $1M - $10M</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Service-Based Industries</p>
                        <p className="text-sm text-muted-foreground">Consulting, agencies, professional services, personal services</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Family/Lifestyle Businesses</p>
                        <p className="text-sm text-muted-foreground">Businesses that support owner's lifestyle with personal benefits</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-600">Use EBITDA When:</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Management-Run Business</p>
                        <p className="text-sm text-muted-foreground">Professional management team runs operations, owner is passive</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Large Businesses</p>
                        <p className="text-sm text-muted-foreground">Annual revenue typically $10M+</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Manufacturing/Capital Intensive</p>
                        <p className="text-sm text-muted-foreground">Significant equipment, facilities, or inventory investments</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Corporate Acquisitions</p>
                        <p className="text-sm text-muted-foreground">Strategic buyer acquisitions, private equity deals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="border-2 border-primary bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950">
            <CardContent className="pt-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Get Accurate SDE-Based Valuation</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                For small businesses, SDE methodology provides more accurate valuations than EBITDA. Our professional tool calculates SDE correctly with all owner benefits and adjustments included.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Complete SDE Calculation</h3>
                  <p className="text-sm text-muted-foreground">All owner benefits included</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Small Business Optimized</h3>
                  <p className="text-sm text-muted-foreground">Perfect for owner-operated businesses</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Professional Results</h3>
                  <p className="text-sm text-muted-foreground">Industry-standard methodology</p>
                </div>
              </div>
              
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-lg px-8 py-4">
                <a href="https://thevaluationgenie.com/" className="inline-flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Start SDE Business Valuation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                Free SDE calculation • More accurate for small businesses • Professional methodology
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}