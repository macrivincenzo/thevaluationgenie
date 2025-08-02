import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useLogout() {
  const queryClient = useQueryClient();

  const logout = () => {
    // Redirect immediately without any delay
    window.location.href = "/";
    
    // Clear cache and make logout request after redirect starts
    setTimeout(() => {
      queryClient.clear();
      apiRequest("POST", "/api/auth/logout").catch(console.error);
    }, 0);
  };

  return { mutate: logout, isPending: false };
}