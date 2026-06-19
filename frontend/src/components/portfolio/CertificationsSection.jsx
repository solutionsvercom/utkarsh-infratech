import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Building2, User } from 'lucide-react';
import {
  allCertificationsAndRegistrations,
  getCertificationFileUrl,
  getCertificationTypeLabel,
} from '@/data/portfolioCertifications';
import { preloadPdf } from '@/lib/pdfjs';
import PortfolioCarousel from './PortfolioCarousel';
import DocumentPreviewModal from './DocumentPreviewModal';
import PortfolioDocumentViewer from './PortfolioDocumentViewer';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55 },
};

function CertificationSlide({ item, onPreview }) {
  const fileUrl = getCertificationFileUrl(item);

  return (
    <div className="grid md:grid-cols-2 gap-6 p-4 sm:p-6">
      <PortfolioDocumentViewer
        src={fileUrl}
        alt={item.title}
        onExpand={() => onPreview(fileUrl, item.title)}
      />

      <div className="flex flex-col justify-center">
        <span className="inline-flex items-center gap-1.5 self-start bg-orange-100 border border-orange-200 rounded-full px-3 py-1 mb-3 text-xs font-semibold text-orange-700 uppercase tracking-wide">
          {getCertificationTypeLabel(item.type)}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>
        <div className="space-y-2 text-sm">
          <p className="flex items-start gap-2 text-gray-700">
            <Building2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
            <span>
              <span className="font-semibold text-gray-900">Issuing Authority: </span>
              {item.issuingAuthority}
            </span>
          </p>
          {item.documentHolder && (
            <p className="flex items-start gap-2 text-gray-700">
              <User className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              <span>
                <span className="font-semibold text-gray-900">Document Holder: </span>
                {item.documentHolder}
              </span>
            </p>
          )}
          {item.date && (
            <p className="text-gray-500 pl-6">
              {item.type === 'identity' ? 'Date of Issue' : 'Date'}: {item.date}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CertificationsSection() {
  const [preview, setPreview] = useState({ open: false, src: '', alt: '' });

  useEffect(() => {
    allCertificationsAndRegistrations.forEach((item) => {
      preloadPdf(getCertificationFileUrl(item));
    });
  }, []);

  const openPreview = (src, alt) => setPreview({ open: true, src, alt });
  const closePreview = () => setPreview({ open: false, src: '', alt: '' });

  return (
    <>
      <motion.section {...fadeUp} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-300" />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
              <BadgeCheck className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Certifications &amp; Departmental Registrations
            </h2>
          </div>

          <PortfolioCarousel
            items={allCertificationsAndRegistrations}
            ariaLabel="Certifications and departmental registrations"
            autoPlayMs={5000}
            renderSlide={(item) => (
              <CertificationSlide item={item} onPreview={openPreview} />
            )}
          />
        </div>
      </motion.section>

      <DocumentPreviewModal
        src={preview.src}
        alt={preview.alt}
        isOpen={preview.open}
        onClose={closePreview}
      />
    </>
  );
}
