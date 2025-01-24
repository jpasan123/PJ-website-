'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye, Tag, Percent, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useToast } from '@/hooks/use-toast';
import { useCurrencyStore, convertPrice } from '@/lib/store/currency';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { formatTimeRemaining } from '@/lib/utils/time';

// Move offers data outside component to prevent re-creation
const offers = [
  {
    id: '1',
    type: 'flash',
    title: 'Flash Sale!',
    description: 'Limited time offer on premium office equipment',
    discount: 25,
    image_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800',
    products: [
      {
        id: 'p1',
        name: 'Ergonomic Office Chair',
        price: 499,
        discounted_price: 374,
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=400'
      },
      {
        id: 'p2',
        name: 'Standing Desk Pro',
        price: 799,
        discounted_price: 599,
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400'
      }
    ],
    endsAt: '2024-02-01T00:00:00.000Z' // Fixed date instead of dynamic
  },
  {
    id: '2',
    type: 'bundle',
    title: 'Office Starter Bundle',
    description: 'Complete office setup at an unbeatable price',
    discount: 30,
    image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800',
    products: [
      {
        id: 'p3',
        name: 'Business Laptop Pro',
        price: 1299,
        discounted_price: 909,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400'
      },
      {
        id: 'p4',
        name: 'Wireless Mouse & Keyboard',
        price: 199,
        discounted_price: 139,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=400'
      }
    ],
    endsAt: '2024-02-15T00:00:00.000Z' // Fixed date
  },
  {
    id: '3',
    type: 'clearance',
    title: 'Year-End Clearance',
    description: 'Massive discounts on selected items',
    discount: 40,
    image_url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800',
    products: [
      {
        id: 'p5',
        name: 'Security Camera System',
        price: 899,
        discounted_price: 539,
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400'
      },
      {
        id: 'p6',
        name: 'Network Storage Server',
        price: 1499,
        discounted_price: 899,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400'
      }
    ],
    endsAt: '2024-03-01T00:00:00.000Z' // Fixed date
  }
];

export default function ProductOffers() {
  const { toast } = useToast();
  const { addItem } = useCartStore();
  const { currentCurrency } = useCurrencyStore();
  const [currentOffer, setCurrentOffer] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string[]>([]);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update countdown timers
  useEffect(() => {
    if (!mounted) return;

    const updateTimers = () => {
      const times = offers.map(offer => formatTimeRemaining(offer.endsAt));
      setTimeRemaining(times);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  // Handle carousel autoplay
  useEffect(() => {
    if (!mounted || !isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, mounted]);

  const handleAddToCart = (product: any) => {
    addItem({
      id: crypto.randomUUID(),
      product_id: product.id,
      quantity: 1,
      product: {
        id: product.id,
        name: product.name,
        price: product.discounted_price,
        image_url: product.image,
      },
    });

    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-8 text-white relative overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-0 right-0 w-64 h-64 opacity-10"
          >
            <Tag className="w-full h-full" />
          </motion.div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Special Offers & Deals</h2>
            <p className="text-xl opacity-90">Exclusive savings on premium business equipment</p>
          </div>
        </motion.div>

        {/* Offers Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentOffer}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Offer Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${
                      offers[currentOffer].type === 'flash' ? 'bg-red-500' :
                      offers[currentOffer].type === 'bundle' ? 'bg-blue-500' :
                      'bg-green-500'
                    } text-white`}>
                      <Tag className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{offers[currentOffer].title}</h3>
                      <p className="text-gray-600">{offers[currentOffer].description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary">
                      {offers[currentOffer].discount}% OFF
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-5 w-5 mr-2" />
                      {timeRemaining[currentOffer] || 'Loading...'}
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {offers[currentOffer].products.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-semibold mb-2">{product.name}</h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-primary font-bold">
                              {convertPrice(product.discounted_price, currentCurrency)}
                            </div>
                            <div className="text-sm text-gray-500 line-through">
                              {convertPrice(product.price, currentCurrency)}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Main Offer Image */}
                <div className="relative h-full min-h-[400px]">
                  <img
                    src={offers[currentOffer].image_url}
                    alt={offers[currentOffer].title}
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl flex items-end p-6">
                    <Link href="/products" className="w-full">
                      <Button className="w-full bg-white/90 text-primary hover:bg-white">
                        View All Offers
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white"
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentOffer((prev) => (prev - 1 + offers.length) % offers.length);
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white"
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentOffer((prev) => (prev + 1) % offers.length);
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {offers.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentOffer ? 'w-8 bg-primary' : 'bg-gray-300'
                }`}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentOffer(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}