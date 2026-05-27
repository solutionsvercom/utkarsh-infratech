import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const LOCATIONS = ['NCR-Delhi', 'Lucknow'];

const CATEGORY_META = [
  { id: 'structure', title: 'Structure' },
  { id: 'kitchen', title: 'Kitchen' },
  { id: 'bathroom', title: 'Bathroom' },
  { id: 'doors', title: 'Doors & Windows' },
  { id: 'painting', title: 'Painting' },
  { id: 'flooring', title: 'Flooring' },
  { id: 'electrical', title: 'Electrical' },
  { id: 'misc', title: 'Miscellaneous' },
];

/** Economic (basic) — previous default inclusions */
const ECONOMIC_CATEGORIES = [
  {
    id: 'structure',
    title: 'Structure',
    lines: [
      'Steel – Primary TMT brands',
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

const TIER_PACKAGE_LINES = {
  moderate: {
    structure: [
      'Steel – JSW Neo | SAIL',
      'Cement – Shree | Ambuja (43/53 grade)',
      'Aggregates – 20mm & 40mm',
      'Blocks – Standard Red Bricks (9" & 4")',
      'RCC design mix M25 or as per structural recommendation',
      'Ceiling height – 10 ft',
    ],
    kitchen: [
      'Ceramic wall dado – up to ₹60/sqft',
      'Main sink faucet – up to ₹2,000',
      'Other faucets – ISI marked',
      'Kitchen sink – stainless steel (₹6,000)',
    ],
    bathroom: [
      'Ceramic wall dado up to 7 ft – ₹60/sqft',
      'Sanitaryware & CP fittings – ₹50,000 / 1000 sqft (Parryware)',
      'CPVC pipe – Astral | Ashirwad',
      'Bathroom doors – waterproof flush/WPC',
    ],
    doors: [
      'Windows – UPVC (Nexia | Lesso eiti)',
      'Main door – teak (₹30,000)',
      'Internal doors – membrane/flush (₹9,000)',
      'Chajjas – extra ₹500/sqft',
      'Window grills – extra ₹230/sqft',
    ],
    painting: [
      'Interior – JK Putty + Tractor Shyne',
      'Exterior – Asian Primer + Apex',
    ],
    flooring: [
      'Living/dining – ₹100/sqft',
      'Rooms/kitchen – ₹80/sqft',
      'Balcony – ₹60/sqft',
      'Staircase – ₹80/sqft',
      'Parking – ₹50/sqft',
    ],
    electrical: [
      'Wiring – Finolex | Anchor | Havells',
      'Switches – Roma | Lisha | Legrand | Havells',
      'UPS provision',
    ],
    misc: [
      'Overhead tank – 1500L',
      'Underground sump – 6000L',
      'MS railing',
      'Window grills – ₹200/sqft',
      'AC provision – 1 per 350 sqft',
    ],
  },
  premium: {
    structure: [
      'Steel – JSW Neo | SAIL',
      'Cement – ACC | Ultratech (43/53 grade)',
      'Aggregates – 20mm & 40mm',
      'Blocks – standard red bricks',
      'RCC design mix – ACC/Ultratech M25',
      'Ceiling height – 10 ft',
    ],
    kitchen: [
      'Ceramic wall dado – ₹80/sqft',
      'Main sink faucet – ₹3,500',
      'Faucets – Parryware / Hindware / Jaquar',
      'Sink – stainless/granite (₹8,000)',
    ],
    bathroom: [
      'Wall dado – ₹80/sqft',
      'Sanitaryware – ₹70,000 / 1000 sqft (Jaquar)',
      'CPVC – Astral | Ashirwad',
      'Doors – waterproof/WPC',
      'Accessories – ₹7,000',
      'Solar heater provision',
    ],
    doors: [
      'Windows – UPVC (Prominance)',
      'Main door – teak (₹40,000)',
      'Internal doors – ₹10,500',
      'Pooja door – ₹20,000',
      'Chajjas – extra ₹500/sqft',
      'Grills – extra ₹230/sqft',
    ],
    painting: [
      'Interior – JK Putty + Apcolite Premium',
      'Exterior – Apex Exterior',
    ],
    flooring: [
      'Living/dining – ₹140/sqft',
      'Rooms – ₹120/sqft',
      'Balcony – ₹80/sqft',
      'Staircase – ₹110/sqft',
      'Parking – ₹70/sqft',
    ],
    electrical: [
      'Wiring – Finolex | Anchor | Havells',
      'Switches – Legrand | Havells | Roma',
      'UPS provision',
    ],
    misc: [
      'Overhead tank – 2000L',
      'Underground sump – 7000L',
      'SS railing',
      'Window grills – ₹200/sqft',
      'AC provision',
      'Gypsum POP (35%)',
    ],
  },
  imperial: {
    structure: [
      'Steel – JSW Neo | SAIL',
      'Cement – ACC | Ultratech',
      'Aggregates – 20mm & 40mm',
      'Blocks – standard red bricks',
      'RCC design mix – ACC/Ultratech M25',
      'Ceiling height – 10 ft',
    ],
    kitchen: [
      'Wall dado – ₹90/sqft',
      'Faucet – ₹3,500',
      'Faucets – Parryware / Hindware / Jaquar',
      'Sink – ₹8,000',
    ],
    bathroom: [
      'Wall dado – ₹90/sqft',
      'Sanitaryware – ₹80,000 / 1000 sqft (Kohler)',
      'CPVC – Astral | Ashirwad',
      'Doors – waterproof/WPC',
      'Accessories – ₹9,000',
      'Solar heater',
    ],
    doors: [
      'Windows – NCL Veka | Wintech | Fenesta',
      'Main door – ₹50,000',
      'Internal doors – ₹11,500',
      'Pooja door – ₹24,000',
      'Chajjas – extra',
      'Grills – extra',
    ],
    painting: [
      'Interior – Royale Luxury Emulsion',
      'Exterior – Apex Ultima',
    ],
    flooring: [
      'Living/dining – ₹160/sqft',
      'Rooms – ₹140/sqft',
      'Balcony – ₹90/sqft',
      'Staircase – ₹140/sqft',
      'Parking – ₹70/sqft',
    ],
    electrical: [
      'Wiring – Finolex | Polycab | Havells',
      'Switches – Schneider | Legrand | Jaquar',
      'UPS',
      'EV charging point',
    ],
    misc: [
      'Overhead tank – 2000L',
      'Underground sump – 8000L',
      'Glass SS railing',
      'Window grills – ₹200/sqft',
      'Copper gas connection',
      'AC provision',
      'Gypsum POP',
    ],
  },
};

function buildCategories(tier) {
  if (tier === 'basic') return ECONOMIC_CATEGORIES;
  const linesById = TIER_PACKAGE_LINES[tier];
  return CATEGORY_META.map((meta) => ({
    ...meta,
    lines: linesById[meta.id],
  }));
}

const PACKAGES = [
  { key: 'economic', name: 'Economic', price: 1750, tier: 'basic' },
  { key: 'moderate', name: 'Moderate', price: 2050, tier: 'moderate' },
  { key: 'premium', name: 'Premium', price: 2350, tier: 'premium' },
  { key: 'imperial', name: 'Imperial', price: 2650, tier: 'imperial' },
].map((p) => ({
  ...p,
  categories: buildCategories(p.tier),
}));

function PackageCard({ pkg, openKey, onToggleCategory }) {
  return (
    <div className="flex-shrink-0 w-[min(100%,320px)] sm:w-[300px] snap-center">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden flex flex-col h-full">
        <div className="bg-orange-500 text-white text-center font-semibold text-sm  px-3 py-3 leading-snug">
          {pkg.name}
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
                    {cat.lines.map((line, lineIdx) => (
                      <li
                        key={`${cat.id}-${lineIdx}`}
                        className="text-xs sm:text-sm text-indigo-900/70 leading-relaxed pl-1"
                      >
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
