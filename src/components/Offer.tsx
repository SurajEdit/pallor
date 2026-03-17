import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useContentStore } from '../contentStore';

export default function Offer() {
  const { content } = useContentStore();
  const { offer } = content;

  if (!offer.isActive) return null;

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-gold rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-[4rem] p-12 md:p-20 text-center luxury-shadow">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-gold/20 text-brand-gold mb-8">
              <Sparkles size={16} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Limited Time Offer</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-display text-white mb-8 leading-tight">
              {offer.title}: <span className="text-brand-gold">{offer.discount}</span>
            </h2>
            
            <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              {offer.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/book" 
                className="w-full sm:w-auto px-12 py-5 bg-brand-gold text-brand-dark rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-white transition-all luxury-shadow flex items-center justify-center gap-3 group"
              >
                Claim Offer Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                *Valid for new clients only
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
