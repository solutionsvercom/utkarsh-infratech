import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building, Landmark, Hammer, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import imgResidential from '@/assets/images/Residential_construction.jpeg';
import imgCommercial from '@/assets/images/Commercial_construction.jpeg';
import imgInfrastructure from '@/assets/images/infrastructure_construction.jpeg';
import imgRenovation from '@/assets/images/Renovation_construction.jpeg';

export default function Services() {
  const services = [
    {
      icon: Home,
      title: 'Residential Construction',
      description: 'Custom homes, apartments, and villas built with precision and care to create your dream living space.',
      image: imgResidential
    },
    {
      icon: Building,
      title: 'Commercial Projects',
      description: 'Office buildings, retail spaces, and commercial complexes designed for functionality and aesthetics.',
      image: imgCommercial
    },
    {
      icon: Landmark,
      title: 'Infrastructure Development',
      description: 'Roads, bridges, and public infrastructure projects that serve communities for generations.',
      image: imgInfrastructure
    },
    {
      icon: Hammer,
      title: 'Renovation & Contracting',
      description: 'Transform existing spaces with our expert renovation and general contracting services.',
      image: imgRenovation
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-orange-500" />
            <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm">Our Services</span>
            <div className="w-12 h-0.5 bg-orange-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What We <span className="text-orange-500">Offer</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Comprehensive construction solutions tailored to meet your unique needs and exceed expectations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <button className="inline-flex items-center text-orange-500 font-semibold group/btn">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
            View All Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}