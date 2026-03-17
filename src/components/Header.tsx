import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useContentStore } from '../contentStore';

export default function Header() {
  const { content } = useContentStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-brand-beige/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex flex-col group">
          <span className="text-2xl md:text-3xl font-display font-medium text-brand-dark tracking-widest uppercase transition-colors group-hover:text-brand-gold">
            Strivenii
          </span>
          <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase opacity-60 -mt-1 font-sans">
            Hair & Beauty Salon
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-xs uppercase tracking-widest font-semibold transition-all hover:text-brand-gold ${
                isActive(link.path) ? 'text-brand-gold' : 'text-brand-dark/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/book" 
            className="gold-gradient text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg flex items-center gap-2"
          >
            <Calendar size={14} />
            Book Now
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-brand-dark p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-beige z-[60] lg:hidden"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-12">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col">
                  <span className="text-2xl font-display font-medium text-brand-dark tracking-widest uppercase">
                    Strivenii
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase opacity-60 font-sans">
                    Hair & Beauty Salon
                  </span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col space-y-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    className={`text-2xl font-display transition-colors ${
                      isActive(link.path) ? 'text-brand-gold' : 'text-brand-dark'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-6">
                <Link 
                  to="/book" 
                  className="block w-full gold-gradient text-white py-5 rounded-2xl text-center font-bold uppercase tracking-widest shadow-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Appointment
                </Link>
                <a 
                  href={`tel:${content.contact.phone}`} 
                  className="flex items-center justify-center gap-3 text-brand-dark font-medium py-2"
                >
                  <Phone size={20} className="text-brand-gold" />
                  {content.contact.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
