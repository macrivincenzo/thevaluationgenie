import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Calculator, Building, FileText } from 'lucide-react';

interface RelatedArticle {
  title: string;
  href: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  priority: 'high' | 'medium' | 'low';
}

interface RelatedArticlesProps {
  currentPage: string;
  category?: string;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentPage, category }) => {
  // Comprehensive article database for internal linking
  const allArticles: RelatedArticle[] = [
    {
      title: "SDE Business Valuation: Complete Guide",
      href: "/blog/sde-business-valuation-guide",
      description: "Master the SDE methodology for small business valuations with industry multiples and calculation examples.",
      category: "methodology",
      icon: Calculator,
      priority: "high"
    },
    {
      title: "Business Valuation Calculator: Free Tool + Professional Reports",
      href: "/blog/business-valuation-calculator", 
      description: "Use our free SDE calculator to get instant business valuations and upgrade to professional reports.",
      category: "tools",
      icon: Calculator,
      priority: "high"
    },
    {
      title: "SDE vs EBITDA: Which Valuation Method is Right for Your Business?",
      href: "/blog/sde-vs-ebitda-guide",
      description: "Compare SDE and EBITDA methodologies to choose the best valuation approach for your business size.",
      category: "methodology",
      icon: TrendingUp,
      priority: "high"
    },
    {
      title: "Restaurant Business Valuation: Complete 2025 Guide",
      href: "/blog/restaurant-valuation-guide", 
      description: "Specialized guide for restaurant valuations including industry multiples and SDE calculations.",
      category: "industry",
      icon: Building,
      priority: "medium"
    },
    {
      title: "E-commerce Business Valuation: Digital Asset Assessment",
      href: "/blog/ecommerce-business-valuation",
      description: "Learn how to value online businesses with unique considerations for digital assets and revenue streams.",
      category: "industry", 
      icon: Building,
      priority: "medium"
    },
    {
      title: "Business Valuation vs Market Appraisal: Key Differences",
      href: "/blog/business-valuation-vs-market-appraisal",
      description: "Understand when to use business valuation vs market appraisal for different business scenarios.",
      category: "comparison",
      icon: FileText,
      priority: "high"
    },
    {
      title: "Common Business Valuation Mistakes to Avoid",
      href: "/blog/business-valuation-mistakes",
      description: "Avoid costly errors in business valuation with expert tips on methodology and data accuracy.",
      category: "guidance",
      icon: FileText,
      priority: "medium"
    },
    {
      title: "How to Value a Service Business: Complete Guide",
      href: "/blog/how-to-value-service-business",
      description: "Specialized techniques for valuing service-based businesses with emphasis on intangible assets.",
      category: "industry",
      icon: Building,
      priority: "medium"
    },
    {
      title: "Business Broker vs DIY Valuation: Cost Comparison",
      href: "/blog/business-broker-vs-diy-valuation",
      description: "Compare costs and benefits of hiring business brokers vs using DIY valuation tools.",
      category: "comparison",
      icon: FileText,
      priority: "medium"
    },
    {
      title: "Business Appraisal Cost Guide: Professional vs DIY Options",
      href: "/blog/business-appraisal-cost-guide",
      description: "Complete breakdown of business appraisal costs and when to choose professional vs automated options.",
      category: "guidance",
      icon: FileText,
      priority: "low"
    }
  ];

  // Filter articles based on current page and category
  const getRelatedArticles = (): RelatedArticle[] => {
    // Remove current page from suggestions
    const filtered = allArticles.filter(article => article.href !== currentPage);
    
    // Prioritize by category match and priority
    let related = filtered.sort((a, b) => {
      // Category match gets highest priority
      const aCategoryMatch = category && a.category === category ? 1 : 0;
      const bCategoryMatch = category && b.category === category ? 1 : 0;
      
      if (aCategoryMatch !== bCategoryMatch) {
        return bCategoryMatch - aCategoryMatch;
      }
      
      // Then by priority
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    
    // Return top 6 articles
    return related.slice(0, 6);
  };

  const relatedArticles = getRelatedArticles();

  return (
    <section className="mt-16 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Related Business Valuation Guides</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Expand your knowledge with these comprehensive guides on business valuation methodologies and industry-specific approaches.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((article, index) => (
          <Card key={article.href} className="shadow-lg hover:shadow-xl transition-shadow duration-300 group">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <article.icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-600 capitalize">{article.category}</span>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 line-clamp-3 mb-4">
                {article.description}
              </p>
              <a href={article.href} className="w-full">
                <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                  Read Full Guide
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Topic Cluster Navigation */}
      <div className="mt-12 bg-slate-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Business Valuation Topics</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="font-semibold text-slate-800 mb-3">Valuation Methods</h4>
            <ul className="space-y-2">
              <li>
                <a href="/blog/sde-business-valuation-guide" className="text-blue-600 hover:text-blue-800 hover:underline">
                  SDE Method Guide
                </a>
              </li>
              <li>
                <a href="/blog/sde-vs-ebitda-guide" className="text-blue-600 hover:text-blue-800 hover:underline">
                  SDE vs EBITDA Comparison
                </a>
              </li>
              <li>
                <a href="/blog/business-valuation-vs-market-appraisal" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Valuation vs Appraisal
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-800 mb-3">Industry Guides</h4>
            <ul className="space-y-2">
              <li>
                <a href="/blog/restaurant-valuation-guide" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Restaurant Valuation
                </a>
              </li>
              <li>
                <a href="/blog/ecommerce-business-valuation" className="text-blue-600 hover:text-blue-800 hover:underline">
                  E-commerce Valuation
                </a>
              </li>
              <li>
                <a href="/blog/how-to-value-service-business" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Service Business Valuation
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-800 mb-3">Tools & Calculators</h4>
            <ul className="space-y-2">
              <li>
                <a href="/blog/business-valuation-calculator" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Free Calculator Tool
                </a>
              </li>
              <li>
                <a href="/" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Professional Reports
                </a>
              </li>
              <li>
                <a href="/services" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Valuation Services
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-800 mb-3">Cost & Comparison</h4>
            <ul className="space-y-2">
              <li>
                <a href="/blog/business-broker-vs-diy-valuation" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Broker vs DIY
                </a>
              </li>
              <li>
                <a href="/blog/business-appraisal-cost-guide" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Appraisal Cost Guide
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Our Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;