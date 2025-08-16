import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                By accessing and using ValuationGenie ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Service Description</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                ValuationGenie provides automated business valuation reports for informational purposes only. Our service uses industry-standard methodologies and multiples to estimate business values based on user-provided data.
              </p>
              <p>
                <strong>Important:</strong> These valuations are not formal business appraisals and should not be used as the sole basis for business transactions, legal proceedings, or financial decisions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ul>
                <li>Provide accurate and truthful information about your business</li>
                <li>Use the service in compliance with all applicable laws and regulations</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Not use the service for any unlawful or prohibited purpose</li>
                <li>Not attempt to reverse engineer or copy our valuation methodology</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Payment and Refunds</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Our valuation reports are available for a one-time fee of $39. Payment is processed securely through Stripe. We offer a 7-day money-back guarantee if you are not satisfied with your valuation report.
              </p>
              <p>
                To request a refund, contact us within 30 days of your purchase with your order details.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Data Privacy and Security</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We take your privacy seriously. All business data you provide is encrypted and stored securely. You can delete your data at any time from your dashboard. We never share your business information with third parties without your explicit consent.
              </p>
              <p>
                For detailed information about how we collect, use, and protect your data, please review our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                The ValuationGenie platform, including its software, algorithms, design, and content, is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works based on our service without written permission.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Disclaimers and Limitations</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                <strong>IMPORTANT DISCLAIMERS:</strong>
              </p>
              <ul>
                <li>Valuations are estimates for informational purposes only</li>
                <li>Not a substitute for professional business appraisal services</li>
                <li>Results may vary based on market conditions and other factors</li>
                <li>We make no guarantees about the accuracy of valuations</li>
                <li>The service is provided "as is" without warranties of any kind</li>
              </ul>
              <p>
                Our liability is limited to the amount you paid for the service. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Termination</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We reserve the right to terminate or suspend your account at any time for violation of these terms. You may terminate your account at any time by contacting us or using the data deletion feature in your dashboard.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We may update these terms from time to time. We will notify users of any material changes via email or through the service. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </CardContent>
          </Card>


        </div>
      </div>
      
      <Footer />
    </div>
  );
}
