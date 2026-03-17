import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { useContentStore } from '../contentStore';
import { Link } from 'react-router-dom';

interface ReviewsProps {
  limit?: number;
}

export default function Reviews({ limit }: ReviewsProps) {
  const { content } = useContentStore();
  const { reviews } = content;

  const displayedReviews = limit ? reviews.slice(0, limit) : reviews;

  return (
    <section id="reviews" className="py-24 bg-brand-soft overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-4 block"
          >
            Testimonials
          </motion.span>
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="flex text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="text-2xl font-display font-bold">4.5 / 5</span>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display mb-6"
          >
            Voices of Serenity
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-brown max-w-2xl mx-auto text-lg font-light"
          >
            Hear from our cherished clients about their transformative experiences at Esthetique Classic.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] luxury-shadow relative group"
            >
              <Quote className="absolute top-10 right-10 text-brand-soft group-hover:text-brand-gold/20 transition-colors duration-500" size={60} />
              <div className="flex text-brand-gold mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-brand-brown/90 italic mb-8 leading-relaxed text-lg font-light relative z-10">
                "{review.comment}"
              </p>
              <div className="flex items-center justify-between border-t border-brand-soft pt-6">
                <div className="flex flex-col">
                  <span className="font-display text-xl text-brand-dark">{review.name}</span>
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Verified Client</span>
                </div>
                <span className="text-[10px] text-brand-brown/40 font-bold uppercase tracking-widest">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {limit && (
          <div className="mt-16 text-center">
            <Link 
              to="/reviews" 
              className="inline-flex items-center gap-3 text-brand-dark font-bold uppercase tracking-[0.3em] text-xs hover:text-brand-gold transition-colors group"
            >
              Read All Testimonials
              <div className="w-12 h-[1px] bg-brand-gold transition-all group-hover:w-20"></div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
