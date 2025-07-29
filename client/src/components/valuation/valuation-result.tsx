import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  FileText,
  Calculator
} from "lucide-react";

interface ValuationResultProps {
  valuation: any;
  onPaymentComplete: (valuationId: string) => void;
  onPrevious: () => void;
}

export default function ValuationResult({ valuation, onPaymentComplete, onPrevious }: ValuationResultProps) {
  const { toast } = useToast();
  const valuationLow = parseInt(valuation.valuationLow);
  const valuationHigh = parseInt(valuation.valuationHigh);
  const multiple = parseFloat(valuation.industryMultiple);
  const sde = parseInt(valuation.sde);

  // Removed downloadPDF function - now inline in button

  return (
    <div className="space-y-8">
      {/* Valuation Summary */}
      <Card className="shadow-lg border-2 border-green-500">
        <CardHeader className="bg-green-50">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
            <div>
              <CardTitle className="text-2xl text-slate-900">Valuation Complete!</CardTitle>
              <p className="text-slate-600">Your business valuation has been calculated</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">{valuation.businessName}</h3>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {valuation.industry}
            </Badge>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-slate-600 mb-2">Estimated Business Value</p>
            <div className="text-4xl font-bold text-primary mb-2">
              ${valuationLow.toLocaleString()} - ${valuationHigh.toLocaleString()}
            </div>
            <p className="text-sm text-slate-500">
              Based on {multiple}x SDE multiple for {valuation.industry}
            </p>
          </div>

          <Separator className="my-6" />

          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-slate-600">Annual Revenue</p>
              <p className="text-lg font-semibold">${parseInt(valuation.annualRevenue).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">SDE</p>
              <p className="text-lg font-semibold">${sde.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Industry Multiple</p>
              <p className="text-lg font-semibold">{multiple}x</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Methodology Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            How We Calculated Your Valuation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span>Seller's Discretionary Earnings (SDE)</span>
              <span className="font-semibold">${sde.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span>Industry Multiple ({valuation.industry})</span>
              <span className="font-semibold">{multiple}x</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="font-semibold">Estimated Value Range</span>
              <span className="font-bold text-primary">${valuationLow.toLocaleString()} - ${valuationHigh.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-800 font-medium">Factors Affecting Your Valuation:</p>
                <ul className="text-xs text-yellow-700 mt-1 list-disc list-inside space-y-1">
                  <li>Owner involvement: {valuation.ownerInvolvement}</li>
                  <li>Growth trend: {valuation.growthTrend}</li>
                  <li>Years in business: {valuation.yearsInBusiness} years</li>
                  {valuation.majorRisks && <li>Risk factors identified</li>}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Get Your Professional PDF Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-slate-600">
              Your valuation summary is complete! To receive a comprehensive PDF report with detailed analysis, 
              industry comparisons, and professional formatting, complete your purchase below.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Your PDF Report Includes:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Complete valuation methodology and calculations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Industry benchmarking and market analysis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Key financial ratios and performance metrics
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Risk assessment and value drivers analysis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  Professional disclaimers and legal notices
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-semibold text-slate-900">Professional PDF Report</p>
                <p className="text-sm text-slate-600">One-time payment • Instant download</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">$99</div>
                <p className="text-sm text-slate-500">Secure payment via Stripe</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1 py-3 text-lg font-semibold"
                onClick={() => {
                  // Create HTML content and use print functionality as fallback
                  const htmlContent = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>ValuationGenie Business Valuation Report</title>
                      <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        .header { color: #2563eb; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
                        .section { margin: 20px 0; }
                        .value { font-size: 18px; font-weight: bold; color: #059669; }
                        @media print { body { margin: 0; } }
                      </style>
                    </head>
                    <body>
                      <div class="header">ValuationGenie Business Valuation Report</div>
                      
                      <div class="section">
                        <h3>Business Information</h3>
                        <p><strong>Business Name:</strong> ${valuation.businessName}</p>
                        <p><strong>Industry:</strong> ${valuation.industry}</p>
                        <p><strong>Location:</strong> ${valuation.location}</p>
                        <p><strong>Years in Business:</strong> ${valuation.yearsInBusiness}</p>
                        <p><strong>Report Date:</strong> ${new Date().toLocaleDateString()}</p>
                      </div>
                      
                      <div class="section">
                        <h3>Valuation Summary</h3>
                        <p class="value">Estimated Value Range: $${valuationLow.toLocaleString()} - $${valuationHigh.toLocaleString()}</p>
                        <p><strong>Industry Multiple:</strong> ${multiple}x</p>
                        <p><strong>Annual Revenue:</strong> $${parseInt(valuation.annualRevenue || '0').toLocaleString()}</p>
                        <p><strong>SDE:</strong> $${parseInt(valuation.sde || '0').toLocaleString()}</p>
                      </div>
                      
                      <div class="section">
                        <h3>Disclaimer</h3>
                        <p>This valuation is based on industry-standard methodologies and should be used for informational purposes only.</p>
                      </div>
                      
                      <div class="section">
                        <p><em>© ValuationGenie - Confidential Business Valuation Report</em></p>
                      </div>
                    </body>
                    </html>
                  `;
                  
                  // Open in new window for printing/saving
                  const newWindow = window.open('', '_blank');
                  if (newWindow) {
                    newWindow.document.write(htmlContent);
                    newWindow.document.close();
                    newWindow.focus();
                    
                    // Auto-trigger print dialog
                    setTimeout(() => {
                      newWindow.print();
                    }, 500);
                    
                    toast({
                      title: "Report Opened",
                      description: "Your valuation report opened in a new window. Use Ctrl+P to print or save as PDF.",
                    });
                  } else {
                    // Fallback: create downloadable text file
                    const textContent = `
VALUATIONGENIE BUSINESS VALUATION REPORT

Business Information:
Business Name: ${valuation.businessName}
Industry: ${valuation.industry}
Location: ${valuation.location}
Years in Business: ${valuation.yearsInBusiness}
Report Date: ${new Date().toLocaleDateString()}

Valuation Summary:
Estimated Value Range: $${valuationLow.toLocaleString()} - $${valuationHigh.toLocaleString()}
Industry Multiple: ${multiple}x
Annual Revenue: $${parseInt(valuation.annualRevenue || '0').toLocaleString()}
SDE: $${parseInt(valuation.sde || '0').toLocaleString()}

Disclaimer:
This valuation is based on industry-standard methodologies and should be used for informational purposes only.

© ValuationGenie - Confidential Business Valuation Report
                    `;
                    
                    const blob = new Blob([textContent], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${valuation.businessName.replace(/[^a-zA-Z0-9]/g, '_')}-valuation.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    toast({
                      title: "Report Downloaded",
                      description: "Your valuation report has been downloaded as a text file.",
                    });
                  }
                }}
              >
                <FileText className="w-5 h-5 mr-2" />
                Download PDF Report
              </Button>
              <Button variant="outline" onClick={() => onPaymentComplete(valuation.id)}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-2">Important Disclaimer</h4>
              <p className="text-sm text-yellow-800">
                This valuation is for informational purposes only and is not a formal business appraisal. 
                It should not be used as the sole basis for business transactions, legal proceedings, or financial decisions. 
                For official valuations, please consult with a certified business appraiser.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button variant="ghost" onClick={onPrevious}>
          Previous
        </Button>
        <div className="flex gap-4">
          <Link href="/valuation">
            <Button variant="outline">
              New Valuation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
