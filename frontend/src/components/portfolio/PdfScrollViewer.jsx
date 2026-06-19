import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { isRenderingCancelled, loadPdfDocument, renderPdfPageToCanvas } from '@/lib/pdfjs';

function LazyPdfPage({ pdf, pageNumber, width }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: '240px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setRendered(false);
  }, [width, pageNumber]);

  useEffect(() => {
    if (!visible || !canvasRef.current || rendered) return undefined;

    let cancelled = false;
    renderPdfPageToCanvas(pdf, pageNumber, canvasRef.current, width, renderTaskRef, {
      maxPixelRatio: 3,
    })
      .then(() => {
        if (!cancelled) setRendered(true);
      })
      .catch((err) => {
        if (!isRenderingCancelled(err) && import.meta.env.DEV) {
          console.error('[PdfScrollViewer] page render failed:', pageNumber, err);
        }
      });

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;
    };
  }, [visible, pdf, pageNumber, width, rendered]);

  return (
    <div ref={wrapperRef} className="mb-4 flex justify-center">
      {!rendered && (
        <div className="w-full max-w-3xl aspect-[3/4] bg-white/10 rounded-lg flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-white/60 animate-spin" aria-hidden="true" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full max-w-full h-auto rounded-lg shadow-lg bg-white ${rendered ? 'block' : 'hidden'}`}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}

/**
 * Scrollable multi-page PDF viewer for the fullscreen modal on mobile.
 */
export default function PdfScrollViewer({ src, alt }) {
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [width, setWidth] = useState(360);
  const scrollRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    setPdf(null);

    loadPdfDocument(src)
      .then((doc) => {
        if (!cancelled) {
          setPdf(doc);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    const update = () => setWidth(el.clientWidth - 32);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [pdf]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16">
        <Loader2 className="w-10 h-10 text-orange-400 animate-spin" aria-hidden="true" />
        <p className="text-white/80 text-sm">Loading document…</p>
      </div>
    );
  }

  if (error || !pdf) {
    return (
      <p className="text-white/80 text-sm text-center py-16">
        Unable to display this document. Please try again later.
      </p>
    );
  }

  const pages = Array.from({ length: pdf.numPages }, (_, i) => i + 1);

  return (
    <div
      ref={scrollRef}
      className="w-full h-full max-w-3xl overflow-y-auto overscroll-contain px-2 py-2"
      aria-label={alt}
    >
      {pages.map((pageNumber) => (
        <LazyPdfPage key={pageNumber} pdf={pdf} pageNumber={pageNumber} width={width} />
      ))}
    </div>
  );
}
