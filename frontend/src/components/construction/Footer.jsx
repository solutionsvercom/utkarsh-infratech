import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { PHONE_TEL_HREF, PHONE_DISPLAY } from '@/lib/contact';
import { BrandLogoMark } from '@/components/LogoText';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about-us' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Packages', href: '#packages' },
    { label: 'Contact', href: '#contact' }
  ];

  const services = [
    'Residential Construction',
    'Commercial Projects',
    'Infrastructure Development',
    'Renovation & Contracting'
  ];

  return (
    <footer className="bg-gray-900 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-32 opacity-5 pointer-events-none">
        <div className="absolute -top-16 left-1/4 w-64 h-64 border-4 border-orange-500 rotate-45" />
        <div className="absolute -top-20 right-1/4 w-48 h-48 border-4 border-orange-500 rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg overflow-hidden ring-2 ring-orange-500 shrink-0 bg-white">
                <BrandLogoMark />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-white text-lg leading-tight">UTKARSH INFRATECH</h3>
                <p className="text-orange-500 text-xs tracking-widest uppercase mt-1">Builder &amp; Contractor</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
              Building trust and delivering quality since 2009. Your vision, our expertise—together we create lasting structures.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-300"
                  aria-label="Social link"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-orange-500 shrink-0" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 group text-sm sm:text-base"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 transition-all duration-300 shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-orange-500 shrink-0" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2 group text-sm sm:text-base"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 transition-all duration-300 shrink-0" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-orange-500 shrink-0" />
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 leading-relaxed">
                  Gomti Nagar, Lucknow,
                  <br />
                  Uttar Pradesh - 226010
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href={PHONE_TEL_HREF} className="text-gray-400 hover:text-orange-500 transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="mailto:info@utkarshinfratech.com" className="text-gray-400 hover:text-orange-500 transition-colors break-all">
                  info@utkarshinfratech.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 UTKARSH INFRATECH. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 shrink-0"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
