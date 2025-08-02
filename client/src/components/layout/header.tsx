import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calculator, User, Settings, LogOut, BarChart3 } from "lucide-react";
import type { User as UserType } from "@shared/schema";

export default function Header() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const logout = useLogout();
  const typedUser = user as UserType | undefined;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-slate-900">ValuationGenie</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/valuation" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Get Valuation
                </Link>
                <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Dashboard
                </Link>

              </>
            ) : (
              <Link href="/login" className="text-slate-600 hover:text-slate-900 transition-colors">
                Get Valuation
              </Link>
            )}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full" />
            ) : isAuthenticated && typedUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={typedUser.profileImageUrl || ""} 
                        alt={typedUser.firstName || typedUser.email || "User"} 
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {typedUser.firstName?.charAt(0) || typedUser.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {typedUser.firstName && (
                        <p className="font-medium">{typedUser.firstName} {typedUser.lastName || ""}</p>
                      )}
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {typedUser.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/valuation" className="w-full flex items-center">
                      <Calculator className="mr-2 h-4 w-4" />
                      New Valuation
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => {
                        // Clear authentication immediately
                        document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                        // Redirect immediately
                        window.location.href = "/";
                      }}
                      className="w-full flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}