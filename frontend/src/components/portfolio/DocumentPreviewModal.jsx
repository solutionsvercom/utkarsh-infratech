import React, { useCallback, useEffect, useRef, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { isPdfFile, pdfEmbedUrl } from '@/data/portfolioCertifications';
import { useIsMobileViewport } from '@/hooks/useIsMobileViewport';
import PdfScrollViewer from './PdfScrollViewer';

export default function DocumentPreviewModal({ src, alt, isOpen, onClose }) {
  const isPdf = isPdfFile(src);
  const isMobile = useIsMobileViewport();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });

  const resetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetView();
      return undefined;
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose, resetView]);

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 4));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 1));

  const onWheel = (e) => {
    if (isPdf) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.15 : -0.15;
    setScale((s) => Math.min(Math.max(s + delta, 1), 4));
  };

  const onPointerDown = (e) => {
    if (isPdf || scale <= 1) return;
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...position };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    setPosition({
      x: posStart.current.x + (e.clientX - dragStart.current.x),
      y: posStart.current.y + (e.clientY - dragStart.current.y),
    });
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Document preview'}
      onClick={onClose}
    >
      <div
        className="absolute top-4 right-4 flex items-center gap-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {!isPdf && (
          <>
            <button
              type="button"
              onClick={zoomOut}
              className="p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={zoomIn}
              className="p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={resetView}
              className="p-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Reset zoom"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </>
        )}
        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          aria-label="Close preview"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className={`relative w-full h-full flex ${
          isPdf && isMobile
            ? 'items-stretch justify-center overflow-hidden p-2 pt-14'
            : `items-center justify-center overflow-hidden p-4 sm:p-8 ${isPdf ? '' : 'touch-none'}`
        }`}
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {isPdf ? (
          isMobile ? (
            <PdfScrollViewer src={src} alt={alt} />
          ) : (
            <iframe
              title={alt}
              src={pdfEmbedUrl(src)}
              className="w-full h-full max-w-5xl max-h-[90vh] rounded-lg bg-white"
            />
          )
        ) : (
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain select-none transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              cursor: scale > 1 ? 'grab' : 'zoom-in',
            }}
            draggable={false}
            onClick={(e) => {
              e.stopPropagation();
              if (scale === 1) zoomIn();
            }}
          />
        )}
      </div>
    </div>
  );
}
