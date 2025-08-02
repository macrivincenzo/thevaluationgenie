import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

export function useLogout() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  return useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      // Force a page reload to ensure clean state
      window.location.href = "/";
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Even if logout fails, clear cache and redirect
      queryClient.clear();
      window.location.href = "/";
    },
  });
}