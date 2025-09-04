import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, TrendingUp, Users, ChefHat, MapPin, Star, Utensils, Clock } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogSEO, InternalLinks, FAQSchema } from "@/components/seo/BlogSEO";

export default function RestaurantValuationGuide() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Restaurant Business Valuation: Complete 2025 Guide",
    "description": "Master restaurant valuation using industry-specific SDE multiples, location factors, and operational metrics. Learn how to value quick-service, casual dining, and fine dining establishments accurately.",
    "author": { "@type": "Organization", "name": "ValuationGenie" },
    "publisher": { "@type": "Organization", "name": "ValuationGenie", "url": "https://thevaluationgenie.com" },
    "datePublished": "2025-01-17",
    "dateModified": "2025-01-22",
    "url": "https://thevaluationgenie.com/blog/restaurant-valuation-guide"
  };

  const seoData = {
    title: "Restaurant Business Valuation: Complete 2025 Guide | SDE Method & Industry Multiples",
    description: "Master restaurant valuation using industry-specific SDE multiples, location factors, and operational metrics. Learn how to value quick-service, casual dining, and fine dining establishments accurately.",
    keywords: "restaurant business valuation, restaurant valuation multiples, how to value restaurant business, food service business valuation, restaurant SDE calculation",
    url: "https://thevaluationgenie.com/blog/restaurant-valuation-guide"
  };

  const internalLinks = [
    { href: "/blog/business-valuation-calculator", text: "Free Business Valuation Calculator", category: "Valuation Tools" },
    { href: "/blog/sde-business-valuation-guide", text: "Complete SDE Valuation Guide", category: "Valuation Tools" },
    { href: "/blog/industry-valuation-multiples-2025", text: "2025 Industry Multiples", category: "Valuation Tools" },
    { href: "/blog/business-valuation-mistakes", text: "Avoid Costly Valuation Mistakes", category: "Expert Guidance" },
    { href: "/blog/how-to-value-service-business", text: "Service Business Valuation", category: "Expert Guidance" },
    { href: "/blog/small-business-sale-preparation", text: "Business Sale Preparation", category: "Expert Guidance" }
  ];

  const faqData = [
    {
      question: "What is the typical valuation multiple for restaurants?",
      answer: "Restaurants typically sell for 1.5x-3.0x SDE depending on type, location, and operational efficiency. Quick-service restaurants often command higher multiples (2.0x-3.0x) while full-service restaurants range from 1.5x-2.5x."
    },
    {
      question: "How do you calculate SDE for a restaurant?",
      answer: "Restaurant SDE = Net Income + Owner Salary + Benefits + Personal Expenses + One-time Costs + Interest + Taxes + Depreciation + Amortization. Include all owner perks like meals, auto expenses, and family member wages."
    },
    {
      question: "What factors increase restaurant valuation multiples?",
      answer: "Prime location, strong brand recognition, consistent profitability, long-term lease, diverse revenue streams, documented systems, and minimal owner dependence can increase multiples by 20-50%."
    },
    {
      question: "How important is location in restaurant valuation?",
      answer: "Location is critical - prime locations with high foot traffic can increase valuations by 30-60%. Consider demographics, competition, visibility, parking, and lease terms when evaluating location value."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <BlogSEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        url={seoData.url}
        schemaMarkup={schemaMarkup}
      />
      <FAQSchema faqs={faqData} />
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-700">Industry Specific</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Restaurant Business Valuation: Complete 2025 Guide
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Master restaurant valuation using industry-specific SDE multiples, location factors, and operational metrics. Learn how to value quick-service, casual dining, and fine dining establishments accurately.
          </p>
          
          {/* CTA Button */}
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 p-6 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Get Your Restaurant Valuation</h3>
              <p className="text-muted-foreground mb-4">
                Professional restaurant valuation using industry-specific methodology. Results in 10 minutes.
              </p>
              <Link href="/">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <ChefHat className="w-5 h-5 mr-2" />
                  Value My Restaurant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-orange-600">Restaurant Valuation: Location is King</h2>
              <p className="mb-4">
                Restaurant businesses are unique in the valuation world due to their dependency on location, local demographics, and operational complexity. Unlike other businesses, restaurants require specialized valuation approaches that account for lease terms, equipment depreciation, and market positioning.
              </p>
              
              <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                  Restaurant Valuation Reality
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Quick Service (QSR)</p>
                    <p className="text-muted-foreground">$800K revenue, $120K SDE</p>
                    <p className="font-bold text-green-600">Typical Value: $300K - $480K</p>
                  </div>
                  <div>
                    <p className="font-medium">Full Service Restaurant</p>
                    <p className="text-muted-foreground">$1.2M revenue, $180K SDE</p>
                    <p className="font-bold text-green-600">Typical Value: $360K - $720K</p>
                  </div>
                </div>
              </div>
              
              <p className="mt-4">
                Restaurant SDE calculation requires careful attention to owner compensation, food costs, and lease obligations. This halal-compliant approach ensures accurate cash flow assessment without debt-based adjustments.
              </p>
            </CardContent>
          </Card>

          {/* Restaurant-Specific SDE */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-orange-600">Restaurant SDE Calculation: Industry Adjustments</h2>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-3">Restaurant SDE Formula:</h3>
                <div className="space-y-2 text-sm font-mono">
                  <p>Net Income (After Taxes)</p>
                  <p>+ Owner's Salary & Benefits</p>
                  <p>+ Owner's Personal Expenses</p>
                  <p>+ Family Labor (Above Market Rate)</p>
                  <p className="text-orange-600">+ Manager Salary (if owner-operated)</p>
                  <p className="text-orange-600">+ Personal Meals & Entertainment</p>
                  <p className="text-orange-600">+ One-time Setup/Renovation Costs</p>
                  <p>+ Depreciation & Amortization</p>
                  <p className="border-t pt-2 font-bold">= Restaurant SDE</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Common Restaurant Adjustments:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <ChefHat className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Family Labor Costs</p>
                      <p className="text-sm text-muted-foreground">Spouse, children working above market wages</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Utensils className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Owner Meals & Beverages</p>
                      <p className="text-sm text-muted-foreground">Personal consumption, family meals</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Entertainment Expenses</p>
                      <p className="text-sm text-muted-foreground">Personal events, excessive promotional costs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Pre-Opening Expenses</p>
                      <p className="text-sm text-muted-foreground">Marketing, training, grand opening costs</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Restaurant Type Multiples */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-orange-600">2025 Restaurant Valuation Multiples</h2>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-slate-300 dark:border-slate-700">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left">Restaurant Type</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">SDE Multiple Range</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">Average Multiple</th>
                      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">Revenue Multiple</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Quick Service (QSR/Fast Food)</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">2.5x - 4.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">3.2x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">0.4x - 0.7x</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Fast Casual</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">2.8x - 4.5x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">3.6x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">0.5x - 0.9x</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Casual Dining</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">2.0x - 4.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">3.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">0.3x - 0.8x</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Fine Dining</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">1.5x - 3.5x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">2.5x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">0.2x - 0.6x</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Franchise Location</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">3.0x - 5.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">4.0x</td>
                      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-center">0.6x - 1.2x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Restaurant Multiple Adjustment Factors:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-red-700 dark:text-red-300">
                  <ul className="space-y-1">
                    <li>• <strong>Prime location:</strong> +0.5x - +1.0x multiple</li>
                    <li>• <strong>Long-term lease (10+ years):</strong> +0.3x - +0.7x</li>
                    <li>• <strong>Established reputation:</strong> +0.2x - +0.5x</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• <strong>Short lease (under 3 years):</strong> -0.5x - -1.0x</li>
                    <li>• <strong>High rent burden (over 10%):</strong> -0.3x - -0.8x</li>
                    <li>• <strong>Declining sales trend:</strong> -0.5x - -1.2x</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Factors */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-orange-600">Critical Location & Lease Factors</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">Prime Location Indicators</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">High Traffic Count</p>
                        <p className="text-sm text-muted-foreground">25,000+ vehicles per day for casual dining</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Dense Demographics</p>
                        <p className="text-sm text-muted-foreground">Population density 3,000+ per square mile</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Complementary Businesses</p>
                        <p className="text-sm text-muted-foreground">Retail centers, office buildings, entertainment</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-red-600">Location Risk Factors</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Short Lease Terms</p>
                        <p className="text-sm text-muted-foreground">Less than 5 years remaining significantly impacts value</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">High Rent Burden</p>
                        <p className="text-sm text-muted-foreground">Rent over 8-10% of gross revenue</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Declining Area</p>
                        <p className="text-sm text-muted-foreground">Neighborhood deterioration, business closures</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-amber-800 dark:text-amber-200">Lease Analysis Impact on Valuation</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-green-700 dark:text-green-300">Excellent Lease</p>
                    <p>• 15+ years remaining</p>
                    <p>• Rent &lt; 6% of revenue</p>
                    <p>• Prime location</p>
                    <p className="font-bold text-green-600">+20% to +40% value</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-blue-700 dark:text-blue-300">Average Lease</p>
                    <p>• 5-10 years remaining</p>
                    <p>• Rent 6-8% of revenue</p>
                    <p>• Decent location</p>
                    <p className="font-bold text-blue-600">Standard multiple</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-red-700 dark:text-red-300">Poor Lease</p>
                    <p>• Under 3 years left</p>
                    <p>• Rent &gt; 10% of revenue</p>
                    <p>• Declining location</p>
                    <p className="font-bold text-red-600">-30% to -50% value</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real Valuation Example */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4 text-orange-600">Restaurant Valuation Example</h2>
              
              <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Case Study: Fast Casual Restaurant</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-3">Financial Profile:</h4>
                    <div className="space-y-2 text-sm">
                      <p>Annual Revenue: $950,000</p>
                      <p>Food Costs: $285,000 (30%)</p>
                      <p>Labor Costs: $285,000 (30%)</p>
                      <p>Rent: $66,500 (7%)</p>
                      <p>Other Operating: $142,500</p>
                      <p>Net Income: $171,000</p>
                      <p>Owner Salary: $0 (works full-time)</p>
                      <p>Owner Benefits: $12,000</p>
                      <p className="border-t pt-2 font-bold">SDE: $183,000</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Location & Operations:</h4>
                    <div className="space-y-2 text-sm">
                      <p>✓ High-traffic shopping center</p>
                      <p>✓ 8 years remaining on lease</p>
                      <p>✓ Rent only 7% of gross revenue</p>
                      <p>✓ Established customer base (4 years)</p>
                      <p>✓ Growing suburban market</p>
                      <p>✓ Owner-operated, trained staff</p>
                      <p className="border-t pt-2 font-bold text-green-600">Multiple: 4.2x (premium)</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-4 rounded border">
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">Restaurant Valuation: $768,600</p>
                    <p className="text-sm text-muted-foreground">($183,000 SDE × 4.2x premium multiple)</p>
                    <p className="text-sm mt-2">Revenue Multiple: 0.81x • Strong Location Premium • Established Operations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <InternalLinks 
            title="Restaurant Valuation Resources"
            links={internalLinks}
          />

          {/* Call to Action */}
          <Card className="border-2 border-primary bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
            <CardContent className="pt-6 text-center">
              <h2 className="text-3xl font-bold mb-4">Value Your Restaurant Business Today</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get a professional restaurant valuation using industry-specific SDE methodology and location factors. Our tool accounts for lease terms, operational metrics, and market positioning.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ChefHat className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Restaurant-Specific</h3>
                  <p className="text-sm text-muted-foreground">QSR, casual, fine dining multiples</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Location Analysis</h3>
                  <p className="text-sm text-muted-foreground">Lease terms and location factors</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Complete SDE Method</h3>
                  <p className="text-sm text-muted-foreground">Family labor and owner adjustments</p>
                </div>
              </div>
              
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-lg px-8 py-4">
                <a href="/" className="inline-flex items-center">
                  <ChefHat className="w-5 h-5 mr-2" />
                  Get Restaurant Valuation Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                Free estimate • Restaurant-specific methodology • Location factors included
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}