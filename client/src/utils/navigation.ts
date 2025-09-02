// Clean navigation utility to prevent state accumulation
export function cleanNavigate(path: string) {
  // Clear any accumulated navigation state
  if (typeof window !== 'undefined') {
    // Clear session storage that might interfere
    try {
      sessionStorage.removeItem('wouter-location');
      sessionStorage.removeItem('navigation-state');
    } catch (e) {
      // Ignore storage errors
    }
    
    // Force a clean navigation without SPA history pollution
    window.location.assign(path);
  }
}

// Special handler for blog navigation that clears all state
export function navigateToBlog() {
  cleanNavigate('/blog');
}

// Clean homepage navigation
export function navigateToHome() {
  cleanNavigate('/');
}