import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Search,
  Filter,
  MoreVertical,
  Bell,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Home
} from 'lucide-react';
import { useBookingStore } from '../bookingStore';
import { useContentStore } from '../contentStore';
import HomepageEditor from '../components/HomepageEditor';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const { bookings, updateBookingStatus } = useBookingStore();
  const { content } = useContentStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo password
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-soft flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] p-12 luxury-shadow text-center"
        >
          <div className="w-20 h-20 bg-brand-dark text-brand-gold rounded-3xl flex items-center justify-center mx-auto mb-8 luxury-shadow">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-display mb-2">Admin Portal</h1>
          <p className="text-brand-brown/60 mb-10 font-light">Secure access for Strivenii Hair and Beauty Salon</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold ml-1">Access Key</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl bg-brand-soft border border-transparent focus:border-brand-gold focus:bg-white outline-none transition-all font-light"
              />
            </div>
            {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.3em] shadow-lg hover:bg-brand-gold transition-all"
            >
              Enter Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-brand-soft">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-brand-dark transition-colors"
            >
              <Home size={14} />
              Back to Website
            </Link>
          </div>

          <p className="mt-8 text-[10px] text-brand-brown/40 uppercase tracking-widest">
            Protected by Esthetique Security
          </p>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'bg-blue-50 text-blue-600' },
    { label: 'Pending Requests', value: bookings.filter(b => b.status === 'pending').length, icon: Clock, color: 'bg-amber-50 text-amber-600' },
    { label: 'Completed', value: bookings.filter(b => b.status === 'confirmed').length, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Revenue (Est.)', value: `₹${bookings.length * 2500}`, icon: TrendingUp, color: 'bg-purple-50 text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F5] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-dark text-white p-8 flex flex-col luxury-shadow z-20">
        <div className="mb-12">
          <h2 className="text-2xl font-display text-brand-gold">Strivenii</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-white/60 hover:bg-white/5 hover:text-white mb-4"
          >
            <Home size={20} className="text-brand-gold" />
            <span className="text-sm tracking-wide">Back to Website</span>
          </Link>

          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'editor', label: 'Homepage Editor', icon: LayoutDashboard },
            { id: 'services', label: 'Services', icon: Sparkles },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group ${
                activeTab === item.id 
                  ? 'bg-brand-gold text-brand-dark font-bold' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-brand-dark' : 'text-brand-gold'} />
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="mt-auto flex items-center gap-4 px-5 py-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-display mb-2 capitalize">{activeTab}</h1>
            <p className="text-brand-brown/40 text-sm font-light">Welcome back, Administrator</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="w-12 h-12 rounded-2xl bg-white luxury-shadow flex items-center justify-center text-brand-brown/60 relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-brand-gold rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl luxury-shadow">
              <div className="w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center text-brand-dark font-bold">
                A
              </div>
              <span className="text-sm font-bold text-brand-dark">Admin User</span>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] luxury-shadow group hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mb-6`}>
                      <stat.icon size={24} />
                    </div>
                    <p className="text-brand-brown/40 text-[10px] uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                    <p className="text-3xl font-display text-brand-dark">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent Bookings Table */}
              <div className="bg-white rounded-[2.5rem] luxury-shadow overflow-hidden">
                <div className="p-8 border-b border-brand-soft flex items-center justify-between">
                  <h3 className="text-xl font-display">Recent Bookings</h3>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/30" size={16} />
                      <input 
                        type="text" 
                        placeholder="Search bookings..."
                        className="pl-11 pr-6 py-3 rounded-xl bg-brand-soft text-sm outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all font-light"
                      />
                    </div>
                    <button className="p-3 rounded-xl bg-brand-soft text-brand-brown/60 hover:text-brand-gold transition-colors">
                      <Filter size={18} />
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-brand-soft/50">
                      <tr>
                        <th className="px-8 py-5 text-left text-[10px] uppercase tracking-widest text-brand-brown/40 font-bold">Customer</th>
                        <th className="px-8 py-5 text-left text-[10px] uppercase tracking-widest text-brand-brown/40 font-bold">Service</th>
                        <th className="px-8 py-5 text-left text-[10px] uppercase tracking-widest text-brand-brown/40 font-bold">Date & Time</th>
                        <th className="px-8 py-5 text-left text-[10px] uppercase tracking-widest text-brand-brown/40 font-bold">Status</th>
                        <th className="px-8 py-5 text-right text-[10px] uppercase tracking-widest text-brand-brown/40 font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-soft">
                      {bookings.slice(0, 5).map((booking) => (
                        <tr key={booking.id} className="hover:bg-brand-soft/30 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-brand-soft flex items-center justify-center text-brand-gold font-bold">
                                {booking.customerName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-brand-dark">{booking.customerName}</p>
                                <p className="text-xs text-brand-brown/40 font-light">{booking.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-sm text-brand-brown/60 font-light capitalize">{booking.service.replace('-', ' ')}</span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-sm">
                              <p className="text-brand-dark font-medium">{booking.date}</p>
                              <p className="text-brand-brown/40 text-xs font-light">{booking.time}</p>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                              booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                              booking.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                              'bg-amber-50 text-amber-600'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="p-2 text-brand-brown/30 hover:text-brand-gold transition-colors">
                              <MoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-6 bg-brand-soft/30 text-center">
                  <button 
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-brand-dark transition-colors"
                  >
                    View All Bookings
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'editor' && (
            <motion.div 
              key="editor"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <HomepageEditor />
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div 
              key="bookings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[2.5rem] luxury-shadow overflow-hidden"
            >
              <div className="p-8 border-b border-brand-soft flex items-center justify-between">
                <h3 className="text-xl font-display">All Reservations</h3>
                <div className="flex items-center gap-4">
                  <select className="px-4 py-2 rounded-xl bg-brand-soft text-sm outline-none font-light">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-brand-soft/50">
                    <tr>
                      <th className="px-8 py-5 text-left text-[10px] uppercase tracking-widest text-brand-brown/40 font-bold">Customer</th>
                      <th className="px-8 py-5 text-left text-[10px] uppercase tracking-widest text-brand-brown/40 font-bold">Service</th>
                      <th className="px-8 py-5 text-left text-[10px] uppercase tracking-widest text-brand-brown/40 font-bold">Date & Time</th>
                      <th className="px-8 py-5 text-left text-[10px] uppercase tracking-widest text-brand-brown/40 font-bold">Status</th>
                      <th className="px-8 py-5 text-right text-[10px] uppercase tracking-widest text-brand-brown/40 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-soft">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-brand-soft/30 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-soft flex items-center justify-center text-brand-gold font-bold">
                              {booking.customerName.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-brand-dark">{booking.customerName}</p>
                              <p className="text-xs text-brand-brown/40 font-light">{booking.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm text-brand-brown/60 font-light capitalize">{booking.service.replace('-', ' ')}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-sm">
                            <p className="text-brand-dark font-medium">{booking.date}</p>
                            <p className="text-brand-brown/40 text-xs font-light">{booking.time}</p>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                            booking.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                            'bg-amber-50 text-amber-600'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {booking.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                  title="Confirm"
                                >
                                  <CheckCircle2 size={18} />
                                </button>
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Cancel"
                                >
                                  <XCircle size={18} />
                                </button>
                              </>
                            )}
                            <button className="p-2 text-brand-brown/30 hover:text-brand-gold transition-colors">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
