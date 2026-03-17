/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Offer from './components/Offer';
import BookingForm from './components/BookingForm';
import Location from './components/Location';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CTA from './components/CTA';
import AdminDashboard from './pages/AdminDashboard';
import AboutSection from './components/AboutSection';
import { useContentStore } from './contentStore';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-white">
      <Header />
      <main>
        <Hero />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Services limit={4} />
          <AboutSection />
          <Features />
          <Gallery limit={6} />
          <CTA />
          <Reviews limit={3} />
          <Offer />
          <BookingForm />
          <Location />
        </motion.div>
      </main>
      <Footer />
      <WhatsAppButton />
      <AdminLink />
      <MobileBookingBar />
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <PageWrapper>
          <AboutSection />
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-12">
                <div className="p-10 rounded-[2.5rem] bg-brand-soft luxury-shadow">
                  <h3 className="text-2xl font-display mb-4">Our Vision</h3>
                  <p className="text-brand-brown font-light leading-relaxed">To be the most trusted luxury wellness destination, where every visit is a journey of transformation.</p>
                </div>
                <div className="p-10 rounded-[2.5rem] bg-brand-soft luxury-shadow">
                  <h3 className="text-2xl font-display mb-4">Our Values</h3>
                  <p className="text-brand-brown font-light leading-relaxed">Excellence, Integrity, and Compassion. We treat every client with the utmost respect and care.</p>
                </div>
                <div className="p-10 rounded-[2.5rem] bg-brand-soft luxury-shadow">
                  <h3 className="text-2xl font-display mb-4">Our Team</h3>
                  <p className="text-brand-brown font-light leading-relaxed">Our therapists are internationally trained and dedicated to providing personalized care for your unique needs.</p>
                </div>
              </div>
            </div>
          </section>
        </PageWrapper>
      </main>
      <Footer />
      <WhatsAppButton />
      <AdminLink />
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <PageWrapper>
          <Services />
        </PageWrapper>
      </main>
      <Footer />
      <WhatsAppButton />
      <AdminLink />
    </div>
  );
}

function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <PageWrapper>
          <Gallery />
        </PageWrapper>
      </main>
      <Footer />
      <WhatsAppButton />
      <AdminLink />
    </div>
  );
}

function ReviewsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <PageWrapper>
          <Reviews />
        </PageWrapper>
      </main>
      <Footer />
      <WhatsAppButton />
      <AdminLink />
    </div>
  );
}

function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <PageWrapper>
          <Location />
          <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-display mb-6">Send Us a Message</h2>
                <p className="text-brand-brown font-light">Have a question or want to discuss a custom package? We're here to help.</p>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" placeholder="Your Name" className="bg-brand-soft p-5 rounded-2xl outline-none border border-transparent focus:border-brand-gold transition-all" />
                <input type="email" placeholder="Your Email" className="bg-brand-soft p-5 rounded-2xl outline-none border border-transparent focus:border-brand-gold transition-all" />
                <input type="tel" placeholder="Phone Number" className="bg-brand-soft p-5 rounded-2xl outline-none border border-transparent focus:border-brand-gold transition-all" />
                <select className="bg-brand-soft p-5 rounded-2xl outline-none border border-transparent focus:border-brand-gold transition-all">
                  <option>General Inquiry</option>
                  <option>Custom Package</option>
                  <option>Feedback</option>
                </select>
                <textarea placeholder="Your Message" className="bg-brand-soft p-5 rounded-2xl outline-none border border-transparent focus:border-brand-gold transition-all md:col-span-2 h-40"></textarea>
                <button className="bg-brand-dark text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-brand-gold transition-all md:col-span-2">Send Message</button>
              </form>
            </div>
          </section>
        </PageWrapper>
      </main>
      <Footer />
      <WhatsAppButton />
      <AdminLink />
    </div>
  );
}

function BookingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <PageWrapper>
          <BookingForm />
        </PageWrapper>
      </main>
      <Footer />
      <WhatsAppButton />
      <AdminLink />
    </div>
  );
}

function AdminLink() {
  return (
    <div className="fixed bottom-4 left-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
      <Link to="/admin" className="text-[10px] text-brand-dark font-bold uppercase tracking-widest">Admin</Link>
    </div>
  );
}

function MobileBookingBar() {
  const { content } = useContentStore();
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-40 flex gap-3">
      <Link 
        to="/book" 
        className="flex-1 gold-gradient text-white py-3 rounded-xl font-bold text-center shadow-lg"
      >
        Book Appointment
      </Link>
      <a 
        href={`tel:${content.contact.phone}`} 
        className="w-14 h-14 bg-brand-dark text-white rounded-xl flex items-center justify-center shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}
