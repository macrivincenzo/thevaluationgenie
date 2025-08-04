import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Calculator, FileText, BarChart3, Users } from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  
  const { data: valuations = [] } = useQuery({
    queryKey: ["/api/valuations"],
  });

  const recentValuations = valuations.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Welcome back!
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Ready to create a new business valuation or review your previous reports?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/valuation">
              <Button size="lg" className="w-full sm:w-auto">
                <Calculator className="w-5 h-5 mr-2" />
                New Valuation
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <FileText className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Valuations</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{valuations.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {valuations.filter((v: any) => v.paid).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Value</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {valuations.length > 0 
                  ? `$${Math.round(valuations.reduce((sum: number, v: any) => sum + parseFloat(v.valuationHigh), 0) / valuations.length / 1000)}K`
                  : '$0'
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Valuations */}
        {recentValuations.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Recent Valuations</h2>
            </div>
            
            <div className="grid gap-4">
              {recentValuations.map((valuation: any) => (
                <Card key={valuation.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{valuation.businessName}</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                          <span>{valuation.industry}</span>
                          <span>${parseInt(valuation.valuationLow).toLocaleString()} - ${parseInt(valuation.valuationHigh).toLocaleString()}</span>
                          <span>{new Date(valuation.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {valuation.paid && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={async () => {
                              try {
                                const response = await fetch(`/api/valuations/${valuation.id}/pdf`, {
                                  method: 'GET',
                                  credentials: 'include',
                                  headers: { 'Accept': 'application/pdf' }
                                });
                                
                                if (!response.ok) return;
                                
                                const blob = await response.blob();
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = `${valuation.businessName}-valuation-report.pdf`;
                                link.style.display = 'none';
                                
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                setTimeout(() => URL.revokeObjectURL(url), 100);
                              } catch (error) {
                                console.error('Download error:', error);
                              }
                            }}
                          >
                            Download PDF
                          </Button>
                        )}
                        {!valuation.paid && (
                          <Link href={`/checkout/${valuation.id}`}>
                            <Button size="sm">
                              Pay & Download - $39
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {valuations.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calculator className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No valuations yet
              </h3>
              <p className="text-slate-600 mb-6">
                Create your first business valuation to get started.
              </p>
              <Link href="/valuation">
                <Button>
                  <Calculator className="w-4 h-4 mr-2" />
                  Create First Valuation
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
