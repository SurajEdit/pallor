import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917836981845?text=Hello,%20I%20want%20to%20book%20a%20beauty%20service."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 bg-white text-brand-dark px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Book on WhatsApp
      </span>
    </a>
  );
}
