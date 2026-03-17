import React from 'react';
import { motion } from 'motion/react';
import { useContentStore } from '../contentStore';
import { Link } from 'react-router-dom';
import { Shield, Heart, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const { content } = useContentStore();
  const { about } = content;

  return (
    <section id="about" className="py-24 bg-brand-soft overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1000" 
                alt="Spa Treatment" 
                className="rounded-[3rem] luxury-shadow w-full aspect-[4/5] object-cover"
              />
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-brand-gold/10 rounded-full blur-3xl"></div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-12 -right-8 bg-white p-8 rounded-3xl luxury-shadow z-20 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <Sparkles size={24} />
                </div>
                <div>
                  <p className="text-2xl font-display text-brand-dark">15+ Years</p>
                  <p className="text-[10px] uppercase tracking-widest text-brand-brown/60 font-bold">Of Excellence</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-4 block">
                The Strivenii Story
              </span>
              <h2 className="text-4xl md:text-6xl font-display mb-8">Where Beauty Meets Excellence</h2>
              <p className="text-brand-brown text-lg font-light leading-relaxed mb-10">
                {about.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-brand-gold">
                    <Heart size={20} />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Our Mission</h3>
                  </div>
                  <p className="text-sm text-brand-brown/80 font-light leading-relaxed">
                    {about.mission}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-brand-gold">
                    <Shield size={20} />
                    <h3 className="text-xs font-bold uppercase tracking-widest">Hygiene First</h3>
                  </div>
                  <p className="text-sm text-brand-brown/80 font-light leading-relaxed">
                    {about.hygiene}
                  </p>
                </div>
              </div>

              <Link 
                to="/about" 
                className="inline-flex items-center gap-3 text-brand-dark font-bold uppercase tracking-[0.3em] text-xs hover:text-brand-gold transition-colors group"
              >
                Discover More
                <div className="w-12 h-[1px] bg-brand-gold transition-all group-hover:w-20"></div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
