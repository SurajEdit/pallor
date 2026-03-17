import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Award, Heart, Clock, Leaf } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: "Certified Experts",
    description: "Our therapists are internationally certified with years of experience in luxury wellness."
  },
  {
    icon: Sparkles,
    title: "Premium Products",
    description: "We exclusively use high-end, organic products from world-renowned beauty brands."
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized as one of Mumbai's top-rated spa and salon destinations since 2015."
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Every treatment is tailored to your unique skin type and wellness goals."
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Open 7 days a week to accommodate your busy lifestyle and self-care needs."
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Committed to sustainability with zero-waste practices and natural treatments."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-6xl font-display mb-6">The Strivenii Difference</h2>
          <p className="text-brand-brown/60 font-light leading-relaxed">
            We combine ancient wisdom with modern technology to provide an unparalleled wellness experience that rejuvenates your body, mind, and soul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-10 rounded-[2.5rem] bg-brand-soft hover:bg-brand-dark transition-all duration-500 luxury-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-brand-gold mb-8 group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 luxury-shadow">
                <feature.icon size={28} />
              </div>
              <h3 className="text-2xl font-display mb-4 group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-brand-brown/60 font-light leading-relaxed group-hover:text-white/60 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
