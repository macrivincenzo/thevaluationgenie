import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

export function useLogout() {
  const queryClient = useQueryClient();

  return {
    mutate: () => {
      // Clear cache immediately
      queryClient.clear();
      
      // Make logout request in background (don't wait for it)
      apiRequest("POST", "/api/auth/logout").catch(console.error);
      
      // Redirect immediately
      window.location.replace("/");
    },
    isPending: false // Always false since we don't wait
  };
}