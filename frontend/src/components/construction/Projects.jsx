import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Residential', 'Commercial', 'Infrastructure'];

  const projects = [
    {
      title: 'Luxury Villa Complex',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
      location: 'Gomti Nagar, Lucknow'
    },
    {
      title: 'Tech Park Tower',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&q=80',
      location: 'Hazratganj, Lucknow'
    },
    {
      title: 'Highway Overpass',
      category: 'Infrastructure',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80',
      location: 'Lucknow-Kanpur Highway'
    },
    {
      title: 'Modern Apartments',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
      location: 'Aliganj, Lucknow'
    },
    {
      title: 'Shopping Mall',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&q=80',
      location: 'Indira Nagar, Lucknow'
    },
    {
      title: 'Premium Bungalows',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      location: 'Faizabad Road, Lucknow'
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-orange-500" />
            <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm">Our Portfolio</span>
            <div className="w-12 h-0.5 bg-orange-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-orange-500">Projects</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our completed projects that showcase our commitment to quality and excellence.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Category Badge */}
                  <span className="inline-block w-fit px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full mb-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {project.category}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {project.location}
                  </p>

                  {/* Arrow Icon */}
                  <div className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-gray-900" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}