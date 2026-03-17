import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '917400276929';
  const message = 'Hello Esthetique Classic! I would like to inquire about your services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
      <div className="relative w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300">
        <MessageCircle size={32} fill="currentColor" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 bg-white text-brand-dark px-4 py-2 rounded-xl text-xs font-bold luxury-shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us
        </div>
      </div>
    </a>
  );
}
