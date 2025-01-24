'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear cart and any checkout-related state here
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle className="h-10 w-10 text-green-500" />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We'll send you an email with your order details and tracking information.
        </p>

        <div className="space-y-4">
          <Link href="/products">
            <Button className="w-full">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}