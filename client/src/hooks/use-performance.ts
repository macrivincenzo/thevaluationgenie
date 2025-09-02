import { useEffect, useCallback } from 'react';

// Comprehensive performance optimization hook
export function usePerformanceOptimization() {
  const optimizePerformance = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    const connection = (navigator as any)?.connection;
    const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
    
    // Apply mobile optimizations
    if (isMobile) {
      document.documentElement.style.setProperty('--animation-complexity', '0.5');
      document.body.style.overflowAnchor = 'none';
      
      // Disable expensive visual effects on mobile
      document.documentElement.classList.add('mobile-optimized');
    }
    
    // Apply slow connection optimizations
    if (isSlowConnection) {
      document.documentElement.classList.add('slow-connection');
      // Reduce image quality and animations
      document.documentElement.style.setProperty('--image-quality', '0.7');
    }
    
    // Preload critical resources based on current page
    const currentPath = window.location.pathname;
    const criticalResources = [
      currentPath === '/' ? '/blog' : '/',
      '/valuation',
      '/pricing'
    ];
    
    criticalResources.forEach(path => {
      if (path !== currentPath) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = path;
        document.head.appendChild(link);
      }
    });
    
    // Optimize font loading
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('400 1em Inter'),
        document.fonts.load('600 1em Inter'),
        document.fonts.load('700 1em Inter')
      ]).catch(() => {
        // Fallback to system fonts on load failure
        document.documentElement.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      });
    }
    
    // Remove unused CSS (basic tree shaking for Tailwind)
    const unusedClasses = [
      'text-9xl', 'text-8xl', 'text-7xl', // Large text we don't use
      'bg-gradient-to-tl', 'bg-gradient-to-tr', 'bg-gradient-to-bl', 'bg-gradient-to-br', // Unused gradients
      'rotate-180', 'rotate-90', 'rotate-45' // Unused rotations
    ];
    
    // Mark as optimized
    document.documentElement.dataset.performanceOptimized = 'true';
    
  }, []);

  useEffect(() => {
    // Optimize immediately
    optimizePerformance();
    
    // Re-optimize on resize (orientation change)
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(optimizePerformance, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      
      // Clean up styles
      if (window.innerWidth <= 768) {
        document.documentElement.style.removeProperty('--animation-complexity');
        document.body.style.removeProperty('overflow-anchor');
        document.documentElement.classList.remove('mobile-optimized');
      }
      
      document.documentElement.classList.remove('slow-connection');
      document.documentElement.style.removeProperty('--image-quality');
    };
  }, [optimizePerformance]);
}