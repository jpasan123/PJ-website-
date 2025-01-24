'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trash2, CreditCard, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import { useCurrencyStore, convertPrice } from '@/lib/store/currency';

export default function CartPage() {
  const { toast } = useToast();
  const { items, removeItem, updateQuantity } = useCartStore();
  const { currentCurrency } = useCurrencyStore();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div layout className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600">
                          {convertPrice(item.product.price, currentCurrency)}
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="px-2 py-1 border rounded-l"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-t border-b">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="px-2 py-1 border rounded-r"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">
                          {convertPrice(item.product.price * item.quantity, currentCurrency)}
                        </p>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleRemoveItem(item.product_id)}
                          className="mt-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{convertPrice(subtotal, currentCurrency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : convertPrice(shipping, currentCurrency)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{convertPrice(total, currentCurrency)}</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="font-semibold">Payment Method</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full p-3 flex items-center space-x-2 border rounded-lg ${
                          paymentMethod === 'card' ? 'border-primary' : 'border-gray-200'
                        }`}
                      >
                        <CreditCard className="h-5 w-5" />
                        <span>Card Payment</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('cod')}
                        className={`w-full p-3 flex items-center space-x-2 border rounded-lg ${
                          paymentMethod === 'cod' ? 'border-primary' : 'border-gray-200'
                        }`}
                      >
                        <Truck className="h-5 w-5" />
                        <span>Cash on Delivery</span>
                      </button>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}