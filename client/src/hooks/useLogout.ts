import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useLogout() {
  const queryClient = useQueryClient();

  const logout = () => {
    // Clear cache immediately
    queryClient.clear();
    
    // Make logout request in background (don't wait for it)
    apiRequest("POST", "/api/auth/logout").catch(console.error);
    
    // Redirect immediately
    window.location.replace("/");
  };

  return { mutate: logout, isPending: false };
}