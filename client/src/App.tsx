import { Switch, Route } from "wouter";

// Simple landing page component without dependencies
function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            ValuationGenie
          </h1>
          <h2 className="text-2xl text-slate-600 mb-8">
            Instant Business Valuation
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
            Get professional business valuations for your service-based business in minutes. 
            Our AI-powered tool uses industry-standard methodologies to provide accurate estimates.
          </p>
          <div className="space-y-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Free Valuation Estimate
            </button>
            <p className="text-sm text-slate-500">
              Free Business Valuation Estimate - Professional Reports $39
            </p>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              📊
            </div>
            <h3 className="text-xl font-semibold mb-2">Accurate Valuations</h3>
            <p className="text-slate-600">Industry-standard SDE multiplier methodology for precise business valuations</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              ⚡
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
            <p className="text-slate-600">Get your business valuation in minutes, not weeks</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              📄
            </div>
            <h3 className="text-xl font-semibold mb-2">Professional Reports</h3>
            <p className="text-slate-600">Comprehensive PDF reports perfect for buyers, sellers, and brokers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route component={() => <div className="p-8">Page not found</div>} />
    </Switch>
  );
}

export default App;