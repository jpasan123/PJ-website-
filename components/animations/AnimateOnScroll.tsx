'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
}

export function AnimateOnScroll({ children, className = '' }: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}