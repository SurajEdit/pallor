import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Navigation, Clock } from 'lucide-react';
import { useContentStore } from '../contentStore';

export default function Location() {
  const { content } = useContentStore();
  const { contact } = content;

  return (
    <section id="location" className="py-24 bg-brand-pink">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Visit Our Salon</h2>
              
              <div className="space-y-8 mb-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Our Address</h3>
                    <p className="text-brand-dark/70 leading-relaxed">
                      {contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Opening Hours</h3>
                    <p className="text-brand-dark/70 leading-relaxed">
                      {contact.hours}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Call Us</h3>
                    <p className="text-brand-dark/70 leading-relaxed">
                      {contact.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={contact.mapLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-gold text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Navigation size={20} />
                  Get Directions
                </a>
                <a 
                  href={`tel:${contact.phone}`} 
                  className="bg-white text-brand-dark border-2 border-brand-gold/20 px-8 py-4 rounded-full font-bold hover:bg-brand-gold hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full h-[450px] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.58123456789!2d77.3123456789!3d28.5123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce6543210:0x1234567890abcdef!2sKavya+Beauty+Parlour!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Kavya Beauty Parlour Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
