import * as pdfjsLib from 'pdfjs-dist';

let workerReady = false;

export function ensurePdfWorker() {
  if (workerReady) return;
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).href;
  workerReady = true;
}

const documentCache = new Map();

/** @returns {Promise<import('pdfjs-dist').PDFDocumentProxy>} */
export async function loadPdfDocument(url) {
  ensurePdfWorker();
  if (!documentCache.has(url)) {
    documentCache.set(
      url,
      pdfjsLib.getDocument({ url }).promise,
    );
  }
  return documentCache.get(url);
}

/**
 * Renders a PDF page onto a canvas scaled to maxWidth (CSS pixels).
 */
export async function renderPdfPageToCanvas(pdf, pageNumber, canvas, maxWidth) {
  const page = await pdf.getPage(pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = maxWidth / baseViewport.width;
  const viewport = page.getViewport({ scale });
  const context = canvas.getContext('2d');

  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  canvas.style.width = '100%';
  canvas.style.height = 'auto';

  await page.render({ canvasContext: context, viewport }).promise;
}

export function clearPdfDocumentCache() {
  documentCache.clear();
}
