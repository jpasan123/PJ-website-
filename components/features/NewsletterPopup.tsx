'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, X, Gift, Bell, CheckCircle, Tag, Sparkles } from 'lucide-react';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const subscribed = localStorage.getItem('newsletter_subscribed');
    if (subscribed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    localStorage.setItem('newsletter_subscribed', 'true');
    setHasSubscribed(true);

    toast({
      title: "Successfully subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });

    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl max-w-4xl w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image Section */}
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90" />
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800"
                  alt="Business Equipment"
                  className="h-full w-full object-cover"
                />
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-10 right-10 w-20 h-20 bg-white/20 rounded-full blur-xl"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute bottom-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center p-6">
                    <Sparkles className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Premium Offers</h3>
                    <p className="text-white/90">Join our business community</p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12">
                {!hasSubscribed ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      >
                        <Tag className="h-8 w-8 text-primary" />
                      </motion.div>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          Special Welcome Offer
                        </h2>
                        <p className="text-gray-600">
                          Get 15% off your first business equipment order
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center text-gray-700">
                        <Gift className="h-5 w-5 text-primary mr-3" />
                        <span>Exclusive business discounts</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Bell className="h-5 w-5 text-primary mr-3" />
                        <span>New product alerts</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Mail className="h-5 w-5 text-primary mr-3" />
                        <span>Industry insights & tips</span>
                      </div>
                    </motion.div>

                    <motion.form
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <Input
                        type="email"
                        placeholder="Enter your business email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                        required
                      />
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      >
                        Claim Your 15% Off
                      </Button>
                      <p className="text-xs text-center text-gray-500">
                        By subscribing, you agree to receive marketing communications from us.
                      </p>
                    </motion.form>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Welcome Aboard!
                    </h3>
                    <p className="text-gray-600">
                      Your 15% discount code will be sent to your email shortly.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}