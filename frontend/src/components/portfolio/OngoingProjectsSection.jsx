import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle2, MapPin } from 'lucide-react';
import { ongoingProjects } from '@/data/portfolioExtended';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55 },
};

export default function OngoingProjectsSection() {
  return (
    <motion.section {...fadeUp} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-300" />
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
            <Activity className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Ongoing Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {ongoingProjects.map((project) => (
            <article key={project.id} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="inline-flex items-center gap-1.5 text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4 text-orange-500" />
                {project.location}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{project.description}</p>
              <div className="space-y-2">
                {project.highlights.map((point) => (
                  <p key={point} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
