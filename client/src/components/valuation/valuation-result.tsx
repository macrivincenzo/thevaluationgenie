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

  const downloadPDF = async (valuationId: string) => {
    try {
      console.log('Starting client-side PDF generation for:', valuationId);
      
      // Import jsPDF dynamically for client-side use
      const jsPDF = (await import('jspdf')).default;
      const doc = new jsPDF();
      
      // Page setup
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPosition = 30;
      
      // Helper function for text
      const addText = (text: string, fontSize: number = 12, isBold: boolean = false) => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', isBold ? 'bold' : 'normal');
        doc.text(text, margin, yPosition);
        yPosition += fontSize * 0.5;
      };
      
      // Header with blue background
      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, pageWidth, 50, 'F');
      doc.setTextColor(255, 255, 255);
      addText('ValuationGenie', 22, true);
      yPosition = 40;
      addText('Business Valuation Report', 14);
      
      // Reset colors and position
      doc.setTextColor(0, 0, 0);
      yPosition = 70;
      
      // Business Information
      addText('Business Information', 16, true);
      yPosition += 5;
      addText(`Business Name: ${valuation.businessName}`);
      addText(`Industry: ${valuation.industry}`);
      addText(`Location: ${valuation.location}`);
      addText(`Years in Business: ${valuation.yearsInBusiness}`);
      addText(`Report Date: ${new Date().toLocaleDateString()}`);
      
      yPosition += 15;
      
      // Valuation Summary with light blue background
      const summaryHeight = 65;
      doc.setFillColor(240, 249, 255);
      doc.rect(margin - 5, yPosition - 10, pageWidth - (margin * 2) + 10, summaryHeight, 'F');
      
      addText('Valuation Summary', 16, true);
      yPosition += 5;
      addText(`Estimated Value Range: $${valuationLow.toLocaleString()} - $${valuationHigh.toLocaleString()}`, 14, true);
      addText(`Industry Multiple: ${multiple}x`);
      addText(`Annual Revenue: $${parseInt(valuation.annualRevenue || '0').toLocaleString()}`);
      addText(`SDE: $${parseInt(valuation.sde || '0').toLocaleString()}`);
      
      yPosition += 20;
      
      // Methodology
      addText('Valuation Methodology', 16, true);
      yPosition += 5;
      doc.setFontSize(12);
      const methodText = 'This valuation uses the SDE (Seller\'s Discretionary Earnings) multiple method, which is the industry standard for small business valuations.';
      const lines = doc.splitTextToSize(methodText, pageWidth - (margin * 2));
      doc.text(lines, margin, yPosition);
      yPosition += lines.length * 6;
      
      yPosition += 15;
      
      // Disclaimer
      addText('Important Disclaimer', 16, true);
      yPosition += 5;
      doc.setFontSize(11);
      const disclaimerText = 'This valuation is based on industry-standard methodologies and should be used for informational purposes only. It does not constitute professional financial advice. Consult with qualified professionals before making investment or business decisions.';
      const disclaimerLines = doc.splitTextToSize(disclaimerText, pageWidth - (margin * 2));
      doc.text(disclaimerLines, margin, yPosition);
      
      // Footer
      const footerY = doc.internal.pageSize.getHeight() - 20;
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text('© ValuationGenie - Confidential Business Valuation Report', margin, footerY);
      
      // Save the PDF
      const fileName = `${valuation.businessName.replace(/[^a-zA-Z0-9]/g, '_')}-valuation.pdf`;
      doc.save(fileName);
      
      console.log('PDF generated and downloaded successfully');
      
      toast({
        title: "PDF Downloaded",
        description: "Your valuation report has been downloaded successfully.",
      });
    } catch (error: any) {
      console.error('PDF generation error:', error);
      toast({
        title: "Download Failed",
        description: error.message || "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

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
                  console.log('Download PDF button clicked for valuation:', valuation.id);
                  downloadPDF(valuation.id);
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
