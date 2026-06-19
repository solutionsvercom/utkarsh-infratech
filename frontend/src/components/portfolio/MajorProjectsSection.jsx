import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Activity, CheckCircle2, Landmark, Wrench } from 'lucide-react';
import { majorProjects, projectImageUrl } from '@/data/portfolioProjects';
import PortfolioCarousel from './PortfolioCarousel';
import DocumentPreviewModal from './DocumentPreviewModal';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55 },
};

function statusColor(status) {
  const normalized = status?.toLowerCase() ?? '';
  if (normalized.includes('ongoing') || normalized.includes('progress')) {
    return 'bg-blue-100 text-blue-700 border-blue-200';
  }
  if (normalized.includes('completed')) {
    return 'bg-green-100 text-green-700 border-green-200';
  }
  return 'bg-orange-100 text-orange-700 border-orange-200';
}

function statusIcon(status) {
  const normalized = status?.toLowerCase() ?? '';
  if (normalized.includes('ongoing') || normalized.includes('progress')) {
    return Activity;
  }
  return CheckCircle2;
}

function ProjectSlide({ project, onImageClick }) {
  const imageUrl = projectImageUrl(project.image);
  const StatusIcon = statusIcon(project.status);

  return (
    <div className="grid md:grid-cols-2 gap-6 p-4 sm:p-6">
      <button
        type="button"
        onClick={() => onImageClick(imageUrl, project.name)}
        className="group relative rounded-xl overflow-hidden border border-gray-200 bg-white aspect-[4/3] w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        aria-label={`View ${project.name} in fullscreen`}
      >
        <img
          src={imageUrl}
          alt={project.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
      </button>

      <div className="flex flex-col justify-center">
        <span
          className={`inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wide ${statusColor(project.status)}`}
        >
          <StatusIcon className="w-3 h-3" />
          {project.status}
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{project.name}</h3>
        <p className="text-gray-600 leading-relaxed mb-4">{project.description}</p>

        <div className="space-y-2.5 text-sm">
          {project.client && (
            <p className="flex items-start gap-2 text-gray-700">
              <Landmark className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              <span>
                <span className="font-semibold text-gray-900">Client: </span>
                {project.client}
              </span>
            </p>
          )}

          {project.technologies?.length > 0 && (
            <div className="flex items-start gap-2">
              <Wrench className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-gray-900">Technologies Used: </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block rounded-md bg-gray-100 border border-gray-200 px-2 py-0.5 text-xs text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {project.completionDate && (
            <p className="flex items-start gap-2 text-gray-700">
              <Calendar className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              <span>
                <span className="font-semibold text-gray-900">Completion Date: </span>
                {project.completionDate}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MajorProjectsSection() {
  const [preview, setPreview] = useState({ open: false, src: '', alt: '' });

  const openPreview = (src, alt) => setPreview({ open: true, src, alt });
  const closePreview = () => setPreview({ open: false, src: '', alt: '' });

  return (
    <>
      <motion.section {...fadeUp} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-300" />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
              <Landmark className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Major Projects</h2>
          </div>

          <PortfolioCarousel
            items={majorProjects}
            ariaLabel="Major projects showcase"
            autoPlayMs={5000}
            renderSlide={(project) => (
              <ProjectSlide project={project} onImageClick={openPreview} />
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
