import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, FileText, Users, DollarSign, BarChart3, CheckCircle, ArrowRight } from "lucide-react";

export default function HowToValueServiceBusiness() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Service Business Valuation Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            How to Value a Service Business for Sale: Complete 2025 Guide
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Master the art of service business valuation with proven methodologies, industry multiples, and real-world examples. Get accurate valuations for consulting, marketing, and professional service businesses.
          </p>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => window.location.href = '/valuation'} size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Calculator className="w-5 h-5 mr-2" />
              Get Free Business Valuation
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.location.href = '/blog'}>
              <FileText className="w-5 h-5 mr-2" />
              More Valuation Guides
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900 mb-1">85%</div>
              <p className="text-slate-600">of service businesses use SDE method</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900 mb-1">2.5-4x</div>
              <p className="text-slate-600">typical SDE multiple range</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900 mb-1">$500K</div>
              <p className="text-slate-600">average service business sale</p>
            </CardContent>
          </Card>
        </div>

        {/* Table of Contents */}
        <Card className="mb-12 bg-slate-50 border-slate-200">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">Service business valuation fundamentals</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">SDE calculation methods</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">Industry-specific multiples</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">Key valuation factors</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">Common valuation mistakes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">Real-world examples</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">Professional tips</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">Step-by-step process</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-slate max-w-none">
          
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Understanding Service Business Valuations</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Service businesses represent one of the most common types of enterprises sold today, yet their valuation presents unique challenges. Unlike product-based businesses with tangible inventory and assets, service businesses derive their value primarily from customer relationships, recurring revenue, and the expertise of their teams.
          </p>
          
          <p className="text-slate-700 leading-relaxed mb-8">
            Whether you're valuing a consulting firm, marketing agency, accounting practice, or any other service-based business, the fundamental principles remain consistent. The key is understanding how to properly calculate Seller's Discretionary Earnings (SDE) and apply appropriate industry multiples to arrive at a fair market value.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Industry Insight</h3>
                <p className="text-blue-800">
                  Service businesses typically sell for 2.5-4x their annual SDE, with premium businesses achieving multiples of 4-6x when they demonstrate strong systems, recurring revenue, and growth potential.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-6">The Service Business Valuation Framework</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Valuing a service business requires a systematic approach that considers both financial performance and operational factors. Here's the proven framework used by professional business valuators:
          </p>

          <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Calculate Seller's Discretionary Earnings (SDE)</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            SDE forms the foundation of service business valuation. It represents the true earning power available to a new owner, including the current owner's salary, benefits, and discretionary expenses.
          </p>

          <div className="bg-slate-100 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-slate-900 mb-3">SDE Calculation Formula:</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>Net Income: $150,000</div>
              <div>+ Owner's Salary: $80,000</div>
              <div>+ Owner's Benefits: $12,000</div>
              <div>+ Personal Expenses: $8,000</div>
              <div>+ One-time Expenses: $5,000</div>
              <div className="border-t pt-2 font-bold">= SDE: $255,000</div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4">2. Determine the Appropriate Multiple</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            Service business multiples vary significantly based on industry, size, growth rate, and operational factors. Here are typical ranges for common service businesses:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 p-3 text-left font-semibold">Service Type</th>
                  <th className="border border-slate-300 p-3 text-left font-semibold">Typical Multiple</th>
                  <th className="border border-slate-300 p-3 text-left font-semibold">Premium Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-3">Marketing Agency</td>
                  <td className="border border-slate-300 p-3">2.5-3.5x SDE</td>
                  <td className="border border-slate-300 p-3">4.0-5.0x SDE</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 p-3">Management Consulting</td>
                  <td className="border border-slate-300 p-3">3.0-4.0x SDE</td>
                  <td className="border border-slate-300 p-3">4.5-6.0x SDE</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">IT Services</td>
                  <td className="border border-slate-300 p-3">2.5-3.5x SDE</td>
                  <td className="border border-slate-300 p-3">4.0-5.5x SDE</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-300 p-3">Professional Services</td>
                  <td className="border border-slate-300 p-3">2.0-3.0x SDE</td>
                  <td className="border border-slate-300 p-3">3.5-4.5x SDE</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">Financial Services</td>
                  <td className="border border-slate-300 p-3">3.0-4.5x SDE</td>
                  <td className="border border-slate-300 p-3">5.0-7.0x SDE</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Get Valuation CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Value Your Service Business?</h3>
            <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
              Get a professional business valuation report in minutes. Our SDE-based methodology provides accurate valuations for service businesses of all types.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => window.location.href = '/valuation'} size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Calculator className="w-5 h-5 mr-2" />
                Start Your Free Valuation
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = '/blog/sde-business-valuation-guide'}>
                <ArrowRight className="w-5 h-5 mr-2" />
                Learn More About SDE
              </Button>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-6">Conclusion</h2>
          <p className="text-slate-700 leading-relaxed mb-6">
            Valuing a service business requires a thorough understanding of SDE calculations, industry multiples, and the key factors that drive value in service-based enterprises. By following the framework outlined in this guide, you can arrive at a realistic valuation range for your business.
          </p>
          
          <p className="text-slate-700 leading-relaxed">
            Remember that business valuation is both an art and a science. While the mathematical calculations provide a foundation, the final value often depends on market conditions, buyer motivations, and the unique characteristics of your specific business. For the most accurate valuation, consider working with experienced professionals who understand your industry and current market dynamics.
          </p>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Related Valuation Guides</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">SDE Business Valuation Guide</h4>
                <p className="text-slate-600 text-sm mb-4">Master the fundamentals of SDE-based business valuations</p>
                <Button variant="outline" size="sm" onClick={() => window.location.href = '/blog/sde-business-valuation-guide'}>
                  Read Article
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">Business vs Market Appraisal</h4>
                <p className="text-slate-600 text-sm mb-4">Understand the key differences between valuation methods</p>
                <Button variant="outline" size="sm" onClick={() => window.location.href = '/blog/business-valuation-vs-market-appraisal'}>
                  Read Article
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">Industry Multiples 2025</h4>
                <p className="text-slate-600 text-sm mb-4">Current industry-specific valuation multiples and trends</p>
                <Button variant="outline" size="sm" onClick={() => window.location.href = '/blog/industry-valuation-multiples-2025'}>
                  Read Article
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}