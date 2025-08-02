import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useLogout() {
  const queryClient = useQueryClient();

  const logout = () => {
    // Clear cache synchronously
    queryClient.clear();
    
    // Make logout request in background
    apiRequest("POST", "/api/auth/logout").catch(console.error);
    
    // Immediate redirect
    window.location.href = "/";
  };

  return { mutate: logout, isPending: false };
}