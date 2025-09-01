import { Link, useLocation } from "wouter";
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
import { User, Settings, LogOut, BarChart3, Sparkles, TrendingUp, FileText, Crown } from "lucide-react";
import type { User as UserType } from "@shared/schema";

export default function Header() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const logout = useLogout();
  const typedUser = user as UserType | undefined;
  const [, setLocation] = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              {/* Main geometric shape - representing precision and value */}
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-lg rotate-45 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-4 h-4 text-white -rotate-45" />
              </div>
              {/* Magic sparkle - representing the "genie" instant magic */}
              <Sparkles className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                ValuationGenie
              </span>
              <span className="text-xs text-slate-500 font-medium -mt-1">Instant Business Valuation</span>
            </div>
          </Link>

          {/* SEO Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium" data-testid="nav-contact">
              Contact
            </Link>
            <a
              href="/blog"
              target="_self"
              rel="noopener"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
              data-testid="nav-blog"
            >
              Blog
            </a>
            <Link href="/lifetime" className="flex items-center text-sm text-yellow-600 hover:text-yellow-700 transition-colors font-medium">
              <Crown className="w-3 h-3 mr-1" />
              AppSumo
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/valuation" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
                  Get Valuation
                </Link>
                <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
                  Dashboard
                </Link>

              </>
            ) : (
              <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
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
                      <FileText className="mr-2 h-4 w-4" />
                      New Valuation
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/lifetime" className="w-full flex items-center text-yellow-600">
                      <Crown className="mr-2 h-4 w-4" />
                      AppSumo Lifetime
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      // Create hidden form for instant POST logout
                      const form = document.createElement('form');
                      form.method = 'POST';
                      form.action = '/api/auth/logout';
                      form.style.display = 'none';
                      document.body.appendChild(form);
                      form.submit();
                    }}
                    className="w-full flex items-center cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
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