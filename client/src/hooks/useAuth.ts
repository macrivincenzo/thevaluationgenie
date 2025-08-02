import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/user", { credentials: "include" });
        if (res.status === 401) return null;
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 0, // Always fresh data
    gcTime: 0, // No caching
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
    refetchInterval: false, // Don't auto refetch
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
