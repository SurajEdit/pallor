export interface HomepageContent {
  hero: {
    salonName: string;
    heading: string;
    subheading: string;
    backgroundImage: string;
    buttonText: string;
    buttonLink: string;
  };
  services: Service[];
  about: {
    title: string;
    description: string;
    image: string;
    mission: string;
    vision: string;
    hygiene: string;
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
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
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
    email: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  blogs: BlogPost[];
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
  duration: string;
  category: 'Hair' | 'Beauty' | 'Skin';
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: 'Interior' | 'Hair' | 'Beauty' | 'Bridal';
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}
