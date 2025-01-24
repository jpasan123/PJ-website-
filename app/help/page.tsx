'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, FileText, MessageSquare, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function HelpPage() {
  const categories = [
    {
      icon: FileText,
      title: 'Product Documentation',
      description: 'Browse detailed guides and documentation for all our products',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat Support',
      description: 'Connect with our support team in real-time',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us directly for immediate assistance',
    },
  ];

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by logging into your account and visiting the Order History section. Each order has a unique tracking number that you can use to monitor its status.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be in their original condition and packaging. Some restrictions apply to customized items.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can calculate shipping costs at checkout.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for help..."
                className="pl-10 py-6 text-lg"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 text-center">
                  <category.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                  <Button className="mt-4">Learn More</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}