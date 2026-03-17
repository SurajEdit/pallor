import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Navigation, Clock, Mail } from 'lucide-react';
import { useContentStore } from '../contentStore';

export default function Location() {
  const { content } = useContentStore();
  const { contact } = content;

  return (
    <section id="location" className="py-24 bg-brand-soft">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-4 block">
                Find Us
              </span>
              <h2 className="text-4xl md:text-6xl font-display mb-12">Visit Our Salon</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-gold shrink-0 luxury-shadow">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Our Address</h3>
                    <p className="text-brand-brown leading-relaxed font-light">
                      {contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-gold shrink-0 luxury-shadow">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Opening Hours</h3>
                    <p className="text-brand-brown leading-relaxed font-light whitespace-pre-line">
                      {contact.hours}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-gold shrink-0 luxury-shadow">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Call Us</h3>
                    <p className="text-brand-brown leading-relaxed font-light">
                      {contact.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-gold shrink-0 luxury-shadow">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-2">Email Us</h3>
                    <p className="text-brand-brown leading-relaxed font-light">
                      {contact.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href={contact.mapLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-dark text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-brand-gold transition-all flex items-center justify-center gap-3 group"
                >
                  <Navigation size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Get Directions
                </a>
                <a 
                  href={`tel:${contact.phone}`} 
                  className="bg-white text-brand-dark border border-brand-dark/10 px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:border-brand-gold hover:text-brand-gold transition-all flex items-center justify-center gap-3"
                >
                  <Phone size={18} />
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full h-[550px] rounded-[3rem] overflow-hidden luxury-shadow border-[12px] border-white relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.2123456789!2d72.823456789!3d18.9123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c123456789:0x1234567890abcdef!2sEsthetique+Classic+Spa+%26+Salon!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Strivenii Hair and Beauty Salon Location"
              className="grayscale group-hover:grayscale-0 transition-all duration-1000"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
