import React from 'react';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <a href="#home" className="flex flex-col">
              <span className="text-3xl font-serif font-bold text-brand-gold tracking-wider uppercase">
                Kavya
              </span>
              <span className="text-xs tracking-[0.3em] uppercase opacity-60 -mt-1">
                Beauty Parlour
              </span>
            </a>
            <p className="text-white/60 leading-relaxed">
              Experience the finest beauty treatments in Badarpur. We specialize in bridal makeup, 
              hair styling, and rejuvenating skincare services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-6 text-brand-gold">Quick Links</h3>
            <ul className="space-y-4 text-white/60">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Book Appointment</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-6 text-brand-gold">Our Services</h3>
            <ul className="space-y-4 text-white/60">
              <li>Bridal Makeup</li>
              <li>Hair Smoothening</li>
              <li>Facial & Skin Care</li>
              <li>Manicure & Pedicure</li>
              <li>Party Makeup</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-6 text-brand-gold">Contact Us</h3>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-gold shrink-0" />
                <span>E-422 Khadda Colony, Part-2, Jaitpur Extension, Badarpur, New Delhi 110044</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-brand-gold shrink-0" />
                <span>+91 78369 81845</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-brand-gold shrink-0" />
                <span>info@kavyabeauty.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Kavya Beauty Parlour. All rights reserved.</p>
          <p className="mt-2">Designed for Luxury & Elegance.</p>
        </div>
      </div>
    </footer>
  );
}
