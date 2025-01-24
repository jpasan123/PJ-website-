'use client';

import { createContext, useContext, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

const AnimationContext = createContext({});

export function AnimationProvider({ children }: { children: ReactNode }) {
  return (
    <AnimationContext.Provider value={{}}>
      <AnimatePresence mode="wait" initial={false}>
        <div key="content">
          {children}
        </div>
      </AnimatePresence>
    </AnimationContext.Provider>
  );
}

export const useAnimation = () => useContext(AnimationContext);