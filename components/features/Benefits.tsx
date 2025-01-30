'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Code, Rocket, Shield, Users } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { motion } from 'framer-motion';

export default function Benefits() {
  const { t, mounted } = useTranslation();
  
  const benefits = [
    {
      id: 'innovative-tech',
      title: 'Innovative Technology',
      description: 'Cutting-edge web solutions using the latest technologies',
      icon: Code,
    },
    {
      id: 'rapid-development',
      title: 'Rapid Development',
      description: 'Fast and efficient project delivery with quality code',
      icon: Rocket,
    },
    {
      id: 'secure-solutions',
      title: 'Secure Solutions',
      description: 'Enterprise-grade security for your web applications',
      icon: Shield,
    },
    {
      id: 'expert-support',
      title: 'Expert Support',
      description: '24/7 dedicated technical assistance and maintenance',
      icon: Users,
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Why Choose SwiftCart UK
          </h2>
          <p className="text-xl text-gray-600">
            Your Trusted Web Development Partner
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="h-8 w-8 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}