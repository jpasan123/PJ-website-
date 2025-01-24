'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from '@/components/ui/search-bar';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useSearchStore } from '@/lib/store/search';
import { useState } from 'react';
import { Laptop, Printer, Shield, Network, Code, Armchair as Chair, Database, Printer as PrinterIcon, Headphones, Package, Shirt, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    name: 'Electronics',
    icon: Laptop,
    subcategories: [
      { name: 'Laptops & Computers', count: '150+ items' },
      { name: 'Mobile Devices', count: '200+ items' },
      { name: 'Tablets', count: '80+ items' },
      { name: 'Accessories', count: '300+ items' }
    ],
    featured: {
      title: 'Electronics & Technology',
      description: 'Check out our latest electronic equipment',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600',
      link: '/products?category=electronics'
    }
  },
  {
    name: 'Office Equipment',
    icon: Printer,
    subcategories: [
      { name: 'Printers & Scanners', count: '100+ items' },
      { name: 'Office Machines', count: '120+ items' },
      { name: 'Paper Supplies', count: '80+ items' },
      { name: 'Office Basics', count: '200+ items' }
    ],
    featured: {
      title: 'Office Solutions',
      description: 'Professional equipment for your workspace',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600',
      link: '/products?category=office'
    }
  },
  {
    name: 'Security Systems',
    icon: Shield,
    subcategories: [
      { name: 'CCTV Systems', count: '50+ items' },
      { name: 'Access Control', count: '40+ items' },
      { name: 'Alarms', count: '30+ items' },
      { name: 'Security Cameras', count: '80+ items' }
    ],
    featured: {
      title: 'Security Solutions',
      description: 'Protect your business with our security systems',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600',
      link: '/products?category=security'
    }
  },
  {
    name: 'Networking',
    icon: Network,
    subcategories: [
      { name: 'Routers', count: '40+ items' },
      { name: 'Switches', count: '30+ items' },
      { name: 'Network Cards', count: '25+ items' },
      { name: 'Cables', count: '100+ items' }
    ],
    featured: {
      title: 'Networking Equipment',
      description: 'Build your network infrastructure',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600',
      link: '/products?category=networking'
    }
  },
  {
    name: 'Software',
    icon: Code,
    subcategories: [
      { name: 'Business Software', count: '60+ items' },
      { name: 'Security Software', count: '40+ items' },
      { name: 'Productivity Tools', count: '50+ items' },
      { name: 'Operating Systems', count: '20+ items' }
    ],
    featured: {
      title: 'Software Solutions',
      description: 'Power your business with our software',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600',
      link: '/products?category=software'
    }
  },
  {
    name: 'Furniture',
    icon: Chair,
    subcategories: [
      { name: 'Office Chairs', count: '100+ items' },
      { name: 'Desks', count: '80+ items' },
      { name: 'Storage', count: '60+ items' },
      { name: 'Conference', count: '40+ items' }
    ],
    featured: {
      title: 'Office Furniture',
      description: 'Create a comfortable workspace',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600',
      link: '/products?category=furniture'
    }
  },
  {
    name: 'Storage',
    icon: Database,
    subcategories: [
      { name: 'Hard Drives', count: '70+ items' },
      { name: 'SSDs', count: '50+ items' },
      { name: 'NAS', count: '30+ items' },
      { name: 'USB Drives', count: '100+ items' }
    ],
    featured: {
      title: 'Storage Solutions',
      description: 'Secure and efficient data storage',
      image: 'https://images.unsplash.com/photo-1606161290889-77950cfb67d3?auto=format&fit=crop&w=600',
      link: '/products?category=storage'
    }
  },
  {
    name: 'Clothes',
    icon: Shirt,
    subcategories: [
      { name: 'Business Suits', count: '100+ items' },
      { name: 'Uniforms', count: '150+ items' },
      { name: 'Accessories', count: '200+ items' },
      { name: 'Safety Wear', count: '50+ items' }
    ],
    featured: {
      title: 'Professional Attire',
      description: 'Discover our range of business clothing',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=600',
      link: '/products?category=clothes'
    }
  },
  {
    name: 'Food',
    icon: UtensilsCrossed,
    subcategories: [
      { name: 'Pantry Supplies', count: '100+ items' },
      { name: 'Catering Services', count: '50+ items' },
      { name: 'Snacks', count: '200+ items' },
      { name: 'Beverages', count: '100+ items' }
    ],
    featured: {
      title: 'Office Food Solutions',
      description: 'Stock your office with quality food and beverages',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600',
      link: '/products?category=food'
    }
  }
];

export default function SearchSection() {
  const router = useRouter();
  const { toast } = useToast();
  const { setSearchQuery } = useSearchStore();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string, category?: string) => {
    if (!query.trim() && !category) {
      toast({
        title: "Empty Search",
        description: "Please enter a search term",
      });
      return;
    }

    setSearchQuery(query);
    const searchParams = new URLSearchParams();
    if (query.trim()) searchParams.set('search', query);
    if (category) searchParams.set('category', category);
    router.push(`/products?${searchParams.toString()}`);
  };

  return (
    <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Category Links */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center space-x-6 overflow-x-auto pb-2 scrollbar-hide"
          >
            {categories.map((category) => (
              <motion.button
                key={category.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm text-gray-600 whitespace-nowrap hover:text-primary transition-colors flex items-center gap-2"
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Hover Menu */}
          <AnimatePresence>
            {hoveredCategory && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="grid grid-cols-12 gap-6 p-6">
                  {/* Subcategories */}
                  <div className="col-span-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                    <ul className="space-y-3">
                      {categories.find(c => c.name === hoveredCategory)?.subcategories.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={`/products?category=${encodeURIComponent(sub.name)}`}
                            className="flex items-center justify-between hover:text-primary transition-colors"
                          >
                            <span>{sub.name}</span>
                            <span className="text-sm text-gray-500">{sub.count}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Featured Section */}
                  <div className="col-span-8">
                    {categories.find(c => c.name === hoveredCategory)?.featured && (
                      <div className="relative h-full">
                        <img
                          src={categories.find(c => c.name === hoveredCategory)?.featured.image}
                          alt={hoveredCategory}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-lg flex items-center">
                          <div className="p-6 text-white">
                            <h3 className="text-xl font-bold mb-2">
                              {categories.find(c => c.name === hoveredCategory)?.featured.title}
                            </h3>
                            <p className="text-sm text-white/90 mb-4">
                              {categories.find(c => c.name === hoveredCategory)?.featured.description}
                            </p>
                            <Link
                              href={categories.find(c => c.name === hoveredCategory)?.featured.link || '#'}
                              className="inline-flex items-center text-sm font-medium text-white hover:text-primary transition-colors"
                            >
                              Shop Now
                              <motion.span
                                className="ml-1"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                              >
                                →
                              </motion.span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}