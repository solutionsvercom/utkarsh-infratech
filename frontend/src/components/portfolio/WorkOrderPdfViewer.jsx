import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Expand, FileText, Loader2 } from 'lucide-react';
import { pdfEmbedUrl } from '@/data/portfolioCertifications';

const LOAD_TIMEOUT_MS = 20000;

/**
 * Inline PDF preview for work order slides with loading state and fullscreen expand.
 */
export default function WorkOrderPdfViewer({ src, alt, onExpand, className = '' }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const loadedRef = useRef(false);
  const embedSrc = pdfEmbedUrl(src);

  useEffect(() => {
    loadedRef.current = loaded;
  }, [loaded]);

  useEffect(() => {
    setLoaded(false);
    setError(false);
    loadedRef.current = false;

    let cancelled = false;

    fetch(src)
      .then((response) => {
        if (cancelled) return;
        if (!response.ok) {
          setError(true);
          return;
        }
        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('pdf')) {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    const timeout = setTimeout(() => {
      if (!cancelled && !loadedRef.current) setError(true);
    }, LOAD_TIMEOUT_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [embedSrc, src]);

  const handleIframeLoad = () => {
    loadedRef.current = true;
    setLoaded(true);
    setError(false);
  };

  const handleIframeError = () => {
    setError(true);
    setLoaded(false);
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden border border-gray-200 bg-white aspect-[4/3] w-full min-h-[240px] sm:min-h-[280px] ${className}`}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-50 z-10">
          <div className="w-full h-full absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100" />
          <div className="relative flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" aria-hidden="true" />
            <p className="text-sm text-gray-500 font-medium">Loading document…</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-50 z-10 p-6 text-center">
          <AlertCircle className="w-10 h-10 text-orange-500" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-800">Unable to preview this document</p>
          {onExpand && (
            <button
              type="button"
              onClick={onExpand}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-2 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Try fullscreen view
            </button>
          )}
        </div>
      )}

      {!error && (
        <iframe
          key={embedSrc}
          title={alt}
          src={embedSrc}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          className={`w-full h-full bg-gray-50 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {loaded && !error && onExpand && (
        <>
          <button
            type="button"
            onClick={onExpand}
            className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/70 hover:bg-black/80 text-white text-xs font-medium px-2.5 py-1.5 transition-colors z-10"
            aria-label={`Expand ${alt} to fullscreen`}
          >
            <FileText className="w-3.5 h-3.5" />
            PDF — Click to expand
          </button>
          <button
            type="button"
            onClick={onExpand}
            className="absolute top-3 right-3 p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
            aria-label={`Expand ${alt} to fullscreen`}
          >
            <Expand className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}
