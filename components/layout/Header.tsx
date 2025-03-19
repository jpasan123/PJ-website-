'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Building2, ShoppingCart, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store/cart';
import { useSearchStore } from '@/lib/store/search';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { LanguageSelector } from '@/components/ui/language-selector';
import { CurrencySelector } from '@/components/ui/currency-selector';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { NotificationBell } from '@/components/ui/notification-bell';
import { UserNav } from '@/components/ui/user-nav';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'Deals', href: '/deals' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Support', href: '/help' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { items } = useCartStore();
  const { searchQuery, setSearchQuery } = useSearchStore();
  const supabase = createClientComponentClient();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
        localStorage.clear();
        router.refresh();
      } else {
        setSession(session);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);

  const checkUser = async () => {
    try {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(currentSession);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setSession(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast({
        title: "Empty Search",
        description: "Please enter a search term",
      });
      return;
    }
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const isActive = (path: string) => pathname === path;

  if (!mounted) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">Trend Mart</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href={item.href}
                  className={`text-base font-medium ${
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search Bar and Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[120px] lg:w-[160px] pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </form>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <LanguageSelector />
              <CurrencySelector />
              <ThemeToggle />
              {session && <NotificationBell />}

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                      >
                        {cartItemCount}
                      </motion.span>
                    )}
                  </Button>
                </Link>
              </motion.div>

              {session ? (
                <UserNav />
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button variant="default" asChild>
                    <Link href="/auth/login">
                      Get Started
                    </Link>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* // In the mobile menu section, add CurrencySelector after LanguageSelector */}
{/* Mobile Menu */}
{isMenuOpen && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.2 }}
    className="md:hidden py-4"
  >
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleSearch} className="flex items-center">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="ghost" size="icon" className="ml-2">
          <Search className="h-5 w-5" />
        </Button>
      </form>

      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-base font-medium px-2 py-1 ${
            isActive(item.href)
              ? 'text-primary'
              : 'text-gray-700 hover:text-primary'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          {item.name}
        </Link>
      ))}

      <div className="py-2">
        <LanguageSelector />
      </div>

      {/* Add CurrencySelector here */}
      <div className="py-2">
        <CurrencySelector />
      </div>

      <div className="flex flex-col space-y-2 pt-4">
        <Link href="/cart">
          <Button variant="outline" className="w-full relative">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </Link>
        {!session && (
          <Link href="/auth/login">
            <Button variant="default" className="w-full">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  </motion.div>
)}

      </nav>
    </motion.header>
  );
}