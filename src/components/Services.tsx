import React from 'react';
import { motion } from 'motion/react';
import { Service } from '../types';
import { Calendar } from 'lucide-react';

const services: Service[] = [
  {
    id: '1',
    title: 'Bridal Makeup',
    description: 'Exquisite bridal looks for your special day, from traditional to contemporary.',
    price: 'Starting ₹5,000',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '2',
    title: 'Party Makeup',
    description: 'Stunning makeup for parties, events, and special occasions.',
    price: 'Starting ₹1,500',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '3',
    title: 'Hair Cut & Styling',
    description: 'Professional hair cuts and styling to match your personality.',
    price: 'Starting ₹300',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '4',
    title: 'Hair Smoothening',
    description: 'Get silky, smooth, and frizz-free hair with our premium treatments.',
    price: 'Starting ₹3,000',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '5',
    title: 'Facial & Skin Care',
    description: 'Rejuvenating facials for a natural, healthy glow.',
    price: 'Starting ₹800',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '6',
    title: 'Waxing & Threading',
    description: 'Hygienic and professional waxing and threading services.',
    price: 'Starting ₹50',
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '7',
    title: 'Manicure & Pedicure',
    description: 'Pamper your hands and feet with our relaxing spa treatments.',
    price: 'Starting ₹500',
    image: 'https://images.unsplash.com/photo-1610992015732-2449b0c26670?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '8',
    title: 'Hair Coloring',
    description: 'Trendy hair colors and highlights using premium products.',
    price: 'Starting ₹1,200',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=600',
  },
];

export default function Services() {
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
