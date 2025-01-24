'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
  BarChart,
  ShoppingCart,
  Tag,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart },
  { name: 'Categories', href: '/admin/categories', icon: Tag },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/auth/login');
          return;
        }

        // Check if user has admin role
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError) throw profileError;

        if (!profile || profile.role !== 'admin') {
          setError('Unauthorized access');
          router.push('/');
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Admin check error:', error);
        setError('Error checking admin status');
      }
    };

    checkAdmin();
  }, [router, supabase]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{error}</h2>
          <Button onClick={() => router.push('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-white shadow-lg"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full flex items-center justify-center"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}