import React from 'react';
import PortfolioDocumentViewer from './PortfolioDocumentViewer';

/** Work order slides use the same inline document viewer as certifications. */
export default function WorkOrderPdfViewer(props) {
  return <PortfolioDocumentViewer {...props} />;
}
