'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye, Tag, Clock } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useToast } from '@/hooks/use-toast';
import { useCurrencyStore, convertPrice } from '@/lib/store/currency';
import Link from 'next/link';
import { formatTimeRemaining } from '@/lib/utils/time';

// Mock deals data
const deals = [
  {
    id: '1',
    name: 'Premium Office Chair',
    description: 'Ergonomic design with lumbar support',
    originalPrice: 499,
    discountedPrice: 399,
    image_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800',
    category: 'Furniture',
    discount: 20,
    endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days from now
  },
  {
    id: '2',
    name: 'Wireless Conference System',
    description: '4K video conferencing solution with AI noise cancellation',
    originalPrice: 999,
    discountedPrice: 799,
    image_url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800',
    category: 'Electronics',
    discount: 20,
    endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days from now
  },
  {
    id: '3',
    name: 'Business Server Package',
    description: 'Complete server solution for small businesses',
    originalPrice: 1999,
    discountedPrice: 1499,
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800',
    category: 'Networking',
    discount: 25,
    endsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days from now
  }
];

export default function DealsPage() {
  const { toast } = useToast();
  const { addItem } = useCartStore();
  const { currentCurrency } = useCurrencyStore();

  const handleAddToCart = (product: typeof deals[0]) => {
    addItem({
      id: crypto.randomUUID(),
      product_id: product.id,
      quantity: 1,
      product: {
        id: product.id,
        name: product.name,
        price: product.discountedPrice,
        image_url: product.image_url,
      },
    });

    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Special Deals</h1>
          <p className="text-xl text-gray-600">
            Limited time offers on premium business equipment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-500 text-white">
                      <Tag className="h-4 w-4 mr-1" />
                      {product.discount}% OFF
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatTimeRemaining(product.endsAt)}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {convertPrice(product.discountedPrice, currentCurrency)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {convertPrice(product.originalPrice, currentCurrency)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}