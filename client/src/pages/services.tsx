import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Calculator, BarChart3, TrendingUp, CheckCircle, Clock, Shield } from "lucide-react";

export default function Services() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Professional Business Valuation Services
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get instant, credible business valuations using industry-standard methodologies. 
            Perfect for buyers, sellers, and business professionals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Calculator className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Business Valuation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Comprehensive business valuations using the Seller's Discretionary Earnings (SDE) multiple method.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Industry-standard methodology
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Professional PDF reports
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Instant results
                </li>
              </ul>
              {isAuthenticated ? (
                <Link href="/valuation">
                  <Button className="w-full">Start Valuation</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="w-full">Get Started</Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Valuation Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Manage and access all your business valuations in one centralized dashboard.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  View all valuations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Download reports
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Track history
                </li>
              </ul>
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">View Dashboard</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Industry Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Access industry-specific valuation multiples and market insights for accurate valuations.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Industry multiples
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Market trends
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Benchmarking data
                </li>
              </ul>
              <Link href="/industry-analysis">
                <Button variant="outline" className="w-full">Learn More</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="bg-slate-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">
            Why Choose ValuationGenie?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
              <p className="text-slate-600">
                Get your business valuation in minutes, not weeks. No waiting for appointments or lengthy processes.
              </p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
              <p className="text-slate-600">
                Industry-standard methodologies and professional PDF reports suitable for serious business transactions.
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
              <p className="text-slate-600">
                Professional valuations at a fraction of the cost of traditional appraisers. Just $39 per report.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Value Your Business?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of business owners who trust ValuationGenie for their valuation needs.
          </p>
          {isAuthenticated ? (
            <Link href="/valuation">
              <Button size="lg" className="px-8">
                <Calculator className="w-5 h-5 mr-2" />
                Start New Valuation
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="lg" className="px-8">
                <Calculator className="w-5 h-5 mr-2" />
                Get Started Today
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}