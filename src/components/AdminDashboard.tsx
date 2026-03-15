import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Filter, 
  Download, 
  Plus,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit2,
  Trash2,
  Phone,
  ChevronLeft,
  ChevronRight,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, isToday, isSameDay, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, addMonths, subMonths } from 'date-fns';
import { useBookingStore } from '../bookingStore';
import { Booking, BookingStatus } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import HomepageEditor from './HomepageEditor';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AdminDashboard() {
  const { bookings, updateBooking, deleteBooking } = useBookingStore();
  const [activeTab, setActiveTab] = useState<'list' | 'calendar' | 'content'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Stats
  const todayBookings = bookings.filter(b => isToday(parseISO(b.date)));
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const completedBookings = bookings.filter(b => b.status === 'completed');

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         b.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    const headers = ['ID', 'Customer', 'Phone', 'Service', 'Date', 'Time', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredBookings.map(b => [
        b.id,
        `"${b.customerName}"`,
        b.phone,
        `"${b.service}"`,
        b.date,
        b.time,
        b.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bookings_export_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white hidden lg:flex flex-col">
        <div className="p-8">
          <div className="flex flex-col">
            <span className="text-2xl font-serif font-bold text-brand-gold tracking-wider uppercase">Kavya</span>
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-60 -mt-1">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('list')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              activeTab === 'list' ? "bg-brand-gold text-white" : "hover:bg-white/10 text-white/60"
            )}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              activeTab === 'calendar' ? "bg-brand-gold text-white" : "hover:bg-white/10 text-white/60"
            )}
          >
            <CalendarIcon size={20} />
            Calendar
          </button>

          <div className="pt-4 pb-2 px-4">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Website Content</span>
          </div>
          
          <button 
            onClick={() => setActiveTab('content')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
              activeTab === 'content' ? "bg-brand-gold text-white" : "hover:bg-white/10 text-white/60"
            )}
          >
            <Globe size={20} />
            Homepage Editor
          </button>

          <div className="pt-4 pb-2 px-4">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">System</span>
          </div>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/10">
            <Users size={20} />
            Customers
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/10">
            <Settings size={20} />
            Settings
          </button>
        </nav>

        <div className="p-4 mt-auto">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'list' ? 'Booking Management' : activeTab === 'calendar' ? 'Appointment Calendar' : 'Website Content Editor'}
          </h1>
          {activeTab !== 'content' && (
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-brand-gold rounded-xl outline-none transition-all w-64"
                />
              </div>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
              >
                <Download size={18} />
                Export
              </button>
            </div>
          )}
        </header>

        {/* Scrollable Area */}
        <div className="flex-grow overflow-y-auto p-8">
          {activeTab === 'list' ? (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Today's Bookings" value={todayBookings.length} icon={<CalendarIcon className="text-blue-500" />} />
                <StatCard title="Pending Approval" value={pendingBookings.length} icon={<Clock className="text-orange-500" />} />
                <StatCard title="Completed" value={completedBookings.length} icon={<CheckCircle className="text-green-500" />} />
                <StatCard title="Total Customers" value={new Set(bookings.map(b => b.phone)).size} icon={<Users className="text-purple-500" />} />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                  <FilterButton active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>All</FilterButton>
                  <FilterButton active={statusFilter === 'pending'} onClick={() => setStatusFilter('pending')}>Pending</FilterButton>
                  <FilterButton active={statusFilter === 'confirmed'} onClick={() => setStatusFilter('confirmed')}>Confirmed</FilterButton>
                  <FilterButton active={statusFilter === 'completed'} onClick={() => setStatusFilter('completed')}>Completed</FilterButton>
                  <FilterButton active={statusFilter === 'cancelled'} onClick={() => setStatusFilter('cancelled')}>Cancelled</FilterButton>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Booking ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <span className="text-sm font-mono font-bold text-gray-400">{booking.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-800">{booking.customerName}</span>
                            <span className="text-xs text-gray-500">{booking.phone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{booking.service}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-800 font-medium">{format(parseISO(booking.date), 'dd MMM yyyy')}</span>
                            <span className="text-xs text-gray-500">{booking.time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={booking.status} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => { setSelectedBooking(booking); setIsViewModalOpen(true); }}
                              className="p-2 text-gray-400 hover:text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-all"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              onClick={() => { setSelectedBooking(booking); setIsEditModalOpen(true); }}
                              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => deleteBooking(booking.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredBookings.length === 0 && (
                  <div className="p-12 text-center text-gray-400">
                    No bookings found matching your criteria.
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'calendar' ? (
            <CalendarView bookings={bookings} />
          ) : (
            <HomepageEditor />
          )}
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {isViewModalOpen && selectedBooking && (
          <BookingModal 
            booking={selectedBooking} 
            onClose={() => setIsViewModalOpen(false)}
            onStatusChange={(status) => {
              updateBooking(selectedBooking.id, { status });
              setIsViewModalOpen(false);
            }}
          />
        )}
        {isEditModalOpen && selectedBooking && (
          <EditModal 
            booking={selectedBooking} 
            onClose={() => setIsEditModalOpen(false)}
            onSave={(updates) => {
              updateBooking(selectedBooking.id, updates);
              setIsEditModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number | string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-xl">
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        <span className="text-sm text-gray-500 font-medium">{title}</span>
      </div>
    </div>
  );
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-bold transition-all",
        active ? "bg-brand-gold text-white shadow-sm" : "text-gray-500 hover:text-gray-800"
      )}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles = {
    pending: "bg-orange-50 text-orange-600 border-orange-100",
    confirmed: "bg-blue-50 text-blue-600 border-blue-100",
    completed: "bg-green-50 text-green-600 border-green-100",
    cancelled: "bg-red-50 text-red-600 border-red-100"
  };

  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider", styles[status])}>
      {status}
    </span>
  );
}

function BookingModal({ booking, onClose, onStatusChange }: { booking: Booking; onClose: () => void; onStatusChange: (status: BookingStatus) => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-1 block">Booking Details</span>
              <h2 className="text-2xl font-bold text-gray-800">{booking.customerName}</h2>
            </div>
            <StatusBadge status={booking.status} />
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Service</span>
              <p className="text-gray-800 font-medium">{booking.service}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Phone</span>
              <a href={`tel:${booking.phone}`} className="text-brand-gold font-bold flex items-center gap-2">
                <Phone size={14} />
                {booking.phone}
              </a>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Date</span>
              <p className="text-gray-800 font-medium">{format(parseISO(booking.date), 'dd MMMM yyyy')}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Time Slot</span>
              <p className="text-gray-800 font-medium">{booking.time}</p>
            </div>
          </div>

          {booking.message && (
            <div className="mb-8 p-4 bg-gray-50 rounded-xl">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Special Request</span>
              <p className="text-gray-600 text-sm italic">"{booking.message}"</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {booking.status === 'pending' && (
              <button 
                onClick={() => onStatusChange('confirmed')}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                Confirm Booking
              </button>
            )}
            {booking.status === 'confirmed' && (
              <button 
                onClick={() => onStatusChange('completed')}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all"
              >
                Mark Completed
              </button>
            )}
            {booking.status !== 'cancelled' && booking.status !== 'completed' && (
              <button 
                onClick={() => onStatusChange('cancelled')}
                className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl font-bold hover:bg-red-100 transition-all"
              >
                Cancel
              </button>
            )}
            <button 
              onClick={onClose}
              className="w-full mt-2 text-gray-400 font-bold hover:text-gray-600 py-2"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function EditModal({ booking, onClose, onSave }: { booking: Booking; onClose: () => void; onSave: (updates: Partial<Booking>) => void }) {
  const [formData, setFormData] = useState({ ...booking });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Edit Booking</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1 ml-1">Customer Name</label>
              <input 
                type="text" 
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-gold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1 ml-1">Phone Number</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-gold"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1 ml-1">Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-gold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1 ml-1">Time</label>
                <input 
                  type="time" 
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-gold"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1 ml-1">Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as BookingStatus })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-gold"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button 
              onClick={() => onSave(formData)}
              className="flex-1 bg-brand-gold text-white py-3 rounded-xl font-bold hover:bg-brand-gold/90 transition-all"
            >
              Save Changes
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CalendarView({ bookings }: { bookings: Booking[] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-800">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-white rounded-lg border border-gray-200 transition-all"><ChevronLeft size={20} /></button>
          <button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg border border-gray-200 transition-all"><ChevronRight size={20} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="px-4 py-3 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {/* Padding for start of month */}
        {[...Array(startOfMonth(currentMonth).getDay())].map((_, i) => (
          <div key={`pad-${i}`} className="aspect-square border-r border-b border-gray-100 bg-gray-50/30"></div>
        ))}
        
        {days.map(day => {
          const dayBookings = bookings.filter(b => isSameDay(parseISO(b.date), day));
          return (
            <div key={day.toString()} className="aspect-square border-r border-b border-gray-100 p-2 hover:bg-gray-50 transition-colors">
              <div className={cn(
                "w-7 h-7 flex items-center justify-center text-sm font-bold rounded-full mb-1",
                isToday(day) ? "bg-brand-gold text-white" : "text-gray-400"
              )}>
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayBookings.slice(0, 3).map(b => (
                  <div key={b.id} className="text-[10px] px-1.5 py-0.5 rounded bg-brand-gold/10 text-brand-gold font-bold truncate">
                    {b.time} {b.customerName}
                  </div>
                ))}
                {dayBookings.length > 3 && (
                  <div className="text-[10px] text-gray-400 font-bold pl-1">
                    + {dayBookings.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
