'use client';

import React from 'react';
import { PageTransition } from '@/components/animations/PageTransition';
import { FadeInStagger } from '@/components/animations/FadeInStagger';
import { AnimateInView } from '@/components/animations/AnimateInView';
import HeroBanner from '@/components/features/HeroBanner';
import SearchSection from '@/components/features/SearchSection';
import ProductOffers from '@/components/features/ProductOffers';
import FeaturedProducts from '@/components/features/FeaturedProducts';
import Categories from '@/components/features/Categories';
import Services from '@/components/features/Services';
import Benefits from '@/components/features/Benefits';
import Testimonials from '@/components/features/Testimonials';
import Newsletter from '@/components/features/Newsletter';

export default function Home() {
  return (
    <PageTransition>
      <HeroBanner />
      <SearchSection />
      <ProductOffers />
      <FeaturedProducts />
      <Categories />
      <Services />
      <Benefits />
      <Testimonials />
      <Newsletter />
    </PageTransition>
  );
}