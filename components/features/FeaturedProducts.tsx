'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/lib/store/cart';
import { useCurrencyStore, convertPrice } from '@/lib/store/currency';
import { LikeButton } from '@/components/ui/like-button';
import Link from 'next/link';

const products = [
  {
    id: '1',
    name: 'Business Laptop Pro',
    description: 'High-performance laptop designed for business professionals...',
    price: 1299,
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800',
    category: 'Electronics',
    badge: 'Best Seller'
  },
  {
    id: '2',
    name: 'Office Desk Premium',
    description: 'Ergonomic desk with adjustable height, built-in...',
    price: 499,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800',
    category: 'Furniture',
    badge: 'New Arrival'
  },
  {
    id: '3',
    name: 'Conference System Pro',
    description: 'Complete video conferencing solution with HD camera,...',
    price: 799,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800',
    category: 'Electronics',
    badge: 'Top Rated'
  },
  {
    id: '4',
    name: 'Security Camera System',
    description: 'Advanced security monitoring system with night vision...',
    price: 599,
    rating: 4.7,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800',
    category: 'Security',
    badge: 'Featured'
  },
  {
    id: '5',
    name: 'Business Laptop Pro',
    description: 'High-performance laptop designed for business professionals...',
    price: 1299,
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800',
    category: 'Electronics',
    badge: 'Best Seller'
  },
  {
    id: '6',
    name: 'Office Desk Premium',
    description: 'Ergonomic desk with adjustable height, built-in...',
    price: 499,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800',
    category: 'Furniture',
    badge: 'New Arrival'
  },
  {
    id: '7',
    name: 'Conference System Pro',
    description: 'Complete video conferencing solution with HD camera,...',
    price: 799,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800',
    category: 'Electronics',
    badge: 'Top Rated'
  },
  {
    id: '8',
    name: 'Security Camera System',
    description: 'Advanced security monitoring system with night vision...',
    price: 599,
    rating: 4.7,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800',
    category: 'Security',
    badge: 'Featured'
  }
];

export default function FeaturedProducts() {
  const { toast } = useToast();
  const { addItem } = useCartStore();
  const { currentCurrency } = useCurrencyStore();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: crypto.randomUUID(),
      product_id: product.id,
      quantity: 1,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image,
      },
    });

    toast({
      title: 'Added to cart',
      description: 'Item has been added to your cart',
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600">
            Discover our top-rated business solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary rounded-full">
                      {product.badge}
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 z-10">
                  <LikeButton productId={product.id} />
                </div>
                <div className="relative overflow-hidden aspect-w-16 aspect-h-9">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-4">
                    {convertPrice(product.price, currentCurrency)}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-10 group-hover:border-primary group-hover:text-primary transition-colors"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button 
                        size="sm"
                        className="w-full h-10 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}