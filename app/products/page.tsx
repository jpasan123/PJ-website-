'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useSearchStore } from '@/lib/store/search';
import { ShoppingCart, Eye, Tag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useToast } from '@/hooks/use-toast';
import { useCurrencyStore, convertPrice } from '@/lib/store/currency';
import Link from 'next/link';
import FeaturedProducts from '@/components/features/FeaturedProducts';
import ProductOffers from '@/components/features/ProductOffers';
import { useTranslation } from '@/lib/hooks/useTranslation';

// Define mock products data
const mockProducts = [
  {
    id: '1',
    name: 'Business Laptop Pro',
    description: 'High-performance laptop designed for business professionals',
    price: 1299,
    image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Office Desk Premium',
    description: 'Ergonomic desk for maximum productivity',
    price: 499,
    image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800',
    category: 'Furniture'
  },
  {
    id: '3',
    name: 'Conference System',
    description: 'Complete video conferencing solution',
    price: 799,
    image_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800',
    category: 'Electronics'
  },
  {
    id: '4',
    name: 'Security Camera System',
    description: 'Advanced security monitoring system',
    price: 599,
    image_url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800',
    category: 'Security'
  },
  {
    id: '5',
    name: 'Ergonomic Office Chair',
    description: 'Premium office chair with advanced ergonomic features',
    price: 299,
    image_url: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800',
    category: 'Furniture'
  }

];

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

export default function ProductsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCartStore();
  const { setSearchQuery } = useSearchStore();
  const { t } = useTranslation();
  const { currentCurrency } = useCurrencyStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Simulate API call with mock data
        const filteredProducts = searchQuery
          ? mockProducts.filter(product =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              product.category.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : mockProducts;

        setProducts(filteredProducts);
        if (searchQuery) {
          setSearchQuery(searchQuery);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, setSearchQuery, toast]);

  const handleAddToCart = (product: Product) => {
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
      title: t('cart.added_title'),
      description: t('cart.added_description'),
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white text-center"
          >
            {searchQuery ? `Search Results for "${searchQuery}"` : t('products.featured_title')}
          </motion.h1>
        </div>
      </div>

      <ProductOffers />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={item}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <motion.img
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="text-2xl font-bold text-indigo-600 mb-4">
                    {convertPrice(product.price, currentCurrency)}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => router.push(`/products/${product.id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {t('products.view_details')}
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {t('products.add_to_cart')}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('products.no_results')}
            </h2>
            <p className="text-gray-600 mb-8">{t('products.try_different')}</p>
            <Link href="/products">
              <Button>{t('products.view_all')}</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}