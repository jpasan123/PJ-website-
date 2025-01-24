'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <Button
          onClick={() => reset()}
          className="flex items-center mx-auto"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </motion.div>
    </div>
  );
}