import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Homeowner',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
      text: 'UTKARSH INFRATECH built our dream home with exceptional attention to detail. Their team was professional, transparent, and delivered on every promise. Highly recommended!',
      rating: 5
    },
    {
      name: 'Priya Singh',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
      text: 'We hired them for our office complex and were amazed by their efficiency. The project was completed ahead of schedule without compromising on quality. A truly reliable partner.',
      rating: 5
    },
    {
      name: 'Amit Verma',
      role: 'Real Estate Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
      text: 'Having worked with many contractors, I can confidently say UTKARSH INFRATECH stands out. Their commitment to quality materials and skilled workmanship is unmatched.',
      rating: 5
    },
    {
      name: 'Sunita Sharma',
      role: 'Villa Owner',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
      text: 'From design consultation to final handover, the experience was seamless. They listened to our needs and transformed our vision into reality. Thank you, team UTKARSH!',
      rating: 5
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
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
            <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm">Testimonials</span>
            <div className="w-12 h-0.5 bg-orange-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-orange-500">Clients</span> Say
          </h2>
          <p className="text-gray-600 text-lg">
            Don't just take our word for it—hear from people who have experienced our work firsthand.
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonials[currentIndex].name}</p>
                  <p className="text-orange-500 text-sm">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border-gray-300 hover:border-orange-500 hover:text-orange-500"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-orange-500 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border-gray-300 hover:border-orange-500 hover:text-orange-500"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Small Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-500 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                index === currentIndex ? 'ring-2 ring-orange-500' : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}