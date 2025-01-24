'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageReveal({ src, alt, className = '' }: ImageRevealProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0.9
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
      className="relative overflow-hidden"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ originX: 0 }}
        className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
      />
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setIsLoaded(true)}
      />
    </motion.div>
  );
}