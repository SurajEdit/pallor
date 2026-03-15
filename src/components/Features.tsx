import React from 'react';
import { motion } from 'motion/react';
import { Star, Users, Award, ShieldCheck, Zap, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Star className="text-brand-gold" size={32} />,
    title: '4.9 ⭐ Rated Salon',
    description: 'Trusted by hundreds of happy customers in Badarpur.'
  },
  {
    icon: <Users className="text-brand-gold" size={32} />,
    title: 'Professional Beauticians',
    description: 'Highly skilled experts with years of experience.'
  },
  {
    icon: <Award className="text-brand-gold" size={32} />,
    title: 'Premium Products',
    description: 'We use only top-tier, international beauty brands.'
  },
  {
    icon: <Zap className="text-brand-gold" size={32} />,
    title: 'Affordable Prices',
    description: 'Luxury beauty services that fit your budget.'
  },
  {
    icon: <ShieldCheck className="text-brand-gold" size={32} />,
    title: 'Clean & Hygienic',
    description: 'Strict sanitization protocols for your safety.'
  },
  {
    icon: <Sparkles className="text-brand-gold" size={32} />,
    title: 'Latest Techniques',
    description: 'Always up-to-date with modern beauty trends.'
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-brand-pink">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Why Choose Kavya Beauty Parlour</h2>
          <p className="text-brand-dark/60 max-w-2xl mx-auto">
            We combine expertise with luxury to provide an unmatched salon experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-brand-gold/10"
            >
              <div className="mb-6 bg-brand-pink w-16 h-16 rounded-2xl flex items-center justify-center">
                {feature.icon}
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
