import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Calendar, Clock, User, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { useBookingStore } from '../bookingStore';

export default function BookingForm() {
  const { addBooking } = useBookingStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBooking(formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({
      customerName: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="booking" className="py-24 bg-brand-soft">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-[3rem] overflow-hidden flex flex-col lg:flex-row luxury-shadow">
          {/* Info Side */}
          <div className="lg:w-2/5 bg-brand-dark p-12 md:p-16 text-white flex flex-col justify-center relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-4 block">
                Reservation
              </span>
              <h2 className="text-4xl md:text-5xl font-display mb-8">Book Your Sanctuary</h2>
              <p className="text-white/60 mb-12 leading-relaxed font-light text-lg">
                Your journey to rejuvenation begins here. Select your preferred service and time, and we'll prepare your sanctuary.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: Sparkles, text: 'Bespoke Wellness Experience' },
                  { icon: Clock, text: 'Flexible Scheduling' },
                  { icon: CheckCircle2, text: 'Premium Organic Products' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500">
                      <item.icon size={22} />
                    </div>
                    <span className="text-sm font-light tracking-wide">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-12 md:p-16 bg-white">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-24 h-24 bg-brand-soft text-brand-gold rounded-full flex items-center justify-center mb-8 luxury-shadow">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-4xl font-display mb-4">Request Received</h3>
                <p className="text-brand-brown/60 mb-10 max-w-md mx-auto font-light leading-relaxed">
                  Thank you for choosing Esthetique Classic. We will contact you shortly to confirm your appointment details.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-brand-gold font-bold uppercase tracking-widest text-xs hover:text-brand-dark transition-colors"
                >
                  Book another session
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-gold/40" size={18} />
                      <input 
                        required
                        type="text" 
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-brand-soft border border-transparent focus:border-brand-gold focus:bg-white outline-none transition-all font-light"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-gold/40" size={18} />
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-brand-soft border border-transparent focus:border-brand-gold focus:bg-white outline-none transition-all font-light"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold ml-1">Select Service</label>
                  <div className="relative">
                    <Sparkles className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-gold/40" size={18} />
                    <select 
                      required
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full pl-14 pr-6 py-4 rounded-2xl bg-brand-soft border border-transparent focus:border-brand-gold focus:bg-white outline-none transition-all font-light appearance-none"
                    >
                      <option value="">Choose a treatment</option>
                      <optgroup label="Massage Therapy">
                        <option value="deep-tissue">Deep Tissue Massage</option>
                        <option value="swedish">Swedish Massage</option>
                        <option value="aromatherapy">Aromatherapy</option>
                      </optgroup>
                      <optgroup label="Beauty & Skin">
                        <option value="luxury-facial">Luxury Facial Ritual</option>
                        <option value="anti-aging">Anti-Aging Treatment</option>
                        <option value="body-scrub">Organic Body Scrub</option>
                      </optgroup>
                      <optgroup label="Salon Services">
                        <option value="bridal">Bridal Artistry</option>
                        <option value="hair-styling">Hair Transformation</option>
                        <option value="nail-couture">Nail Couture</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold ml-1">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-gold/40" size={18} />
                      <input 
                        required
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-brand-soft border border-transparent focus:border-brand-gold focus:bg-white outline-none transition-all font-light"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold ml-1">Preferred Time</label>
                    <div className="relative">
                      <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-gold/40" size={18} />
                      <input 
                        required
                        type="time" 
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full pl-14 pr-6 py-4 rounded-2xl bg-brand-soft border border-transparent focus:border-brand-gold focus:bg-white outline-none transition-all font-light"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold ml-1">Special Requests</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-5 top-6 text-brand-gold/40" size={18} />
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any special requirements or preferences?"
                      rows={4}
                      className="w-full pl-14 pr-6 py-5 rounded-2xl bg-brand-soft border border-transparent focus:border-brand-gold focus:bg-white outline-none transition-all font-light resize-none"
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-dark text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-brand-gold transition-all flex items-center justify-center gap-3 group"
                >
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Confirm Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
