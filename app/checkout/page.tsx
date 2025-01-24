'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '@/lib/store/cart';
import { useCurrencyStore, convertPrice } from '@/lib/store/currency';
import { CreditCard, Truck, ArrowLeft } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { items, clearCart } = useCartStore();
  const { currentCurrency } = useCurrencyStore();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Validate shipping details
      if (!Object.values(shippingDetails).every(value => value.trim())) {
        throw new Error('Please fill in all shipping details');
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          paymentMethod,
          shippingDetails,
        }),
      });

      const data = await response.json();

      if (paymentMethod === 'card') {
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Stripe failed to load');

        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (error) throw error;
      } else {
        // Handle COD
        clearCart();
        toast({
          title: 'Order Placed Successfully',
          description: `Your order ID is ${data.orderId}. We'll contact you for delivery.`,
        });
        router.push('/checkout/success');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout Failed',
        description: error instanceof Error ? error.message : 'An error occurred during checkout',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => router.push('/products')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Shipping Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={shippingDetails.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={shippingDetails.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={shippingDetails.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={shippingDetails.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Method</h3>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as 'card' | 'cod')}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Card Payment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay ${convertPrice(total, currentCurrency)}`}
              </Button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg h-fit"
          >
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-4 border-b">
                  <div className="flex items-center">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">
                    {convertPrice(item.product.price * item.quantity, currentCurrency)}
                  </p>
                </div>
              ))}
              <div className="pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{convertPrice(total, currentCurrency)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}