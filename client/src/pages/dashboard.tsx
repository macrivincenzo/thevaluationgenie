import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useEffect } from "react";
import { Valuation } from "@shared/schema";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
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
import { 
  Calculator, 
  Download, 
  Trash2, 
  Building, 
  Calendar, 
  DollarSign, 
  UserMinus,
  BarChart3,
  FileText
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

  const { data: valuations = [], isLoading: valuationsLoading } = useQuery<Valuation[]>({
    queryKey: ["/api/valuations"],
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

  const downloadPdfMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        console.log('Starting PDF download for ID:', id);
        
        // Use direct fetch instead of apiRequest for blob handling
        const response = await fetch(`/api/valuations/${id}/pdf`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/pdf'
          }
        });
        
        console.log('Response status:', response.status, response.statusText);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        // Check if response is successful
        if (!response.ok) {
          const errorText = await response.text();
          console.error('PDF download failed:', errorText);
          throw new Error(`PDF generation failed: ${errorText}`);
        }
        
        const blob = await response.blob();
        console.log('Blob size:', blob.size, 'Type:', blob.type);
        
        // Check if we got a valid PDF blob
        if (blob.size === 0) {
          throw new Error('Received empty PDF file');
        }
        
        // Create download link and trigger download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `valuation-${id}.pdf`;
        a.style.display = 'none';
        document.body.appendChild(a);
        
        console.log('Triggering download click...');
        
        // Force click event
        a.click();
        
        // Clean up after a short delay
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 100);
        
        toast({
          title: "Download Started",
          description: "Your PDF report is downloading now.",
        });
      } catch (error: any) {
        console.error('PDF download error:', error);
        throw error;
      }
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Manage your business valuations and reports</p>
          </div>
          <Link href="/valuation">
            <Button>
              <Calculator className="w-4 h-4 mr-2" />
              New Valuation
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Total Valuations</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{valuations.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Average Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                ${Math.round(averageValue / 1000)}K
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Last Report</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">
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
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-slate-900">{valuation.businessName}</h5>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                            <span>
                              <Building className="w-4 h-4 inline mr-1" />
                              {valuation.industry}
                            </span>
                            <span>
                              <Calendar className="w-4 h-4 inline mr-1" />
                              {new Date(valuation.createdAt!).toLocaleDateString()}
                            </span>
                            <span>
                              <DollarSign className="w-4 h-4 inline mr-1" />
                              ${parseInt(valuation.valuationLow).toLocaleString()} - ${parseInt(valuation.valuationHigh).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {valuation.paid ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                console.log('Download button clicked for valuation:', valuation.id);
                                downloadPdfMutation.mutate(valuation.id);
                              }}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              {downloadPdfMutation.isPending ? "..." : "Download"}
                            </Button>
                          ) : (
                            <Link href={`/checkout/${valuation.id}`}>
                              <Button size="sm">
                                Pay & Download - $39
                              </Button>
                            </Link>
                          )}
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-destructive hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
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
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600">You can delete all your data and reports at any time.</p>
                <p className="text-sm text-slate-500 mt-1">This action cannot be undone.</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
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
