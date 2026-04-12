import React from 'react';
import logoSrc from '@/assets/images/Logo.png';

/** Brand logo image for header, footer, and optional hero mark — not for inline text substitution. */
export function BrandLogoMark({ className = 'w-full h-full object-cover', alt = 'Utkarsh Infratech' }) {
  return <img src={logoSrc} alt={alt} className={className} />;
}
