import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

let workerInitPromise = null;

/**
 * Hostinger (and some static hosts) serve .mjs as text/plain, which breaks
 * module workers. Load the worker script and run it from a blob URL instead.
 */
async function initPdfWorker() {
  if (!workerInitPromise) {
    workerInitPromise = (async () => {
      const response = await fetch(pdfWorkerUrl);
      if (!response.ok) {
        throw new Error(`Failed to load PDF worker (${response.status})`);
      }
      const script = await response.text();
      const blob = new Blob([script], { type: 'application/javascript' });
      pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(blob);
    })();
  }
  return workerInitPromise;
}

const documentCache = new Map();

async function fetchPdfBytes(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`PDF fetch failed (${response.status})`);
  }
  return response.arrayBuffer();
}

/** @returns {Promise<import('pdfjs-dist').PDFDocumentProxy>} */
export async function loadPdfDocument(url) {
  await initPdfWorker();

  if (!documentCache.has(url)) {
    const promise = fetchPdfBytes(url)
      .then((data) =>
        pdfjsLib.getDocument({
          data,
          useWorkerFetch: false,
          isEvalSupported: false,
        }).promise,
      )
      .catch((error) => {
        documentCache.delete(url);
        throw error;
      });
    documentCache.set(url, promise);
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
