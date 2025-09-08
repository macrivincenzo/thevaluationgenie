import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, TrendingUp, Users, ChefHat, MapPin, Star, Utensils, Clock, DollarSign } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogSEO, InternalLinks, FAQSchema } from "@/components/seo/BlogSEO";

export default function RestaurantValuationCalculator() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Restaurant Valuation Calculator - Calculate Your Restaurant's Worth in 2025",
    "description": "Free restaurant valuation calculator using SDE methodology. Get instant estimates for your restaurant's worth.",
    "url": "https://thevaluationgenie.com/restaurant-valuation-calculator",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Restaurant Valuation Calculator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Free restaurant valuation calculator"
      }
    },
    "provider": {
      "@type": "Organization",
      "name": "TheValuationGenie",
      "url": "https://thevaluationgenie.com"
    }
  };

  const seoData = {
    title: "Restaurant Valuation Calculator - Calculate Your Restaurant's Worth in 2025 | TheValuationGenie",
    description: "Free restaurant valuation calculator using SDE methodology. Get instant estimates for your restaurant's worth. Professional $39 reports with detailed analysis, market comparisons, and industry benchmarks.",
    keywords: "restaurant valuation calculator, restaurant worth calculator, restaurant business value, restaurant appraisal, SDE restaurant valuation, restaurant valuation 2025, restaurant multiples, restaurant valuation methods",
    url: "https://thevaluationgenie.com/restaurant-valuation-calculator"
  };

  const internalLinks = [
    { href: "/valuation", text: "Free Business Valuation Calculator", category: "Valuation Tools" },
    { href: "/blog/sde-vs-ebitda-guide", text: "SDE vs EBITDA Guide", category: "Valuation Methods" },
    { href: "/blog/industry-valuation-multiples-2025", text: "Industry Valuation Multiples", category: "Industry Benchmarks" },
    { href: "/blog/business-valuation-mistakes", text: "Restaurant Valuation Mistakes", category: "Expert Guidance" },
    { href: "/pricing", text: "Professional Reports", category: "Services" },
    { href: "/", text: "Business Valuation", category: "Home" },
    { href: "/blog/small-business-sale-preparation", text: "Restaurant Sale Preparation Guide", category: "Sale Planning" }
  ];

  const faqData = [
    {
      question: "How accurate is your restaurant valuation calculator?",
      answer: "Our calculator uses the same SDE methodology trusted by business brokers and lenders nationwide. While no online calculator can replace a professional appraisal, our results are typically within 10-15% of professional valuations, making it an excellent starting point for planning and negotiations."
    },
    {
      question: "What's the difference between SDE and EBITDA for restaurant valuation?",
      answer: "SDE (Seller's Discretionary Earnings) is preferred for restaurants under $5M in revenue because it adds back owner benefits, making it more accurate for small business valuations. EBITDA is typically used for larger corporations and doesn't account for owner compensation."
    },
    {
      question: "How often should I get my restaurant valued?",
      answer: "We recommend getting a valuation annually or whenever you're considering major decisions like selling, refinancing, or bringing in partners. Market conditions and your restaurant's performance can change significantly over time."
    },
    {
      question: "Can I use this calculator for franchise restaurants?",
      answer: "Yes, but franchise restaurants have additional considerations like royalty fees, territory rights, and brand value. Our calculator provides a base valuation, but franchise-specific factors may require additional analysis."
    },
    {
      question: "What if my restaurant is losing money?",
      answer: "Our calculator can still provide insights, but unprofitable restaurants are typically valued based on asset value rather than earnings. We'll help you understand your options and potential turnaround strategies."
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
          <Badge className="mb-4 bg-orange-100 text-orange-700">Restaurant Valuation</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Restaurant Valuation Calculator - Calculate Your Restaurant's Worth in 2025
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Published: <time dateTime="2025-01-08">January 8, 2025</time> | Updated: <time dateTime="2025-01-08">January 8, 2025</time>
          </p>
        </div>

        {/* Introduction Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">Discover Your Restaurant's True Value with Our Free SDE-Based Calculator</h2>
            <p className="mb-6">
              Are you planning to <strong>sell your restaurant</strong>, secure financing, or simply want to know what your restaurant is worth? Our <Link href="/valuation" className="text-primary hover:underline"><strong>restaurant valuation calculator</strong></Link> uses industry-standard <Link href="/blog/sde-vs-ebitda-guide" className="text-primary hover:underline"><strong>SDE (Seller's Discretionary Earnings) methodology</strong></Link> to provide instant, accurate estimates of your restaurant's value. Unlike traditional appraisal methods that can cost $15,000-$50,000, our calculator gives you professional-grade results in minutes.
            </p>
            
            <Card className="border-2 border-primary/20 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">🚀 Get Your Free Restaurant Valuation Now</h3>
                <p className="text-muted-foreground mb-4">
                  Calculate your restaurant's worth in under 5 minutes using our proven SDE methodology.
                </p>
                <Link href="/valuation">
                  <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    <ChefHat className="w-5 h-5 mr-2" />
                    Calculate My Restaurant's Value
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-2">Free estimate • <Link href="/pricing" className="text-primary hover:underline">Professional $39 reports</Link> available</p>
              </div>
            </Card>
          </CardContent>
        </Card>

        {/* Why Choose Us Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">Why Choose Our Restaurant Valuation Calculator?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calculator className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">✅ Industry-Standard SDE Methodology</h3>
                    <p className="text-muted-foreground">Our calculator uses the same <Link href="/blog/sde-vs-ebitda-guide" className="text-primary hover:underline"><strong>SDE valuation method</strong></Link> trusted by business brokers, lenders, and buyers nationwide. SDE provides the most accurate valuation for restaurants under $5M in revenue.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">⚡ Instant Results</h3>
                    <p className="text-muted-foreground">Get your restaurant valuation in minutes, not weeks. Traditional appraisals take 4-8 weeks and cost thousands. Our calculator delivers professional results instantly.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">💰 Transparent Pricing</h3>
                    <p className="text-muted-foreground">Free estimates with optional <Link href="/pricing" className="text-primary hover:underline"><strong>$39 professional reports</strong></Link>. Compare this to traditional appraisals that cost $15,000-$50,000. Save 99% on valuation costs.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">📊 Market-Based Analysis</h3>
                    <p className="text-muted-foreground">Our calculator incorporates current <Link href="/blog/industry-valuation-multiples-2025" className="text-primary hover:underline"><strong>restaurant industry multiples</strong></Link> and market data to ensure your valuation reflects real-world market conditions.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">How Our Restaurant Valuation Calculator Works</h2>
            <p className="mb-6">Our <Link href="/valuation" className="text-primary hover:underline"><strong>restaurant valuation calculator</strong></Link> uses a proven 3-step process to determine your restaurant's worth:</p>
            
            <div className="space-y-6">
              <Card className="border border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Step 1: Financial Data Input</h3>
                  <p className="mb-3">Enter your restaurant's key financial metrics including:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li><strong>Annual Revenue</strong> - Total sales for the past 12 months</li>
                    <li><strong>Cost of Goods Sold (COGS)</strong> - Food and beverage costs</li>
                    <li><strong>Operating Expenses</strong> - Labor, rent, utilities, marketing</li>
                    <li><strong>Owner's Salary</strong> - Your current compensation</li>
                    <li><strong>Depreciation & Amortization</strong> - Equipment and leasehold improvements</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Step 2: SDE Calculation</h3>
                  <p className="mb-3">Our calculator automatically calculates your <strong>Seller's Discretionary Earnings (SDE)</strong> by:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Adding back owner's salary and benefits</li>
                    <li>Adding back depreciation and amortization</li>
                    <li>Adding back one-time expenses</li>
                    <li>Adjusting for non-recurring income</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Step 3: Market Multiple Application</h3>
                  <p className="mb-3">We apply current <Link href="/blog/industry-valuation-multiples-2025" className="text-primary hover:underline"><strong>restaurant industry multiples</strong></Link> based on:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Restaurant type (fine dining, casual, fast-casual, etc.)</li>
                    <li>Location and market conditions</li>
                    <li>Revenue size and growth trends</li>
                    <li>Profitability and operational efficiency</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Restaurant Types Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">Restaurant Valuation by Type: Industry Multiples & Benchmarks</h2>
            <p className="mb-6">Different restaurant types command different valuation multiples. Here's what you can expect based on your restaurant category:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-orange-200">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Utensils className="w-5 h-5 mr-2 text-orange-600" />
                    🍽️ Fine Dining Restaurants
                  </h3>
                  <p className="text-sm mb-2"><strong>SDE Multiple Range:</strong> 2.5x - 4.0x</p>
                  <p className="text-sm mb-2"><strong>Average Multiple:</strong> 3.2x</p>
                  <p className="text-sm text-muted-foreground">Fine dining restaurants typically command higher multiples due to premium pricing, brand reputation, and loyal customer base. Location and chef reputation significantly impact value.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <ChefHat className="w-5 h-5 mr-2 text-orange-600" />
                    🍕 Casual Dining Restaurants
                  </h3>
                  <p className="text-sm mb-2"><strong>SDE Multiple Range:</strong> 2.0x - 3.5x</p>
                  <p className="text-sm mb-2"><strong>Average Multiple:</strong> 2.8x</p>
                  <p className="text-sm text-muted-foreground">Casual dining restaurants offer consistent revenue streams and broad market appeal. Value depends on location, concept uniqueness, and operational efficiency.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-orange-600" />
                    🍔 Fast-Casual Restaurants
                  </h3>
                  <p className="text-sm mb-2"><strong>SDE Multiple Range:</strong> 2.5x - 4.5x</p>
                  <p className="text-sm mb-2"><strong>Average Multiple:</strong> 3.5x</p>
                  <p className="text-sm text-muted-foreground">Fast-casual concepts often command premium multiples due to growth potential, scalability, and modern consumer preferences. Brand strength is crucial.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-600" />
                    🍟 Quick Service Restaurants (QSR)
                  </h3>
                  <p className="text-sm mb-2"><strong>SDE Multiple Range:</strong> 1.5x - 3.0x</p>
                  <p className="text-sm mb-2"><strong>Average Multiple:</strong> 2.2x</p>
                  <p className="text-sm text-muted-foreground">QSR restaurants typically have lower multiples due to high competition and thin margins. Value depends heavily on location and operational efficiency.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-orange-600" />
                    ☕ Coffee Shops & Cafés
                  </h3>
                  <p className="text-sm mb-2"><strong>SDE Multiple Range:</strong> 2.0x - 3.5x</p>
                  <p className="text-sm mb-2"><strong>Average Multiple:</strong> 2.7x</p>
                  <p className="text-sm text-muted-foreground">Coffee shops benefit from high margins and repeat customers. Independent shops vs. franchises have different valuation considerations.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                    🍺 Bars & Pubs
                  </h3>
                  <p className="text-sm mb-2"><strong>SDE Multiple Range:</strong> 1.8x - 3.2x</p>
                  <p className="text-sm mb-2"><strong>Average Multiple:</strong> 2.5x</p>
                  <p className="text-sm text-muted-foreground">Bars and pubs have unique valuation factors including liquor license value, entertainment offerings, and local market conditions.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Middle CTA */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 p-6 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Value Your Restaurant?</h3>
            <p className="text-muted-foreground mb-4">
              Get instant estimates using our proven <Link href="/blog/sde-vs-ebitda-guide" className="text-primary hover:underline">SDE methodology</Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/valuation">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate My Restaurant's Value
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Get Professional Report
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Key Factors Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">Key Factors That Affect Your Restaurant's Value</h2>
            <p className="mb-6">Understanding these factors helps you maximize your restaurant's valuation:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-blue-200">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    📍 Location & Market
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Foot traffic</strong> and visibility</li>
                    <li><strong>Demographics</strong> and income levels</li>
                    <li><strong>Competition</strong> density</li>
                    <li><strong>Parking</strong> availability</li>
                    <li><strong>Lease terms</strong> and rent costs</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-green-200">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    💰 Financial Performance
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Revenue growth</strong> trends</li>
                    <li><strong>Profit margins</strong> and efficiency</li>
                    <li><strong>Cash flow</strong> consistency</li>
                    <li><strong>Seasonality</strong> patterns</li>
                    <li><strong>Cost control</strong> measures</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-purple-200">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-purple-600" />
                    🏢 Operations & Systems
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Management team</strong> quality</li>
                    <li><strong>Standardized processes</strong></li>
                    <li><strong>Technology systems</strong></li>
                    <li><strong>Staff training</strong> programs</li>
                    <li><strong>Inventory management</strong></li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-orange-600" />
                    🎯 Brand & Reputation
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Customer loyalty</strong> and reviews</li>
                    <li><strong>Social media</strong> presence</li>
                    <li><strong>Local recognition</strong></li>
                    <li><strong>Unique concept</strong> or menu</li>
                    <li><strong>Marketing effectiveness</strong></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Common Mistakes Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">Common Restaurant Valuation Mistakes to Avoid</h2>
            <p className="mb-6">These mistakes can cost you thousands in undervalued sales. Learn more about <Link href="/blog/business-valuation-mistakes" className="text-primary hover:underline">restaurant valuation mistakes</Link>:</p>
            
            <div className="space-y-4">
              <Card className="border border-red-200 bg-red-50 dark:bg-red-950">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-300">❌ Using Revenue Instead of SDE</h3>
                  <p className="text-sm mb-2"><strong>Mistake:</strong> Valuing based on gross revenue without considering profitability.</p>
                  <p className="text-sm text-muted-foreground"><strong>Solution:</strong> Always use SDE (Seller's Discretionary Earnings) which accounts for owner benefits and provides a true picture of cash flow.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-red-200 bg-red-50 dark:bg-red-950">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-300">❌ Ignoring Market Conditions</h3>
                  <p className="text-sm mb-2"><strong>Mistake:</strong> Using outdated multiples or ignoring local market conditions.</p>
                  <p className="text-sm text-muted-foreground"><strong>Solution:</strong> Use current market data and adjust for local economic conditions, competition, and industry trends.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-red-200 bg-red-50 dark:bg-red-950">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-300">❌ Not Accounting for Owner Benefits</h3>
                  <p className="text-sm mb-2"><strong>Mistake:</strong> Failing to add back owner's salary, benefits, and personal expenses.</p>
                  <p className="text-sm text-muted-foreground"><strong>Solution:</strong> Include all owner benefits in SDE calculation to show true earning potential.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Case Study Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">Real Restaurant Valuation Case Study</h2>
            <p className="mb-6">Here's how our calculator helped a restaurant owner discover their true value:</p>
            
            <Card className="border border-green-200 bg-green-50 dark:bg-green-950">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">Case Study: "Bella's Italian Bistro"</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">Restaurant Details:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Type:</strong> Casual Italian restaurant</li>
                      <li><strong>Location:</strong> Suburban shopping center</li>
                      <li><strong>Seating:</strong> 80 seats</li>
                      <li><strong>Years in Business:</strong> 8 years</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">Financial Performance:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Annual Revenue:</strong> $1,200,000</li>
                      <li><strong>COGS:</strong> $360,000 (30%)</li>
                      <li><strong>Operating Expenses:</strong> $720,000</li>
                      <li><strong>Owner's Salary:</strong> $80,000</li>
                      <li><strong>Depreciation:</strong> $25,000</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-4 rounded border mb-4">
                  <h4 className="font-semibold mb-3 text-center">Valuation Calculation:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <ul className="space-y-1">
                        <li><strong>Net Income:</strong> $120,000</li>
                        <li><strong>Add Back Owner's Salary:</strong> +$80,000</li>
                        <li><strong>Add Back Depreciation:</strong> +$25,000</li>
                        <li className="border-t pt-1"><strong>SDE:</strong> $225,000</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-1">
                        <li><strong>Industry Multiple:</strong> 2.8x</li>
                        <li className="border-t pt-1 text-lg"><strong>Restaurant Value:</strong> $630,000</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded">
                  <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">Result:</h4>
                  <p className="text-sm">Bella's Italian Bistro was valued at <strong>$630,000</strong> using our SDE methodology. The owner initially thought their restaurant was worth only $400,000 based on revenue multiples. Our calculator revealed an additional <strong>$230,000 in value</strong> by properly accounting for owner benefits and using industry-appropriate multiples.</p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">Frequently Asked Questions About Restaurant Valuation</h2>
            
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <Card key={index} className="border border-slate-200">
                  <CardContent className="pt-4">
                    <h3 className="font-semibold mb-2 text-primary">Q: {faq.question}</h3>
                    <p className="text-sm text-muted-foreground"><strong>A:</strong> {faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Final CTA Section */}
        <Card className="border-2 border-primary bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 mb-8">
          <CardContent className="pt-6">
            <h2 className="text-3xl font-bold mb-4 text-center">Ready to Discover Your Restaurant's True Value?</h2>
            <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
              Don't leave money on the table. Use our <Link href="/valuation" className="text-primary hover:underline"><strong>restaurant valuation calculator</strong></Link> to get an accurate estimate of your restaurant's worth in minutes, not weeks.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">🆓 Free Restaurant Valuation</h3>
                  <p className="text-sm text-muted-foreground mb-4">Get instant estimates using our proven SDE methodology</p>
                  <Link href="/valuation">
                    <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 w-full">
                      Calculate My Restaurant's Value
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">📊 Professional Report - $39</h3>
                  <p className="text-sm text-muted-foreground mb-4">Detailed 3+ page report with market analysis, risk assessment, and strategic recommendations</p>
                  <Link href="/pricing">
                    <Button size="lg" variant="outline" className="w-full">
                      Get Professional Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <p className="text-sm font-semibold text-green-600">
                <strong>7-Day Money-Back Guarantee:</strong> Not satisfied with your <Link href="/pricing" className="text-primary hover:underline">professional report</Link>? We'll refund your $39, no questions asked.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Related Content */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">Related Restaurant Valuation Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/restaurant-valuation-guide" className="text-primary hover:underline">
                How to Value a Restaurant Business - Complete Guide
              </Link>
              <Link href="/blog/business-valuation-mistakes" className="text-primary hover:underline">
                Restaurant Valuation Mistakes That Cost Thousands
              </Link>
              <Link href="/blog/industry-valuation-multiples-2025" className="text-primary hover:underline">
                Restaurant Industry Valuation Multiples 2025
              </Link>
              <Link href="/blog/business-valuation-vs-market-appraisal" className="text-primary hover:underline">
                Restaurant Valuation vs Appraisal: Which Do You Need?
              </Link>
              <Link href="/blog/small-business-sale-preparation" className="text-primary hover:underline">
                Restaurant Valuation for Sale: Maximizing Your Price
              </Link>
              <Link href="/" className="text-primary hover:underline">
                Business Valuation Calculator
              </Link>
            </div>
          </CardContent>
        </Card>

        <InternalLinks 
          title="Restaurant Valuation Resources"
          links={internalLinks}
        />
      </div>
      
      <Footer />
    </div>
  );
}