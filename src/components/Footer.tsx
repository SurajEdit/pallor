import React from 'react';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContentStore } from '../contentStore';

export default function Footer() {
  const { content } = useContentStore();
  const { contact } = content;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex flex-col group" onClick={scrollToTop}>
              <span className="text-3xl font-display font-bold text-brand-gold tracking-widest uppercase group-hover:text-white transition-colors">
                Strivenii
              </span>
              <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 -mt-1 group-hover:text-brand-gold transition-colors">
                Hair & Beauty Salon
              </span>
            </Link>
            <p className="text-white/50 leading-relaxed font-light text-sm">
              Your premier beauty destination in Badarpur, Delhi. We are dedicated to the art of hair and skin care, 
              offering bespoke treatments that bring out your natural radiance.
            </p>
            <div className="flex space-x-5">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all duration-500 group"
                >
                  <social.icon size={18} className="text-white/60 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-brand-gold">Navigation</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Reviews', path: '/reviews' },
                { name: 'Book Now', path: '/book' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/50 hover:text-brand-gold transition-colors text-sm font-light flex items-center gap-2 group"
                    onClick={scrollToTop}
                  >
                    <div className="w-0 h-[1px] bg-brand-gold transition-all group-hover:w-4"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-brand-gold">Our Services</h3>
            <ul className="space-y-4">
              {[
                'Advanced Hair Styling',
                'Luxury Bridal Makeup',
                'Skin Rejuvenation',
                'Hair Smoothening',
                'Keratin Treatments',
                'Global Hair Coloring'
              ].map((service) => (
                <li key={service} className="text-white/50 text-sm font-light flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-brand-gold/30"></div>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-brand-gold">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                  <MapPin size={18} />
                </div>
                <span className="text-white/50 text-sm font-light leading-relaxed">
                  {contact.address}
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                  <Phone size={18} />
                </div>
                <span className="text-white/50 text-sm font-light">
                  {contact.phone}
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                  <Mail size={18} />
                </div>
                <span className="text-white/50 text-sm font-light">
                  {contact.email}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">
            © {new Date().getFullYear()} Strivenii Hair and Beauty Salon. All rights reserved.
          </p>
          <div className="flex gap-8 text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all group"
          >
            <ArrowUp size={18} className="text-white/40 group-hover:text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
}
