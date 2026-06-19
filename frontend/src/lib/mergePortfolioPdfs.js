import { PDFDocument } from 'pdf-lib';
import { isPdfFile } from '@/data/portfolioCertifications';

async function fetchPdfBytes(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
  return response.arrayBuffer();
}

async function rasterizeToPdfPage(pdfDoc, imageUrl, title) {
  const img = await new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`));
    image.src = imageUrl;
  });

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  canvas.getContext('2d').drawImage(img, 0, 0);

  const isPng = imageUrl.toLowerCase().endsWith('.png') || imageUrl.toLowerCase().endsWith('.svg');
  const dataUrl = isPng ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', 0.92);
  const bytes = Uint8Array.from(atob(dataUrl.split(',')[1]), (c) => c.charCodeAt(0));
  const embedded = isPng
    ? await pdfDoc.embedPng(bytes)
    : await pdfDoc.embedJpg(bytes);

  const page = pdfDoc.addPage([595, 842]);
  const { width, height } = embedded.scale(1);
  const margin = 40;
  const maxW = page.getWidth() - margin * 2;
  const maxH = page.getHeight() - margin * 2 - 30;
  const scale = Math.min(maxW / width, maxH / height);
  const drawW = width * scale;
  const drawH = height * scale;
  const x = (page.getWidth() - drawW) / 2;
  const y = margin + 20;

  page.drawText(title, { x: margin, y: page.getHeight() - margin, size: 12 });
  page.drawImage(embedded, { x, y: y, width: drawW, height: drawH });
}

/**
 * Merges PDF files in order; rasterizes images/SVGs into pages.
 */
export async function mergePortfolioPdfs(entries, getFileUrl, saveAs) {
  const merged = await PDFDocument.create();

  for (const entry of entries) {
    const url = getFileUrl(entry);
    const title = entry.title || entry.name || 'Document';

    if (isPdfFile(url)) {
      const bytes = await fetchPdfBytes(url);
      const source = await PDFDocument.load(bytes);
      const pages = await merged.copyPages(source, source.getPageIndices());
      pages.forEach((page) => merged.addPage(page));
    } else {
      await rasterizeToPdfPage(merged, url, title);
    }
  }

  const pdfBytes = await merged.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = saveAs;
  link.click();
  URL.revokeObjectURL(link.href);
}
