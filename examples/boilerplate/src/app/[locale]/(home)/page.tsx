'use client';

import HomeComponent from '@/components/home';
import { Header } from '@/components/loading-page/header';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [transition, setTransition] = useState(false);
  const [_isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setTransition(true), 2000);
    const timer2 = setTimeout(() => setIsLoaded(true), 1000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className="h-dvh w-full flex items-center">
      <Header transition={transition} />

      {transition && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center w-full"
        >
          <HomeComponent />
        </motion.div>
      )}
    </main>
  );
}
