export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Feature {
  id: string;
  title: string;
  icon: string;
}
