export interface HomepageContent {
  hero: {
    salonName: string;
    heading: string;
    subheading: string;
    backgroundImage: string;
    buttonText: string;
  };
  services: Service[];
  about: {
    title: string;
    description: string;
    image: string;
  };
  gallery: GalleryItem[];
  reviews: Review[];
  offer: {
    title: string;
    description: string;
    discount: string;
    image: string;
    isActive: boolean;
  };
  features: {
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      description: string;
      icon: string;
    }[];
  };
  contact: {
    address: string;
    phone: string;
    whatsapp: string;
    hours: string;
    mapLink: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

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

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
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
