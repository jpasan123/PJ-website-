'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Laptop, Printer, Shield, HeadphonesIcon } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';

const categories = [
  {
    title: 'categories.computers',
    icon: Laptop,
    items: 'categories.computers_count'
  },
  {
    title: 'categories.office',
    icon: Printer,
    items: 'categories.office_count'
  },
  {
    title: 'categories.security',
    icon: Shield,
    items: 'categories.security_count'
  },
  {
    title: 'categories.accessories',
    icon: HeadphonesIcon,
    items: 'categories.accessories_count'
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
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent sm:text-4xl">
            {t('categories.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('categories.subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-hover">
                <CardContent className="p-6 text-center">
                  <category.icon className="h-12 w-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-2">{t(category.title)}</h3>
                  <p className="text-gray-600">{t(category.items)}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}