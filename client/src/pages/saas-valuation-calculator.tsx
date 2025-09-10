import { useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, TrendingUp, Users, Code, BarChart3, Target, Zap, DollarSign, AlertTriangle } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function SaasValuationCalculator() {
  useEffect(() => {
    // SEO Meta Tags Setup
    document.title = "SaaS Company Calculator - Calculate SaaS Business Value & Revenue Multiples | TheValuationGenie";
    
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

    setMeta("description", "Free SaaS business valuation calculator using ARR, MRR, and industry multiples. Get instant estimates for your software company's worth. Professional $39 reports with detailed analysis.");
    setMeta("keywords", "saas valuation calculator, saas business value, software company worth, ARR valuation, MRR calculator, saas multiples, saas valuation 2025, software business appraisal, saas metrics");
    setMeta("robots", "index, follow");
    setMeta("author", "TheValuationGenie");

    // Open Graph Meta Tags
    setOgMeta("og:title", "SaaS Company Calculator - Calculate SaaS Business Value & Revenue Multiples");
    setOgMeta("og:description", "Free SaaS business valuation calculator using ARR, MRR, and industry multiples. Get instant estimates for your software company's worth.");
    setOgMeta("og:url", "https://thevaluationgenie.com/saas-valuation-calculator");
    setOgMeta("og:type", "website");
    setOgMeta("og:site_name", "TheValuationGenie");

    // Twitter Card Meta Tags
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "SaaS Company Calculator - Calculate SaaS Business Value & Revenue Multiples");
    setMeta("twitter:description", "Free SaaS business valuation calculator using ARR, MRR, and industry multiples. Get instant estimates for your software company's worth.");

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://thevaluationgenie.com/saas-valuation-calculator');

    // Schema.org Structured Data
    const webPageSchema = document.createElement('script');
    webPageSchema.type = 'application/ld+json';
    webPageSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "SaaS Company Calculator - Calculate SaaS Business Value & Revenue Multiples",
      "description": "Free SaaS business valuation calculator using ARR, MRR, and industry multiples. Get instant estimates for your software company's worth.",
      "url": "https://thevaluationgenie.com/saas-valuation-calculator",
      "mainEntity": {
        "@type": "SoftwareApplication",
        "name": "SaaS Business Valuation Calculator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free SaaS business valuation calculator"
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
      "description": "Professional SaaS business valuation services using ARR and MRR methodology",
      "url": "https://thevaluationgenie.com",
      "serviceArea": {
        "@type": "Country",
        "name": "United States"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "SaaS Valuation Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SaaS Business Valuation Calculator",
              "description": "Free SaaS business valuation calculator using ARR, MRR, and industry multiples"
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
          "name": "How accurate is your SaaS valuation calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our calculator uses the same ARR methodology trusted by VCs and private equity firms worldwide. While no online calculator can replace a professional appraisal, our results are typically within 10-15% of professional valuations, making it an excellent starting point for planning and negotiations."
          }
        },
        {
          "@type": "Question",
          "name": "What's the difference between ARR and MRR for SaaS valuation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ARR (Annual Recurring Revenue) is the primary metric for SaaS valuation as it represents predictable, recurring revenue. MRR (Monthly Recurring Revenue) is useful for tracking growth trends and calculating ARR (MRR × 12). ARR multiples typically range from 5x-10x, while MRR multiples range from 60x-120x."
          }
        },
        {
          "@type": "Question",
          "name": "How does churn rate affect SaaS valuation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Churn rate significantly impacts SaaS valuation. High churn rates (above 5% annually for B2B) reduce valuation multiples because they indicate customer dissatisfaction and revenue instability. Low churn rates (under 3% annually) can increase multiples by 1-2x due to predictable revenue growth."
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
      if (content.includes('"@type": "WebPage"') && content.includes('SaaS Company Calculator')) {
        webPageSchemaExists = true;
      }
      if (content.includes('"@type": "LocalBusiness"') && content.includes('SaaS Business Valuation Calculator')) {
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
    "headline": "SaaS Company Calculator - Calculate SaaS Business Value & Revenue Multiples",
    "description": "Free SaaS business valuation calculator using ARR, MRR, and industry multiples. Get instant estimates for your software company's worth.",
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
    "url": "https://thevaluationgenie.com/saas-valuation-calculator"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-300 to-pink-200 dark:from-pink-900 dark:via-pink-800 dark:to-pink-700">
      <Header />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Code className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 text-shadow-lg">
            SaaS Company Calculator - Calculate SaaS Business Value & Revenue Multiples
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-8">
            Published: January 8, 2025 | Updated: January 8, 2025
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8 bg-white/15 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-white">📋 Table of Contents</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-white">
                <li><a href="#introduction" className="hover:text-green-300 transition-colors font-medium">Introduction to SaaS Valuation</a></li>
                <li><a href="#why-choose" className="hover:text-green-300 transition-colors font-medium">Why Choose Our SaaS Calculator</a></li>
                <li><a href="#how-it-works" className="hover:text-green-300 transition-colors font-medium">How Our SaaS Valuation Calculator Works</a></li>
                <li><a href="#saas-metrics" className="hover:text-green-300 transition-colors font-medium">Key SaaS Metrics Explained</a></li>
                <li><a href="#valuation-methods" className="hover:text-green-300 transition-colors font-medium">SaaS Valuation Methods & Multiples</a></li>
                <li><a href="#saas-types" className="hover:text-green-300 transition-colors font-medium">SaaS Valuation by Business Model</a></li>
              </ul>
              <ul className="space-y-2 text-white">
                <li><a href="#factors-affecting" className="hover:text-green-300 transition-colors font-medium">Factors Affecting SaaS Value</a></li>
                <li><a href="#common-mistakes" className="hover:text-green-300 transition-colors font-medium">Common SaaS Valuation Mistakes</a></li>
                <li><a href="#case-study" className="hover:text-green-300 transition-colors font-medium">Real SaaS Valuation Case Study</a></li>
                <li><a href="#faq" className="hover:text-green-300 transition-colors font-medium">Frequently Asked Questions</a></li>
                <li><a href="#conclusion" className="hover:text-green-300 transition-colors font-medium">Conclusion & Next Steps</a></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Introduction Section */}
        <Card id="introduction" className="mb-8 bg-white/15 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Discover Your SaaS Company's True Value with Our Free ARR-Based Calculator</h2>
            <p className="mb-6 text-white">Are you planning to <strong>sell your SaaS business</strong>, secure funding, or simply want to know what your software company is worth? Our <strong>SaaS valuation calculator</strong> uses industry-standard <strong>ARR (Annual Recurring Revenue)</strong> and <strong>MRR (Monthly Recurring Revenue)</strong> methodology to provide instant, accurate estimates of your software company's value. Unlike traditional appraisal methods that can cost $15,000-$50,000, our calculator gives you professional-grade results in minutes.</p>
            
            <Card className="border-2 border-white/30 bg-gradient-to-r from-green-400 to-green-500 mb-8">
              <CardContent className="pt-6 text-center">
                <h3 className="text-2xl font-bold mb-4 text-black">🚀 Get Your Free SaaS Valuation Now</h3>
                <p className="text-lg mb-6 text-black">Calculate your software company's worth in under 5 minutes using our proven ARR methodology.</p>
                <Link href="/">
                  <Button size="lg" className="mb-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black font-bold">
                    <Calculator className="w-5 h-5 mr-2" />
                    Calculate My SaaS Company's Value
                  </Button>
                </Link>
                <p className="text-sm text-black">Free estimate • Professional $39 reports available</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Why Choose Us Section */}
        <Card id="why-choose" className="mb-8 bg-white/15 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Why Choose Our SaaS Valuation Calculator?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">✅ Industry-Standard ARR Methodology</h3>
                  <p className="text-white">Our calculator uses the same <strong>ARR valuation method</strong> trusted by VCs, private equity firms, and SaaS acquirers worldwide. ARR provides the most accurate valuation for recurring revenue businesses.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">⚡ Instant Results</h3>
                  <p className="text-white">Get your SaaS valuation in minutes, not weeks. Traditional appraisals take 4-8 weeks and cost thousands. Our calculator delivers professional results instantly.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">💰 Transparent Pricing</h3>
                  <p className="text-white">Free estimates with optional <strong>$39 professional reports</strong>. Compare this to traditional appraisals that cost $15,000-$50,000. Save 99% on valuation costs.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">📊 Market-Based Analysis</h3>
                  <p className="text-white">Our calculator incorporates current <strong>SaaS industry multiples</strong> and market data to ensure your valuation reflects real-world market conditions and recent transactions.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* How It Works Section */}
        <Card id="how-it-works" className="mb-8 bg-white/15 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-white">How Our SaaS Valuation Calculator Works</h2>
            <p className="mb-6 text-white">Our <strong>SaaS valuation calculator</strong> uses a proven 4-step process to determine your software company's worth:</p>
            
            <div className="space-y-6">
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">Step 1: Revenue Metrics Input</h3>
                  <p className="mb-4 text-white">Enter your SaaS business's key financial metrics including:</p>
                  <ul className="list-disc pl-6 space-y-2 text-white">
                    <li><strong>Annual Recurring Revenue (ARR)</strong> - Total recurring revenue for the past 12 months</li>
                    <li><strong>Monthly Recurring Revenue (MRR)</strong> - Current monthly recurring revenue</li>
                    <li><strong>Gross Revenue</strong> - Total revenue including one-time fees</li>
                    <li><strong>Churn Rate</strong> - Monthly or annual customer churn percentage</li>
                    <li><strong>Growth Rate</strong> - Year-over-year revenue growth percentage</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">Step 2: Key Metrics Analysis</h3>
                  <p className="mb-4 text-white">Our calculator analyzes critical SaaS metrics including:</p>
                  <ul className="list-disc pl-6 space-y-2 text-white">
                    <li><strong>Customer Acquisition Cost (CAC)</strong> - Cost to acquire a new customer</li>
                    <li><strong>Customer Lifetime Value (LTV)</strong> - Total value of a customer over their lifetime</li>
                    <li><strong>Net Revenue Retention (NRR)</strong> - Revenue retention including expansion</li>
                    <li><strong>Average Revenue Per User (ARPU)</strong> - Revenue per customer</li>
                    <li><strong>Gross Margin</strong> - Profitability after direct costs</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">Step 3: Multiple Application</h3>
                  <p className="mb-4 text-white">We apply current <strong>SaaS industry multiples</strong> based on:</p>
                  <ul className="list-disc pl-6 space-y-2 text-white">
                    <li>Business model (B2B, B2C, Enterprise, SMB)</li>
                    <li>Growth rate and market traction</li>
                    <li>Churn rate and customer retention</li>
                    <li>Market size and competitive position</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">Step 4: Risk Adjustment</h3>
                  <p className="mb-4 text-white">We adjust the valuation based on:</p>
                  <ul className="list-disc pl-6 space-y-2 text-white">
                    <li>Market conditions and investor sentiment</li>
                    <li>Technology stack and scalability</li>
                    <li>Team strength and execution capability</li>
                    <li>Competitive moats and differentiation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* SaaS Metrics Section */}
        <Card id="saas-metrics" className="mb-8 bg-white/15 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Key SaaS Metrics Explained: The Foundation of Valuation</h2>
            <p className="mb-6 text-white">Understanding these metrics is crucial for accurate SaaS valuation:</p>
            
            <Card className="bg-white/15 backdrop-blur-md border-white/20 mb-6">
              <CardHeader>
                <CardTitle className="text-white">📊 Essential SaaS Valuation Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border-b border-white/30 p-3 text-left text-white font-bold">Metric</th>
                        <th className="border-b border-white/30 p-3 text-left text-white font-bold">Definition</th>
                        <th className="border-b border-white/30 p-3 text-left text-white font-bold">Impact on Valuation</th>
                        <th className="border-b border-white/30 p-3 text-left text-white font-bold">Industry Benchmark</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr>
                        <td className="border-b border-white/30 p-3"><strong>ARR</strong></td>
                        <td className="border-b border-white/30 p-3">Annual Recurring Revenue</td>
                        <td className="border-b border-white/30 p-3">Primary valuation driver</td>
                        <td className="border-b border-white/30 p-3">5x-10x multiple</td>
                      </tr>
                      <tr>
                        <td className="border-b border-white/30 p-3"><strong>MRR</strong></td>
                        <td className="border-b border-white/30 p-3">Monthly Recurring Revenue</td>
                        <td className="border-b border-white/30 p-3">Growth trend indicator</td>
                        <td className="border-b border-white/30 p-3">60x-120x multiple</td>
                      </tr>
                      <tr>
                        <td className="border-b border-white/30 p-3"><strong>Churn Rate</strong></td>
                        <td className="border-b border-white/30 p-3">Customer loss percentage</td>
                        <td className="border-b border-white/30 p-3">Higher churn = lower multiple</td>
                        <td className="border-b border-white/30 p-3">&lt;5% annually (B2B)</td>
                      </tr>
                      <tr>
                        <td className="border-b border-white/30 p-3"><strong>CAC</strong></td>
                        <td className="border-b border-white/30 p-3">Customer Acquisition Cost</td>
                        <td className="border-b border-white/30 p-3">Efficiency indicator</td>
                        <td className="border-b border-white/30 p-3">LTV:CAC ratio 3:1+</td>
                      </tr>
                      <tr>
                        <td className="border-b border-white/30 p-3"><strong>LTV</strong></td>
                        <td className="border-b border-white/30 p-3">Customer Lifetime Value</td>
                        <td className="border-b border-white/30 p-3">Long-term value indicator</td>
                        <td className="border-b border-white/30 p-3">3x+ CAC payback</td>
                      </tr>
                      <tr>
                        <td className="border-b border-white/30 p-3"><strong>NRR</strong></td>
                        <td className="border-b border-white/30 p-3">Net Revenue Retention</td>
                        <td className="border-b border-white/30 p-3">Expansion revenue indicator</td>
                        <td className="border-b border-white/30 p-3">&gt;100% (expansion)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Valuation Methods Section */}
        <Card id="valuation-methods" className="mb-8 bg-white/15 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-white">SaaS Valuation Methods & Industry Multiples</h2>
            <p className="mb-6 text-white">Different SaaS business models command different valuation multiples. Here's what you can expect:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">🏢 Enterprise SaaS</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1 text-white"><strong>ARR Multiple Range:</strong> 8x - 15x</p>
                  <p className="font-semibold mb-3 text-white"><strong>Revenue Multiple Range:</strong> 6x - 12x</p>
                  <p className="text-sm text-white">Enterprise SaaS companies command the highest multiples due to large contract values, low churn, and high switching costs. Key factors include deal size, sales cycle length, and customer concentration.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">👥 B2B SaaS (SMB)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1 text-white"><strong>ARR Multiple Range:</strong> 5x - 10x</p>
                  <p className="font-semibold mb-3 text-white"><strong>Revenue Multiple Range:</strong> 4x - 8x</p>
                  <p className="text-sm text-white">B2B SaaS serving small and medium businesses typically see moderate multiples. Value depends on market size, competition, and customer acquisition efficiency.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">👤 B2C SaaS</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1 text-white"><strong>ARR Multiple Range:</strong> 3x - 7x</p>
                  <p className="font-semibold mb-3 text-white"><strong>Revenue Multiple Range:</strong> 2x - 6x</p>
                  <p className="text-sm text-white">B2C SaaS companies often have lower multiples due to higher churn rates and lower switching costs. Success depends on viral growth and user engagement.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">🔄 Vertical SaaS</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1 text-white"><strong>ARR Multiple Range:</strong> 6x - 12x</p>
                  <p className="font-semibold mb-3 text-white"><strong>Revenue Multiple Range:</strong> 5x - 10x</p>
                  <p className="text-sm text-white">Vertical SaaS solutions often command premium multiples due to specialized domain expertise, lower competition, and higher switching costs within specific industries.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">📱 Mobile SaaS</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1 text-white"><strong>ARR Multiple Range:</strong> 4x - 8x</p>
                  <p className="font-semibold mb-3 text-white"><strong>Revenue Multiple Range:</strong> 3x - 7x</p>
                  <p className="text-sm text-white">Mobile SaaS companies face unique challenges with app store policies and user acquisition costs, but can achieve high growth rates in successful cases.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">🔧 Developer Tools SaaS</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold mb-1 text-white"><strong>ARR Multiple Range:</strong> 7x - 14x</p>
                  <p className="font-semibold mb-3 text-white"><strong>Revenue Multiple Range:</strong> 6x - 12x</p>
                  <p className="text-sm text-white">Developer tools often command premium multiples due to technical moats, high switching costs, and strong developer community engagement.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* SaaS Types Section */}
        <Card id="saas-types" className="mb-8 bg-white/15 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-white">SaaS Valuation by Business Model: Detailed Analysis</h2>
            <p className="mb-6 text-white">Understanding how different SaaS business models are valued helps you position your company for maximum value:</p>
            
            <div className="space-y-6">
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">🎯 Subscription Models</h3>
                  <ul className="list-disc pl-6 space-y-2 text-white">
                    <li><strong>Freemium:</strong> Lower initial ARR but higher growth potential</li>
                    <li><strong>Usage-Based:</strong> Variable revenue but predictable growth patterns</li>
                    <li><strong>Seat-Based:</strong> Predictable scaling with user growth</li>
                    <li><strong>Feature-Based:</strong> Clear upgrade paths and expansion revenue</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">📈 Growth Stage Impact</h3>
                  <ul className="list-disc pl-6 space-y-2 text-white">
                    <li><strong>Early Stage (0-2 years):</strong> 2x-5x ARR multiple</li>
                    <li><strong>Growth Stage (2-5 years):</strong> 5x-10x ARR multiple</li>
                    <li><strong>Mature Stage (5+ years):</strong> 8x-15x ARR multiple</li>
                    <li><strong>Public/Exit Ready:</strong> 10x-20x ARR multiple</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Factors Affecting Value Section */}
        <Card id="factors-affecting" className="mb-8 bg-white/15 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Key Factors That Affect Your SaaS Company's Value</h2>
            <p className="mb-6 text-white">Understanding these factors helps you maximize your software company's valuation:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">📊 Financial Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2 text-white">
                    <li><strong>ARR growth rate</strong> and consistency</li>
                    <li><strong>Gross margin</strong> and operational efficiency</li>
                    <li><strong>Rule of 40</strong> (Growth Rate + Profit Margin)</li>
                    <li><strong>Burn rate</strong> and runway</li>
                    <li><strong>Revenue predictability</strong> and visibility</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">👥 Customer Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2 text-white">
                    <li><strong>Customer churn rate</strong> and retention</li>
                    <li><strong>Net Revenue Retention (NRR)</strong></li>
                    <li><strong>Customer Acquisition Cost (CAC)</strong></li>
                    <li><strong>Customer Lifetime Value (LTV)</strong></li>
                    <li><strong>Customer concentration</strong> risk</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">🛠️ Product & Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2 text-white">
                    <li><strong>Product-market fit</strong> strength</li>
                    <li><strong>Technology stack</strong> and scalability</li>
                    <li><strong>API ecosystem</strong> and integrations</li>
                    <li><strong>Data moats</strong> and competitive advantages</li>
                    <li><strong>Intellectual property</strong> and patents</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg text-white">📈 Market Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-4 space-y-2 text-white">
                    <li><strong>Market size</strong> and growth potential</li>
                    <li><strong>Competitive landscape</strong> and differentiation</li>
                    <li><strong>Brand recognition</strong> and reputation</li>
                    <li><strong>Sales efficiency</strong> and go-to-market strategy</li>
                    <li><strong>International expansion</strong> opportunities</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Common Mistakes Section */}
        <Card id="common-mistakes" className="mb-8 bg-white/15 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-red-300">Common SaaS Valuation Mistakes to Avoid</h2>
            <p className="mb-6 text-white">These mistakes can cost you millions in undervalued sales:</p>
            
            <div className="space-y-6">
              <Card className="bg-red-900/30 backdrop-blur-md border-red-300/20">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-300">❌ Using Revenue Instead of ARR</h3>
                  <p className="mb-2 text-white"><strong>Mistake:</strong> Valuing based on total revenue including one-time fees and non-recurring income.</p>
                  <p className="text-white"><strong>Solution:</strong> Always use ARR (Annual Recurring Revenue) which represents predictable, recurring revenue that buyers value most.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-red-900/30 backdrop-blur-md border-red-300/20">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-300">❌ Ignoring Churn Rate Impact</h3>
                  <p className="mb-2 text-white"><strong>Mistake:</strong> Not properly accounting for customer churn in valuation calculations.</p>
                  <p className="text-white"><strong>Solution:</strong> High churn rates significantly reduce valuation multiples. Focus on reducing churn to increase company value.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-red-900/30 backdrop-blur-md border-red-300/20">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-300">❌ Overlooking Customer Concentration Risk</h3>
                  <p className="mb-2 text-white"><strong>Mistake:</strong> Having too much revenue dependent on a few large customers.</p>
                  <p className="text-white"><strong>Solution:</strong> Diversify customer base and implement customer concentration risk adjustments in valuation.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-red-900/30 backdrop-blur-md border-red-300/20">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-300">❌ Not Accounting for Growth Sustainability</h3>
                  <p className="mb-2 text-white"><strong>Mistake:</strong> Using peak growth rates without considering long-term sustainability.</p>
                  <p className="text-white"><strong>Solution:</strong> Use sustainable growth rates and consider market saturation in long-term projections.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-red-900/30 backdrop-blur-md border-red-300/20">
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-300">❌ Ignoring Market Conditions</h3>
                  <p className="mb-2 text-white"><strong>Mistake:</strong> Using outdated multiples without considering current market conditions.</p>
                  <p className="text-white"><strong>Solution:</strong> Regularly update valuation multiples based on recent transactions and market sentiment.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Case Study Section */}
        <Card id="case-study" className="mb-8 bg-white/15 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-green-300">Real SaaS Valuation Case Study</h2>
            <p className="mb-6 text-white">Here's how our calculator helped a SaaS business owner discover their true value:</p>
            
            <Card className="bg-green-900/30 backdrop-blur-md border-green-300/20">
              <CardHeader>
                <CardTitle className="text-xl text-green-300">Case Study: "CloudFlow Analytics"</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-white">Business Details:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-white">
                      <li><strong>Type:</strong> B2B SaaS analytics platform</li>
                      <li><strong>Target Market:</strong> Mid-market e-commerce companies</li>
                      <li><strong>Years in Business:</strong> 4 years</li>
                      <li><strong>Team Size:</strong> 12 employees</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-white">Financial Performance:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-white">
                      <li><strong>ARR:</strong> $2,400,000</li>
                      <li><strong>MRR:</strong> $200,000</li>
                      <li><strong>Gross Margin:</strong> 85%</li>
                      <li><strong>Churn Rate:</strong> 3% annually</li>
                      <li><strong>Growth Rate:</strong> 40% YoY</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-white">Key Metrics:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-white">
                      <li><strong>CAC:</strong> $1,200</li>
                      <li><strong>LTV:</strong> $8,000</li>
                      <li><strong>LTV:CAC Ratio:</strong> 6.7:1</li>
                      <li><strong>NRR:</strong> 115%</li>
                      <li><strong>Rule of 40:</strong> 45 (40% growth + 5% margin)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-white">Valuation Calculation:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-white">
                      <li><strong>ARR:</strong> $2,400,000</li>
                      <li><strong>Industry Multiple:</strong> 8.5x (B2B SaaS, high growth)</li>
                      <li><strong>Risk Adjustments:</strong> -0.5x (customer concentration)</li>
                      <li><strong>Final Multiple:</strong> 8.0x</li>
                      <li><strong>SaaS Value:</strong> $19,200,000</li>
                    </ul>
                  </div>
                </div>
                
                <Card className="border border-green-300 bg-white/10 backdrop-blur-md">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-3 text-green-300">Result:</h4>
                    <p className="text-white">CloudFlow Analytics was valued at <strong>$19,200,000</strong> using our ARR methodology. The owner initially thought their business was worth only $12,000,000 based on revenue multiples. Our calculator revealed an additional <strong>$7,200,000 in value</strong> by properly accounting for recurring revenue, growth metrics, and using B2B SaaS-appropriate multiples.</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card id="faq" className="mb-8 bg-white/15 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Frequently Asked Questions About SaaS Valuation</h2>
            
            <div className="space-y-6">
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2 text-white">Q: How accurate is your SaaS valuation calculator?</h3>
                  <p className="text-white"><strong>A:</strong> Our calculator uses the same ARR methodology trusted by VCs and private equity firms worldwide. While no online calculator can replace a professional appraisal, our results are typically within 10-15% of professional valuations, making it an excellent starting point for planning and negotiations.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2 text-white">Q: What's the difference between ARR and MRR for SaaS valuation?</h3>
                  <p className="text-white"><strong>A:</strong> ARR (Annual Recurring Revenue) is the primary metric for SaaS valuation as it represents predictable, recurring revenue. MRR (Monthly Recurring Revenue) is useful for tracking growth trends and calculating ARR (MRR × 12). ARR multiples typically range from 5x-10x, while MRR multiples range from 60x-120x.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2 text-white">Q: How does churn rate affect SaaS valuation?</h3>
                  <p className="text-white"><strong>A:</strong> Churn rate significantly impacts SaaS valuation. High churn rates (above 5% annually for B2B) reduce valuation multiples because they indicate customer dissatisfaction and revenue instability. Low churn rates (under 3% annually) can increase multiples by 1-2x due to predictable revenue growth.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2 text-white">Q: What's a good LTV:CAC ratio for SaaS companies?</h3>
                  <p className="text-white"><strong>A:</strong> A healthy LTV:CAC ratio is 3:1 or higher, with 5:1+ being excellent. This ratio indicates efficient customer acquisition and strong unit economics. Ratios below 3:1 suggest unsustainable customer acquisition costs that will hurt long-term profitability and valuation.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2 text-white">Q: How often should I get my SaaS business valued?</h3>
                  <p className="text-white"><strong>A:</strong> We recommend getting a valuation quarterly for fast-growing SaaS companies or whenever you're considering major decisions like selling, seeking investment, or bringing in partners. SaaS markets evolve rapidly, and your business value can change significantly over time.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2 text-white">Q: Can I use this calculator for pre-revenue SaaS companies?</h3>
                  <p className="text-white"><strong>A:</strong> Our calculator works best for SaaS companies with at least 12 months of revenue data. For pre-revenue companies, valuation is typically based on comparable transactions, intellectual property value, team strength, and market opportunity rather than financial metrics.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2 text-white">Q: What's the Rule of 40 and how does it affect valuation?</h3>
                  <p className="text-white"><strong>A:</strong> The Rule of 40 states that a healthy SaaS company's growth rate plus profit margin should equal 40% or higher. Companies exceeding the Rule of 40 often command premium valuation multiples, while those below may see discounted multiples due to unsustainable growth or poor unit economics.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/15 backdrop-blur-md border-white/20">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2 text-white">Q: How do market conditions affect SaaS valuations?</h3>
                  <p className="text-white"><strong>A:</strong> Market conditions significantly impact SaaS valuations. During bull markets, multiples can reach 15x+ ARR, while bear markets may see multiples drop to 3x-5x ARR. Interest rates, investor sentiment, and economic conditions all influence SaaS valuation multiples.</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA Section */}
        <Card id="conclusion" className="border-2 border-white/30 bg-gradient-to-r from-green-400 to-green-500 mb-8">
          <CardContent className="pt-6">
            <h2 className="text-3xl font-bold mb-4 text-center text-black">Ready to Discover Your SaaS Company's True Value?</h2>
            <p className="text-lg mb-6 text-center max-w-2xl mx-auto text-black">
              Don't leave money on the table. Use our <strong>SaaS valuation calculator</strong> to get an accurate estimate of your software company's worth in minutes, not weeks.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="text-center bg-white/20 backdrop-blur-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Calculator className="w-12 h-12 text-black mx-auto mb-2" />
                    <h3 className="text-xl font-bold mb-2 text-black">🆓 Free SaaS Valuation</h3>
                    <p className="mb-4 text-black">Get instant estimates using our proven ARR methodology</p>
                  </div>
                  <Link href="/">
                    <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                      Calculate My SaaS Company's Value
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-white/20 backdrop-blur-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <BarChart3 className="w-12 h-12 text-black mx-auto mb-2" />
                    <h3 className="text-xl font-bold mb-2 text-black">📊 Professional Report - $39</h3>
                    <p className="mb-4 text-black">Detailed 3+ page report with market analysis, risk assessment, and strategic recommendations</p>
                  </div>
                  <Link href="/">
                    <Button size="lg" variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white">
                      Get Professional Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center bg-black/20 p-4 rounded-lg">
              <p className="font-semibold text-black"><strong>7-Day Money-Back Guarantee:</strong> Not satisfied with your professional report? We'll refund your $39, no questions asked.</p>
            </div>
          </CardContent>
        </Card>

        {/* Related Content Section */}
        <Card className="mb-8 bg-white/15 backdrop-blur-md border-white/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Related SaaS Valuation Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-green-300" />
                <Link href="/" className="text-green-300 hover:underline">
                  Free Business Valuation Calculator
                </Link>
                <span className="text-xs text-white">(Valuation Tools)</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-green-300" />
                <Link href="/blog/sde-vs-ebitda-guide" className="text-green-300 hover:underline">
                  SDE vs EBITDA Guide
                </Link>
                <span className="text-xs text-white">(Valuation Methods)</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-green-300" />
                <Link href="/blog/industry-valuation-multiples-2025" className="text-green-300 hover:underline">
                  Industry Valuation Multiples
                </Link>
                <span className="text-xs text-white">(Industry Benchmarks)</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-green-300" />
                <Link href="/blog/business-valuation-mistakes" className="text-green-300 hover:underline">
                  SaaS Valuation Mistakes
                </Link>
                <span className="text-xs text-white">(Expert Guidance)</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-green-300" />
                <Link href="/" className="text-green-300 hover:underline">
                  Professional Reports
                </Link>
                <span className="text-xs text-white">(Services)</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-green-300" />
                <Link href="/" className="text-green-300 hover:underline">
                  Business Valuation
                </Link>
                <span className="text-xs text-white">(Home)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}