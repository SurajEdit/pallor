import React from 'react';
import { motion } from 'motion/react';

const galleryItems = [
  {
    id: 1,
    title: 'Bridal Transformation',
    image: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&q=80&w=600',
    category: 'Makeup'
  },
  {
    id: 2,
    title: 'Hair Styling',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600',
    category: 'Hair'
  },
  {
    id: 3,
    title: 'Skin Glow',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600',
    category: 'Skincare'
  },
  {
    id: 4,
    title: 'Party Look',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600',
    category: 'Makeup'
  },
  {
    id: 5,
    title: 'Bridal Mehndi',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=600',
    category: 'Traditional'
  },
  {
    id: 6,
    title: 'Hair Coloring',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=600',
    category: 'Hair'
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Before & After Gallery</h2>
          <p className="text-brand-dark/60 max-w-2xl mx-auto">
            Witness the transformations we create every day. Real results for real people.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-1">
                  {item.category}
                </span>
                <h3 className="text-white font-serif text-lg md:text-xl">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
