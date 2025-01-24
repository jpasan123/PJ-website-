'use client';

import Link from 'next/link';
import { Building2, Facebook, Twitter, Linkedin, Instagram, CreditCard, Truck, Shield, Gift, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    }
  };

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/products' },
        { name: 'Featured', href: '/products?sort=featured' },
        { name: 'New Arrivals', href: '/products?sort=new' },
        { name: 'Best Sellers', href: '/products?sort=popular' },
        { name: 'Special Offers', href: '/products?filter=sale' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Help Center', href: '/help' },
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Terms', href: '/terms' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Privacy Policy', href: '/terms' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact Support', href: '/contact' },
      ],
    },
  ];

  const features = [
    { icon: CreditCard, text: 'Secure Payment' },
    { icon: Truck, text: 'Free Shipping' },
    { icon: Shield, text: '100% Protection' },
    { icon: Gift, text: 'Special Offers' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div key={feature.text} className="flex items-center justify-center gap-2">
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-gray-300">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-800">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-4">Get updates about new products and special offers</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-gray-800 border-gray-700 text-gray-300 placeholder-gray-500 focus:border-primary"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          <div className="flex flex-col md:items-end justify-center">
            <h3 className="text-lg font-semibold mb-2 text-white">Contact Us</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>1-800-123-4567</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@commercialsmb.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center">
                <Building2 className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold text-white">Commercial SMB</span>
              </Link>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Commercial SMB. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}