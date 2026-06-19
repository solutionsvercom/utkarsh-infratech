import * as pdfjsLib from 'pdfjs-dist';
import PdfJsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker';

let workerInstance = null;

/**
 * PDF.js needs a real ES-module Web Worker. Blob URLs and wrong MIME types on
 * .mjs files cause "Setting up fake worker" and broken rendering on mobile.
 */
function ensurePdfWorker() {
  if (!workerInstance) {
    workerInstance = new PdfJsWorker();
    pdfjsLib.GlobalWorkerOptions.workerPort = workerInstance;
  }
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
  ensurePdfWorker();

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

  await page.render({
    canvasContext: context,
    canvas,
    viewport,
  }).promise;
}

export function clearPdfDocumentCache() {
  documentCache.clear();
}
