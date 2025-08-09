import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useEffect } from "react";
import { Valuation } from "@shared/schema";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TierUsageDisplay from "@/components/valuation/tier-usage-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Download, 
  Trash2, 
  Building, 
  Calendar, 
  DollarSign, 
  UserMinus,
  BarChart3,
  FileText,
  Crown,
  Sparkles
} from "lucide-react";

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: valuations = [], isLoading: valuationsLoading, isError } = useQuery<Valuation[]>({
    queryKey: ["/api/valuations"],
    retry: false,
    staleTime: 0, // Always refetch to ensure fresh data
    refetchOnWindowFocus: true,
  });

  // Query lifetime status
  const { data: lifetimeStatus } = useQuery({
    queryKey: ['/api/lifetime/status'],
    retry: false,
  });

  // Calculate average value
  const averageValue = valuations.length > 0 
    ? valuations.reduce((sum, v) => sum + parseFloat(v.valuationHigh), 0) / valuations.length 
    : 0;

  const deleteValuationMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/valuations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/valuations"] });
      toast({
        title: "Deleted",
        description: "Valuation report deleted successfully.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteAllDataMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", "/api/user/delete-all-data");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/valuations"] });
      toast({
        title: "All Data Deleted",
        description: "All your valuations and data have been permanently deleted.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading || valuationsLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="h-24 bg-slate-200 rounded"></div>
              <div className="h-24 bg-slate-200 rounded"></div>
              <div className="h-24 bg-slate-200 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-20 bg-slate-200 rounded"></div>
              <div className="h-20 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const paidValuations = valuations.filter((v) => v.paid);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tier Usage Display for Limited Plans */}
        <TierUsageDisplay />

        {/* Lifetime Member Badge */}
        {(lifetimeStatus as any)?.lifetimeAccess && (
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 rounded-lg p-4 mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Crown className="w-6 h-6 text-yellow-900 mr-3" />
                <div>
                  <h3 className="text-lg font-bold text-yellow-900">Lifetime Member</h3>
                  <p className="text-yellow-800 text-sm">
                    {(lifetimeStatus as any)?.monthlyReportLimit 
                      ? `${(lifetimeStatus as any).monthlyReportLimit} valuations per month` 
                      : 'Unlimited valuations'} • No more $39 fees
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-yellow-700 mr-2" />
                <Badge variant="secondary" className="bg-yellow-200 text-yellow-900">
                  {((lifetimeStatus as any)?.lifetimeTier || 'premium').toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center">
              Dashboard
              {(lifetimeStatus as any)?.lifetimeAccess && (
                <Crown className="w-6 h-6 text-yellow-600 ml-2" />
              )}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">Manage your business valuations and reports</p>
          </div>
          <div className="flex gap-2">
            {!(lifetimeStatus as any)?.lifetimeAccess && (
              <Link href="/lifetime">
                <Button variant="outline" className="text-yellow-600 border-yellow-300 hover:bg-yellow-50">
                  <Crown className="w-4 h-4 mr-2" />
                  Get Lifetime Access
                </Button>
              </Link>
            )}
            <Link href="/valuation">
              <Button className="w-full sm:w-auto">
                <Calculator className="w-4 h-4 mr-2" />
                New Valuation
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-blue-800">Total Valuations</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl sm:text-2xl font-bold text-blue-900">{valuations.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-green-800">Average Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl sm:text-2xl font-bold text-green-900">
                ${Math.round(averageValue / 1000)}K
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200 sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-purple-800">Last Report</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl sm:text-2xl font-bold text-purple-900">
                {valuations.length > 0 
                  ? new Date(valuations[0].createdAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  : 'None'
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Valuations List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Valuation Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {valuations.length === 0 ? (
              <div className="text-center py-12">
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
              </div>
            ) : (
              <div className="space-y-4">
                {valuations.map((valuation) => (
                  <Card key={valuation.id} className="border-slate-200">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-slate-900 text-sm sm:text-base truncate">{valuation.businessName}</h5>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-slate-600 mt-1">
                            <span className="flex items-center">
                              <Building className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                              <span className="truncate">{valuation.industry}</span>
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                              {new Date(valuation.createdAt!).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                              <span className="font-medium">${parseInt(valuation.valuationLow).toLocaleString()} - ${parseInt(valuation.valuationHigh).toLocaleString()}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 sm:gap-3 flex-shrink-0">
                          {valuation.paid ? (
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="w-full sm:w-auto text-xs sm:text-sm"
                                onClick={async () => {
                                  console.log('=== DOWNLOAD BUTTON CLICKED ===');
                                  console.log('Valuation ID:', valuation.id);
                                  console.log('Business Name:', valuation.businessName);
                                  
                                  try {
                                    // Direct download approach
                                    const response = await fetch(`/api/valuations/${valuation.id}/pdf`, {
                                      method: 'GET',
                                      credentials: 'include',
                                      headers: {
                                        'Accept': 'application/pdf'
                                      }
                                    });
                                    
                                    console.log('Response received:', response.status, response.statusText);
                                    
                                    if (!response.ok) {
                                      const errorText = await response.text();
                                      console.error('Download failed:', errorText);
                                      return;
                                    }
                                    
                                    const blob = await response.blob();
                                    console.log('Blob created:', blob.size, 'bytes, type:', blob.type);
                                    
                                    // Try direct window.open approach first
                                    const url = URL.createObjectURL(blob);
                                    const fileName = `${valuation.businessName.replace(/[^a-zA-Z0-9]/g, '-')}-valuation-report.pdf`;
                                    
                                    console.log('Attempting window.open approach...');
                                    try {
                                      // Try to open in new window first
                                      const newWindow = window.open(url, '_blank');
                                      if (newWindow) {
                                        console.log('PDF opened in new window successfully');
                                        // Clean up after a delay
                                        setTimeout(() => URL.revokeObjectURL(url), 3000);
                                        return;
                                      }
                                    } catch (windowError) {
                                      console.log('Window.open failed, trying download link...', windowError);
                                    }
                                    
                                    // Fallback to download link approach
                                    console.log('Using download link approach...');
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = fileName;
                                    link.target = '_blank';
                                    link.rel = 'noopener noreferrer';
                                    
                                    // Make link visible but off-screen
                                    link.style.position = 'fixed';
                                    link.style.top = '-1000px';
                                    link.style.left = '-1000px';
                                    link.style.width = '1px';
                                    link.style.height = '1px';
                                    
                                    document.body.appendChild(link);
                                    
                                    // Force focus and click
                                    link.focus();
                                    
                                    // Try multiple click approaches
                                    const clickEvent = new MouseEvent('click', {
                                      bubbles: true,
                                      cancelable: true,
                                      view: window
                                    });
                                    
                                    console.log('Dispatching click event...');
                                    const clickResult = link.dispatchEvent(clickEvent);
                                    console.log('Click event result:', clickResult);
                                    
                                    // Also try direct click
                                    setTimeout(() => {
                                      console.log('Trying direct click...');
                                      link.click();
                                    }, 50);
                                    
                                    // Clean up
                                    setTimeout(() => {
                                      if (document.body.contains(link)) {
                                        document.body.removeChild(link);
                                      }
                                      URL.revokeObjectURL(url);
                                      console.log('Cleanup completed');
                                    }, 2000);
                                    
                                    console.log('Download attempts completed');
                                    
                                    // Show user feedback
                                    setTimeout(() => {
                                      toast({
                                        title: "Download Initiated",
                                        description: "If the PDF doesn't download automatically, check your browser's download settings or popup blocker.",
                                      });
                                    }, 1000);
                                  } catch (error) {
                                    console.error('Download error:', error);
                                    toast({
                                      title: "Download Error",
                                      description: "Failed to download PDF. Please try again or contact support.",
                                      variant: "destructive",
                                    });
                                  }
                                }}
                                disabled={valuationsLoading}
                              >
                                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                <span className="hidden sm:inline">Download PDF</span>
                                <span className="sm:hidden">PDF</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="w-full sm:w-auto text-xs sm:text-sm"
                                asChild
                              >
                                <a 
                                  href={`/api/valuations/${valuation.id}/pdf`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center"
                                  onClick={(e) => {
                                    console.log('Direct link clicked for valuation:', valuation.id);
                                  }}
                                >
                                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  <span className="hidden sm:inline">View PDF</span>
                                  <span className="sm:hidden">View</span>
                                </a>
                              </Button>
                            </div>
                          ) : (
                            <Link href={`/checkout/${valuation.id}`}>
                              <Button size="sm" className="w-full sm:w-auto text-xs sm:text-sm">
                                <span className="hidden sm:inline">Pay & Download - $39</span>
                                <span className="sm:hidden">Pay $39</span>
                              </Button>
                            </Link>
                          )}
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-destructive hover:text-red-700 w-full sm:w-auto text-xs sm:text-sm"
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                <span className="hidden sm:inline">Delete</span>
                                <span className="sm:hidden">Del</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Valuation</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this valuation? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteValuationMutation.mutate(valuation.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="mt-6 sm:mt-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Data Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-slate-600 text-sm sm:text-base">You can delete all your data and reports at any time.</p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">This action cannot be undone.</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full sm:w-auto">
                    <UserMinus className="w-4 h-4 mr-2" />
                    Delete All Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete All Data</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your valuations, reports, and account data. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => deleteAllDataMutation.mutate()}
                      className="bg-destructive hover:bg-destructive/90"
                      disabled={deleteAllDataMutation.isPending}
                    >
                      {deleteAllDataMutation.isPending ? "Deleting..." : "Delete Everything"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
