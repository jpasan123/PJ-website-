'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Laptop, Printer, Shield, Network, Code, Armchair, Database, Shirt, UtensilsCrossed } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { translations } from '@/lib/i18n/translations';
import Link from 'next/link';

type TranslationKey = keyof typeof translations.en;

interface Category {
  name: string;
  title: TranslationKey;
  items: TranslationKey;
  icon: React.ElementType;
  description: string;
  itemCount: string;
  image: string;
  featured: string[];
}

const categories: Category[] = [
  {
    name: 'Electronics',
    title: 'categories.computers',
    items: 'categories.computers_count',
    icon: Laptop,
    description: 'Computers, laptops, and tablets',
    itemCount: '150+ items',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800',
    featured: ['Business Laptops', 'Tablets', 'Monitors', 'Accessories']
  },
  {
    name: 'Office Equipment',
    title: 'categories.office',
    items: 'categories.office_count',
    icon: Printer,
    description: 'Printers, scanners, and copiers',
    itemCount: '100+ items',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800',
    featured: ['Printers', 'Scanners', 'Copiers', 'Paper Supplies']
  },
  {
    name: 'Security Systems',
    title: 'categories.security',
    items: 'categories.security_count',
    icon: Shield,
    description: 'CCTV, access control, and alarms',
    itemCount: '80+ items',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800',
    featured: ['CCTV Systems', 'Access Control', 'Alarms', 'Security Cameras']
  },
  {
    name: 'Networking',
    title: 'categories.computers',
    items: 'categories.computers_count',
    icon: Network,
    description: 'Routers, switches, and network equipment',
    itemCount: '120+ items',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800',
    featured: ['Routers', 'Switches', 'Network Cards', 'Cables']
  }
];

export default function Categories() {
  const { t } = useTranslation();

  return (
    <section className="py-24 gradient-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-[#6B9B4E] sm:text-4xl">
            {t('categories.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('categories.subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.name} className="card-hover">
              <CardContent className="p-6 text-center">
                <category.icon className="h-12 w-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{t(category.title)}</h3>
                <p className="text-gray-600">{t(category.items)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}