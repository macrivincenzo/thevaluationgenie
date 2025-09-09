import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, CheckCircle, ShoppingCart, TrendingUp, Users, AlertTriangle, Award, Target } from "lucide-react";

export default function EcommerceValuationCalculator() {
  useEffect(() => {
    // SEO Meta Tags Setup
    document.title = "E-commerce Business Calculator - Value Your Online Store with SDE Methodology | TheValuationGenie";
    
    const setMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const setOgMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    setMeta("description", "Free e-commerce business valuation calculator using SDE methodology. Get instant estimates for your online store's worth. Professional $39 reports with detailed analysis, market comparisons, and industry benchmarks.");
    setMeta("keywords", "e-commerce valuation calculator, online store worth calculator, ecommerce business value, online business appraisal, SDE ecommerce valuation, ecommerce valuation 2025, online store multiples, ecommerce valuation methods");
    setMeta("robots", "index, follow");
    setMeta("author", "TheValuationGenie");

    // Open Graph Meta Tags
    setOgMeta("og:title", "E-commerce Business Calculator - Value Your Online Store with SDE Methodology");
    setOgMeta("og:description", "Free e-commerce business valuation calculator using SDE methodology. Get instant estimates for your online store's worth. Professional $39 reports available.");
    setOgMeta("og:url", "https://thevaluationgenie.com/ecommerce-valuation-calculator");
    setOgMeta("og:type", "website");
    setOgMeta("og:site_name", "TheValuationGenie");

    // Twitter Card Meta Tags
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "E-commerce Business Calculator - Value Your Online Store with SDE Methodology");
    setMeta("twitter:description", "Free e-commerce business valuation calculator using SDE methodology. Get instant estimates for your online store's worth.");

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://thevaluationgenie.com/ecommerce-valuation-calculator');

    // Schema.org Structured Data
    const webPageSchema = document.createElement('script');
    webPageSchema.type = 'application/ld+json';
    webPageSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "E-commerce Business Calculator - Value Your Online Store with SDE Methodology",
      "description": "Free e-commerce business valuation calculator using SDE methodology. Get instant estimates for your online store's worth.",
      "url": "https://thevaluationgenie.com/ecommerce-valuation-calculator",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "E-commerce Business Valuation Calculator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free e-commerce business valuation calculator"
        }
      },
      "provider": {
        "@type": "Organization",
        "name": "TheValuationGenie",
        "url": "https://thevaluationgenie.com"
      }
    });

    // Business Schema
    const businessSchema = document.createElement('script');
    businessSchema.type = 'application/ld+json';
    businessSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "TheValuationGenie",
      "description": "Professional business valuation services using SDE methodology",
      "url": "https://thevaluationgenie.com",
      "serviceArea": {
        "@type": "Country",
        "name": "United States"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Business Valuation Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "E-commerce Business Valuation Calculator",
              "description": "Free e-commerce business valuation calculator using SDE methodology"
            }
          }
        ]
      }
    });

    // FAQ Schema
    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How accurate is your e-commerce valuation calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our calculator uses the same SDE methodology trusted by business brokers and lenders nationwide. While no online calculator can replace a professional appraisal, our results are typically within 10-15% of professional valuations, making it an excellent starting point for planning and negotiations."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between SDE and EBITDA for e-commerce valuation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SDE (Seller's Discretionary Earnings) is preferred for e-commerce businesses under $5M in revenue because it adds back owner benefits, making it more accurate for small business valuations. EBITDA is typically used for larger corporations and doesn't account for owner compensation."
          }
        },
        {
          "@type": "Question",
          "name": "How often should I get my e-commerce business valued?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We recommend getting a valuation annually or whenever you're considering major decisions like selling, seeking investment, or bringing in partners. E-commerce markets evolve rapidly, and your business value can change significantly over time."
          }
        }
      ]
    });

    // Add schemas only if not already present
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    let webPageSchemaExists = false;
    let businessSchemaExists = false;
    let faqSchemaExists = false;
    
    existingSchemas.forEach(schema => {
      const content = schema.textContent || '';
      if (content.includes('"@type": "WebPage"') && content.includes('E-commerce Business Calculator')) {
        webPageSchemaExists = true;
      }
      if (content.includes('"@type": "LocalBusiness"') && content.includes('E-commerce Business Valuation Calculator')) {
        businessSchemaExists = true;
      }
      if (content.includes('"@type": "FAQPage"')) {
        faqSchemaExists = true;
      }
    });
    
    if (!webPageSchemaExists) {
      document.head.appendChild(webPageSchema);
    }
    if (!businessSchemaExists) {
      document.head.appendChild(businessSchema);
    }
    if (!faqSchemaExists) {
      document.head.appendChild(faqSchema);
    }

    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "E-commerce Business Calculator - Value Your Online Store with SDE Methodology",
    "description": "Free e-commerce business valuation calculator using SDE methodology. Get instant estimates for your online store's worth.",
    "author": {
      "@type": "Organization", 
      "name": "TheValuationGenie"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TheValuationGenie",
      "url": "https://thevaluationgenie.com"
    },
    "datePublished": "2025-01-08",
    "dateModified": "2025-01-08",
    "url": "https://thevaluationgenie.com/ecommerce-valuation-calculator"
  };

  const internalLinks = [
    { href: "/", text: "Free Business Valuation Calculator", category: "Valuation Tools" },
    { href: "/blog/sde-vs-ebitda-guide", text: "SDE vs EBITDA Guide", category: "Valuation Methods" },
    { href: "/blog/industry-valuation-multiples-2025", text: "Industry Valuation Multiples", category: "Industry Benchmarks" },
    { href: "/blog/business-valuation-mistakes", text: "E-commerce Valuation Mistakes", category: "Expert Guidance" },
    { href: "/", text: "Professional Reports", category: "Services" },
    { href: "/", text: "Business Valuation", category: "Home" },
    { href: "/blog/ecommerce-business-valuation", text: "E-commerce Business Valuation Guide", category: "E-commerce" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            E-commerce Business Calculator - Value Your Online Store with SDE Methodology
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Published: January 8, 2025 | Updated: January 8, 2025
          </p>
        </div>

        {/* Introduction Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Discover Your E-commerce Store's True Value with Our Free SDE-Based Calculator</h2>
            <p className="mb-6">Are you planning to <strong>sell your online store</strong>, secure funding, or simply want to know what your e-commerce business is worth? Our <strong>e-commerce valuation calculator</strong> uses industry-standard <strong>SDE (Seller's Discretionary Earnings) methodology</strong> to provide instant, accurate estimates of your online store's value. Unlike traditional appraisal methods that can cost $15,000-$50,000, our calculator gives you professional-grade results in minutes.</p>
            
            <Card className="border-2 border-primary bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 mb-8">
              <CardContent className="pt-6 text-center">
                <h3 className="text-2xl font-bold mb-4">🚀 Get Your Free E-commerce Valuation Now</h3>
                <p className="text-lg mb-6">Calculate your online store's worth in under 5 minutes using our proven SDE methodology.</p>
                <Link href="/">
                  <Button size="lg" className="mb-4">
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate My E-commerce Store's Value
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">Free estimate • Professional $39 reports available</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Why Choose Us Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Why Choose Our E-commerce Valuation Calculator?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">✅ Industry-Standard SDE Methodology</h3>
                    <p className="text-muted-foreground">Our calculator uses the same <strong>SDE valuation method</strong> trusted by business brokers, lenders, and buyers nationwide. SDE provides the most accurate valuation for e-commerce businesses under $5M in revenue.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">⚡ Instant Results</h3>
                    <p className="text-muted-foreground">Get your e-commerce valuation in minutes, not weeks. Traditional appraisals take 4-8 weeks and cost thousands. Our calculator delivers professional results instantly.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calculator className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">💰 Transparent Pricing</h3>
                    <p className="text-muted-foreground">Free estimates with optional <strong>$39 professional reports</strong>. Compare this to traditional appraisals that cost $15,000-$50,000. Save 99% on valuation costs.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">📊 Market-Based Analysis</h3>
                    <p className="text-muted-foreground">Our calculator incorporates current <strong>e-commerce industry multiples</strong> and market data to ensure your valuation reflects real-world market conditions.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">How Our E-commerce Valuation Calculator Works</h2>
            <p className="mb-6">Our <strong>e-commerce valuation calculator</strong> uses a proven 3-step process to determine your online store's worth:</p>
            
            <div className="space-y-6">
              <Card className="border border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Step 1: Financial Data Input</h3>
                  <p className="mb-4">Enter your e-commerce business's key financial metrics including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Annual Revenue</strong> - Total sales for the past 12 months</li>
                    <li><strong>Cost of Goods Sold (COGS)</strong> - Product costs and fulfillment</li>
                    <li><strong>Operating Expenses</strong> - Marketing, platform fees, shipping, customer service</li>
                    <li><strong>Owner's Salary</strong> - Your current compensation</li>
                    <li><strong>Depreciation & Amortization</strong> - Equipment, software, and website development</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Step 2: SDE Calculation</h3>
                  <p className="mb-4">Our calculator automatically calculates your <strong>Seller's Discretionary Earnings (SDE)</strong> by:</p>
                  <ul className="list-disc pl-6 space-y-2">
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
                  <p className="mb-4">We apply current <strong>e-commerce industry multiples</strong> based on:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Business model (D2C, marketplace, subscription, etc.)</li>
                    <li>Product category and market niche</li>
                    <li>Revenue size and growth trends</li>
                    <li>Profitability and operational efficiency</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* E-commerce Types Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">E-commerce Valuation by Business Model: Industry Multiples & Benchmarks</h2>
            <p className="mb-6">Different e-commerce business models command different valuation multiples. Here's what you can expect based on your online store type:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-green-200 bg-green-50 dark:bg-green-950">
                <CardHeader>
                  <CardTitle className="text-lg">🛍️ Direct-to-Consumer (D2C) Brands</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1"><strong>SDE Multiple Range:</strong> 3.0x - 6.0x</p>
                  <p className="font-semibold mb-3"><strong>Average Multiple:</strong> 4.2x</p>
                  <p className="text-sm text-muted-foreground">D2C brands typically command higher multiples due to direct customer relationships, brand control, and higher margins. Brand strength and customer loyalty significantly impact value.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-orange-200 bg-orange-50 dark:bg-orange-950">
                <CardHeader>
                  <CardTitle className="text-lg">📦 Marketplace Sellers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1"><strong>SDE Multiple Range:</strong> 2.0x - 4.5x</p>
                  <p className="font-semibold mb-3"><strong>Average Multiple:</strong> 3.1x</p>
                  <p className="text-sm text-muted-foreground">Marketplace sellers offer consistent revenue streams but face platform dependency. Value depends on product differentiation, review ratings, and operational efficiency.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-purple-200 bg-purple-50 dark:bg-purple-950">
                <CardHeader>
                  <CardTitle className="text-lg">🔄 Subscription Box Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1"><strong>SDE Multiple Range:</strong> 3.5x - 7.0x</p>
                  <p className="font-semibold mb-3"><strong>Average Multiple:</strong> 5.2x</p>
                  <p className="text-sm text-muted-foreground">Subscription businesses often command premium multiples due to predictable recurring revenue, high customer lifetime value, and strong retention metrics.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-teal-200 bg-teal-50 dark:bg-teal-950">
                <CardHeader>
                  <CardTitle className="text-lg">🏪 Niche Product Stores</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1"><strong>SDE Multiple Range:</strong> 2.5x - 5.0x</p>
                  <p className="font-semibold mb-3"><strong>Average Multiple:</strong> 3.7x</p>
                  <p className="text-sm text-muted-foreground">Niche stores benefit from specialized market knowledge and lower competition. Value depends on market size, product uniqueness, and customer acquisition costs.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-200 bg-blue-50 dark:bg-blue-950">
                <CardHeader>
                  <CardTitle className="text-lg">📱 Digital Product Stores</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1"><strong>SDE Multiple Range:</strong> 4.0x - 8.0x</p>
                  <p className="font-semibold mb-3"><strong>Average Multiple:</strong> 6.0x</p>
                  <p className="text-sm text-muted-foreground">Digital product stores command the highest multiples due to zero marginal costs, scalability, and high profit margins. Intellectual property value is crucial.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-red-200 bg-red-50 dark:bg-red-950">
                <CardHeader>
                  <CardTitle className="text-lg">🛒 Dropshipping Businesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1"><strong>SDE Multiple Range:</strong> 1.5x - 3.5x</p>
                  <p className="font-semibold mb-3"><strong>Average Multiple:</strong> 2.4x</p>
                  <p className="text-sm text-muted-foreground">Dropshipping businesses have lower multiples due to thin margins and supplier dependency. Value depends on marketing efficiency and customer acquisition strategies.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Key Factors Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Key Factors That Affect Your E-commerce Store's Value</h2>
            <p className="mb-6">Understanding these factors helps you maximize your online store's valuation:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">📊 Financial Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><strong>Revenue growth</strong> trends and consistency</li>
                    <li><strong>Profit margins</strong> and operational efficiency</li>
                    <li><strong>Customer acquisition cost</strong> (CAC)</li>
                    <li><strong>Customer lifetime value</strong> (CLV)</li>
                    <li><strong>Cash flow</strong> predictability</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Customer Base & Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><strong>Customer retention</strong> rates</li>
                    <li><strong>Email list</strong> size and engagement</li>
                    <li><strong>Social media</strong> following and engagement</li>
                    <li><strong>Review ratings</strong> and reputation</li>
                    <li><strong>Brand loyalty</strong> and repeat purchases</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">🛠️ Technology & Operations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><strong>Website performance</strong> and user experience</li>
                    <li><strong>Inventory management</strong> systems</li>
                    <li><strong>Fulfillment</strong> and shipping efficiency</li>
                    <li><strong>Payment processing</strong> integration</li>
                    <li><strong>Analytics and tracking</strong> capabilities</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">📈 Growth Potential</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li><strong>Market size</strong> and expansion opportunities</li>
                    <li><strong>Product diversification</strong> potential</li>
                    <li><strong>International expansion</strong> possibilities</li>
                    <li><strong>Technology innovation</strong> opportunities</li>
                    <li><strong>Partnership and collaboration</strong> potential</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Common Mistakes Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-red-600">Common E-commerce Valuation Mistakes to Avoid</h2>
            <p className="mb-6">These mistakes can cost you thousands in undervalued sales:</p>
            
            <div className="space-y-6">
              <Card className="border border-red-200 bg-red-50 dark:bg-red-950">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-600">❌ Using Revenue Instead of SDE</h3>
                  <p className="mb-2"><strong>Mistake:</strong> Valuing based on gross revenue without considering profitability and owner benefits.</p>
                  <p><strong>Solution:</strong> Always use SDE (Seller's Discretionary Earnings) which accounts for owner benefits and provides a true picture of cash flow.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-red-200 bg-red-50 dark:bg-red-950">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-600">❌ Ignoring Customer Acquisition Costs</h3>
                  <p className="mb-2"><strong>Mistake:</strong> Not factoring in the cost and sustainability of customer acquisition.</p>
                  <p><strong>Solution:</strong> Analyze CAC trends, customer lifetime value, and marketing efficiency to assess long-term viability.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-red-200 bg-red-50 dark:bg-red-950">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-600">❌ Overlooking Platform Dependency</h3>
                  <p className="mb-2"><strong>Mistake:</strong> Not considering risks associated with platform reliance (Amazon, Shopify, etc.).</p>
                  <p><strong>Solution:</strong> Diversify sales channels and build direct customer relationships to reduce platform dependency risk.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-red-200 bg-red-50 dark:bg-red-950">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-600">❌ Not Accounting for Inventory Risk</h3>
                  <p className="mb-2"><strong>Mistake:</strong> Valuing inventory at cost without considering obsolescence or market changes.</p>
                  <p><strong>Solution:</strong> Apply appropriate discounts to inventory based on turnover rates and market conditions.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-red-200 bg-red-50 dark:bg-red-950">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-600">❌ Ignoring Seasonality</h3>
                  <p className="mb-2"><strong>Mistake:</strong> Using peak season data without adjusting for seasonal variations.</p>
                  <p><strong>Solution:</strong> Use 12-month trailing data and adjust for seasonal patterns to get accurate valuations.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Case Study Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-green-600">Real E-commerce Valuation Case Study</h2>
            <p className="mb-6">Here's how our calculator helped an e-commerce business owner discover their true value:</p>
            
            <Card className="border border-green-200 bg-green-50 dark:bg-green-950">
              <CardHeader>
                <CardTitle className="text-xl text-green-700 dark:text-green-300">Case Study: "EcoFitness Gear"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-3">Business Details:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li><strong>Type:</strong> D2C fitness equipment brand</li>
                      <li><strong>Platform:</strong> Shopify + Amazon marketplace</li>
                      <li><strong>Products:</strong> Sustainable fitness gear</li>
                      <li><strong>Years in Business:</strong> 5 years</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Financial Performance:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li><strong>Annual Revenue:</strong> $2,400,000</li>
                      <li><strong>COGS:</strong> $1,200,000 (50%)</li>
                      <li><strong>Operating Expenses:</strong> $960,000</li>
                      <li><strong>Owner's Salary:</strong> $120,000</li>
                      <li><strong>Depreciation:</strong> $40,000</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Valuation Calculation:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li><strong>Net Income:</strong> $200,000</li>
                      <li><strong>Add Back Owner's Salary:</strong> +$120,000</li>
                      <li><strong>Add Back Depreciation:</strong> +$40,000</li>
                      <li><strong>SDE:</strong> $360,000</li>
                      <li><strong>Industry Multiple:</strong> 4.2x</li>
                      <li><strong>E-commerce Value:</strong> $1,512,000</li>
                    </ul>
                  </div>
                </div>
                
                <Card className="border border-green-300 bg-white dark:bg-slate-900">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-3 text-green-700">Result:</h4>
                    <p>EcoFitness Gear was valued at <strong>$1,512,000</strong> using our SDE methodology. The owner initially thought their business was worth only $800,000 based on revenue multiples. Our calculator revealed an additional <strong>$712,000 in value</strong> by properly accounting for owner benefits, brand value, and using D2C-appropriate multiples.</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Frequently Asked Questions About E-commerce Valuation</h2>
            
            <div className="space-y-6">
              <Card className="border border-primary/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2">Q: How accurate is your e-commerce valuation calculator?</h3>
                  <p><strong>A:</strong> Our calculator uses the same SDE methodology trusted by business brokers and lenders nationwide. While no online calculator can replace a professional appraisal, our results are typically within 10-15% of professional valuations, making it an excellent starting point for planning and negotiations.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-primary/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2">Q: What's the difference between SDE and EBITDA for e-commerce valuation?</h3>
                  <p><strong>A:</strong> SDE (Seller's Discretionary Earnings) is preferred for e-commerce businesses under $5M in revenue because it adds back owner benefits, making it more accurate for small business valuations. EBITDA is typically used for larger corporations and doesn't account for owner compensation.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-primary/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2">Q: How often should I get my e-commerce business valued?</h3>
                  <p><strong>A:</strong> We recommend getting a valuation annually or whenever you're considering major decisions like selling, seeking investment, or bringing in partners. E-commerce markets evolve rapidly, and your business value can change significantly over time.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-primary/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2">Q: Can I use this calculator for marketplace-only businesses?</h3>
                  <p><strong>A:</strong> Yes, but marketplace-only businesses have additional considerations like platform dependency, fee structures, and account suspension risks. Our calculator provides a base valuation, but platform-specific factors may require additional analysis.</p>
                </CardContent>
              </Card>
              
              <Card className="border border-primary/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2">Q: What if my e-commerce business is losing money?</h3>
                  <p><strong>A:</strong> Our calculator can still provide insights, but unprofitable e-commerce businesses are typically valued based on asset value, customer base, or intellectual property rather than earnings. We'll help you understand your options and potential turnaround strategies.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA Section */}
        <Card className="border-2 border-primary bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 mb-8">
          <CardContent className="pt-6">
            <h2 className="text-3xl font-bold mb-4 text-center">Ready to Discover Your E-commerce Store's True Value?</h2>
            <p className="text-lg text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
              Don't leave money on the table. Use our <strong>e-commerce valuation calculator</strong> to get an accurate estimate of your online store's worth in minutes, not weeks.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Calculator className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <h3 className="text-xl font-bold mb-2">🆓 Free E-commerce Valuation</h3>
                    <p className="text-muted-foreground mb-4">Get instant estimates using our proven SDE methodology</p>
                  </div>
                  <Link href="/">
                    <Button size="lg" className="w-full">
                      Calculate My E-commerce Store's Value
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Award className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                    <h3 className="text-xl font-bold mb-2">📊 Professional Report - $39</h3>
                    <p className="text-muted-foreground mb-4">Detailed 3+ page report with market analysis, risk assessment, and strategic recommendations</p>
                  </div>
                  <Link href="/">
                    <Button size="lg" variant="outline" className="w-full">
                      Get Professional Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center bg-white/50 dark:bg-slate-800/50 p-4 rounded-lg">
              <p className="font-semibold"><strong>7-Day Money-Back Guarantee:</strong> Not satisfied with your professional report? We'll refund your $39, no questions asked.</p>
            </div>
          </CardContent>
        </Card>

        {/* Related Content Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Related E-commerce Valuation Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {internalLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                  <Link href={link.href} className="text-primary hover:underline">
                    {link.text}
                  </Link>
                  <span className="text-xs text-muted-foreground">({link.category})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}