import { useEffect } from 'react';

// Simplified Web Vitals monitoring for performance optimization
export function useWebVitals() {
  useEffect(() => {
    // Only run when supported and in browser environment
    if (typeof window === 'undefined' || !('performance' in window)) {
      return;
    }

    // Measure Core Web Vitals using Performance Observer API
    const measurePerformanceMetrics = () => {
      try {
        // Measure First Contentful Paint (FCP)
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              const fcp = entry.startTime;
              if (fcp > 1800) {
                console.warn('FCP needs improvement:', fcp, 'ms');
              }
            }
          }
        });
        observer.observe({ entryTypes: ['paint'] });

        // Measure Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcp = lastEntry.startTime;
          if (lcp > 2500) {
            console.warn('LCP needs improvement:', lcp, 'ms');
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Measure Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          if (clsValue > 0.1) {
            console.warn('CLS needs improvement:', clsValue);
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Cleanup observers after 30 seconds
        setTimeout(() => {
          observer.disconnect();
          lcpObserver.disconnect();
          clsObserver.disconnect();
        }, 30000);

      } catch (error) {
        console.warn('Performance monitoring not fully supported:', error);
      }
    };

    // Run measurement after page load
    if (document.readyState === 'complete') {
      measurePerformanceMetrics();
    } else {
      window.addEventListener('load', measurePerformanceMetrics);
    }
  }, []);
}