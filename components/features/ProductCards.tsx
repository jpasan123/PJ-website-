'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const products = [
  {
    title: 'Business Current Account',
    price: 'Free',
    features: [
      'No minimum balance',
      'Free digital banking',
      'Instant payments',
      'Mobile app access',
    ],
  },
  {
    title: 'Business Growth Account',
    price: '$19/month',
    features: [
      'All Basic features',
      'Advanced analytics',
      'Multi-user access',
      'Priority support',
    ],
    featured: true,
  },
  {
    title: 'Enterprise Solution',
    price: 'Custom',
    features: [
      'All Growth features',
      'API integration',
      'Dedicated manager',
      'Custom solutions',
    ],
  },
];

const ProductCards = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Banking Solutions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the perfect plan for your business needs
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product) => (
            <Card 
              key={product.title}
              className={`relative ${
                product.featured ? 'border-primary shadow-xl' : 'border-gray-200'
              }`}
            >
              {product.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm rounded-full">
                  Popular Choice
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{product.title}</CardTitle>
                <p className="text-3xl font-bold mt-4">{product.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={product.featured ? 'default' : 'outline'}>
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;