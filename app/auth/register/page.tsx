'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Phone, MessageSquare, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration successful!",
        description: "Welcome to Commercial SMB",
      });
      router.push('/auth/login');
    }, 1500);
  };

  const benefits = [
    'Access to exclusive deals',
    'Personalized recommendations',
    'Priority customer support',
    'Regular newsletter updates'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Quick Actions */}
      <div className="fixed top-4 right-4 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-white/90 p-3 rounded-full shadow-lg"
        >
          <Search className="h-5 w-5 text-purple-600" />
        </motion.button>
        <motion.a
          href="tel:1800123456"
          whileHover={{ scale: 1.05 }}
          className="bg-white/90 p-3 rounded-full shadow-lg"
        >
          <Phone className="h-5 w-5 text-purple-600" />
        </motion.a>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-white/90 p-3 rounded-full shadow-lg"
          onClick={() => {
            toast({
              title: "Chat Support",
              description: "Connecting you to our support team...",
            });
          }}
        >
          <MessageSquare className="h-5 w-5 text-purple-600" />
        </motion.button>
      </div>

      <div className="max-w-4xl w-full flex gap-8">
        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block w-1/2 text-white space-y-6 p-8"
        >
          <h2 className="text-3xl font-bold">Join Our Community</h2>
          <p className="text-lg">Unlock premium features and exclusive benefits</p>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="h-6 w-6 text-white" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-1/2"
        >
          <div className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="font-medium text-purple-600 hover:text-purple-500">
                  Sign in
                </Link>
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      required
                      className="auth-input mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input
                      type="email"
                      required
                      className="auth-input mt-1"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Next
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Input
                      type="password"
                      required
                      className="auth-input mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      required
                      className="auth-input mt-1"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I agree to the terms and conditions
                    </label>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="w-full"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating account...' : 'Create account'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}