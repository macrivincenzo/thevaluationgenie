export default function FastLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">ValuationGenie</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                Log In
              </a>
              <a href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Sign Up For Free
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Instant Business Valuations
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get professional business valuations in minutes, not weeks. Perfect for buyers, sellers, and investors seeking accurate financial insights.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold">
              Start Free Valuation
            </a>
            <a href="/contact" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">Professional valuations at a fraction of traditional costs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Professional Report */}
          <div className="bg-white rounded-lg shadow-lg p-8 border">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Report</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">$39</div>
              <p className="text-gray-600 mb-6">Perfect for single business valuations</p>
              <a href="/signup" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold block text-center">
                Get Started
              </a>
            </div>
          </div>

          {/* Business Package */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-600 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Package</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">$99</div>
              <p className="text-gray-600 mb-6">3 reports, valid for 6 months</p>
              <a href="/signup" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold block text-center">
                Get Started
              </a>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8 border">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Plan</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">$199</div>
              <p className="text-gray-600 mb-6">12 reports per quarter</p>
              <a href="/signup" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold block text-center">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 ValuationGenie. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}