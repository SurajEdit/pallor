import React from 'react';
import { motion } from 'motion/react';
import { useContentStore } from '../contentStore';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  const { content } = useContentStore();
  const { cta } = content;

  if (!cta) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-brand-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,165,114,0.15),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem] p-12 md:p-20 text-center luxury-shadow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-brand-gold/10 rounded-3xl flex items-center justify-center text-brand-gold mx-auto mb-10 luxury-shadow">
              <Sparkles size={40} />
            </div>
            
            <h2 className="text-4xl md:text-7xl font-display text-white mb-8 leading-tight">
              {cta.heading}
            </h2>
            
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              {cta.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to={cta.buttonLink || "/booking"} 
                className="gold-gradient text-white px-12 py-6 rounded-full font-bold text-sm uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-all flex items-center gap-3 group"
              >
                {cta.buttonText}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              <div className="flex items-center gap-4 text-white/40">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-dark overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Join 500+ Happy Clients</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
