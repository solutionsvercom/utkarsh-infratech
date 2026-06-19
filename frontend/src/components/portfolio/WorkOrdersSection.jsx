import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import { workOrderDocuments, workOrderPdfUrl } from '@/data/portfolioExtended';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55 },
};

export default function WorkOrdersSection() {
  return (
    <motion.section {...fadeUp} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-300" />
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Work Orders</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {workOrderDocuments.map((doc) => {
            const pdfUrl = workOrderPdfUrl(doc.fileName);
            return (
              <article key={doc.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-semibold text-gray-900">{doc.title}</h3>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
                  >
                    Open
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Issued by: {doc.issuedBy} · Date: {doc.date}
                </p>
                <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                  <iframe
                    title={doc.title}
                    src={`${pdfUrl}#toolbar=0`}
                    className="w-full h-72"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
