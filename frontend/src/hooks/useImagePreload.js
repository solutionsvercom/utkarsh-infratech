import { useEffect } from 'react';

/**
 * Warm the browser cache for image URLs (e.g. carousel slides) before they are shown.
 */
export function useImagePreload(urls) {
  useEffect(() => {
    const unique = [...new Set(urls.filter(Boolean))];
    if (unique.length === 0) return undefined;

    const images = unique.map((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      return img;
    });

    return () => {
      images.forEach((img) => {
        img.src = '';
      });
    };
  }, [urls]);
}
