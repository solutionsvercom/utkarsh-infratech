/**
 * Certifications & departmental registrations
 *
 * ADD A NEW DOCUMENT:
 * 1. Copy your PDF or image into:
 *      public/portfolio/certifications/   (certificates, GST, MSME, ESIC, Aadhaar, etc.)
 *      public/portfolio/registrations/    (department registrations)
 * 2. Add an entry below with matching `image` filename and `type`.
 */

export const certifications = [
  {
    id: 'gst-registration',
    title: 'GST Registration Certificate',
    description:
      'Goods and Services Tax registration certificate for Utkarsh Infratech Builder and Contractor.',
    issuingAuthority: 'Goods and Services Tax Network (GSTN), Government of India',
    date: null,
    image: 'gst-certificate.pdf',
    type: 'certification',
  },
  {
    id: 'udyam-msme',
    title: 'UDYAM / MSME Registration',
    description:
      'Udyam registration certificate recognizing Utkarsh Infratech as a registered MSME construction enterprise.',
    issuingAuthority: 'Ministry of MSME, Government of India',
    date: 'May 2019',
    image: 'udyam-msme-certificate.pdf',
    type: 'certification',
  },
  {
    id: 'esic-certification',
    title: 'ESIC Registration Certificate',
    description:
      'Employees State Insurance Corporation registration for compliant labour welfare and statutory employment practices.',
    issuingAuthority: 'Employees State Insurance Corporation (ESIC)',
    date: null,
    image: 'esic-certificate.pdf',
    type: 'certification',
  },
  {
    id: 'aadhaar-identity',
    title: 'Aadhaar Identification Document',
    description:
      'Government-issued unique identity document serving as proof of identity and address for the holder across India.',
    issuingAuthority: 'Unique Identification Authority of India (UIDAI), Government of India',
    documentHolder: 'Utkarsh Mishra',
    date: 'March 2021',
    image: 'aadhaar-utkarsh-mishra.pdf',
    type: 'identity',
  },
];

export const departmentalRegistrations = [
  {
    id: 'labour-department',
    title: 'Labour Department Registration',
    description:
      'Registration with the Labour Department ensuring adherence to workforce regulations and safety standards.',
    issuingAuthority: 'Labour Department, Government of U.P.',
    date: null,
    image: 'labour-department.pdf',
    type: 'registration',
  },
  {
    id: 'epf-registration',
    title: 'EPF Registration Certificate',
    description:
      'Employees Provident Fund registration for statutory benefits and compliance for project workforce.',
    issuingAuthority: 'Employees Provident Fund Organisation (EPFO), Lucknow',
    date: 'May 2019',
    image: 'epf-registration.pdf',
    type: 'registration',
  },
];

/** Slideshow order: certifications first, then departmental registrations */
export const allCertificationsAndRegistrations = [
  ...certifications,
  ...departmentalRegistrations,
];

export function isPdfFile(filename) {
  return filename.toLowerCase().endsWith('.pdf');
}

/** PDF embed URL with browser toolbar hidden (no download/print controls). */
export function pdfEmbedUrl(url) {
  const base = url.split('#')[0];
  return `${base}#toolbar=0&navpanes=0`;
}

export function portfolioImageUrl(folder, filename) {
  return `/portfolio/${folder}/${filename}`;
}

export function getCertificationFileUrl(item) {
  const folder = item.type === 'registration' ? 'registrations' : 'certifications';
  return portfolioImageUrl(folder, item.image);
}

/** @deprecated use getCertificationFileUrl */
export function getCertificationImageUrl(item) {
  return getCertificationFileUrl(item);
}

export function getCertificationTypeLabel(type) {
  if (type === 'registration') return 'Departmental Registration';
  if (type === 'identity') return 'Identity Document';
  return 'Certification';
}
