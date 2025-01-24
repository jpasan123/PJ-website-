'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        // Check if user is admin (either by email or role)
        if (data.user.email === 'selvampj86@gmail.com') {
          toast({
            title: "Login successful",
            description: "Welcome to the admin panel",
          });
          router.push('/admin');
          router.refresh();
        } else {
          // Not an admin, sign out and show error
          await supabase.auth.signOut();
          throw new Error('Unauthorized access');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials or unauthorized access",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) throw error;

    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: "Login failed",
        description: "Could not connect to Google. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
            <p className="mt-2 text-gray-600">
              Sign in to access the admin panel
            </p>
          </div>

          <div className="space-y-6">
            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-12 text-lg"
              disabled={isLoading}
            >
              <FcGoogle className="h-6 w-6" />
              Sign in with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <p className="text-sm text-center text-gray-500">
              Only authorized administrators can access this panel
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}