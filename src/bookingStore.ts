import { useState, useEffect } from 'react';
import { Booking } from './types';

const STORAGE_KEY = 'kavya_bookings';

// Mock initial data
const initialBookings: Booking[] = [
  {
    id: 'BK-001',
    customerName: 'Priya Sharma',
    phone: '9876543210',
    service: 'Bridal Makeup',
    date: '2026-03-15',
    time: '10:00',
    message: 'Looking for a traditional look.',
    status: 'confirmed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'BK-002',
    customerName: 'Anjali Singh',
    phone: '9988776655',
    service: 'Hair Smoothening',
    date: '2026-03-16',
    time: '14:30',
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 'BK-003',
    customerName: 'Meena Kumari',
    phone: '9122334455',
    service: 'Facial & Skin Care',
    date: '2026-03-15',
    time: '16:00',
    status: 'completed',
    createdAt: new Date().toISOString()
  }
];

export function useBookingStore() {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialBookings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `BK-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  return { bookings, addBooking, updateBooking, deleteBooking, updateBookingStatus };
}
