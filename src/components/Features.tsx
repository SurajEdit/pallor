import React from 'react';
import { motion } from 'motion/react';
import { Star, Users, Award, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { useContentStore } from '../contentStore';

const iconMap: Record<string, React.ReactNode> = {
  Star: <Star className="text-brand-gold" size={32} />,
  Users: <Users className="text-brand-gold" size={32} />,
  Award: <Award className="text-brand-gold" size={32} />,
  ShieldCheck: <ShieldCheck className="text-brand-gold" size={32} />,
  Zap: <Zap className="text-brand-gold" size={32} />,
  Sparkles: <Sparkles className="text-brand-gold" size={32} />,
};

export default function Features() {
  const { content } = useContentStore();
  const { title, description, items } = content.features;

  return (
    <section className="py-24 bg-brand-pink">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">{title}</h2>
          <p className="text-brand-dark/60 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-brand-gold/10"
            >
              <div className="mb-6 bg-brand-pink w-16 h-16 rounded-2xl flex items-center justify-center">
                {iconMap[feature.icon] || <Sparkles className="text-brand-gold" size={32} />}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-brand-dark/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
