'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import { User, Settings, CreditCard, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        router.push('/auth/login');
        return;
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router, supabase.auth]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const menuItems = [
    { icon: User, label: 'Profile', href: '/account/profile' },
    { icon: ShoppingBag, label: 'Orders', href: '/account/orders' },
    { icon: CreditCard, label: 'Billing', href: '/account/billing' },
    { icon: Settings, label: 'Settings', href: '/account/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}