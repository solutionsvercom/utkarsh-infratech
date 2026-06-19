import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Expand, FileText, Loader2 } from 'lucide-react';
import {
  isRenderingCancelled,
  loadPdfDocument,
  renderPdfPageToCanvas,
  waitForContainerWidth,
} from '@/lib/pdfjs';

/**
 * Renders the first PDF page on a canvas — works on mobile where iframe embeds show an "Open" button.
 */
export default function PdfCanvasViewer({ src, alt, onExpand, className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setError(false);

    async function renderPage() {
      try {
        const pdf = await loadPdfDocument(src);
        if (cancelled || !canvasRef.current || !containerRef.current) return;

        const width = await waitForContainerWidth(containerRef.current);
        if (cancelled || !canvasRef.current) return;

        await renderPdfPageToCanvas(pdf, 1, canvasRef.current, width, renderTaskRef, {
          maxPixelRatio: 2,
        });
        if (!cancelled) setLoaded(true);
      } catch (err) {
        if (isRenderingCancelled(err)) return;
        if (import.meta.env.DEV) {
          console.error('[PdfCanvasViewer] failed:', src, err);
        }
        if (!cancelled) setError(true);
      }
    }

    renderPage();

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
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

      <div className="absolute inset-0 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className={`max-w-full max-h-full object-contain bg-white transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      {loaded && !error && onExpand && (
        <>
          <button
            type="button"
            onClick={onExpand}
            className="absolute inset-0 z-[1] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-inset"
            aria-label={`View ${alt} in fullscreen`}
          />
          <button
            type="button"
            onClick={onExpand}
            className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/70 hover:bg-black/80 text-white text-xs font-medium px-2.5 py-1.5 transition-colors z-10"
            aria-label={`Expand ${alt} to fullscreen`}
          >
            <FileText className="w-3.5 h-3.5" />
            PDF — Tap to expand
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
