import React from 'react';
import { Expand, FileText } from 'lucide-react';
import { isPdfFile, pdfEmbedUrl } from '@/data/portfolioCertifications';
import { useIsMobileViewport } from '@/hooks/useIsMobileViewport';
import PdfCanvasViewer from './PdfCanvasViewer';

/**
 * Inline document preview for carousel slides (image or PDF).
 * On mobile, PDFs render via canvas (iframes show a browser "Open" button instead).
 */
export default function PortfolioDocumentViewer({ src, alt, onExpand, className = '' }) {
  const isMobile = useIsMobileViewport();
  const isPdf = isPdfFile(src);

  if (isPdf && isMobile) {
    return (
      <PdfCanvasViewer
        src={src}
        alt={alt}
        onExpand={onExpand}
        className={className}
      />
    );
  }

  if (isPdf) {
    return (
      <div
        className={`relative rounded-xl overflow-hidden border border-gray-200 bg-white aspect-[4/3] w-full ${className}`}
      >
        <iframe
          title={alt}
          src={pdfEmbedUrl(src)}
          className="w-full h-full bg-gray-50"
        />
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
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onExpand}
      className={`group relative rounded-xl overflow-hidden border border-gray-200 bg-white aspect-[4/3] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 w-full ${className}`}
      aria-label={`View ${alt} in fullscreen`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
    </button>
  );
}
