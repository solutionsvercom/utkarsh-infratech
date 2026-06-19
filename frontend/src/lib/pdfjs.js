import * as pdfjsLib from 'pdfjs-dist';
import PdfJsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker';

let workerInstance = null;

/** Base URL for PDF.js wasm / font / cmap assets (see scripts/copy-pdfjs-assets.mjs). */
const PDFJS_ASSET_BASE = `${import.meta.env.BASE_URL}pdfjs`;

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
const bytesCache = new Map();

async function fetchPdfBytes(url) {
  if (!bytesCache.has(url)) {
    bytesCache.set(
      url,
      fetch(url).then(async (response) => {
        if (!response.ok) {
          throw new Error(`PDF fetch failed (${response.status})`);
        }
        return response.arrayBuffer();
      }),
    );
  }
  return bytesCache.get(url);
}

/** Warm the cache for carousel / modal PDFs before they are shown. */
export function preloadPdf(url) {
  if (!url) return;
  fetchPdfBytes(url).catch(() => {});
}

function pdfDocumentOptions(data) {
  return {
    data,
    wasmUrl: `${PDFJS_ASSET_BASE}/wasm/`,
    standardFontDataUrl: `${PDFJS_ASSET_BASE}/standard_fonts/`,
    cMapUrl: `${PDFJS_ASSET_BASE}/cmaps/`,
    cMapPacked: true,
    iccUrl: `${PDFJS_ASSET_BASE}/iccs/`,
    useWorkerFetch: false,
    isEvalSupported: false,
    disableAutoFetch: true,
    disableStream: true,
  };
}

/** @returns {Promise<import('pdfjs-dist').PDFDocumentProxy>} */
export async function loadPdfDocument(url) {
  ensurePdfWorker();

  if (!documentCache.has(url)) {
    const promise = fetchPdfBytes(url)
      .then((data) => pdfjsLib.getDocument(pdfDocumentOptions(data)).promise)
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
 * Uses 1x scale for speed on inline mobile previews (not retina-sharp).
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
    intent: 'display',
  }).promise;
}

export function clearPdfDocumentCache() {
  documentCache.clear();
  bytesCache.clear();
}
