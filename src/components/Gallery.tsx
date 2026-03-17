import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useContentStore } from '../contentStore';
import { X, Maximize2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GalleryProps {
  limit?: number;
}

export default function Gallery({ limit }: GalleryProps) {
  const { content } = useContentStore();
  const { gallery } = content;
  const [activeCategory, setActiveCategory] = useState<'All' | 'Interior' | 'Hair' | 'Beauty' | 'Bridal'>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories: ('All' | 'Interior' | 'Hair' | 'Beauty' | 'Bridal')[] = ['All', 'Interior', 'Hair', 'Beauty', 'Bridal'];

  const filteredGallery = activeCategory === 'All' 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory);

  const displayedGallery = limit ? filteredGallery.slice(0, limit) : filteredGallery;

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-4 block"
          >
            Visual Journey
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display mb-6"
          >
            Our Work & Artistry
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-brown max-w-2xl mx-auto text-lg font-light"
          >
            Explore our salon through these captured moments of beauty, style, and transformation.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] cursor-pointer luxury-shadow"
              onClick={() => setSelectedImage(item.image)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-white font-display text-2xl mb-4">
                    {item.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {limit && (
          <div className="mt-16 text-center">
            <Link 
              to="/gallery" 
              className="inline-flex items-center gap-3 text-brand-dark font-bold uppercase tracking-[0.3em] text-xs hover:text-brand-gold transition-colors group"
            >
              View Full Gallery
              <div className="w-12 h-[1px] bg-brand-gold transition-all group-hover:w-20"></div>
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Gallery Preview"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
