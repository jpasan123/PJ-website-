'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimateInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateInView({ children, className = '', delay = 0 }: AnimateInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}