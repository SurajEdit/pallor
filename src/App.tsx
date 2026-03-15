/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
import AdminDashboard from './components/AdminDashboard';
import { motion } from 'motion/react';

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
          <Services />
          <Features />
          <Gallery />
          <Reviews />
          <Offer />
          <BookingForm />
          <Location />
        </motion.div>
      </main>

      <Footer />
      <WhatsAppButton />

      {/* Admin Link (Hidden/Subtle) */}
      <div className="fixed bottom-4 left-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
        <Link to="/admin" className="text-[10px] text-brand-dark font-bold uppercase tracking-widest">Admin</Link>
      </div>

      {/* Sticky Mobile Booking Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-40 flex gap-3">
        <a 
          href="#booking" 
          className="flex-1 gold-gradient text-white py-3 rounded-xl font-bold text-center shadow-lg"
        >
          Book Appointment
        </a>
        <a 
          href="tel:+917836981845" 
          className="w-14 h-14 bg-brand-dark text-white rounded-xl flex items-center justify-center shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
