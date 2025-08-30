import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MessageCircle, Send, ArrowLeft, Clock, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // SEO Meta Tags Setup
    document.title = "Contact TheValuationGenie | Get Business Valuation Quote";
    
    const setMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const setOgMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    setMeta("description", "Contact TheValuationGenie for your business valuation needs. Get a free quote and professional consultation.");
    setMeta("keywords", "contact valuationgenie, business valuation quote, valuation consultation");
    setMeta("author", "ValuationGenie");
    setMeta("robots", "index, follow");

    // Open Graph Meta Tags
    setOgMeta("og:title", "Contact TheValuationGenie | Get Business Valuation Quote");
    setOgMeta("og:description", "Contact us for your business valuation needs. Get a free quote and consultation.");
    setOgMeta("og:type", "website");
    setOgMeta("og:url", "https://thevaluationgenie.com/contact");

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://thevaluationgenie.com/contact');

    // Add ContactPage Schema Markup
    const contactSchema = document.createElement('script');
    contactSchema.type = 'application/ld+json';
    contactSchema.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact TheValuationGenie",
      "description": "Contact us for business valuation services",
      "url": "https://thevaluationgenie.com/contact",
      "mainEntity": {
        "@type": "Organization",
        "name": "TheValuationGenie",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-555-123-4567",
          "contactType": "customer service",
          "email": "info@thevaluationgenie.com"
        }
      }
    });

    // Remove existing contact schema if present
    const existingContactSchema = document.querySelector('script[type="application/ld+json"]:has-text("ContactPage")');
    if (existingContactSchema) {
      existingContactSchema.remove();
    }
    document.head.appendChild(contactSchema);

    window.scrollTo(0, 0);
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      contactMutation.mutate(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Contact TheValuationGenie</h2>
            <h2 className="text-2xl lg:text-3xl font-semibold text-slate-700 mb-6">We're Here to Help with Your Business Valuation</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get support with our business valuation software, SDE valuation reports, and technical assistance from our expert team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
                  Send us a Message
                </CardTitle>
                <p className="text-slate-600">We respond to all inquiries within 24 hours</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your question or issue..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-blue-600" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-2">
                    For general inquiries and support:
                  </p>
                  <a 
                    href="mailto:support@thevaluationgenie.com" 
                    className="text-primary hover:underline font-medium"
                  >
                    support@thevaluationgenie.com
                  </a>
                  <p className="text-sm text-slate-500 mt-2">
                    We typically respond within 24 hours
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">How accurate are the valuations?</h4>
                    <p className="text-sm text-slate-600">
                      Our valuations use industry-standard SDE multiples and are designed to provide a reliable starting point for negotiations. They're most accurate for service-based businesses under $5M in revenue.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Can I get a refund?</h4>
                    <p className="text-sm text-slate-600">
                      We offer a 7-day money-back guarantee if you're not satisfied with your valuation report. Contact us to request a refund.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Is my data secure?</h4>
                    <p className="text-sm text-slate-600">
                      Yes, all data is encrypted and stored securely. We never share your business information with third parties. See our Privacy Policy for details.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Reach Us */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Other Ways to Reach Us</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-slate-700">Email: support@thevaluationgenie.com</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-slate-700">Response time: Within 24 hours</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/")}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Business Valuation Software Home
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}