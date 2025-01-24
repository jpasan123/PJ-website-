'use client';

import { motion } from 'framer-motion';
import { Users, Award, Globe, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { label: 'Years of Experience', value: '15+', icon: Award },
    { label: 'Global Customers', value: '10k+', icon: Globe },
    { label: 'Team Members', value: '200+', icon: Users },
    { label: 'Growth Rate', value: '97%', icon: TrendingUp },
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Commercial SMB</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering businesses with cutting-edge solutions and premium equipment for sustainable growth and success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <img
              src="https://picsum.photos/seed/about1/600/400"
              alt="Our Office"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2009, Commercial SMB has been at the forefront of business equipment and solutions. 
              We've grown from a small local supplier to a nationwide leader in commercial equipment and services.
            </p>
            <p className="text-gray-600">
              Our mission is to provide businesses with the tools they need to succeed in an ever-evolving 
              digital landscape, while maintaining our commitment to quality and customer satisfaction.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-primary text-white rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl mb-8">
            Be part of our growing community of successful businesses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p>Cutting-edge solutions for modern businesses</p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Quality</h3>
              <p>Premium products and exceptional service</p>
            </div>
            <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Support</h3>
              <p>24/7 dedicated customer assistance</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}