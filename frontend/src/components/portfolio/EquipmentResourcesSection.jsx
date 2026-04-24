import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  BadgeCheck,
  Box,
  Building2,
  Droplets,
  Grid2X2,
  Hammer,
  HardHat,
  Layers,
  MoveVertical,
  Truck,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { equipmentItems } from '@/data/portfolioExtended';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55 },
};

const iconByKey = {
  truck: Truck,
  box: Box,
  grid: Grid2X2,
  'move-vertical': MoveVertical,
  activity: Activity,
  building: Building2,
  layers: Layers,
  hammer: Hammer,
  up: Upload,
  droplets: Droplets,
};

export default function EquipmentResourcesSection() {
  return (
    <motion.section {...fadeUp} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-300" />
      <div className="p-6 sm:p-7 md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold tracking-wide text-orange-700 uppercase mb-4">
          <BadgeCheck className="w-3.5 h-3.5" />
          Capability
        </div>

        <div className="grid lg:grid-cols-[1.55fr_1fr] gap-4 lg:gap-5 items-start mb-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-2.5">
              Our Equipment <span className="text-orange-500">&amp; Resources</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Modern plant and shuttering resources on standby—supporting faster cycle times, safer execution, and
              dependable quality across civil and structural packages.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 lg:mt-1">
            <p className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-900 mb-1">
              <HardHat className="w-4 h-4 text-orange-500" />
              Field-ready inventory
            </p>
            <p className="text-gray-600 text-sm">Maintained for commercial &amp; industrial workloads.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {equipmentItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className={cn(
                'rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 min-h-[108px]',
                'hover:border-orange-300 transition-colors duration-300'
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                  {React.createElement(iconByKey[item.iconKey] ?? HardHat, { className: 'w-5 h-5' })}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-[1.05rem] font-semibold text-gray-900 leading-tight mb-1">{item.name}</h3>
                  <p className="text-orange-500 font-semibold text-[15px]">{item.quantity}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
