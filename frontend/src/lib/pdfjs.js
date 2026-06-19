import * as pdfjsLib from 'pdfjs-dist';
import PdfJsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker';

let workerInstance = null;

/** Base URL for PDF.js wasm / font / cmap assets (see scripts/copy-pdfjs-assets.mjs). */
const PDFJS_ASSET_BASE = `${import.meta.env.BASE_URL}pdfjs`;

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
      fetch(url)
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`PDF fetch failed (${response.status})`);
          }
          return response.arrayBuffer();
        })
        .catch((error) => {
          bytesCache.delete(url);
          throw error;
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
    isEvalSupported: false,
    disableAutoFetch: true,
    disableStream: true,
    // Scanned cert PDFs rarely need embedded fonts; skipping avoids TT parse warnings.
    disableFontFace: true,
    useSystemFonts: true,
    verbosity: 0,
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

export function isRenderingCancelled(error) {
  return error?.name === 'RenderingCancelledException';
}

/**
 * Renders a PDF page onto a canvas scaled to maxWidth (CSS pixels).
 * Pass activeTaskRef to cancel an in-flight render on the same canvas.
 */
export async function renderPdfPageToCanvas(pdf, pageNumber, canvas, maxWidth, activeTaskRef) {
  if (activeTaskRef?.current) {
    activeTaskRef.current.cancel();
    activeTaskRef.current = null;
  }

  const page = await pdf.getPage(pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = Math.max(maxWidth / baseViewport.width, 0.1);
  const viewport = page.getViewport({ scale });
  const context = canvas.getContext('2d');

  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  canvas.style.width = '100%';
  canvas.style.height = 'auto';

  const task = page.render({
    canvasContext: context,
    canvas,
    viewport,
    intent: 'display',
  });

  if (activeTaskRef) activeTaskRef.current = task;

  try {
    await task.promise;
  } finally {
    if (activeTaskRef?.current === task) {
      activeTaskRef.current = null;
    }
  }
}

export function clearPdfDocumentCache() {
  documentCache.clear();
  bytesCache.clear();
}

/** Wait until the container has a real width (carousel enter animations). */
export function waitForContainerWidth(element, fallback = 320, timeoutMs = 2000) {
  return new Promise((resolve) => {
    if (element.clientWidth > 0) {
      resolve(element.clientWidth);
      return;
    }

    let settled = false;
    const finish = (width) => {
      if (settled) return;
      settled = true;
      observer.disconnect();
      clearTimeout(timer);
      resolve(width > 0 ? width : fallback);
    };

    const observer = new ResizeObserver(() => {
      if (element.clientWidth > 0) finish(element.clientWidth);
    });
    observer.observe(element);

    const timer = setTimeout(() => finish(element.clientWidth), timeoutMs);
  });
}
