import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex flex-col">
          <span className="text-xl md:text-2xl font-serif font-bold text-brand-gold tracking-wider uppercase">
            Kavya
          </span>
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-80 -mt-1">
            Beauty Parlour
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium hover:text-brand-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#booking" 
            className="bg-brand-gold text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-gold/90 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <Calendar size={16} />
            Book Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium py-2 border-b border-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#booking" 
                className="bg-brand-gold text-white px-6 py-4 rounded-xl text-center font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Appointment
              </a>
              <a 
                href="tel:+917836981845" 
                className="flex items-center justify-center gap-2 text-brand-gold font-bold py-2"
              >
                <Phone size={20} />
                +91 78369 81845
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
