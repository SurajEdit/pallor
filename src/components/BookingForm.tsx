import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';
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
    <section id="booking" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto glass-card rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
          {/* Info Side */}
          <div className="md:w-1/3 bg-brand-dark p-10 text-white flex flex-col justify-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Book Your Visit</h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Ready for your transformation? Fill out the form and we'll confirm your appointment shortly.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-sm">Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-sm">Expert Consultation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-sm">Safe & Hygienic</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:w-2/3 p-10 bg-white">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-4">Appointment Requested!</h3>
                <p className="text-brand-dark/60 mb-8">
                  Thank you, {formData.customerName}. We have received your request and will call you back at {formData.phone} to confirm the time.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-brand-gold font-bold hover:underline"
                >
                  Book another appointment
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-dark/70 ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-dark/70 ml-1">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-dark/70 ml-1">Select Service</label>
                  <select 
                    required
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all bg-white"
                  >
                    <option value="">Choose a service</option>
                    <option value="bridal">Bridal Makeup</option>
                    <option value="party">Party Makeup</option>
                    <option value="hair">Hair Cut & Styling</option>
                    <option value="smoothening">Hair Smoothening</option>
                    <option value="facial">Facial & Skin Care</option>
                    <option value="other">Other Services</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-dark/70 ml-1">Preferred Date</label>
                    <input 
                      required
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-dark/70 ml-1">Preferred Time</label>
                    <input 
                      required
                      type="time" 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-dark/70 ml-1">Special Message (Optional)</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any special requests?"
                    rows={3}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full gold-gradient text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Book Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
