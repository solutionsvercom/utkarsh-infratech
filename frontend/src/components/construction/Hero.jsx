import React from 'react';
import { buttonVariants } from "@/components/ui/button";
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PHONE_TEL_HREF } from '@/lib/contact';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1541976590-713941681591?w=1920&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 border border-orange-500 rotate-45" />
        <div className="absolute bottom-20 left-20 w-64 h-64 border border-orange-500 rotate-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-4 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-400 text-sm font-medium">Lucknow's Trusted Builder</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Building Trust.
            <br />
            <span className="text-orange-500">Delivering Quality.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-xl mb-8 leading-relaxed">
            From foundation to finish, we craft exceptional spaces with precision, 
            integrity, and an unwavering commitment to excellence.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={PHONE_TEL_HREF}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'border-2 border-white bg-white/15 text-white shadow-none backdrop-blur-sm hover:bg-white hover:text-gray-900 rounded-lg px-6 py-2.5 h-11 text-sm font-semibold sm:text-base sm:h-12 sm:px-8'
              )}
            >
              <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Call Now
            </a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20"
          >
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '200+', label: 'Projects Completed' },
              { number: '99%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-bold text-orange-500">{stat.number}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-orange-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}