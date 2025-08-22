import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, TrendingUp, ShoppingCart, Package, Truck, Globe, DollarSign } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function EcommerceBusinessValuation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-700">E-commerce Guide</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            E-commerce Business Valuation: Complete 2025 Methods Guide
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Master e-commerce business valuation using SDE multiples, revenue-based methods, and digital asset assessment. Learn platform-specific valuation strategies for Amazon FBA, Shopify, and marketplace businesses.
          </p>
          
          {/* CTA Button */}
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Get Your E-commerce Business Valuation</h3>
              <p className="text-muted-foreground mb-4">
                Professional valuation for online stores, Amazon businesses, and digital commerce. Results in 10 minutes.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <a href="https://thevaluationgenie.com/" className="inline-flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Value My E-commerce Business
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600">E-commerce Valuation: Different Rules, Higher Multiples</h2>
              <p className="mb-4">
                E-commerce businesses command premium valuations compared to traditional retail due to scalability, lower overhead, and global reach. The average e-commerce business sells for 3.5x - 8.0x SDE, significantly higher than brick-and-mortar stores at 1.5x - 3.0x.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  E-commerce Valuation Reality
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Amazon FBA Business</p>
                    <p className="text-muted-foreground">$500K revenue, $150K SDE</p>
                    <p className="font-bold text-green-600">Typical Value: $750K - $1.2M</p>
                  </div>
                  <div>
                    <p className="font-medium">Shopify Store</p>
                    <p className="text-muted-foreground">$300K revenue, $90K SDE</p>
                    <p className="font-bold text-green-600">Typical Value: $315K - $720K</p>
                  </div>
                </div>
              </div>
              
              <p className="mt-4">
                This halal-compliant valuation approach focuses on actual cash flow and operational profit rather than debt-leveraged returns, making it ideal for ethical business assessment.
              </p>
            </CardContent>
          </Card>

          {/* E-commerce Specific SDE Calculation */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">E-commerce SDE Calculation: Unique Adjustments</h2>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-3">Standard SDE Formula + E-commerce Specific Items:</h3>
                <div className="space-y-2 text-sm font-mono">
                  <p>Net Income (After Taxes)</p>
                  <p>+ Owner's Salary & Benefits</p>
                  <p>+ Owner's Personal Expenses</p>
                  <p>+ One-time Setup/Launch Costs</p>
                  <p className="text-blue-600">+ Excessive Inventory Purchases</p>
                  <p className="text-blue-600">+ Platform Setup & Design Costs</p>
                  <p className="text-blue-600">+ Owner's Time (if not paid salary)</p>
                  <p className="border-t pt-2 font-bold">= E-commerce SDE</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">E-commerce Specific Adjustments:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Inventory Normalization</p>
                      <p className="text-sm text-muted-foreground">Adjust for seasonal stocking or excess inventory purchases</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Platform & Tool Costs</p>
                      <p className="text-sm text-muted-foreground">Shopify, advertising tools, analytics platforms</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Shipping & Fulfillment</p>
                      <p className="text-sm text-muted-foreground">Amazon FBA fees, 3PL costs, shipping optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Advertising Spend Optimization</p>
                      <p className="text-sm text-muted-foreground">Adjust for learning curve and optimization potential</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform-Specific Multiples */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">2025 E-commerce Platform Multiples</h2>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-slate-300 dark:border-slate-700">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left">Platform/Type</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">SDE Multiple Range</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">Average Multiple</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">Revenue Multiple</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Amazon FBA (Branded)</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">4.5x - 8.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">6.2x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">1.8x - 3.2x</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Shopify Store (Branded)</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">3.5x - 6.5x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">5.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">1.2x - 2.8x</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">WooCommerce/WordPress</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">3.0x - 5.5x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">4.2x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">1.0x - 2.2x</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Multi-Channel (Amazon + Own Site)</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">4.0x - 7.5x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">5.8x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">1.5x - 3.0x</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Dropshipping Business</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">2.5x - 4.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">3.2x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">0.8x - 1.5x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Premium Multiple Factors for E-commerce:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-700 dark:text-indigo-300">
                  <ul className="space-y-1">
                    <li>• Strong brand recognition (+0.5x - 1.0x)</li>
                    <li>• Repeat customer base 40%+ (+0.3x - 0.7x)</li>
                    <li>• Proprietary products/patents (+0.5x - 1.2x)</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Diversified traffic sources (+0.2x - 0.5x)</li>
                    <li>• Email list 10K+ subscribers (+0.2x - 0.4x)</li>
                    <li>• Automated systems/processes (+0.3x - 0.6x)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Valuation Example */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Real E-commerce Valuation Example</h2>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Case Study: Amazon FBA Supplement Brand</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-3">Business Metrics:</h4>
                    <div className="space-y-2 text-sm">
                      <p>Annual Revenue: $680,000</p>
                      <p>Cost of Goods: $272,000 (40%)</p>
                      <p>Amazon Fees: $95,200 (14%)</p>
                      <p>Advertising: $68,000 (10%)</p>
                      <p>Other Expenses: $47,600</p>
                      <p>Net Income: $197,200</p>
                      <p className="border-t pt-2 font-bold">SDE: $197,200</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Value Drivers:</h4>
                    <div className="space-y-2 text-sm">
                      <p>✓ Strong brand (5-star avg rating)</p>
                      <p>✓ 3 complementary products</p>
                      <p>✓ 35% repeat customer rate</p>
                      <p>✓ Trademark ownership</p>
                      <p>✓ Diversified keywords (top 10)</p>
                      <p>✓ 18 months consistent growth</p>
                      <p className="border-t pt-2 font-bold text-green-600">Premium Multiple: 6.8x</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-4 rounded border">
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">Business Valuation: $1,341,000</p>
                    <p className="text-sm text-muted-foreground">($197,200 SDE × 6.8x multiple)</p>
                    <p className="text-sm mt-2">Revenue Multiple: 1.97x • Asset-Light Model • High Scalability</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* E-commerce Specific Considerations */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">E-commerce Valuation Considerations</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">Unique Advantages</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Global Market Access</p>
                        <p className="text-sm text-muted-foreground">Reach customers worldwide without physical presence</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Scalability</p>
                        <p className="text-sm text-muted-foreground">Revenue can grow without proportional expense increases</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Asset-Light Model</p>
                        <p className="text-sm text-muted-foreground">No physical stores, lower overhead costs</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-amber-600">Key Risk Factors</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <ShoppingCart className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Platform Dependency</p>
                        <p className="text-sm text-muted-foreground">Amazon policy changes can impact business overnight</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Competition & Ad Costs</p>
                        <p className="text-sm text-muted-foreground">Rising advertising costs and easy market entry</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Supply Chain Risks</p>
                        <p className="text-sm text-muted-foreground">Inventory management and supplier reliability</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="border-2 border-primary bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardContent className="pt-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Value Your E-commerce Business Today</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get a professional e-commerce valuation using platform-specific multiples and SDE methodology. Our tool accounts for unique e-commerce factors and provides accurate market valuations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Platform-Specific</h3>
                  <p className="text-sm text-muted-foreground">Amazon FBA, Shopify, multi-channel</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold mb-2">E-commerce SDE Method</h3>
                  <p className="text-sm text-muted-foreground">Adjusted for digital assets</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Premium Multiples</h3>
                  <p className="text-sm text-muted-foreground">Brand value and growth factors</p>
                </div>
              </div>
              
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4">
                <a href="https://thevaluationgenie.com/" className="inline-flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Get E-commerce Valuation Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                Free estimate • Platform-specific methodology • Professional results in 10 minutes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}