import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { TrendingUp, BarChart3, Calculator, Info } from "lucide-react";

export default function IndustryAnalysis() {
  const { isAuthenticated } = useAuth();

  const industryData = [
    { industry: "Consulting Services", multiple: "2.5 - 4.0x", growth: "Stable", risk: "Low" },
    { industry: "Marketing Agency", multiple: "3.0 - 5.0x", growth: "High", risk: "Medium" },
    { industry: "IT Services", multiple: "3.5 - 6.0x", growth: "High", risk: "Medium" },
    { industry: "Accounting/Bookkeeping", multiple: "2.0 - 3.5x", growth: "Stable", risk: "Low" },
    { industry: "Legal Services", multiple: "2.5 - 4.5x", growth: "Stable", risk: "Low" },
    { industry: "Healthcare Services", multiple: "3.0 - 5.5x", growth: "High", risk: "Medium" },
    { industry: "Real Estate Services", multiple: "2.0 - 4.0x", growth: "Cyclical", risk: "Medium" },
    { industry: "Construction", multiple: "1.5 - 3.0x", growth: "Cyclical", risk: "High" },
    { industry: "Retail", multiple: "1.0 - 2.5x", growth: "Declining", risk: "High" },
    { industry: "Food & Beverage", multiple: "2.0 - 4.0x", growth: "Stable", risk: "Medium" },
    { industry: "Manufacturing", multiple: "2.5 - 4.5x", growth: "Stable", risk: "Medium" },
    { industry: "Transportation", multiple: "2.0 - 3.5x", growth: "Stable", risk: "Medium" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Industry Analysis & Valuation Multiples
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive industry data and valuation multiples to help you understand 
            your business value in the current market context.
          </p>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
              <CardTitle>Market Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Service-based businesses continue to command premium valuations due to 
                recurring revenue models and lower capital requirements.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="w-12 h-12 text-blue-500 mb-4" />
              <CardTitle>SDE Multiples</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Industry multiples range from 1.5x to 6.0x SDE, with technology and 
                healthcare services commanding the highest premiums.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calculator className="w-12 h-12 text-purple-500 mb-4" />
              <CardTitle>Valuation Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Growth potential, recurring revenue, market position, and operational 
                systems significantly impact valuation multiples.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Industry Multiples Table */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-6 h-6 mr-2" />
              Industry Valuation Multiples (SDE)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Industry</th>
                    <th className="text-left py-3 px-4 font-semibold">SDE Multiple</th>
                    <th className="text-left py-3 px-4 font-semibold">Growth Outlook</th>
                    <th className="text-left py-3 px-4 font-semibold">Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  {industryData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-slate-50" : ""}>
                      <td className="py-3 px-4 font-medium">{row.industry}</td>
                      <td className="py-3 px-4">{row.multiple}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.growth === 'High' ? 'bg-green-100 text-green-800' :
                          row.growth === 'Stable' ? 'bg-blue-100 text-blue-800' :
                          row.growth === 'Cyclical' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {row.growth}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.risk === 'Low' ? 'bg-green-100 text-green-800' :
                          row.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {row.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mb-16 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <Info className="w-6 h-6 mr-2" />
              Important Considerations
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800">
            <ul className="space-y-2 list-disc list-inside">
              <li>Multiples are general ranges and actual valuations depend on specific business factors</li>
              <li>Higher multiples typically apply to businesses with recurring revenue and strong systems</li>
              <li>Market conditions, location, and business size significantly impact final valuations</li>
              <li>These multiples are based on Seller's Discretionary Earnings (SDE), not EBITDA</li>
              <li>Professional due diligence may reveal factors that adjust the final valuation</li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Value Your Business?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Use our professional valuation tool to get an accurate assessment based on your specific industry.
          </p>
          {isAuthenticated ? (
            <Link href="/valuation">
              <Button size="lg" className="px-8">
                <Calculator className="w-5 h-5 mr-2" />
                Start Valuation
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="lg" className="px-8">
                <Calculator className="w-5 h-5 mr-2" />
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}