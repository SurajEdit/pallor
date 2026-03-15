import React from 'react';
import { motion } from 'motion/react';
import { Phone, Calendar, MessageCircle, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=2000" 
          alt="Beauty Salon Background" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-pink via-brand-pink/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-bold tracking-wider text-brand-dark/70">
                4.9 GOOGLE RATING (258+ REVIEWS)
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-dark leading-tight mb-6">
              Best Beauty Parlour in <span className="text-brand-gold">Badarpur</span>
            </h1>
            
            <p className="text-lg md:text-xl text-brand-dark/80 mb-10 leading-relaxed max-w-2xl">
              Professional makeup, skincare, and hair services trusted by 258+ happy customers. 
              Experience luxury beauty treatments tailored just for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#booking" 
                className="bg-brand-gold text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                Book Appointment
              </a>
              <a 
                href="tel:+917836981845" 
                className="bg-white text-brand-dark border-2 border-brand-gold/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-gold hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Call Now
              </a>
              <a 
                href="https://wa.me/917836981845" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Image */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-[80%] rounded-l-[100px] overflow-hidden shadow-2xl border-l-8 border-white"
      >
        <img 
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1000" 
          alt="Makeup Artist" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </section>
  );
}
