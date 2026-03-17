import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { useContentStore } from '../contentStore';
import { Link } from 'react-router-dom';

interface ServicesProps {
  limit?: number;
}

export default function Services({ limit }: ServicesProps) {
  const { content } = useContentStore();
  const { services } = content;
  const [activeCategory, setActiveCategory] = useState<'All' | 'Hair' | 'Beauty' | 'Skin'>('All');

  const categories: ('All' | 'Hair' | 'Beauty' | 'Skin')[] = ['All', 'Hair', 'Beauty', 'Skin'];

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const displayedServices = limit ? filteredServices.slice(0, limit) : filteredServices;

  return (
    <section id="services" className="py-24 bg-brand-beige">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-4 block"
          >
            Our Offerings
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display mb-6"
          >
            Curated Beauty Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-brown max-w-2xl mx-auto text-lg font-light"
          >
            Discover our range of premium spa and beauty treatments designed to restore balance and enhance your natural radiance.
          </motion.p>
        </div>

        {/* Category Filter */}
        {!limit && (
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                    ? 'bg-brand-dark text-white border-brand-dark' 
                    : 'bg-transparent text-brand-dark border-brand-dark/10 hover:border-brand-gold hover:text-brand-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {displayedServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full luxury-shadow"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-brand-dark shadow-xl">
                  {service.price}
                </div>
                <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
                    <Clock size={12} className="text-brand-gold" />
                    {service.duration}
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={12} className="text-brand-gold" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">
                    {service.category}
                  </span>
                </div>
                <h3 className="text-2xl font-display mb-3 group-hover:text-brand-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-brand-brown/80 mb-8 flex-grow leading-relaxed font-light">
                  {service.description}
                </p>
                <Link 
                  to="/book" 
                  className="w-full py-4 rounded-2xl bg-brand-soft text-brand-dark font-bold text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <Calendar size={14} />
                  Book Now
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {limit && (
          <div className="mt-16 text-center">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-3 text-brand-dark font-bold uppercase tracking-[0.3em] text-xs hover:text-brand-gold transition-colors group"
            >
              View All Services
              <div className="w-12 h-[1px] bg-brand-gold transition-all group-hover:w-20"></div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
