import React from 'react';
import { buttonVariants } from "@/components/ui/button";
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PHONE_TEL_HREF } from '@/lib/contact';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1541976590-713941681591?w=1920&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 border border-orange-500 rotate-45" />
        <div className="absolute bottom-20 left-20 w-64 h-64 border border-orange-500 rotate-12" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-4 py-2 mb-6"
          >
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shrink-0" />
            <span className="text-orange-300 text-sm font-medium tracking-wide">
              Lucknow&apos;s Trusted Builder
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="mb-6 w-full max-w-4xl"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 sm:w-16 bg-orange-500 shrink-0" />
              <span className="text-orange-400 text-xs font-semibold uppercase tracking-widest">Est. 2009</span>
              <div className="h-px w-12 sm:w-16 bg-orange-500 shrink-0" />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] sm:leading-none px-1">
              <span
                className="block text-transparent bg-clip-text pb-1"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #f97316 0%, #fb923c 35%, #ffffff 65%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                }}
              >
                UTKARSH
              </span>
              <span className="block text-white mt-1 sm:mt-2">INFRATECH</span>
            </h1>

            <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
              <div className="h-1 w-8 rounded-full bg-orange-500" />
              <div className="h-1 w-16 sm:w-20 rounded-full bg-orange-500" />
              <div className="h-1 w-8 rounded-full bg-orange-500" />
            </div>
          </motion.div>

          <div className="space-y-2 sm:space-y-3 mb-6 max-w-2xl px-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug">
              Building Trust.
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500 leading-snug">
              Delivering Quality.
            </p>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl mb-8 leading-relaxed px-2">
            From foundation to finish, we craft exceptional spaces with precision, integrity, and an unwavering commitment to excellence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <a
              href={PHONE_TEL_HREF}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'border-2 border-white bg-white/15 text-white shadow-none backdrop-blur-sm hover:bg-white hover:text-gray-900 rounded-lg px-6 py-2.5 h-11 text-sm font-semibold sm:text-base sm:h-12 sm:px-8 inline-flex items-center justify-center'
              )}
            >
              <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              Call Now
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-10 sm:mt-12 pt-8 border-t border-white/20 w-full max-w-2xl px-2"
          >
            {[
              { number: '15+', label: 'Years of Experience' },
              { number: '200+', label: 'Projects Completed' },
              { number: '99%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center min-w-[100px]">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500">{stat.number}</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
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
