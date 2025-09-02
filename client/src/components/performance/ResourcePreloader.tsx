import { useEffect } from 'react';

interface Resource {
  href: string;
  as: 'script' | 'style' | 'image' | 'document' | 'font';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
}

interface ResourcePreloaderProps {
  resources: Resource[];
  priority?: 'high' | 'low';
}

export function ResourcePreloader({ resources, priority = 'low' }: ResourcePreloaderProps) {
  useEffect(() => {
    resources.forEach((resource) => {
      // Check if already preloaded
      const existingLink = document.querySelector(`link[href="${resource.href}"]`);
      if (existingLink) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) {
        link.type = resource.type;
      }
      
      if (resource.crossOrigin) {
        link.crossOrigin = resource.crossOrigin;
      }

      // Set priority
      if (priority === 'high') {
        link.setAttribute('fetchpriority', 'high');
      }

      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      resources.forEach((resource) => {
        const link = document.querySelector(`link[href="${resource.href}"]`) as HTMLLinkElement;
        if (link && link.rel === 'preload') {
          document.head.removeChild(link);
        }
      });
    };
  }, [resources, priority]);

  return null;
}