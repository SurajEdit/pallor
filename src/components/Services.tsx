import React from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { useContentStore } from '../contentStore';

export default function Services() {
  const { content } = useContentStore();
  const { services } = content;

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4"
          >
            Our Popular Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-dark/60 max-w-2xl mx-auto"
          >
            We offer a wide range of beauty treatments designed to make you look and feel your best.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-gold shadow-sm">
                  {service.price}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-brand-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-brand-dark/70 mb-6 flex-grow">
                  {service.description}
                </p>
                <a 
                  href="#booking" 
                  className="w-full py-3 rounded-xl border border-brand-gold text-brand-gold font-bold text-sm hover:bg-brand-gold hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Calendar size={16} />
                  Book Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
