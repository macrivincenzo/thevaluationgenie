import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, ArrowRight, TrendingUp, Calculator, FileText, Users, AlertTriangle, ShoppingCart, Target, ChefHat, DollarSign, Building, Cog, Scale, HandHeart, Zap } from "lucide-react";

const blogPosts = [
  {
    id: "sde-business-valuation-guide",
    title: "SDE Business Valuation: Complete Guide for Small Business Owners",
    description: "Master Seller's Discretionary Earnings (SDE) valuation method with industry multiples, calculation examples, and when to use SDE vs EBITDA for businesses under $5M.",
    excerpt: "Learn why SDE is the gold standard for valuing main street businesses and how to calculate your company's worth using this proven methodology.",
    category: "Valuation Methods",
    readTime: "12 min read",
    publishDate: "2025-01-10",
    featured: false,
    keywords: ["SDE business valuation", "seller discretionary earnings", "small business valuation method"],
    icon: TrendingUp,
    slug: "/blog/sde-business-valuation-guide"
  },
  {
    id: "business-valuation-vs-market-appraisal",
    title: "Business Valuation vs Market Appraisal: Which Do You Need?",
    description: "Understand the key differences between business valuations and market appraisals, when to use each approach, and how they impact your SME's financial decisions.",
    excerpt: "Not sure whether you need a valuation or appraisal? This guide breaks down the differences, costs, and use cases for each approach.",
    category: "Business Fundamentals", 
    readTime: "8 min read",
    publishDate: "2025-01-10",
    featured: false,
    keywords: ["business valuation vs appraisal", "market appraisal SME", "business valuation difference"],
    icon: Calculator,
    slug: "/blog/business-valuation-vs-market-appraisal"
  },
  {
    id: "small-business-sale-preparation",
    title: "How to Prepare Your Small Business for Sale: Valuation Checklist",
    description: "Essential steps to maximize your business value before selling. Financial cleanup, documentation requirements, and valuation optimization strategies.",
    excerpt: "Boost your sale price by 15-30% with proper preparation. Our comprehensive checklist covers everything from financial statements to operational improvements.",
    category: "Exit Planning",
    readTime: "15 min read", 
    publishDate: "2025-01-10",
    featured: false,
    keywords: ["prepare business for sale", "small business sale preparation", "business valuation preparation"],
    icon: FileText,
    slug: "/blog/small-business-sale-preparation"
  },
  {
    id: "industry-valuation-multiples-2025",
    title: "Industry Valuation Multiples 2025: SDE Benchmarks by Sector",
    description: "Current SDE multiples for restaurants, retail, manufacturing, IT services, and professional services. Updated market data and valuation trends.",
    excerpt: "Access the latest industry benchmarks with real market data. See how your business compares to recent sales in your sector.",
    category: "Market Data",
    readTime: "10 min read",
    publishDate: "2025-01-10", 
    featured: false,
    keywords: ["industry valuation multiples 2025", "SDE multiples by industry", "business valuation benchmarks"],
    icon: Users,
    slug: "/blog/industry-valuation-multiples-2025"
  },
  {
    id: "how-to-value-service-business",
    title: "How to Value a Service Business for Sale: Complete 2025 Guide",
    description: "Master service business valuation with proven methodologies, industry multiples, and real-world examples. Get accurate valuations for consulting, marketing, and professional services.",
    excerpt: "Learn the complete framework for valuing service businesses using SDE calculations, industry multiples, and key factors that drive value in service-based enterprises.",
    category: "Service Business",
    readTime: "15 min read",
    publishDate: "2025-01-11", 
    featured: false,
    keywords: ["service business valuation", "how to value service business", "business valuation methods"],
    icon: TrendingUp,
    slug: "/blog/how-to-value-service-business"
  },
  {
    id: "business-valuation-mistakes",
    title: "Business Valuation Mistakes That Cost Sellers Thousands",
    description: "Avoid the 7 most expensive valuation errors that cause business owners to leave money on the table. Learn how proper SDE calculation and market positioning can increase your sale price by 40-60%.",
    excerpt: "Small errors in calculating SDE or misunderstanding market multiples can reduce your sale price by hundreds of thousands. Learn the costly mistakes and how to avoid them.",
    category: "Common Mistakes",
    readTime: "12 min read",
    publishDate: "2025-01-13",
    featured: false,
    keywords: ["business valuation mistakes", "valuation errors", "SDE calculation mistakes"],
    icon: AlertTriangle,
    slug: "/blog/business-valuation-mistakes"
  },
  {
    id: "ecommerce-business-valuation",
    title: "E-commerce Business Valuation: Complete 2025 Methods Guide",
    description: "Master e-commerce business valuation using SDE multiples, revenue-based methods, and digital asset assessment. Learn platform-specific valuation strategies for Amazon FBA, Shopify, and marketplace businesses.",
    excerpt: "E-commerce businesses command premium valuations due to scalability and global reach. Learn platform-specific multiples and unique valuation considerations for online businesses.",
    category: "E-commerce",
    readTime: "14 min read",
    publishDate: "2025-01-14",
    featured: false,
    keywords: ["ecommerce business valuation", "Amazon FBA valuation", "Shopify business value"],
    icon: ShoppingCart,
    slug: "/blog/ecommerce-business-valuation"
  },
  {
    id: "sde-vs-ebitda-guide",
    title: "SDE vs EBITDA: Complete Business Valuation Comparison Guide",
    description: "Master the critical differences between Seller's Discretionary Earnings (SDE) and EBITDA for small business valuation. Learn when to use each method and why SDE delivers more accurate valuations for owner-operated businesses.",
    excerpt: "For businesses under $10M revenue, SDE provides significantly more accurate valuations than EBITDA. Learn the key differences and when to use each methodology.",
    category: "Valuation Methods",
    readTime: "13 min read",
    publishDate: "2025-01-15",
    featured: false,
    keywords: ["SDE vs EBITDA", "business valuation comparison", "seller discretionary earnings"],
    icon: Target,
    slug: "/blog/sde-vs-ebitda-guide"
  },
  {
    id: "restaurant-valuation-guide",
    title: "Restaurant Business Valuation: Complete 2025 Guide",
    description: "Master restaurant valuation using industry-specific SDE multiples, location factors, and operational metrics. Learn how to value quick-service, casual dining, and fine dining establishments accurately.",
    excerpt: "Restaurant businesses require specialized valuation approaches that account for lease terms, equipment depreciation, and location factors. Learn industry-specific multiples and critical considerations.",
    category: "Restaurant Industry",
    readTime: "16 min read",
    publishDate: "2025-01-16",
    featured: false,
    keywords: ["restaurant valuation", "restaurant business value", "food service valuation"],
    icon: ChefHat,
    slug: "/blog/restaurant-valuation-guide"
  },
  {
    id: "business-valuation-calculator",
    title: "Business Valuation Calculator: Free Tool + Professional Reports (2025)",
    description: "Get instant business value estimates with our free SDE-based calculator, then upgrade to comprehensive professional reports for just $39. Perfect for business sales and financing.",
    excerpt: "Use our free calculator for instant estimates, then get professional 3+ page reports with detailed analysis, risk assessment, and market comparisons for important decisions.",
    category: "Free Tools",
    readTime: "12 min read",
    publishDate: "2025-01-17",
    featured: false,
    keywords: ["business valuation calculator", "free business valuation", "SDE calculator"],
    icon: Calculator,
    slug: "/blog/business-valuation-calculator"
  },
  {
    id: "business-broker-vs-diy-valuation",
    title: "Business Broker vs DIY Valuation: Complete Cost Comparison Guide (2025)",
    description: "Compare business broker fees ($15K-$50K+) versus online professional valuations ($39). Real cost breakdowns, case studies, and ROI analysis for smart business owners.",
    excerpt: "Business brokers charge $15K-$50K+ for valuations. Learn when it's worth it and when professional online reports deliver the same accuracy for 99% less cost.",
    category: "Cost Comparison", 
    readTime: "18 min read",
    publishDate: "2025-01-18",
    featured: false,
    keywords: ["business broker cost", "DIY business valuation", "valuation cost comparison"],
    icon: DollarSign,
    slug: "/blog/business-broker-vs-diy-valuation"
  },
  {
    id: "business-appraisal-cost-guide", 
    title: "Business Appraisal Cost Guide: Professional vs Online Options (2025)",
    description: "Complete breakdown of business appraisal costs from certified appraisers ($15K-$50K), brokers ($5K-$15K), and online platforms ($39). Find the perfect balance of price and quality.",
    excerpt: "Certified appraisers charge $15K-$50K for business appraisals. Learn when you need that level of service and when professional online reports provide the same core value.",
    category: "Appraisal Costs",
    readTime: "16 min read", 
    publishDate: "2025-01-19",
    featured: false,
    keywords: ["business appraisal cost", "certified appraiser fees", "business valuation price"],
    icon: Building,
    slug: "/blog/business-appraisal-cost-guide"
  },
  {
    id: "family-business-valuation-estate-planning",
    title: "Family Business Valuation for Estate Planning: Complete 2025 Guide",
    description: "Essential guide to valuing family businesses for estate planning, succession, and inheritance. Learn SDE methodology, tax implications, and professional valuation requirements for family-owned enterprises.",
    excerpt: "Family business valuations require specialized approaches for estate planning. Learn SDE adjustments, succession strategies, and tax optimization for multi-generational wealth preservation.",
    category: "Estate Planning",
    readTime: "18 min read",
    publishDate: "2025-01-22",
    featured: false,
    keywords: ["family business valuation estate planning", "family business succession", "estate planning business valuation"],
    icon: Users,
    slug: "/blog/family-business-valuation-estate-planning"
  },
  {
    id: "manufacturing-business-valuation-multiples",
    title: "Manufacturing Business Valuation Multiples by Industry Type: 2025 SDE Benchmarks",
    description: "Complete guide to manufacturing business valuation multiples by sector. Current SDE multiples for food processing, metal fabrication, machinery, textiles, and specialized manufacturing with 2025 market data.",
    excerpt: "Manufacturing businesses require industry-specific valuation multiples. Learn current SDE benchmarks for food processing, custom manufacturing, metal fabrication, and emerging sectors.",
    category: "Manufacturing",
    readTime: "20 min read",
    publishDate: "2025-01-22",
    featured: false,
    keywords: ["manufacturing business valuation multiples", "manufacturing SDE multiples", "factory business valuation"],
    icon: Cog,
    slug: "/blog/manufacturing-business-valuation-multiples"
  },
  {
    id: "business-valuation-divorce-proceedings",
    title: "Small Business Valuation for Divorce Proceedings: Legal Requirements & Methods 2025",
    description: "Complete guide to business valuation in divorce cases. Legal requirements, SDE methodology, court-accepted valuation standards, and protecting business assets during divorce proceedings.",
    excerpt: "Divorce proceedings require court-accepted business valuations. Learn legal requirements, SDE methodology for family courts, and strategies for protecting business assets during separation.",
    category: "Legal Valuation",
    readTime: "17 min read",
    publishDate: "2025-01-22",
    featured: false,
    keywords: ["business valuation for divorce proceedings", "small business valuation divorce", "divorce business appraisal"],
    icon: Scale,
    slug: "/blog/business-valuation-divorce-proceedings"
  },
  {
    id: "restaurant-employee-buyout-valuation", 
    title: "Restaurant Business Valuation When Selling to Employees: Complete ESOP & Buyout Guide 2025",
    description: "Complete guide to restaurant valuation for employee buyouts, ESOP transitions, and management buyouts. Employee ownership structures, SDE calculations, and pricing strategies for restaurant worker cooperatives.",
    excerpt: "Employee buyouts offer unique opportunities for restaurant transitions. Learn valuation strategies, financing structures, and ESOP considerations for successful employee ownership transitions.",
    category: "Employee Ownership",
    readTime: "19 min read",
    publishDate: "2025-01-22",
    featured: false,
    keywords: ["restaurant employee buyout valuation", "restaurant ESOP valuation", "employee ownership restaurant"],
    icon: HandHeart,
    slug: "/blog/restaurant-employee-buyout-valuation"
  },
  {
    id: "saas-startup-valuation-calculator",
    title: "SaaS Company Valuation Calculator for Startups Under $1M Revenue: 2025 Methods & Multiples",
    description: "Complete SaaS startup valuation guide for companies under $1M ARR. Revenue multiples, SDE calculations, and valuation methods for early-stage software companies. Free SaaS valuation calculator.",
    excerpt: "SaaS startups require specialized valuation approaches combining revenue multiples and unit economics. Learn ARR-based methods, growth adjustments, and SDE calculations for software companies.",
    category: "SaaS Startup",
    readTime: "21 min read",
    publishDate: "2025-01-22",
    featured: false,
    keywords: ["saas valuation calculator startup", "saas company valuation under 1m", "software startup valuation"],
    icon: Zap,
    slug: "/blog/saas-startup-valuation-calculator"
  }
];

export default function BlogIndex() {
  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Business Valuation <span className="text-blue-600">Insights</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Expert guidance on business valuation, SDE analysis, and exit planning. 
              Stay informed with the latest market data and proven valuation methodologies.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Calculator className="w-5 h-5 mr-2" />
                  Get Free Estimate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Article */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Featured Article</h2>
            <Card className="shadow-xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <featuredPost.icon className="w-8 h-8" />
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-xl text-blue-100 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-blue-100 mb-6">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>{new Date(featuredPost.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Link href={featuredPost.slug}>
                  <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Read Full Article
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}

        {/* Other Articles Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <Card key={post.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <post.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-blue-600">{post.category}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Link href={post.slug}>
                    <Button variant="outline" className="w-full group">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Value Your Business?</h3>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Get your free business valuation estimate in minutes using our SDE-based calculator.
            </p>
            <Link href="/">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                <Calculator className="w-5 h-5 mr-2" />
                Get Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}