import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Edit2, ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Comparison, Valuation } from "@shared/schema";

interface ComparisonWithItems extends Comparison {
  items: Array<{
    id: string;
    notes: string;
    addedAt: string;
    valuation: Valuation;
  }>;
}

export default function Comparisons() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedComparison, setSelectedComparison] = useState<string | null>(null);
  const [newComparisonName, setNewComparisonName] = useState("");
  const [newComparisonDescription, setNewComparisonDescription] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user's comparisons
  const { data: comparisons = [], isLoading: comparisonsLoading } = useQuery<Comparison[]>({
    queryKey: ["/api/comparisons"],
  });

  // Fetch user's valuations for adding to comparisons
  const { data: valuations = [] } = useQuery<Valuation[]>({
    queryKey: ["/api/valuations"],
  });

  // Fetch selected comparison details
  const { data: comparisonDetails } = useQuery({
    queryKey: ["/api/comparisons", selectedComparison],
    enabled: !!selectedComparison,
  });

  // Create comparison mutation
  const createComparisonMutation = useMutation({
    mutationFn: async (data: { name: string; description?: string }) => {
      return await apiRequest("POST", "/api/comparisons", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/comparisons"] });
      setIsCreateDialogOpen(false);
      setNewComparisonName("");
      setNewComparisonDescription("");
      toast({
        title: "Success",
        description: "Comparison created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create comparison",
        variant: "destructive",
      });
    },
  });

  // Delete comparison mutation
  const deleteComparisonMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/comparisons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/comparisons"] });
      if (selectedComparison) {
        setSelectedComparison(null);
      }
      toast({
        title: "Success",
        description: "Comparison deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete comparison",
        variant: "destructive",
      });
    },
  });

  // Add valuation to comparison mutation
  const addValuationMutation = useMutation({
    mutationFn: async ({ comparisonId, valuationId }: { comparisonId: string; valuationId: string }) => {
      return await apiRequest("POST", `/api/comparisons/${comparisonId}/items`, { valuationId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/comparisons"] });
      queryClient.invalidateQueries({ queryKey: ["/api/comparisons", selectedComparison] });
      toast({
        title: "Success",
        description: "Business added to comparison",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add business to comparison",
        variant: "destructive",
      });
    },
  });

  // Remove valuation from comparison mutation
  const removeValuationMutation = useMutation({
    mutationFn: async ({ comparisonId, valuationId }: { comparisonId: string; valuationId: string }) => {
      return await apiRequest("DELETE", `/api/comparisons/${comparisonId}/items/${valuationId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/comparisons"] });
      queryClient.invalidateQueries({ queryKey: ["/api/comparisons", selectedComparison] });
      toast({
        title: "Success",
        description: "Business removed from comparison",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove business from comparison",
        variant: "destructive",
      });
    },
  });

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  };

  const formatPercentage = (value: string) => {
    const num = Number(value);
    return `${num.toFixed(1)}%`;
  };

  const getValueIcon = (current: number, previous?: number) => {
    if (!previous) return <Minus className="h-4 w-4 text-gray-500" />;
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const handleCreateComparison = () => {
    if (!newComparisonName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comparison name",
        variant: "destructive",
      });
      return;
    }
    createComparisonMutation.mutate({
      name: newComparisonName,
      description: newComparisonDescription || undefined,
    });
  };

  if (comparisonsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Comparisons</h1>
          <p className="text-muted-foreground mt-2">
            Compare multiple business valuations side-by-side to make informed decisions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Comparison
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Comparison</DialogTitle>
              <DialogDescription>
                Create a new comparison to group and analyze multiple business valuations
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Comparison Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Q1 2025 Acquisition Targets"
                  value={newComparisonName}
                  onChange={(e) => setNewComparisonName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this comparison..."
                  value={newComparisonDescription}
                  onChange={(e) => setNewComparisonDescription(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateComparison}
                  disabled={createComparisonMutation.isPending}
                >
                  {createComparisonMutation.isPending ? "Creating..." : "Create"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Comparisons List */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Comparisons</CardTitle>
              <CardDescription>
                {comparisons.length || 0} comparison{comparisons.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {comparisons.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No comparisons yet. Create your first comparison to get started.
                </p>
              ) : (
                comparisons.map((comparison: Comparison) => (
                  <Card
                    key={comparison.id}
                    className={`cursor-pointer transition-colors hover:bg-accent ${
                      selectedComparison === comparison.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedComparison(comparison.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium truncate">{comparison.name}</h3>
                          {comparison.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {comparison.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            Created {comparison.createdAt ? new Date(comparison.createdAt).toLocaleDateString() : 'Recently'}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteComparisonMutation.mutate(comparison.id);
                          }}
                          disabled={deleteComparisonMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Comparison Details */}
        <div className="md:col-span-2">
          {!selectedComparison ? (
            <Card className="flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center">
                <ArrowRight className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Comparison</h3>
                <p className="text-muted-foreground">
                  Choose a comparison from the list to view and manage the businesses being compared
                </p>
              </CardContent>
            </Card>
          ) : comparisonDetails ? (
            <ComparisonDetailsView
              comparison={comparisonDetails as ComparisonWithItems}
              valuations={valuations}
              onAddValuation={(valuationId) =>
                addValuationMutation.mutate({
                  comparisonId: selectedComparison,
                  valuationId,
                })
              }
              onRemoveValuation={(valuationId) =>
                removeValuationMutation.mutate({
                  comparisonId: selectedComparison,
                  valuationId,
                })
              }
            />
          ) : (
            <Card className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function ComparisonDetailsView({
  comparison,
  valuations,
  onAddValuation,
  onRemoveValuation,
}: {
  comparison: ComparisonWithItems;
  valuations: Valuation[];
  onAddValuation: (valuationId: string) => void;
  onRemoveValuation: (valuationId: string) => void;
}) {
  const [selectedValuation, setSelectedValuation] = useState("");

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  };

  const formatPercentage = (value: string) => {
    const sde = Number(value);
    return `${sde.toFixed(1)}%`;
  };

  // Filter out valuations already in the comparison
  const availableValuations = valuations.filter(
    (v) => !comparison.items.some((item) => item.valuation.id === v.id)
  );

  const handleAddValuation = () => {
    if (selectedValuation) {
      onAddValuation(selectedValuation);
      setSelectedValuation("");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{comparison.name}</CardTitle>
          {comparison.description && (
            <CardDescription>{comparison.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Select value={selectedValuation} onValueChange={setSelectedValuation}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a business to add..." />
              </SelectTrigger>
              <SelectContent>
                {availableValuations.map((valuation) => (
                  <SelectItem key={valuation.id} value={valuation.id}>
                    {valuation.businessName} - {valuation.industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddValuation} disabled={!selectedValuation}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {comparison.items.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No businesses in this comparison</h3>
            <p className="text-muted-foreground">
              Add businesses from your valuations to start comparing them side-by-side
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Comparison Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Business</th>
                      <th className="text-left p-2 font-medium">Industry</th>
                      <th className="text-left p-2 font-medium">Revenue</th>
                      <th className="text-left p-2 font-medium">SDE</th>
                      <th className="text-left p-2 font-medium">SDE Margin</th>
                      <th className="text-left p-2 font-medium">Valuation Range</th>
                      <th className="text-left p-2 font-medium">Multiple</th>
                      <th className="text-left p-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.items.map((item) => {
                      const sdeMargin = (Number(item.valuation.sde) / Number(item.valuation.annualRevenue)) * 100;
                      return (
                        <tr key={item.id} className="border-b hover:bg-accent/50">
                          <td className="p-2">
                            <div>
                              <p className="font-medium">{item.valuation.businessName}</p>
                              <p className="text-sm text-muted-foreground">{item.valuation.location}</p>
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge variant="secondary">{item.valuation.industry}</Badge>
                          </td>
                          <td className="p-2">{formatCurrency(item.valuation.annualRevenue)}</td>
                          <td className="p-2">{formatCurrency(item.valuation.sde)}</td>
                          <td className="p-2">{formatPercentage(sdeMargin.toString())}</td>
                          <td className="p-2">
                            <div className="text-sm">
                              <p>{formatCurrency(item.valuation.valuationLow)} - {formatCurrency(item.valuation.valuationHigh)}</p>
                            </div>
                          </td>
                          <td className="p-2">{Number(item.valuation.industryMultiple).toFixed(1)}x</td>
                          <td className="p-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveValuation(item.valuation.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Individual Business Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {comparison.items.map((item) => {
              const sdeMargin = (Number(item.valuation.sde) / Number(item.valuation.annualRevenue)) * 100;
              return (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span>{item.valuation.businessName}</span>
                      <Badge variant="outline">{item.valuation.industry}</Badge>
                    </CardTitle>
                    <CardDescription>{item.valuation.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Annual Revenue</p>
                        <p className="text-lg font-semibold">{formatCurrency(item.valuation.annualRevenue)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">SDE</p>
                        <p className="text-lg font-semibold">{formatCurrency(item.valuation.sde)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">SDE Margin</p>
                        <p className="text-lg font-semibold">{formatPercentage(sdeMargin.toString())}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Multiple</p>
                        <p className="text-lg font-semibold">{Number(item.valuation.industryMultiple).toFixed(1)}x</p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Valuation Range</p>
                      <p className="text-xl font-bold text-primary">
                        {formatCurrency(item.valuation.valuationLow)} - {formatCurrency(item.valuation.valuationHigh)}
                      </p>
                    </div>
                    {item.valuation.majorRisks && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Key Risks</p>
                        <p className="text-sm">{item.valuation.majorRisks}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}