import { useState } from 'react';
import { useLazyLoading } from '@/hooks/use-lazy-loading';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
}

export function LazyImage({ src, alt, placeholder, className = '', ...props }: LazyImageProps) {
  const { ref, shouldLoad, handleLoad, className: lazyClass } = useLazyLoading<HTMLImageElement>();
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={ref}
        src={shouldLoad && !hasError ? src : placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+'}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`${lazyClass} w-full h-full object-cover`}
        {...props}
      />
    </div>
  );
}