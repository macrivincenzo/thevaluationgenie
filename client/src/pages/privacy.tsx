import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>Personal Information</h4>
              <ul>
                <li>Name and email address (from your account registration)</li>
                <li>Profile information from your authentication provider</li>
                <li>Payment information (processed securely by Stripe)</li>
              </ul>
              
              <h4>Business Information</h4>
              <ul>
                <li>Business financials and operational data you provide</li>
                <li>Industry and location information</li>
                <li>Uploaded financial documents (if any)</li>
                <li>Responses to our valuation questionnaire</li>
              </ul>
              
              <h4>Technical Information</h4>
              <ul>
                <li>IP address, browser type, and device information</li>
                <li>Usage data and analytics</li>
                <li>Session information and preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <ul>
                <li><strong>Provide Services:</strong> Generate business valuations and PDF reports</li>
                <li><strong>Process Payments:</strong> Handle billing and payment processing</li>
                <li><strong>Account Management:</strong> Maintain your user account and preferences</li>
                <li><strong>Customer Support:</strong> Respond to inquiries and provide assistance</li>
                <li><strong>Service Improvement:</strong> Analyze usage patterns to enhance our platform</li>
                <li><strong>Communications:</strong> Send important updates and optional marketing emails</li>
                <li><strong>Legal Compliance:</strong> Meet regulatory requirements and prevent fraud</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Data Security and Protection</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We implement industry-standard security measures to protect your information:
              </p>
              <ul>
                <li>End-to-end encryption for data transmission</li>
                <li>Secure cloud storage with encryption at rest</li>
                <li>Regular security audits and monitoring</li>
                <li>Limited access controls for our team members</li>
                <li>Secure payment processing through Stripe (PCI DSS compliant)</li>
              </ul>
              <p>
                While we use best practices to protect your data, no internet-based service can guarantee 100% security. We encourage you to use strong passwords and keep your account credentials confidential.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We do not sell, rent, or share your personal or business information with third parties, except in the following limited circumstances:
              </p>
              <ul>
                <li><strong>Service Providers:</strong> Trusted partners who help us operate our platform (e.g., cloud hosting, payment processing)</li>
                <li><strong>Legal Requirements:</strong> When required by law, regulation, or court order</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                <li><strong>Safety and Security:</strong> To protect our users and prevent fraud or abuse</li>
              </ul>
              <p>
                All third-party service providers are contractually bound to protect your information and use it only for the specified purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h4>Data Control</h4>
              <ul>
                <li><strong>Access:</strong> View and download your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Delete your account and all associated data</li>
                <li><strong>Portability:</strong> Export your data in a standard format</li>
              </ul>
              
              <h4>Communication Preferences</h4>
              <ul>
                <li>Opt out of marketing emails at any time</li>
                <li>Manage notification preferences in your account settings</li>
                <li>Continue to receive important service-related communications</li>
              </ul>
              
              <h4>Data Deletion</h4>
              <p>
                You can delete all your data at any time from your dashboard. This includes:
              </p>
              <ul>
                <li>All valuation reports and business data</li>
                <li>Uploaded files and documents</li>
                <li>Account information and preferences</li>
                <li>Communication history</li>
              </ul>
              <p>
                Note: We may retain some information for legal or operational purposes as required by law.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We use cookies and similar technologies to:
              </p>
              <ul>
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze website usage and performance</li>
                <li>Provide personalized content</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences. Disabling cookies may affect some functionality of our service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Our service is intended for business owners and professionals who are at least 18 years old. We do not knowingly collect personal information from children under 13. If we discover that we have collected information from a child under 13, we will delete it promptly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Your information may be processed and stored in countries other than your own, including the United States. We ensure that appropriate safeguards are in place to protect your data according to this privacy policy and applicable laws.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes via email or through our service. Your continued use of the service after changes take effect constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <p>
                <strong>Email:</strong> privacy@valuationgenie.com<br />
                <strong>Subject Line:</strong> Privacy Policy Inquiry<br />
                <strong>Address:</strong> [Your Business Address]
              </p>
              <p>
                We will respond to your inquiries within 30 days.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
