'use client';

import { motion } from 'framer-motion';
import Events from '@/components/features/Events';
import Testimonials from '@/components/features/Testimonials';
import Newsletter from '@/components/features/Newsletter';

export default function ResourcesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white text-center"
          >
            Resources
          </motion.h1>
        </div>
      </div>
      <Events />
      <Testimonials />
      <Newsletter />
    </motion.div>
  );
}