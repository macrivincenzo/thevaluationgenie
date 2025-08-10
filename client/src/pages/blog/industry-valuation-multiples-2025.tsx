import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, TrendingUp, BarChart3, Calculator, CheckCircle, AlertCircle } from "lucide-react";

export default function IndustryValuationMultiples2025() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb & Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-purple-200 mb-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="text-purple-200 hover:text-white hover:bg-purple-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Industry Valuation Multiples 2025: SDE Benchmarks by Sector
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl">
            Current SDE multiples for restaurants, retail, manufacturing, IT services, and professional services. 
            Updated market data and valuation trends based on recent business sales.
          </p>
          <div className="flex items-center gap-6 mt-8 text-purple-200">
            <span>January 10, 2025</span>
            <span>10 min read</span>
            <span>Market Data</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Market Overview */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-slate-900">
              2025 Market Overview: Small Business Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-slate-900">$352K</h3>
                <p className="text-slate-700 text-sm">Median Sale Price</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-slate-900">2.8x</h3>
                <p className="text-slate-700 text-sm">Average SDE Multiple</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-slate-900">156 Days</h3>
                <p className="text-slate-700 text-sm">Average Time on Market</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Calculator className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-slate-900">87%</h3>
                <p className="text-slate-700 text-sm">Use SDE Method</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <article className="prose prose-lg max-w-none">
          {/* Service-Based Industries */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-600" />
              Service-Based Industries
            </h2>

            <p className="text-lg text-slate-700 mb-8">
              Service businesses typically command higher multiples due to lower capital requirements, 
              recurring revenue potential, and scalability. However, multiples vary significantly based on 
              customer concentration and owner dependency.
            </p>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Professional Services</CardTitle>
                  <p className="text-slate-600">Accounting, Legal, Consulting, Engineering</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-slate-900 mb-2">SDE Multiple Range</h4>
                      <p className="text-2xl font-bold text-blue-600">2.5x - 4.0x</p>
                      <p className="text-slate-600 text-sm">Average: 3.2x</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Value Drivers:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Recurring client relationships</li>
                        <li>• Professional certifications</li>
                        <li>• Low capital requirements</li>
                        <li>• Scalable business model</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Value Detractors:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• High owner dependency</li>
                        <li>• Client concentration risk</li>
                        <li>• Professional liability</li>
                        <li>• Industry regulation changes</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Recent Sale Example:</h4>
                    <p className="text-blue-700 text-sm">
                      <strong>$1.2M accounting practice</strong> (15 clients, $375K SDE) sold for <strong>$1.5M (4.0x SDE)</strong> 
                      due to strong recurring revenue and experienced staff capable of operating independently.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">IT Services & Technology</CardTitle>
                  <p className="text-slate-600">Managed IT, Software Development, Digital Marketing</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-slate-900 mb-2">SDE Multiple Range</h4>
                      <p className="text-2xl font-bold text-green-600">3.0x - 5.0x</p>
                      <p className="text-slate-600 text-sm">Average: 4.1x</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Premium Factors:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Recurring revenue contracts</li>
                        <li>• Technical expertise barriers</li>
                        <li>• High growth potential</li>
                        <li>• Strong profit margins</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Risk Factors:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Rapid technology changes</li>
                        <li>• Key employee dependency</li>
                        <li>• Competitive market</li>
                        <li>• Project-based revenue</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Healthcare Services</CardTitle>
                  <p className="text-slate-600">Dental Practices, Medical Clinics, Physical Therapy</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-slate-900 mb-2">SDE Multiple Range</h4>
                      <p className="text-2xl font-bold text-teal-600">3.0x - 4.5x</p>
                      <p className="text-slate-600 text-sm">Average: 3.8x</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Strengths:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Stable patient base</li>
                        <li>• Insurance reimbursements</li>
                        <li>• Recession-resistant demand</li>
                        <li>• Professional goodwill</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Challenges:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Regulatory requirements</li>
                        <li>• License transfer issues</li>
                        <li>• Insurance dependencies</li>
                        <li>• Equipment capital needs</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Personal Services</CardTitle>
                  <p className="text-slate-600">Salons, Fitness Centers, Cleaning Services</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-slate-900 mb-2">SDE Multiple Range</h4>
                      <p className="text-2xl font-bold text-orange-600">2.0x - 3.5x</p>
                      <p className="text-slate-600 text-sm">Average: 2.7x</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Positive Aspects:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Local market protection</li>
                        <li>• Repeat customer base</li>
                        <li>• Cash flow business</li>
                        <li>• Franchise opportunities</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Limitations:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• High owner involvement</li>
                        <li>• Location dependency</li>
                        <li>• Staff turnover issues</li>
                        <li>• Economic sensitivity</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Physical/Product-Based Industries */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              Physical & Product-Based Industries
            </h2>

            <p className="text-lg text-slate-700 mb-8">
              Businesses with physical locations or product inventory typically have lower multiples due to 
              higher capital requirements, location dependency, and operational complexity. However, 
              established operations with strong cash flow can still achieve attractive valuations.
            </p>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Restaurants & Food Service</CardTitle>
                  <p className="text-slate-600">Quick Service, Casual Dining, Food Trucks, Catering</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-slate-900 mb-2">SDE Multiple Range</h4>
                      <p className="text-2xl font-bold text-red-600">1.5x - 2.5x</p>
                      <p className="text-slate-600 text-sm">Average: 2.0x</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Success Factors:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Prime location with lease</li>
                        <li>• Established customer base</li>
                        <li>• Proven operating systems</li>
                        <li>• Strong brand recognition</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Risk Factors:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• High failure rates</li>
                        <li>• Intensive management</li>
                        <li>• Thin profit margins</li>
                        <li>• Regulatory compliance</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Franchise Premium:</h4>
                    <p className="text-red-700 text-sm">
                      Established franchises typically command 0.3x-0.5x higher multiples due to proven systems, 
                      brand recognition, and ongoing support structures.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Retail Businesses</CardTitle>
                  <p className="text-slate-600">Specialty Retail, Convenience Stores, E-commerce</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-slate-900 mb-2">SDE Multiple Range</h4>
                      <p className="text-2xl font-bold text-indigo-600">1.5x - 3.0x</p>
                      <p className="text-slate-600 text-sm">Average: 2.3x</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Value Drivers:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Online presence/e-commerce</li>
                        <li>• Exclusive product lines</li>
                        <li>• Loyal customer database</li>
                        <li>• Efficient inventory systems</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Challenges:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Amazon/online competition</li>
                        <li>• Inventory management</li>
                        <li>• Seasonal fluctuations</li>
                        <li>• Changing consumer habits</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-green-50 rounded">
                      <h5 className="font-medium text-green-800">E-commerce Focus</h5>
                      <p className="text-green-700 text-xs">2.5x-3.5x SDE multiples</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded">
                      <h5 className="font-medium text-blue-800">Brick & Mortar</h5>
                      <p className="text-blue-700 text-xs">1.5x-2.5x SDE multiples</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Manufacturing & Distribution</CardTitle>
                  <p className="text-slate-600">Light Manufacturing, Product Assembly, Wholesale Distribution</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-slate-900 mb-2">SDE Multiple Range</h4>
                      <p className="text-2xl font-bold text-gray-600">2.0x - 3.5x</p>
                      <p className="text-slate-600 text-sm">Average: 2.8x</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Strengths:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Tangible asset base</li>
                        <li>• Established supply chains</li>
                        <li>• Barriers to entry</li>
                        <li>• Predictable cash flows</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Considerations:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Capital intensive operations</li>
                        <li>• Environmental liabilities</li>
                        <li>• Technology obsolescence</li>
                        <li>• Cyclical demand patterns</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Automotive Services</CardTitle>
                  <p className="text-slate-600">Auto Repair, Car Washes, Dealerships, Parts</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-slate-900 mb-2">SDE Multiple Range</h4>
                      <p className="text-2xl font-bold text-blue-600">2.0x - 3.0x</p>
                      <p className="text-slate-600 text-sm">Average: 2.5x</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Advantages:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Recurring maintenance needs</li>
                        <li>• Local market protection</li>
                        <li>• Skilled labor differentiation</li>
                        <li>• Cash-based transactions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Risks:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Electric vehicle transition</li>
                        <li>• Skilled technician shortage</li>
                        <li>• Environmental regulations</li>
                        <li>• Equipment investment needs</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Construction & Trades</CardTitle>
                  <p className="text-slate-600">General Contracting, HVAC, Plumbing, Electrical</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h4 className="font-semibold text-slate-900 mb-2">SDE Multiple Range</h4>
                      <p className="text-2xl font-bold text-yellow-600">1.8x - 2.8x</p>
                      <p className="text-slate-600 text-sm">Average: 2.3x</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Positive Factors:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Strong demand fundamentals</li>
                        <li>• Licensing barriers</li>
                        <li>• Repeat customer relationships</li>
                        <li>• Regional market focus</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Challenges:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Economic cycle sensitivity</li>
                        <li>• Liability and bonding issues</li>
                        <li>• Weather dependencies</li>
                        <li>• Labor cost inflation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Factors Affecting Multiples */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Factors That Increase/Decrease Multiples</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-green-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Multiple Enhancers (+0.3x to +1.0x)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Financial Factors:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• 3+ years of consistent growth</li>
                        <li>• Gross margins &gt;40%</li>
                        <li>• Strong working capital position</li>
                        <li>• Recurring revenue &gt;50%</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Operational Factors:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Professional management team</li>
                        <li>• Diversified customer base</li>
                        <li>• Documented systems & processes</li>
                        <li>• Strong brand/market position</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Strategic Factors:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Proprietary technology/IP</li>
                        <li>• Long-term contracts</li>
                        <li>• Growth opportunities</li>
                        <li>• Competitive advantages</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6" />
                    Multiple Detractors (-0.3x to -1.0x)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Financial Red Flags:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Declining revenue trends</li>
                        <li>• Thin or volatile margins</li>
                        <li>• Poor working capital management</li>
                        <li>• Irregular accounting practices</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Operational Risks:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• High owner dependency</li>
                        <li>• Customer concentration &gt;25%</li>
                        <li>• Key employee risks</li>
                        <li>• Outdated technology/systems</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Market Risks:</h4>
                      <ul className="space-y-1 text-slate-700 text-sm">
                        <li>• Declining industry trends</li>
                        <li>• Intense competition</li>
                        <li>• Regulatory uncertainties</li>
                        <li>• Economic sensitivity</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Using Multiples Effectively */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Using Industry Multiples Effectively</h2>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Step-by-Step Valuation Process</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">1</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Calculate Accurate SDE</h4>
                      <p className="text-slate-700 text-sm">Use last 12 months of financial data to calculate Seller's Discretionary Earnings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">2</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Identify Industry Category</h4>
                      <p className="text-slate-700 text-sm">Match your business to the most appropriate industry category above</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">3</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Apply Base Multiple</h4>
                      <p className="text-slate-700 text-sm">Start with the average multiple for your industry as the baseline</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">4</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Adjust for Business-Specific Factors</h4>
                      <p className="text-slate-700 text-sm">Add/subtract 0.3x-1.0x based on your business's specific strengths and weaknesses</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">5</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Validate with Market Data</h4>
                      <p className="text-slate-700 text-sm">Compare your result to recent sales of similar businesses in your market</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold text-amber-800 mb-2">Important Disclaimers:</h4>
                    <ul className="text-amber-700 space-y-1 text-sm">
                      <li>• These multiples are general guidelines based on market data</li>
                      <li>• Individual businesses may vary significantly from industry averages</li>
                      <li>• Local market conditions can impact valuations by ±20%</li>
                      <li>• Professional valuation recommended for legal/formal purposes</li>
                      <li>• Market conditions change - data reflects 2024-2025 transactions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Get Your Valuation */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Get Your Industry-Specific Valuation</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Free Instant Estimate</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <Calculator className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <p className="text-slate-700 mb-4">
                    Get an instant valuation using current industry multiples and your business data.
                  </p>
                  <Link href="/get-valuation">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Calculate My Value
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Professional Report ($39)</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-slate-700 mb-4">
                    Download comprehensive analysis with industry comparisons, market trends, and improvement recommendations.
                  </p>
                  <Link href="/get-valuation">
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      Get Professional Analysis
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
        </article>

        {/* Related Articles */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  <Link href="/blog/sde-business-valuation-guide" className="text-blue-600 hover:text-blue-800">
                    SDE Business Valuation Guide
                  </Link>
                </h4>
                <p className="text-slate-600 text-sm">Learn how to calculate SDE and apply industry multiples correctly.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  <Link href="/blog/small-business-sale-preparation" className="text-blue-600 hover:text-blue-800">
                    Prepare Your Business for Sale
                  </Link>
                </h4>
                <p className="text-slate-600 text-sm">Optimize your business to achieve higher valuation multiples.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-900 mb-2">
                  <Link href="/blog/business-valuation-vs-market-appraisal" className="text-blue-600 hover:text-blue-800">
                    Valuation vs Market Appraisal
                  </Link>
                </h4>
                <p className="text-slate-600 text-sm">Choose the right approach for your business assessment needs.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}