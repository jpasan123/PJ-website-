'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useToast } from '@/hooks/use-toast';
import { useCurrencyStore, convertPrice } from '@/lib/store/currency';
import Link from 'next/link';

// Mock new arrivals data
const newArrivals = [
  {
    id: '1',
    name: 'Pro Office Desk',
    description: 'Ergonomic standing desk with electric height adjustment',
    price: 699,
    image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800',
    category: 'Furniture'
  },
  {
    id: '2',
    name: 'Smart Security Camera',
    description: 'AI-powered security camera with 4K resolution',
    price: 299,
    image_url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800',
    category: 'Security'
  },
  {
    id: '3',
    name: 'Business Laptop Pro',
    description: 'Latest generation business laptop with enhanced security',
    price: 1499,
    image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800',
    category: 'Electronics'
  }
];

export default function NewArrivalsPage() {
  const { toast } = useToast();
  const { addItem } = useCartStore();
  const { currentCurrency } = useCurrencyStore();

  const handleAddToCart = (product: typeof newArrivals[0]) => {
    addItem({
      id: crypto.randomUUID(),
      product_id: product.id,
      quantity: 1,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h1>
          <p className="text-xl text-gray-600">
            Discover our latest business equipment and solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newArrivals.map((product, index) => (
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full">
                      New Arrival
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="text-2xl font-bold text-primary mb-4">
                    {convertPrice(product.price, currentCurrency)}
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