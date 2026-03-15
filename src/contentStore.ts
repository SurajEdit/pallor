import { useState, useEffect } from 'react';
import { HomepageContent } from './types';

const CONTENT_STORAGE_KEY = 'kavya_homepage_content';

const defaultContent: HomepageContent = {
  hero: {
    salonName: 'Kavya',
    heading: 'Best Beauty Parlour in Badarpur',
    subheading: 'Professional makeup, skincare, and hair services trusted by 258+ happy customers. Experience luxury beauty treatments tailored just for you.',
    backgroundImage: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=2000',
    buttonText: 'Book Appointment'
  },
  services: [
    {
      id: '1',
      title: 'Bridal Makeup',
      description: 'Exquisite bridal looks for your special day, from traditional to contemporary.',
      price: 'Starting ₹5,000',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '2',
      title: 'Party Makeup',
      description: 'Stunning makeup for parties, events, and special occasions.',
      price: 'Starting ₹1,500',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '3',
      title: 'Hair Cut & Styling',
      description: 'Professional hair cuts and styling to match your personality.',
      price: 'Starting ₹300',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: '4',
      title: 'Hair Smoothening',
      description: 'Get silky, smooth, and frizz-free hair with our premium treatments.',
      price: 'Starting ₹3,000',
      image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=600',
    }
  ],
  about: {
    title: 'Why Choose Kavya Beauty Parlour',
    description: 'We combine expertise with luxury to provide an unmatched salon experience.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1000'
  },
  gallery: [
    {
      id: '1',
      title: 'Bridal Transformation',
      image: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&q=80&w=600',
      category: 'Makeup'
    },
    {
      id: '2',
      title: 'Hair Styling',
      image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600',
      category: 'Hair'
    }
  ],
  reviews: [
    {
      id: '1',
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Best beauty parlour in Badarpur. Staff is very professional and makeup quality is amazing.',
      date: '2 weeks ago'
    }
  ],
  offer: {
    title: '20% OFF on Facial & Hair Services',
    description: 'Book your appointment today and get a special discount on our premium skin and hair treatments.',
    discount: '20% OFF',
    image: '',
    isActive: true
  },
  features: {
    title: 'Why Choose Kavya Beauty Parlour',
    description: 'We combine expertise with luxury to provide an unmatched salon experience.',
    items: [
      {
        id: '1',
        title: '4.9 ⭐ Rated Salon',
        description: 'Trusted by hundreds of happy customers in Badarpur.',
        icon: 'Star'
      },
      {
        id: '2',
        title: 'Professional Beauticians',
        description: 'Highly skilled experts with years of experience.',
        icon: 'Users'
      },
      {
        id: '3',
        title: 'Premium Products',
        description: 'We use only top-tier, international beauty brands.',
        icon: 'Award'
      },
      {
        id: '4',
        title: 'Affordable Prices',
        description: 'Luxury beauty services that fit your budget.',
        icon: 'Zap'
      },
      {
        id: '5',
        title: 'Clean & Hygienic',
        description: 'Strict sanitization protocols for your safety.',
        icon: 'ShieldCheck'
      },
      {
        id: '6',
        title: 'Latest Techniques',
        description: 'Always up-to-date with modern beauty trends.',
        icon: 'Sparkles'
      }
    ]
  },
  contact: {
    address: 'E-422 Khadda Colony, Part-2, Jaitpur Extension, Badarpur, New Delhi 110044',
    phone: '+91 78369 81845',
    whatsapp: '917836981845',
    hours: 'Mon - Sun: 10:00 AM - 08:30 PM',
    mapLink: 'https://www.google.com/maps/dir/?api=1&destination=Kavya+Beauty+Parlour+Badarpur'
  },
  seo: {
    metaTitle: 'Best Beauty Parlour in Badarpur | Kavya Beauty Parlour',
    metaDescription: 'Kavya Beauty Parlour offers bridal makeup, hair styling, facials, and beauty services in Badarpur, New Delhi.',
    keywords: 'best beauty salon Badarpur, bridal makeup Delhi, skincare services Badarpur, hair styling salon'
  }
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
