'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, Gift, Bell, Star } from 'lucide-react';
import { useState } from 'react';

export default function Newsletter() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    toast({
      title: "Successfully subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail('');
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Decorative Blobs */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="absolute bottom-1/4 -right-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            {/* Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="inline-block p-3 bg-primary/10 rounded-2xl">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-lg text-gray-600">
                  Stay updated with the latest business solutions and exclusive offers
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 text-gray-600">
                  <Gift className="h-5 w-5 text-primary" />
                  <span>Exclusive deals and discounts</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Bell className="h-5 w-5 text-primary" />
                  <span>Product updates and launches</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Industry insights and tips</span>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Business Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 group"
                >
                  Subscribe Now
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-xs text-center text-gray-500">
                  By subscribing, you agree to receive marketing communications from us.
                  You can unsubscribe at any time.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}