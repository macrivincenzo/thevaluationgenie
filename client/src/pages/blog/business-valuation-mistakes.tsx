import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, AlertTriangle, DollarSign, TrendingDown, Users, FileX, Clock } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function BusinessValuationMistakes() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-red-700">Critical Mistakes</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Business Valuation Mistakes That Cost Sellers Thousands
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Avoid the 7 most expensive valuation errors that cause business owners to leave money on the table. Learn how proper SDE calculation and market positioning can increase your sale price by 40-60%.
          </p>
          
          {/* CTA Button */}
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 p-6 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Get Accurate Valuation - Avoid Costly Mistakes</h3>
              <p className="text-muted-foreground mb-4">
                Professional business valuation using proven SDE methodology. See your true market value in minutes.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                <Link href="/">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Correct Valuation Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-red-600">The $300,000 Mistake That Shocked Everyone</h2>
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-6 rounded-lg mb-6">
                <p className="mb-4">
                  <strong>Real Case Study:</strong> Sarah owned a thriving marketing consultancy with $180,000 in annual earnings. Her initial "gut feeling" valuation: $300,000. After learning proper SDE methodology and market positioning, her business sold for $720,000 - a $420,000 difference from her original estimate.
                </p>
                <p className="text-sm text-red-700 dark:text-red-300 font-semibold">
                  Don't let valuation mistakes cost you hundreds of thousands. Learn the 7 critical errors below.
                </p>
              </div>
              
              <p className="mb-4">
                Business valuation mistakes are expensive, yet entirely preventable. Small errors in calculating Seller's Discretionary Earnings (SDE) or misunderstanding market multiples can reduce your sale price by 40-60%. This halal-compliant guide reveals the most costly mistakes and shows exactly how to avoid them.
              </p>
            </CardContent>
          </Card>

          {/* Mistake 1 */}
          <Card className="mb-8 border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-red-600">Mistake #1: Incomplete SDE Calculation</h2>
                  <p className="text-lg text-muted-foreground">Cost: $50,000 - $200,000+ in lost sale value</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-700 dark:text-red-300 mb-3">❌ What Sellers Miss:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Owner's full compensation package</li>
                    <li>• Personal expenses run through business</li>
                    <li>• Owner's health insurance & benefits</li>
                    <li>• Personal vehicle expenses</li>
                    <li>• Family member wages (above market)</li>
                    <li>• One-time professional fees</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3">✅ Complete SDE Includes:</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Net profit from tax returns</li>
                    <li>• Owner salary + bonuses + benefits</li>
                    <li>• Personal expenses (travel, meals, etc.)</li>
                    <li>• Above-market family compensation</li>
                    <li>• One-time/unusual expenses</li>
                    <li>• Depreciation & amortization</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Real Example - Consulting Business:</h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="font-medium text-red-600">Incomplete SDE: $120,000</p>
                    <p>• Net Income: $80,000</p>
                    <p>• Owner Salary: $40,000</p>
                    <p className="text-red-600 mt-2">Valuation: $360,000 - $600,000</p>
                  </div>
                  <div>
                    <p className="font-medium text-green-600">Complete SDE: $195,000</p>
                    <p>• Net Income: $80,000</p>
                    <p>• Owner Total Comp: $75,000</p>
                    <p>• Personal Expenses: $25,000</p>
                    <p>• One-time Costs: $15,000</p>
                    <p className="text-green-600 mt-2">Valuation: $585,000 - $975,000</p>
                  </div>
                </div>
                <p className="text-center font-bold text-green-600 mt-4">Difference: $225,000 - $375,000 higher valuation</p>
              </div>
            </CardContent>
          </Card>

          {/* Mistake 2 */}
          <Card className="mb-8 border-l-4 border-l-orange-500">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-orange-600">Mistake #2: Using Wrong Industry Multiples</h2>
                  <p className="text-lg text-muted-foreground">Cost: $100,000 - $500,000+ in lost sale value</p>
                </div>
              </div>
              
              <p className="mb-6">
                Many sellers use outdated or incorrect industry multiples, dramatically undervaluing their business. Professional services often command higher multiples than basic service businesses.
              </p>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-slate-300 dark:border-slate-700">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left">Business Type</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">Wrong Multiple</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">Correct Multiple</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">Impact on $200K SDE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">IT Consulting</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-red-600">2.5x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-green-600">4.2x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center font-bold">+$340,000</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Digital Marketing</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-red-600">3.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-green-600">4.8x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center font-bold">+$360,000</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Business Consulting</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-red-600">2.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center text-green-600">3.6x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center font-bold">+$320,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Why Sellers Use Wrong Multiples:</h4>
                <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                  <li>• Confusing asset-based businesses with service businesses</li>
                  <li>• Using outdated market data from 2020-2022</li>
                  <li>• Applying retail/restaurant multiples to professional services</li>
                  <li>• Ignoring premium factors (recurring revenue, growth, systems)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Mistake 3 */}
          <Card className="mb-8 border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-purple-600">Mistake #3: Ignoring Value Drivers & Risk Factors</h2>
                  <p className="text-lg text-muted-foreground">Cost: $75,000 - $300,000+ in lost sale value</p>
                </div>
              </div>
              
              <p className="mb-6">
                Businesses with strong value drivers can command premium multiples (20-40% above industry average). Conversely, unaddressed risk factors can reduce valuations by 30-50%.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">Value Drivers (Increase Multiple)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span><strong>Recurring Revenue:</strong> +0.5x to +1.0x multiple</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span><strong>Documented Systems:</strong> +0.3x to +0.7x multiple</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span><strong>Diverse Client Base:</strong> +0.2x to +0.5x multiple</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span><strong>Growth Trajectory:</strong> +0.4x to +0.8x multiple</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-600">Risk Factors (Decrease Multiple)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span><strong>Owner Dependency:</strong> -0.5x to -1.5x multiple</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span><strong>Client Concentration:</strong> -0.3x to -0.8x multiple</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span><strong>Declining Revenue:</strong> -0.4x to -1.0x multiple</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span><strong>Poor Documentation:</strong> -0.2x to -0.6x multiple</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Example Impact on $200,000 SDE Business:</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-red-600">High Risk Business</p>
                    <p>Base Multiple: 3.5x</p>
                    <p>Risk Adjustment: -1.0x</p>
                    <p className="font-bold">Final: 2.5x = $500,000</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-blue-600">Average Business</p>
                    <p>Base Multiple: 3.5x</p>
                    <p>No Adjustments</p>
                    <p className="font-bold">Final: 3.5x = $700,000</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-green-600">Premium Business</p>
                    <p>Base Multiple: 3.5x</p>
                    <p>Value Add: +1.2x</p>
                    <p className="font-bold">Final: 4.7x = $940,000</p>
                  </div>
                </div>
                <p className="text-center font-bold text-green-600 mt-4">Premium vs High Risk: $440,000 difference</p>
              </div>
            </CardContent>
          </Card>

          {/* Mistakes 4-7 (Condensed) */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6 text-indigo-600">4 More Critical Mistakes to Avoid</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <FileX className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Mistake #4: Poor Financial Documentation</h3>
                    <p className="text-sm text-muted-foreground mb-2">Missing or inconsistent financial records reduce buyer confidence and lower offers by 15-25%.</p>
                    <p className="text-sm"><strong>Solution:</strong> 3+ years of clean financial statements, tax returns, and SDE calculations.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Mistake #5: Wrong Timing for Sale</h3>
                    <p className="text-sm text-muted-foreground mb-2">Selling during business downturns or personal stress reduces valuations by 20-35%.</p>
                    <p className="text-sm"><strong>Solution:</strong> Plan sale during growth periods with 6-12 months preparation time.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Mistake #6: Limited Marketing to Buyers</h3>
                    <p className="text-sm text-muted-foreground mb-2">Reaching only local buyers or single broker reduces competitive bidding and final price.</p>
                    <p className="text-sm"><strong>Solution:</strong> Multi-channel marketing to qualified strategic and financial buyers nationally.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Mistake #7: Accepting First Offer</h3>
                    <p className="text-sm text-muted-foreground mb-2">First offers typically 15-30% below market value. Many sellers accept out of fear or urgency.</p>
                    <p className="text-sm"><strong>Solution:</strong> Professional valuation establishes minimum acceptable price and negotiation baseline.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="border-2 border-primary bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
            <CardContent className="pt-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Don't Leave Money on the Table</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get a professional business valuation that avoids all 7 critical mistakes. Our SDE-based methodology ensures you see your true market value and position for maximum sale price.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Complete SDE Calculation</h3>
                  <p className="text-sm text-muted-foreground">All adjustments included</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingDown className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Correct Industry Multiples</h3>
                  <p className="text-sm text-muted-foreground">2025 market data</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Value Driver Analysis</h3>
                  <p className="text-sm text-muted-foreground">Premium multiple factors</p>
                </div>
              </div>
              
              <Button asChild size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-lg px-8 py-4">
                <Link href="/">
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Accurate Valuation - Avoid Mistakes
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                Free estimate in 10 minutes • No registration required • Professional methodology
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}