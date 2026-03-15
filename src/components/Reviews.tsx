import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useContentStore } from '../contentStore';

export default function Reviews() {
  const { content } = useContentStore();
  const { reviews } = content;

  return (
    <section id="reviews" className="py-24 bg-brand-pink overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="flex text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} fill="currentColor" />
              ))}
            </div>
            <span className="text-2xl font-bold">4.9</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">What Our Customers Say</h2>
          <p className="text-brand-dark/60">Trusted by 258+ happy customers in Badarpur</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm relative"
            >
              <Quote className="absolute top-6 right-8 text-brand-gold/10" size={64} />
              <div className="flex text-brand-gold mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-brand-dark/80 italic mb-6 leading-relaxed relative z-10">
                "{review.comment}"
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">{review.name}</span>
                <span className="text-xs text-brand-dark/40">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
