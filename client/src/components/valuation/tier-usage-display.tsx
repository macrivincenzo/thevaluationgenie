import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Crown, AlertTriangle, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function TierUsageDisplay() {
  const { isAuthenticated } = useAuth();
  
  const { data: limitCheck, isLoading } = useQuery({
    queryKey: ['/api/valuations/check-limits'],
    enabled: isAuthenticated,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!isAuthenticated || isLoading) {
    return null;
  }

  // Don't show for unlimited users or non-lifetime users
  if (!limitCheck?.limit) {
    return null;
  }

  const { canCreate, reportsUsed = 0, limit, reason } = limitCheck;
  const usagePercentage = (reportsUsed / limit) * 100;

  return (
    <Card className="mb-6 border-l-4 border-l-yellow-500">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Crown className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="font-semibold text-slate-900">Lifetime Plan Usage</span>
          </div>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">
            {reportsUsed} / {limit} this month
          </Badge>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className={`h-2 rounded-full transition-all ${
              usagePercentage >= 100 
                ? 'bg-red-500' 
                : usagePercentage >= 80 
                ? 'bg-yellow-500' 
                : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>

        {!canCreate ? (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription className="text-red-800">
              {reason} Your plan will reset next month with fresh report allowance.
            </AlertDescription>
          </Alert>
        ) : usagePercentage >= 80 ? (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription className="text-yellow-800">
              You're approaching your monthly limit. {limit - reportsUsed} reports remaining.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="flex items-center text-sm text-green-700">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>{limit - reportsUsed} reports remaining this month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}