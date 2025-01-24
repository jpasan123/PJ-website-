'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Tag, Percent } from 'lucide-react';
import { Countdown } from '@/components/ui/countdown';
import { useState } from 'react';

interface Offer {
  id: string;
  type: 'flash' | 'bundle' | 'discount';
  title: string;
  description: string;
  discount: number;
  endsAt?: string;
  minQuantity?: number;
}

// Add more realistic end times
const offers: Offer[] = [
  {
    id: '1',
    type: 'flash',
    title: 'Flash Sale!',
    description: 'Limited time offer on selected office equipment',
    discount: 25,
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
  },
  {
    id: '2',
    type: 'bundle',
    title: 'Bundle & Save',
    description: 'Buy 3 or more items and save big',
    discount: 15,
    minQuantity: 3,
    endsAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() // 48 hours from now
  },
  {
    id: '3',
    type: 'discount',
    title: 'Bulk Purchase Discount',
    description: 'Special pricing for business bulk orders',
    discount: 20,
    minQuantity: 5,
    endsAt: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString() // 72 hours from now
  }
];

export default function ProductOffers() {
  const [activeOffers, setActiveOffers] = useState(offers);

  const handleOfferExpire = (offerId: string) => {
    setActiveOffers(prev => prev.filter(offer => offer.id !== offerId));
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <Tag className="w-full h-full" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Special Offers & Deals</h2>
            <p className="text-lg opacity-90">Exclusive savings for your business needs</p>
          </div>
        </motion.div>

        {/* Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeOffers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className={`p-4 ${
                offer.type === 'flash' ? 'bg-red-500' :
                offer.type === 'bundle' ? 'bg-blue-500' :
                'bg-green-500'
              } text-white`}>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{offer.title}</span>
                  {offer.type === 'flash' && <Tag className="h-5 w-5" />}
                  {offer.type === 'bundle' && <Tag className="h-5 w-5" />}
                  {offer.type === 'discount' && <Percent className="h-5 w-5" />}
                </div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {offer.discount}% OFF
                </div>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                {offer.endsAt && (
                  <Countdown 
                    endTime={offer.endsAt} 
                    onExpire={() => handleOfferExpire(offer.id)}
                  />
                )}
                {offer.minQuantity && (
                  <div className="flex items-center text-blue-500 mt-2">
                    <Tag className="h-4 w-4 mr-1" />
                    <span className="text-sm">Min. quantity: {offer.minQuantity}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg"
        >
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
            <p className="text-amber-700">
              Limited time offers! Prices and availability are subject to change.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}