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
    disableFontFace: false,
    useSystemFonts: false,
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
 * Bakes devicePixelRatio into the viewport scale so mobile screens stay sharp.
 *
 * @param {object} [options]
 * @param {number} [options.maxPixelRatio=3] Cap DPR for performance.
 * @param {number} [options.qualityScale=1] Extra CSS scale (e.g. 1.25 for fullscreen reading).
 */
export async function renderPdfPageToCanvas(
  pdf,
  pageNumber,
  canvas,
  maxWidth,
  activeTaskRef,
  options = {},
) {
  if (activeTaskRef?.current) {
    activeTaskRef.current.cancel();
    activeTaskRef.current = null;
  }

  const maxPixelRatio = options.maxPixelRatio ?? 3;
  const qualityScale = options.qualityScale ?? 1;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);

  const page = await pdf.getPage(pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });
  const cssScale = Math.max((maxWidth / baseViewport.width) * qualityScale, 0.1);
  const viewport = page.getViewport({ scale: cssScale * pixelRatio });
  const context = canvas.getContext('2d', { alpha: false });

  const cssWidth = Math.floor(viewport.width / pixelRatio);
  const cssHeight = Math.floor(viewport.height / pixelRatio);

  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;

  const task = page.render({
    canvasContext: context,
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
