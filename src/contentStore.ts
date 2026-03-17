import { useState, useEffect } from 'react';
import { HomepageContent } from './types';

const CONTENT_STORAGE_KEY = 'strivenii_homepage_content';

const defaultContent: HomepageContent = {
  hero: {
    salonName: 'Strivenii Hair and Beauty Salon',
    heading: 'Best Beauty Salon in Badarpur',
    subheading: 'Professional beauty services with 4.9⭐ rating. Your destination for exquisite bridal makeup and luxury hair care in Badarpur.',
    backgroundImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=2000',
    buttonText: 'Book Your Transformation',
    buttonLink: '/booking'
  },
  services: [
    {
      id: '1',
      title: 'Advanced Hair Styling',
      description: 'From precision cuts to vibrant coloring, our stylists create looks that define your personality.',
      price: '₹800',
      duration: '45 mins',
      category: 'Hair',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '2',
      title: 'Luxury Bridal Makeup',
      description: 'Exquisite bridal artistry tailored for your special day using premium international brands.',
      price: '₹15,000',
      duration: '180 mins',
      category: 'Beauty',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '3',
      title: 'Skin Rejuvenation Facial',
      description: 'Deep cleansing and hydration treatments to restore your skin\'s natural glow.',
      price: '₹2,500',
      duration: '60 mins',
      category: 'Skin',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '4',
      title: 'Hair Smoothening & Keratin',
      description: 'Transform frizzy hair into silky smooth locks with our professional keratin treatments.',
      price: '₹4,500',
      duration: '120 mins',
      category: 'Hair',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    }
  ],
  about: {
    title: 'Strivenii: Where Beauty Meets Excellence',
    description: 'Strivenii Hair and Beauty Salon is a top-rated beauty destination in Badarpur, Delhi. With over 15 years of experience, we specialize in bridal makeup, advanced hair styling, and skin rejuvenation treatments.',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1000',
    mission: 'To empower our clients by enhancing their natural beauty through expert care and premium services.',
    vision: 'To be the most preferred hair and beauty sanctuary in Badarpur, recognized for innovation and client satisfaction.',
    hygiene: 'Your safety is our priority. We follow strict sterilization protocols and use disposable kits for all skin treatments.'
  },
  gallery: [
    {
      id: '1',
      title: 'Modern Salon Interior',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600',
      category: 'Interior'
    },
    {
      id: '2',
      title: 'Bridal Transformation',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600',
      category: 'Bridal'
    }
  ],
  reviews: [
    {
      id: '1',
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Absolutely love the hair styling here! The staff is professional and the results are always amazing.',
      date: '2 weeks ago'
    },
    {
      id: '2',
      name: 'Anjali Gupta',
      rating: 5,
      comment: 'Best salon in Badarpur. Clean, hygienic, and very friendly staff. Highly recommended.',
      date: '1 month ago'
    }
  ],
  offer: {
    title: 'New Client Special',
    description: 'Get 20% off on your first visit for any hair or skin service.',
    discount: '20% OFF',
    image: '',
    isActive: true
  },
  cta: {
    heading: 'Ready for Your Glow Up?',
    description: 'Join hundreds of happy clients in Badarpur. Book your appointment today and experience the Strivenii magic.',
    buttonText: 'Book Appointment Now',
    buttonLink: '/booking'
  },
  features: {
    title: 'The Strivenii Standard',
    description: 'Why clients trust us with their beauty needs in Badarpur.',
    items: [
      {
        id: '1',
        title: '4.9 Star Rated',
        description: 'Highly recommended by our community for consistent quality.',
        icon: 'Star'
      },
      {
        id: '2',
        title: 'Expert Stylists',
        description: 'Our team stays updated with the latest global beauty trends.',
        icon: 'Users'
      },
      {
        id: '3',
        title: 'Premium Brands',
        description: 'We use only top-tier professional products for your hair and skin.',
        icon: 'Award'
      }
    ]
  },
  contact: {
    address: 'Badarpur, New Delhi, Delhi 110044',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    hours: 'Mon - Sun: 10:00 AM - 8:00 PM',
    mapLink: 'https://goo.gl/maps/example',
    email: 'info@strivenii.com'
  },
  seo: {
    metaTitle: 'Strivenii Hair and Beauty Salon | Best Salon in Badarpur Delhi',
    metaDescription: 'Strivenii Hair and Beauty Salon offers premium hair styling, bridal makeup, and skincare in Badarpur. 4.9-star rated salon in Delhi.',
    keywords: 'Beauty Salon in Badarpur, Salon in Badarpur Delhi, Bridal Makeup Badarpur, Strivenii Hair and Beauty Salon'
  },
  blogs: [
    {
      id: '1',
      title: 'Summer Hair Care Tips',
      excerpt: 'Keep your hair healthy and hydrated during the Delhi summer with these expert tips.',
      content: 'Full blog content here...',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
      date: '2024-03-15',
      author: 'Strivenii Experts'
    }
  ]
};

export function useContentStore() {
  const [content, setContent] = useState<HomepageContent>(() => {
    const saved = localStorage.getItem(CONTENT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultContent;
  });

  useEffect(() => {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
    
    // Update document title and meta tags
    document.title = content.seo.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', content.seo.metaDescription);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = content.seo.metaDescription;
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', content.seo.keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = content.seo.keywords;
      document.head.appendChild(meta);
    }
  }, [content]);

  const updateContent = (newContent: HomepageContent) => {
    setContent(newContent);
  };

  return { content, updateContent };
}
