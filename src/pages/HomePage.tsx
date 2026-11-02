import React, { useEffect, useState } from 'react';
import { Hero } from '../components/home/Hero';
import { ExperienceHighlights } from '../components/home/ExperienceHighlights';
import { FeaturedServices } from '../components/home/FeaturedServices';
import { StylistPreview } from '../components/home/StylistPreview';
import { Testimonials } from '../components/home/Testimonials';
import { InstagramFeed } from '../components/home/InstagramFeed';
import { getServices, getStylists } from '../lib/supabase';
import { Service, Stylist } from '../types';

export const HomePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);

  useEffect(() => {
    async function loadData() {
      const [s, st] = await Promise.all([getServices(), getStylists()]);
      setServices(s);
      setStylists(st);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-0">
      <Hero />
      <ExperienceHighlights />
      <FeaturedServices services={services} />
      <StylistPreview stylists={stylists} />
      <Testimonials />
      <InstagramFeed />
    </div>
  );
};
