import React, { useState } from 'react';
import { X, Sparkles, Plus, Check } from 'lucide-react';
import { Service, ServiceCategory } from '../../types';
import { supabase } from '../../lib/supabase';
import { Button } from '../common/Button';

interface ServiceManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSaved: () => void;
  serviceToEdit?: Service | null;
}

const CATEGORIES: ServiceCategory[] = [
  'Hair Styling',
  'Hair Spa & Treatments',
  'Skin & Facials',
  'Bridal & Makeup',
  'Groom Grooming',
  'Nail Art',
];

export const ServiceManagerModal: React.FC<ServiceManagerModalProps> = ({
  isOpen,
  onClose,
  onServiceSaved,
  serviceToEdit,
}) => {
  const [name, setName] = useState(serviceToEdit?.name || '');
  const [category, setCategory] = useState<ServiceCategory>(serviceToEdit?.category || 'Hair Styling');
  const [price, setPrice] = useState(serviceToEdit?.price?.toString() || '2500');
  const [duration, setDuration] = useState(serviceToEdit?.duration_mins?.toString() || '60');
  const [description, setDescription] = useState(serviceToEdit?.description || '');
  const [imageUrl, setImageUrl] = useState(
    serviceToEdit?.image_url ||
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
  );
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (serviceToEdit) {
        // Update in Supabase
        await supabase
          .from('services')
          .update({
            name,
            category,
            price: parseFloat(price),
            duration_mins: parseInt(duration),
            description,
            image_url: imageUrl,
          })
          .eq('id', serviceToEdit.id);
      } else {
        // Insert new in Supabase
        await supabase.from('services').insert([
          {
            name,
            category,
            price: parseFloat(price),
            duration_mins: parseInt(duration),
            description,
            image_url: imageUrl,
          },
        ]);
      }
      onServiceSaved();
      onClose();
    } catch (err) {
      console.warn('Service save note:', err);
      onServiceSaved();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-luxury-dark border border-gold-500/30 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-cinzel text-xl font-bold tracking-wider text-white mb-1">
          {serviceToEdit ? 'Edit Service & Pricing' : 'Add New Salon Ritual'}
        </h3>
        <p className="text-xs text-gold-400 mb-6 uppercase tracking-wider">
          Syncs with Supabase database catalog
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase tracking-wider text-gray-300 mb-1">
              Service Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Diamond Keratin Gloss"
              className="w-full bg-luxury-card border border-luxury-subtle px-3 py-2 text-white focus:outline-none focus:border-gold-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-gray-300 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full bg-luxury-card border border-luxury-subtle px-3 py-2 text-white focus:outline-none focus:border-gold-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block uppercase tracking-wider text-gray-300 mb-1">
                Price (INR ₹) *
              </label>
              <input
                type="number"
                required
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-luxury-card border border-luxury-subtle px-3 py-2 text-white focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase tracking-wider text-gray-300 mb-1">
                Duration (Minutes) *
              </label>
              <input
                type="number"
                required
                min={15}
                step={5}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-luxury-card border border-luxury-subtle px-3 py-2 text-white focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-gray-300 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-luxury-card border border-luxury-subtle px-3 py-2 text-white focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the treatment protocol and ingredients..."
              className="w-full bg-luxury-card border border-luxury-subtle p-3 text-white focus:outline-none focus:border-gold-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" size="md" isLoading={loading}>
              Save to Supabase
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
