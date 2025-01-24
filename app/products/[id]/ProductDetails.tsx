'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/lib/store/cart';
import { ArrowLeft, ShoppingCart, Star, Clock } from 'lucide-react';
import { PageTransition } from '@/components/animations/PageTransition';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { FadeInStagger, FadeInStaggerItem } from '@/components/animations/FadeInStagger';
import { useCurrencyStore, convertPrice } from '@/lib/store/currency';

interface Offer {
  type: 'discount' | 'bundle' | 'flash';
  discount: number;
  minQuantity?: number;
  endsAt?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  category: string;
  specs: string[];
  offers?: Offer[];
}

// Mock products data for development
const mockProducts: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Business Laptop Pro',
    description: 'High-performance laptop designed for business professionals. Features include a powerful processor, ample RAM, and a sleek design perfect for modern workspaces.',
    price: 1299,
    image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800',
    stock_quantity: 10,
    category: 'Electronics',
    specs: ['Intel Core i7', '16GB RAM', '512GB SSD', '15.6" 4K Display'],
    offers: [
      {
        type: 'flash',
        discount: 15,
        endsAt: '2024-02-01T00:00:00'
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Office Desk Premium',
    description: 'Ergonomic desk for maximum productivity',
    price: 499,
    image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800',
    stock_quantity: 10,
    category: 'Furniture',
    specs: ['Intel Core i7', '16GB RAM', '512GB SSD', '15.6" 4K Display'],
    offers: [
      {
        type: 'flash',
        discount: 15,
        endsAt: '2024-02-01T00:00:00'
      }
    ]
  },
  '3': {
    id: '3',
    name: 'Conference System',
    description: 'Complete video conferencing solution',
    price: 799,
    image_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800',
    stock_quantity: 10,
    category: 'Electronics',
    specs: ['Intel Core i7', '16GB RAM', '512GB SSD', '15.6" 4K Display'],
    offers: [
      {
        type: 'flash',
        discount: 15,
        endsAt: '2024-02-01T00:00:00'
      }
    ]
  },
  '4': {
    id: '4',
    name: 'Security Camera System',
    description: 'Advanced security monitoring system',
    price: 599,
    image_url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800',
    stock_quantity: 10,
    category: 'Security',
    specs: ['Intel Core i7', '16GB RAM', '512GB SSD', '15.6" 4K Display'],
    offers: [
      {
        type: 'flash',
        discount: 15,
        endsAt: '2024-02-01T00:00:00'
      }
    ]
  },
  '5': {
    id: '5',
    name: 'Ergonomic Office Chair',
    description: 'Premium office chair with advanced ergonomic features',
    price: 299,
    image_url: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800',
    stock_quantity: 10,
    category: 'Furniture',
    specs: ['Intel Core i7', '16GB RAM', '512GB SSD', '15.6" 4K Display'],
    offers: [
      {
        type: 'flash',
        discount: 15,
        endsAt: '2024-02-01T00:00:00'
      }
    ]
  }
};

interface ProductDetailsProps {
  id: string;
}

export default function ProductDetails({ id }: ProductDetailsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const { currentCurrency } = useCurrencyStore();

  const product = mockProducts[id as keyof typeof mockProducts];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: crypto.randomUUID(),
      product_id: product.id,
      quantity,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      },
    });

    toast({
      title: "Added to cart!",
      description: "The item has been added to your cart.",
    });
  };

  const renderOffers = (offers?: Offer[]) => {
    if (!offers || offers.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Special Offers</h3>
        <div className="space-y-3">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index }}
              className={`p-4 rounded-lg ${
                offer.type === 'flash' ? 'bg-red-50 border-red-200' :
                offer.type === 'bundle' ? 'bg-blue-50 border-blue-200' :
                'bg-green-50 border-green-200'
              } border`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold">
                    {offer.type === 'flash' ? 'Flash Sale!' :
                     offer.type === 'bundle' ? 'Bundle Offer' :
                     'Volume Discount'}
                  </span>
                  <p className="text-sm mt-1">
                    Save {offer.discount}% 
                    {offer.minQuantity ? ` when you buy ${offer.minQuantity} or more` : ''}
                  </p>
                </div>
                {offer.endsAt && (
                  <div className="text-sm text-red-600">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Limited Time
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>

          <FadeInStagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <FadeInStaggerItem>
                <ImageReveal
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                />
              </FadeInStaggerItem>

              <FadeInStaggerItem>
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  <p className="text-gray-600">{product.description}</p>
                  <div className="text-3xl font-bold text-primary">
                  {convertPrice(product.price, currentCurrency)}
                  </div>
                  
                  {renderOffers(product.offers)}

                  

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Specifications</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {product.specs.map((spec) => (
                        <li key={spec} className="text-gray-600">{spec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 border-r hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 border-l hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <Button onClick={handleAddToCart} className="flex-1">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </FadeInStaggerItem>
            </div>
          </FadeInStagger>
        </div>
      </div>
    </PageTransition>
  );
}