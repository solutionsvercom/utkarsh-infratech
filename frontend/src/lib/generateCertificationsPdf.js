import { allCertificationsAndRegistrations, getCertificationFileUrl } from '@/data/portfolioCertifications';
import { mergePortfolioPdfs } from '@/lib/mergePortfolioPdfs';

/**
 * Generates and downloads a PDF of all certification & registration documents
 * in the same order as the slideshow.
 */
export async function generateCertificationsPdf(items = allCertificationsAndRegistrations) {
  await mergePortfolioPdfs(items, getCertificationFileUrl, 'utkarsh-infratech-certifications.pdf');
}
