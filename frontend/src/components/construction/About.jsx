import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Building2 } from 'lucide-react';
import { BrandLogoMark } from '@/components/LogoText';

export default function About() {
  const features = [
    { icon: Award, text: 'Award-Winning Excellence' },
    { icon: Users, text: 'Expert Team of Professionals' },
    { icon: Building2, text: 'Cutting-Edge Technology' },
    { icon: CheckCircle2, text: 'Quality Guaranteed' },
  ];

  return (
    <section id="about-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Construction site"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange-500 rounded-2xl -z-0 hidden sm:block" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-gray-200 rounded-2xl -z-0 hidden sm:block" />

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute -bottom-4 left-4 sm:left-8 bg-white rounded-xl shadow-xl p-5 sm:p-6 z-20"
            >
              <p className="text-3xl sm:text-4xl font-bold text-orange-500">15+</p>
              <p className="text-gray-600 text-sm">Years of<br />Excellence</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-orange-500" />
              <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm">About Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Crafting Dreams into
              <span className="text-orange-500"> Reality</span>
            </h2>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              UTKARSH INFRATECH has been at the forefront of construction excellence in Lucknow
              for over 15 years. We specialize in delivering high-quality residential, commercial,
              and infrastructure projects that stand the test of time.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Our commitment to using premium materials, employing skilled craftsmen, and
              maintaining transparent communication sets us apart. Every project we undertake
              reflects our dedication to quality, safety, and client satisfaction.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature.text} className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-orange-500/80 shrink-0 bg-white">
                <BrandLogoMark />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">UTKARSH INFRATECH</p>
                <p className="text-gray-500 text-sm">Building Tomorrow, Today</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
