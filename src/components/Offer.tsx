import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar } from 'lucide-react';

export default function Offer() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="gold-gradient rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-bold mb-6">
              <Sparkles size={16} />
              LIMITED TIME OFFER
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              20% OFF on Facial & Hair Services
            </h2>
            
            <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Book your appointment today and get a special discount on our premium skin and hair treatments. 
              Valid for first-time customers!
            </p>

            <a 
              href="#booking" 
              className="inline-flex items-center gap-2 bg-white text-brand-gold px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:scale-105 transition-all"
            >
              <Calendar size={24} />
              Book Appointment Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
