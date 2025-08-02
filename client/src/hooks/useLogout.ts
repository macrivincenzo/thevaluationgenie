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
      // Immediate redirect without waiting
      window.location.replace("/");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Even if logout fails, clear cache and redirect immediately
      queryClient.clear();
      window.location.replace("/");
    },
  });
}