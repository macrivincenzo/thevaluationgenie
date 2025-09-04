// CRITICAL: Break up long-running tasks for main thread optimization
export function processInChunks<T>(
  items: T[], 
  processFn: (item: T) => void, 
  chunkSize: number = 10
): Promise<void> {
  return new Promise((resolve) => {
    let index = 0;
    
    function processChunk() {
      const chunk = items.slice(index, index + chunkSize);
      chunk.forEach(processFn);
      index += chunkSize;
      
      if (index < items.length) {
        // Use requestIdleCallback for better performance
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(processChunk);
        } else {
          setTimeout(processChunk, 0);
        }
      } else {
        resolve();
      }
    }
    
    processChunk();
  });
}

// CRITICAL: Optimize DOM operations with batching
export function batchDOMUpdates(updates: HTMLElement[]): void {
  // Use DocumentFragment for multiple DOM changes
  const fragment = document.createDocumentFragment();
  updates.forEach(update => fragment.appendChild(update));
  document.body.appendChild(fragment);
}

// CRITICAL: Debounce heavy operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
}

// CRITICAL: Throttle scroll and resize events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// CRITICAL: Lazy load images with intersection observer
export function lazyLoadImages(): void {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}