import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const loadedUrls = new Set();

function cacheKey(webpSrc, src) {
  return webpSrc || src;
}

/**
 * Image with WebP preference, skeleton placeholder, and smooth fade-in.
 */
export default function OptimizedImage({
  src,
  webpSrc,
  alt,
  className,
  wrapperClassName,
  loading = 'lazy',
  fetchPriority,
  onClick,
  ...props
}) {
  const key = cacheKey(webpSrc, src);
  const [loaded, setLoaded] = useState(() => loadedUrls.has(key));
  const [failed, setFailed] = useState(false);

  const handleLoad = () => {
    loadedUrls.add(key);
    setLoaded(true);
  };
  const handleError = () => setFailed(true);

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      {!loaded && !failed && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse"
          aria-hidden
        />
      )}
      {failed && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-xs"
          aria-hidden
        >
          Image unavailable
        </div>
      )}
      <picture>
        {webpSrc && !failed && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
          className={cn(
            className,
            'transition-opacity duration-300 ease-out',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
          {...props}
        />
      </picture>
    </div>
  );
}
