import { useEffect, useRef, useState } from 'react';

// Lazy loading hook for performance optimization
export function useLazyLoading<T extends HTMLElement>() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Cleanup observer after first intersection
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        rootMargin: '50px', // Load slightly before coming into view
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return {
    ref,
    isLoaded,
    isInView,
    handleLoad,
    shouldLoad: isInView,
    className: `lazy-load ${isLoaded ? 'loaded' : ''}`,
  };
}