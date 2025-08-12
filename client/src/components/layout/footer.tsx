import { Link } from "wouter";
import { Calculator } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">ValuationGenie</span>
            </div>
            <p className="text-slate-300 mb-4 max-w-md">
              Professional business valuations for buyers and sellers. Get instant, 
              credible valuations with industry-standard methodologies.
            </p>
            <p className="text-sm text-slate-400">
              © 2025 ValuationGenie. All rights reserved.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>

              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Valuation Dashboard
                </Link>
              </li>
              <li>
                <Link href="/industry-analysis" className="hover:text-white transition-colors">
                  Industry Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p className="text-sm">
            Professional disclaimer: Valuations provided are for informational purposes only and do not constitute formal business appraisals.
          </p>
        </div>
      </div>
    </footer>
  );
}