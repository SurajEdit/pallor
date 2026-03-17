import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Save, 
  Eye, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Layout, 
  Scissors, 
  Info, 
  Image as GalleryIcon, 
  Star, 
  Tag, 
  Phone, 
  Search,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  GripVertical
} from 'lucide-react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useContentStore } from '../contentStore';
import { HomepageContent, Service, GalleryItem, Review } from '../types';

export default function HomepageEditor() {
  const { content, updateContent } = useContentStore();
  const [activeTab, setActiveTab] = useState('hero');
  const [localContent, setLocalContent] = useState<HomepageContent>(content);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateContent(localContent);
      setIsSaving(false);
      alert('Website content published successfully!');
    }, 1000);
  };

  const updateHero = (field: keyof HomepageContent['hero'], value: string) => {
    setLocalContent({
      ...localContent,
      hero: { ...localContent.hero, [field]: value }
    });
  };

  const updateAbout = (field: keyof HomepageContent['about'], value: string) => {
    setLocalContent({
      ...localContent,
      about: { ...localContent.about, [field]: value }
    });
  };

  const updateContact = (field: keyof HomepageContent['contact'], value: string) => {
    setLocalContent({
      ...localContent,
      contact: { ...localContent.contact, [field]: value }
    });
  };

  const updateSEO = (field: keyof HomepageContent['seo'], value: string) => {
    setLocalContent({
      ...localContent,
      seo: { ...localContent.seo, [field]: value }
    });
  };

  const updateCTA = (field: keyof HomepageContent['cta'], value: string) => {
    setLocalContent({
      ...localContent,
      cta: { ...localContent.cta, [field]: value }
    });
  };

  const updateFeatures = (field: keyof HomepageContent['features'], value: any) => {
    setLocalContent({
      ...localContent,
      features: { ...localContent.features, [field]: value }
    });
  };

  const updateFeatureItem = (id: string, field: string, value: string) => {
    setLocalContent({
      ...localContent,
      features: {
        ...localContent.features,
        items: localContent.features.items.map(item => item.id === id ? { ...item, [field]: value } : item)
      }
    });
  };

  const updateOffer = (field: keyof HomepageContent['offer'], value: any) => {
    setLocalContent({
      ...localContent,
      offer: { ...localContent.offer, [field]: value }
    });
  };

  // Services Management
  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: 'New Service',
      description: 'Service description',
      price: '₹0',
      duration: '60 min',
      category: 'Hair',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600'
    };
    setLocalContent({
      ...localContent,
      services: [...localContent.services, newService]
    });
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setLocalContent({
      ...localContent,
      services: localContent.services.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const deleteService = (id: string) => {
    setLocalContent({
      ...localContent,
      services: localContent.services.filter(s => s.id !== id)
    });
  };

  // Gallery Management
  const addGalleryItem = () => {
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: 'New Image',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600',
      category: 'Hair'
    };
    setLocalContent({
      ...localContent,
      gallery: [...localContent.gallery, newItem]
    });
  };

  const updateGalleryItem = (id: string, field: keyof GalleryItem, value: string) => {
    setLocalContent({
      ...localContent,
      gallery: localContent.gallery.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const deleteGalleryItem = (id: string) => {
    setLocalContent({
      ...localContent,
      gallery: localContent.gallery.filter(item => item.id !== id)
    });
  };

  // Reviews Management
  const addReview = () => {
    const newReview: Review = {
      id: Date.now().toString(),
      name: 'Customer Name',
      rating: 5,
      comment: 'Review comment',
      date: 'Just now'
    };
    setLocalContent({
      ...localContent,
      reviews: [...localContent.reviews, newReview]
    });
  };

  const updateReview = (id: string, field: keyof Review, value: any) => {
    setLocalContent({
      ...localContent,
      reviews: localContent.reviews.map(r => r.id === id ? { ...r, [field]: value } : r)
    });
  };

  const deleteReview = (id: string) => {
    setLocalContent({
      ...localContent,
      reviews: localContent.reviews.filter(r => r.id !== id)
    });
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>, section: 'gallery' | 'hero' | 'services' | 'about') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (section === 'gallery') {
          updateGalleryItem(id, 'image', base64String);
        } else if (section === 'hero') {
          updateHero('backgroundImage', base64String);
        } else if (section === 'services') {
          updateService(id, 'image', base64String);
        } else if (section === 'about') {
          updateAbout('image', base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLocalContent((content) => {
        const oldIndex = content.services.findIndex((s) => s.id === active.id);
        const newIndex = content.services.findIndex((s) => s.id === over.id);

        return {
          ...content,
          services: arrayMove(content.services, oldIndex, newIndex),
        };
      });
    }
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: Layout },
    { id: 'services', label: 'Services', icon: Scissors },
    { id: 'features', label: 'Features', icon: Sparkles },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'gallery', label: 'Gallery', icon: GalleryIcon },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'offer', label: 'Offers', icon: Tag },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'cta', label: 'CTA Section', icon: Layout },
    { id: 'seo', label: 'SEO Settings', icon: Search },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brand-dark">Homepage Editor</h1>
          <p className="text-brand-dark/60">Customize your website content without coding</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-dark/10 hover:bg-brand-dark/5 transition-all"
          >
            <Eye size={18} />
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-brand-gold text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
          >
            <Save size={18} />
            {isSaving ? 'Publishing...' : 'Publish Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-brand-dark text-white shadow-md' 
                  : 'text-brand-dark/60 hover:bg-brand-dark/5'
              }`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Editor Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-brand-dark/5">
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Hero Section Settings</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Salon Name</label>
                    <input 
                      type="text" 
                      value={localContent.hero.salonName}
                      onChange={(e) => updateHero('salonName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Main Heading</label>
                    <input 
                      type="text" 
                      value={localContent.hero.heading}
                      onChange={(e) => updateHero('heading', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Subheading</label>
                    <textarea 
                      value={localContent.hero.subheading}
                      onChange={(e) => updateHero('subheading', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Background Image URL</label>
                    <div className="flex gap-4">
                      <input 
                        type="text" 
                        value={localContent.hero.backgroundImage}
                        onChange={(e) => updateHero('backgroundImage', e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-brand-dark/10 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                      />
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-brand-dark/10">
                        <img src={localContent.hero.backgroundImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Button Text</label>
                    <input 
                      type="text" 
                      value={localContent.hero.buttonText}
                      onChange={(e) => updateHero('buttonText', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Button Link</label>
                    <input 
                      type="text" 
                      value={localContent.hero.buttonLink}
                      onChange={(e) => updateHero('buttonLink', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Manage Services</h2>
                  <button 
                    onClick={addService}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-dark text-white text-sm font-bold hover:bg-brand-gold transition-all"
                  >
                    <Plus size={16} />
                    Add Service
                  </button>
                </div>
                
                <div className="space-y-4">
                  <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext 
                      items={localContent.services.map(s => s.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {localContent.services.map((service) => (
                        <SortableServiceItem 
                          key={service.id} 
                          service={service} 
                          updateService={updateService}
                          deleteService={deleteService}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Why Choose Us Section</h2>
                <div className="grid grid-cols-1 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Section Title</label>
                    <input 
                      type="text" 
                      value={localContent.features.title}
                      onChange={(e) => updateFeatures('title', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:border-brand-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Description</label>
                    <textarea 
                      value={localContent.features.description}
                      onChange={(e) => updateFeatures('description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:border-brand-gold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localContent.features.items.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl border border-brand-dark/10 bg-brand-beige/10">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-brand-dark/40 mb-1 uppercase">Feature Title</label>
                          <input 
                            type="text" 
                            value={item.title}
                            onChange={(e) => updateFeatureItem(item.id, 'title', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-brand-dark/10 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-brand-dark/40 mb-1 uppercase">Description</label>
                          <textarea 
                            value={item.description}
                            onChange={(e) => updateFeatureItem(item.id, 'description', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 rounded-lg border border-brand-dark/10 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-brand-dark/40 mb-1 uppercase">Icon Name</label>
                          <select 
                            value={item.icon}
                            onChange={(e) => updateFeatureItem(item.id, 'icon', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-brand-dark/10 outline-none"
                          >
                            <option value="Star">Star</option>
                            <option value="Users">Users</option>
                            <option value="Award">Award</option>
                            <option value="ShieldCheck">ShieldCheck</option>
                            <option value="Zap">Zap</option>
                            <option value="Sparkles">Sparkles</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">About Us Section</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Section Title</label>
                    <input 
                      type="text" 
                      value={localContent.about.title}
                      onChange={(e) => updateAbout('title', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:border-brand-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Description</label>
                    <textarea 
                      value={localContent.about.description}
                      onChange={(e) => updateAbout('description', e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:border-brand-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Image URL</label>
                    <div className="flex gap-4">
                      <input 
                        type="text" 
                        value={localContent.about.image}
                        onChange={(e) => updateAbout('image', e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl border border-brand-dark/10 focus:border-brand-gold outline-none"
                      />
                      <img src={localContent.about.image} alt="Preview" className="w-12 h-12 rounded-xl object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Photo Gallery</h2>
                  <button 
                    onClick={addGalleryItem}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-dark text-white text-sm font-bold hover:bg-brand-gold transition-all"
                  >
                    <Plus size={16} />
                    Add Image
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {localContent.gallery.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl border border-brand-dark/10 bg-brand-beige/10">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between">
                            <input 
                              type="text" 
                              value={item.title}
                              onChange={(e) => updateGalleryItem(item.id, 'title', e.target.value)}
                              className="w-full bg-transparent font-bold outline-none border-b border-transparent focus:border-brand-gold"
                            />
                            <button 
                              onClick={() => deleteGalleryItem(item.id)}
                              className="text-red-500 hover:bg-red-50 p-1 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <input 
                            type="text" 
                            value={item.category}
                            placeholder="Category"
                            onChange={(e) => updateGalleryItem(item.id, 'category', e.target.value)}
                            className="w-full text-xs text-brand-dark/60 bg-transparent outline-none border-b border-transparent focus:border-brand-gold"
                          />
                          <input 
                            type="text" 
                            value={item.image}
                            placeholder="Image URL"
                            onChange={(e) => updateGalleryItem(item.id, 'image', e.target.value)}
                            className="w-full text-xs text-brand-dark/40 bg-transparent outline-none border-b border-transparent focus:border-brand-gold truncate"
                          />
                          <div className="flex items-center gap-4 mt-2">
                            <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-dark text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-brand-gold transition-all">
                              <ImageIcon size={12} />
                              Upload Image
                              <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => handleImageUpload(item.id, e, 'gallery')}
                              />
                            </label>
                            <span className="text-[10px] text-brand-dark/30 font-medium">or paste URL above</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Customer Reviews</h2>
                  <button 
                    onClick={addReview}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-dark text-white text-sm font-bold hover:bg-brand-gold transition-all"
                  >
                    <Plus size={16} />
                    Add Review
                  </button>
                </div>
                
                <div className="space-y-4">
                  {localContent.reviews.map((review) => (
                    <div key={review.id} className="p-6 rounded-2xl border border-brand-dark/10 bg-brand-beige/10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-brand-dark/40 mb-1 uppercase">Customer Name</label>
                            <input 
                              type="text" 
                              value={review.name}
                              onChange={(e) => updateReview(review.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-brand-dark/10 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-brand-dark/40 mb-1 uppercase">Rating (1-5)</label>
                            <input 
                              type="number" 
                              min="1" 
                              max="5"
                              value={review.rating}
                              onChange={(e) => updateReview(review.id, 'rating', parseInt(e.target.value))}
                              className="w-full px-3 py-2 rounded-lg border border-brand-dark/10 outline-none"
                            />
                          </div>
                        </div>
                        <button 
                          onClick={() => deleteReview(review.id)}
                          className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="mb-4">
                        <label className="block text-xs font-bold text-brand-dark/40 mb-1 uppercase">Comment</label>
                        <textarea 
                          value={review.comment}
                          onChange={(e) => updateReview(review.id, 'comment', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 rounded-lg border border-brand-dark/10 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-dark/40 mb-1 uppercase">Date</label>
                        <input 
                          type="text" 
                          value={review.date}
                          onChange={(e) => updateReview(review.id, 'date', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-brand-dark/10 outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'offer' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Promotion Settings</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-brand-dark/60">Active</span>
                    <button 
                      onClick={() => updateOffer('isActive', !localContent.offer.isActive)}
                      className={`w-12 h-6 rounded-full transition-all relative ${localContent.offer.isActive ? 'bg-brand-gold' : 'bg-brand-dark/20'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${localContent.offer.isActive ? 'right-1' : 'left-1'}`}></div>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Offer Title</label>
                    <input 
                      type="text" 
                      value={localContent.offer.title}
                      onChange={(e) => updateOffer('title', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Description</label>
                    <textarea 
                      value={localContent.offer.description}
                      onChange={(e) => updateOffer('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Discount Text (e.g. 20% OFF)</label>
                    <input 
                      type="text" 
                      value={localContent.offer.discount}
                      onChange={(e) => updateOffer('discount', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Contact Details</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Address</label>
                    <textarea 
                      value={localContent.contact.address}
                      onChange={(e) => updateContact('address', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Phone Number</label>
                      <input 
                        type="text" 
                        value={localContent.contact.phone}
                        onChange={(e) => updateContact('phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">WhatsApp Number (No +)</label>
                      <input 
                        type="text" 
                        value={localContent.contact.whatsapp}
                        onChange={(e) => updateContact('whatsapp', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Business Hours</label>
                    <input 
                      type="text" 
                      value={localContent.contact.hours}
                      onChange={(e) => updateContact('hours', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Google Maps Link</label>
                    <input 
                      type="text" 
                      value={localContent.contact.mapLink}
                      onChange={(e) => updateContact('mapLink', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      value={localContent.contact.email}
                      onChange={(e) => updateContact('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cta' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Call to Action Section</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Heading</label>
                    <input 
                      type="text" 
                      value={localContent.cta.heading}
                      onChange={(e) => updateCTA('heading', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Description</label>
                    <textarea 
                      value={localContent.cta.description}
                      onChange={(e) => updateCTA('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Button Text</label>
                      <input 
                        type="text" 
                        value={localContent.cta.buttonText}
                        onChange={(e) => updateCTA('buttonText', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Button Link</label>
                      <input 
                        type="text" 
                        value={localContent.cta.buttonLink}
                        onChange={(e) => updateCTA('buttonLink', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">SEO & Meta Tags</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Meta Title</label>
                    <input 
                      type="text" 
                      value={localContent.seo.metaTitle}
                      onChange={(e) => updateSEO('metaTitle', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Meta Description</label>
                    <textarea 
                      value={localContent.seo.metaDescription}
                      onChange={(e) => updateSEO('metaDescription', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-dark/60 mb-2 uppercase tracking-wider">Keywords (Comma separated)</label>
                    <textarea 
                      value={localContent.seo.keywords}
                      onChange={(e) => updateSEO('keywords', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 md:p-12">
          <div className="bg-white w-full h-full rounded-[2rem] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-brand-beige/20">
              <h3 className="font-bold">Homepage Preview</h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-brand-dark/5 rounded-full"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="scale-90 origin-top transform">
                {/* Simplified Preview of Hero */}
                <div className="relative h-[400px] flex items-center justify-center text-center p-8 overflow-hidden">
                  <img src={localContent.hero.backgroundImage} className="absolute inset-0 w-full h-full object-cover opacity-20" />
                  <div className="absolute inset-0 bg-brand-pink/60"></div>
                  <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl font-serif font-bold mb-4">{localContent.hero.heading}</h1>
                    <p className="text-brand-dark/70 mb-6">{localContent.hero.subheading}</p>
                    <button className="bg-brand-gold text-white px-8 py-3 rounded-full font-bold">{localContent.hero.buttonText}</button>
                  </div>
                </div>
                {/* Simplified Services Preview */}
                <div className="p-12 bg-white">
                  <h2 className="text-3xl font-serif font-bold text-center mb-8">Our Services</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {localContent.services.slice(0, 4).map(s => (
                      <div key={s.id} className="border rounded-2xl p-4 flex gap-4">
                        <img src={s.image} className="w-20 h-20 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold">{s.title}</h4>
                          <p className="text-xs text-brand-dark/60">{s.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SortableServiceItem({ 
  service, 
  updateService, 
  deleteService 
}: { 
  key?: string;
  service: Service; 
  updateService: (id: string, field: keyof Service, value: string) => void;
  deleteService: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`p-6 rounded-2xl border border-brand-dark/10 bg-brand-beige/10 group relative ${isDragging ? 'shadow-2xl ring-2 ring-brand-gold' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div 
          {...attributes} 
          {...listeners}
          className="mt-8 cursor-grab active:cursor-grabbing p-2 text-brand-dark/20 hover:text-brand-gold transition-colors"
        >
          <GripVertical size={20} />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-dark/40 mb-1 uppercase">Title</label>
                <input 
                  type="text" 
                  value={service.title}
                  onChange={(e) => updateService(service.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-brand-dark/10 focus:border-brand-gold outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-dark/40 mb-1 uppercase">Price</label>
                <input 
                  type="text" 
                  value={service.price}
                  onChange={(e) => updateService(service.id, 'price', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-brand-dark/10 focus:border-brand-gold outline-none bg-white"
                />
              </div>
            </div>
            <button 
              onClick={() => deleteService(service.id)}
              className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-brand-dark/40 mb-1 uppercase">Description</label>
            <textarea 
              value={service.description}
              onChange={(e) => updateService(service.id, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-brand-dark/10 focus:border-brand-gold outline-none bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-brand-dark/40 mb-1 uppercase">Image URL</label>
            <div className="flex gap-3">
              <input 
                type="text" 
                value={service.image}
                onChange={(e) => updateService(service.id, 'image', e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-brand-dark/10 focus:border-brand-gold outline-none bg-white"
              />
              <img src={service.image} alt="Preview" className="w-10 h-10 rounded-lg object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
