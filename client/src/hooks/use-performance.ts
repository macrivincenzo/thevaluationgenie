import { useEffect } from 'react';

// Performance optimization hook for mobile
export function usePerformanceOptimization() {
  useEffect(() => {
    // Optimize for mobile performance
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Reduce animation complexity on mobile
      document.documentElement.style.setProperty('--animation-complexity', '0.5');
      
      // Preload critical resources
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = '/blog';
      preloadLink.as = 'document';
      document.head.appendChild(preloadLink);
      
      // Optimize scroll performance
      document.body.style.overflowAnchor = 'none';
    }
    
    // Clean up on unmount
    return () => {
      if (isMobile) {
        document.documentElement.style.removeProperty('--animation-complexity');
        document.body.style.removeProperty('overflow-anchor');
      }
    };
  }, []);
}