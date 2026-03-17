import React from 'react';
import { motion } from 'motion/react';
import { Phone, Calendar, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { useContentStore } from '../contentStore';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { content } = useContentStore();
  const { hero } = content;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-beige">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.backgroundImage} 
          alt="Luxury Spa Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-dark/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-beige via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-[1px] w-12 bg-brand-gold/60"></div>
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-white/90 uppercase">
                4.9 ⭐ (1,382+ GOOGLE REVIEWS)
              </span>
              <div className="h-[1px] w-12 bg-brand-gold/60"></div>
            </div>

            <h1 className="text-5xl md:text-8xl font-display text-white leading-[1.1] mb-8 text-balance">
              {hero.heading}
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto font-light tracking-wide">
              {hero.subheading}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to={hero.buttonLink || "/book"} 
                className="gold-gradient text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all flex items-center gap-3 group"
              >
                <Calendar size={18} />
                {hero.buttonText}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              <div className="flex items-center gap-4">
                <a 
                  href={`tel:${content.contact.phone}`} 
                  className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all shadow-xl"
                  title="Call Us"
                >
                  <Phone size={20} />
                </a>
                <a 
                  href={`https://wa.me/${content.contact.whatsapp}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[#25D366]/20 backdrop-blur-md border border-[#25D366]/40 text-white rounded-full flex items-center justify-center hover:bg-[#25D366] transition-all shadow-xl"
                  title="WhatsApp Us"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-brand-dark/40 font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent"></div>
      </motion.div>
    </section>
  );
}
