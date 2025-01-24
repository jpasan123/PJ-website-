'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600">Loading...</p>
      </motion.div>
    </div>
  );
}