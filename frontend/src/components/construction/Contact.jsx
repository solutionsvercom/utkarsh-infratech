import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PHONE_TEL_HREF, PHONE_DISPLAY } from '@/lib/contact';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const apiBase = import.meta.env.VITE_API_URL ?? '';
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast.success('Thank you! We will contact you soon.');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Could not send your message. Please call us or try again later.');
    }
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Office',
      details: ['Gomti Nagar', 'Lucknow, Uttar Pradesh', 'India - 226010']
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [PHONE_DISPLAY]
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@utkarshinfratech.com', 'projects@utkarshinfratech.com']
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed']
    }
  ];

  return (
    <section id="contact" className="py-24 bg-white">
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
            <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm">Contact Us</span>
            <div className="w-12 h-0.5 bg-orange-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get In <span className="text-orange-500">Touch</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Ready to start your project? Contact us today for a free consultation and quote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick Action Buttons */}
            <div className="pt-6 space-y-3">
              <a
                href={PHONE_TEL_HREF}
                className={cn(
                  buttonVariants(),
                  'w-full bg-orange-500 hover:bg-orange-600 text-white h-11 text-sm font-semibold sm:h-12 sm:text-base'
                )}
              >
                <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Call Now
              </a>
              <a
                href="mailto:info@utkarshinfratech.com"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'w-full border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white h-11 text-sm font-semibold sm:h-12 sm:text-base'
                )}
              >
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Send Email
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
              <p className="text-gray-600 mb-6">Fill out the form below, and we will get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <Input
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-white border-gray-200 h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <Input
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="bg-white border-gray-200 h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white border-gray-200 h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                  <Textarea
                    placeholder="Tell us about your project requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-white border-gray-200 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg group"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Inquiry
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}