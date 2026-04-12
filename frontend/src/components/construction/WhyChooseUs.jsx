import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Clock, Users2, FileCheck } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Gem,
      title: 'Quality Materials',
      description: 'We use only premium-grade materials sourced from trusted suppliers to ensure durability and longevity.'
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: 'Our efficient project management ensures every project is completed within the agreed timeline.'
    },
    {
      icon: Users2,
      title: 'Skilled Team',
      description: 'Our team comprises experienced engineers, architects, and craftsmen dedicated to excellence.'
    },
    {
      icon: FileCheck,
      title: 'Transparent Process',
      description: 'Clear communication, regular updates, and no hidden costs—complete transparency throughout.'
    }
  ];

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 px-2"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-orange-500" />
            <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm">Why Choose Us</span>
            <div className="w-12 h-0.5 bg-orange-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            The <span className="text-orange-500">UTKARSH</span> Difference
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            We don&apos;t just build structures—we build trust, relationships, and legacies that last for generations.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8 w-full flex flex-col min-h-[260px] sm:min-h-[280px] hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-orange-500/20 shrink-0">
                  <reason.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>

                <span className="absolute top-5 sm:top-6 right-5 sm:right-6 text-4xl sm:text-5xl font-bold text-gray-700/30 select-none">
                  0{index + 1}
                </span>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 pr-10">
                  {reason.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base flex-1">
                  {reason.description}
                </p>

                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 sm:mt-16 bg-orange-500 rounded-2xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {[
            { value: '500+', label: 'Happy Clients' },
            { value: '200+', label: 'Projects Completed' },
            { value: '50+', label: 'Team Members' },
            { value: '15+', label: 'Years of Experience' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-orange-100 text-xs sm:text-sm leading-snug">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
