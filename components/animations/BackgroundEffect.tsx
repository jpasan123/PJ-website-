'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function BackgroundEffect() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div 
      ref={ref} 
      style={{ opacity }}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Rich Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted to-background opacity-90" />

      {/* Animated Gradient Blobs */}
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y1, rotate: rotate2 }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-accent/10 via-primary/10 to-secondary/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-full blur-3xl"
      />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] 
        bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />

      {/* Additional Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-secondary/5 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/5 rounded-full mix-blend-multiply filter blur-xl" />
      </div>
    </motion.div>
  );
}