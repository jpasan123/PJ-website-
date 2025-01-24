'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { checkSupabaseConnection } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check connection first
      const connected = await checkSupabaseConnection();
      if (!connected) {
        throw new Error('Connection error. Please check your internet connection.');
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Reset link sent",
        description: "Please check your email for the password reset link",
      });

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);

    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send reset link",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Mail className="h-8 w-8 text-primary" />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h2>
              <p className="text-gray-600 mb-8">
                Enter your email and we'll send you a reset link
              </p>
            </motion.div>
          </div>

          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center text-sm text-primary hover:text-primary/80"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}