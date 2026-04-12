import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOCATIONS = ['NCR-Delhi', 'Lucknow'];

function buildCategories(tier) {
  const t = tier;
  return [
    {
      id: 'structure',
      title: 'Structure',
      lines: [
        t === 'basic'
          ? 'Steel – Primary TMT brands'
          : 'Steel – JSW Neo | SAIL',
        'Cement – Shree | Ambuja of 43 or 53 grade',
        'Aggregates – 20mm & 40mm',
        'Blocks – Standard Red Bricks, 9 inch & 4 inch',
        'RCC design mix M25, or as per the structural designer\'s recommendation',
        'Ceiling height – 10 feet (FFL to FFL)',
      ],
    },
    {
      id: 'kitchen',
      title: 'Kitchen',
      lines: [
        'Ceramic wall dado – up to Rs. 60 per sq. ft.',
        'Main sink faucet – up to Rs. 2,000',
        'Any other faucet or accessories – ISI marked',
        'Kitchen sink – stainless steel single sink worth Rs. 6,000',
      ],
    },
    {
      id: 'bathroom',
      title: 'Bathroom',
      lines: [
        'Ceramic wall dado up to 7\' height – up to Rs. 60 per sq. ft.',
        'Sanitary ware and CP fittings up to Rs. 50,000 per 1,000 sq. ft. of Parryware make',
        'CPVC pipe – Astral | Ashirwad',
        'Bathroom doors – waterproof flush doors or WPC',
      ],
    },
    {
      id: 'doors',
      title: 'Doors & Windows',
      lines: [
        'Windows – uPVC windows with glass and mesh shutters as per design',
        'Main door – teak door and frame as per selection',
        'Internal doors – membrane or flush doors',
        'Door frames – sal wood',
        'Chajjas and window grills – as per design; additional charges if upgraded',
      ],
    },
    {
      id: 'painting',
      title: 'Painting',
      lines: [
        'Interior painting – JK Putty + Tractor Shyne emulsion',
        'Exterior painting – Asian Primer + Apex exterior emulsion paint',
      ],
    },
    {
      id: 'flooring',
      title: 'Flooring',
      lines: [
        'Living and dining flooring – tiles or granite of value up to Rs. 100 per sq. ft.',
        'Rooms and kitchen flooring – tiles of value up to Rs. 80 per sq. ft.',
        'Balcony and open areas – anti-skid tiles up to Rs. 60 per sq. ft.',
      ],
    },
    {
      id: 'electrical',
      title: 'Electrical',
      lines: [
        'All wiring with fireproof wires from Finolex | Anchor | Havells',
        'Switches and sockets – Roma | Lisha | Legrand Lyncus | Havells Fabio',
        'UPS wiring provision',
      ],
    },
    {
      id: 'misc',
      title: 'Miscellaneous',
      lines: [
        'Overhead tank – double-layered 1,500 L tank of Spiral make',
        'Underground sump – 6,000 L',
        'Staircase and balcony railing – MS railing',
        'Window grills – basic MS grill with enamel paint at Rs. 200 per sq. ft.',
        'One AC provision for every 350 sq. ft. of built-up area',
      ],
    },
  ];
}

const PACKAGES = [
  { key: 'basic', name: 'Basic', price: 1930, tier: 'basic' },
  { key: 'classic', name: 'Classic', price: 2230, tier: 'classic' },
  { key: 'premium', name: 'Premium', price: 2530, tier: 'premium' },
  { key: 'royale', name: 'Royale', price: 2830, tier: 'royale' },
].map((p) => ({
  ...p,
  categories: buildCategories(p.tier),
}));

function PackageCard({ pkg, openKey, onToggleCategory }) {
  return (
    <div className="flex-shrink-0 w-[min(100%,320px)] sm:w-[300px] snap-center">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col h-full">
        <div className="bg-orange-500 text-white text-center font-semibold text-sm sm:text-base px-3 py-3 leading-snug">
          {pkg.name} – ₹ {pkg.price}/sq. ft. (incl. GST)
        </div>
        <div className="divide-y divide-gray-100 flex-1">
          {pkg.categories.map((cat) => {
            const panelKey = `${pkg.key}:${cat.id}`;
            const isOpen = openKey === panelKey;
            return (
              <div key={cat.id} className="bg-white">
                <button
                  type="button"
                  onClick={() => onToggleCategory(panelKey)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left hover:bg-gray-50/80 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-sm">{cat.title}</span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-orange-500 shrink-0" strokeWidth={2} />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-500 shrink-0" strokeWidth={2} />
                  )}
                </button>
                {isOpen && (
                  <ul className="px-3 pb-3 space-y-1.5 border-t border-gray-50 bg-gray-50/50">
                    {cat.lines.map((line) => (
                      <li key={line} className="text-xs sm:text-sm text-indigo-900/70 leading-relaxed pl-1">
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        <div className="border-t border-gray-100 p-4 bg-gray-50/80 mt-auto">
          <p className="text-center text-xs text-indigo-900/70 mb-3">Get in touch with us!</p>
          <a
            href="#contact"
            className="block w-full text-center rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm py-2.5 transition-colors"
          >
            Talk to an Expert
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Packages() {
  const scrollerRef = useRef(null);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [openPanelKey, setOpenPanelKey] = useState(null);

  const handleToggleCategory = (panelKey) => {
    setOpenPanelKey((prev) => (prev === panelKey ? null : panelKey));
  };

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = dir === 'next' ? 280 : -280;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section id="packages" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-950 mb-2">Our Packages</h2>
          <p className="text-gray-600 text-lg mb-6">Find the best home construction packages.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-700">
            <span>Currently showing for</span>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-900 font-medium min-w-[180px]"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollBy('prev')}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-2 lg:-translate-x-4 w-10 h-10 rounded-full border-2 border-orange-500 bg-white text-orange-500 items-center justify-center shadow-md hover:bg-orange-50"
            aria-label="Previous packages"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy('next')}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-2 lg:translate-x-4 w-10 h-10 rounded-full border-2 border-orange-500 bg-white text-orange-500 items-center justify-center shadow-md hover:bg-orange-50"
            aria-label="Next packages"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollerRef}
            className={cn(
              'flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin',
              'scroll-smooth px-1 sm:px-8'
            )}
          >
            {PACKAGES.map((pkg) => (
              <PackageCard
                key={pkg.key}
                pkg={pkg}
                openKey={openPanelKey}
                onToggleCategory={handleToggleCategory}
              />
            ))}
          </div>
        </div>

        <p className="text-right text-xs text-gray-500 mt-4 pr-1">*Terms and conditions apply.</p>
      </div>
    </section>
  );
}
