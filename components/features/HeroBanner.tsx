'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920',
    alt: 'Business Equipment'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920',
    alt: 'Modern Office'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920',
    alt: 'Meeting Room'
  },
  {
    url: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1920',
    alt: 'Tech Office'
  }
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Images with Carousel */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          {/* Updated gradient overlay with brand colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-teal/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-black/10 z-5" /> {/* Subtle darkening overlay */}
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 z-20 p-3 rounded-full bg-white/30 text-white hover:bg-white/40 transition-colors backdrop-blur-sm"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 z-20 p-3 rounded-full bg-white/30 text-white hover:bg-white/40 transition-colors backdrop-blur-sm"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Business Equipment & Solutions
              <span className="block text-3xl md:text-4xl mt-4 text-white/90">
                For Modern Enterprises
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl drop-shadow">
              Equip your business with premium products and cutting-edge solutions for enhanced productivity and growth
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/products">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-white/90 backdrop-blur-sm text-brand-navy hover:bg-white shadow-lg"
                  >
                    Shop Now
                    <ShoppingBag className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/products">
                    <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto backdrop-blur-sm"
                    >
                    <span className="opacity-100">View Catalog</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {[
              { label: 'Products', value: '1000+' },
              { label: 'Customers', value: '50k+' },
              { label: 'Countries', value: '25+' },
              { label: 'Support', value: '24/7' },
            ].map((stat) => (
              <div key={stat.label} className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-white mb-1 drop-shadow">{stat.value}</div>
                <div className="text-sm text-white/90">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent z-10" />
    </div>
  );
}