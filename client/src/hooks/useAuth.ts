import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/user", { credentials: "include" });
        if (res.status === 401) return null;
        if (!res.ok) return null;
        return res.json();
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 0, // No caching - always fresh
    gcTime: 0, // Don't keep in cache
    refetchOnWindowFocus: false,
    refetchInterval: false,
    enabled: false, // Don't auto-fetch - only manual
  });

  return {
    user: user || null,
    isLoading: false, // Never loading
    isAuthenticated: !!user,
  };
}
