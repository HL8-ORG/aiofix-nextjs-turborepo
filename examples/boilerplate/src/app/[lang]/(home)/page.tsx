'use client';

import { Header } from '@/components/header';
import { Button } from '@repo/design-system/components/shadcn-ui/button';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const CONTENT_VARIANTS = {
  hidden: {
    y: 2000,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 30 },
  },
} as const;

export default function HomePage() {
  const [transition, setTransition] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTransition(true), 2000);
    const timer2 = setTimeout(() => setIsLoaded(true), 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className="h-dvh w-full flex items-center">
      <Header transition={transition} />

      <motion.div
        variants={CONTENT_VARIANTS}
        initial="hidden"
        animate={transition ? 'visible' : 'hidden'}
        className="w-full"
      >
        <div className="flex flex-col items-center justify-center">
          <Button
            onClick={() => {
              window.location.href = '/dashboard/kanban';
            }}
          >
            Click me
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
