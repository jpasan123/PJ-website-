'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInStaggerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeInStagger({ children, delay = 0.1, className = '' }: FadeInStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: delay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStaggerItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
}