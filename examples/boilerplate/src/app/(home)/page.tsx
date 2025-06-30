'use client';

import { Header } from '@/components/header';
import { cn } from '@repo/design-system/lib/utils';
import { motion } from 'motion/react';
import Image from 'next/image';
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
    <main className={cn('relative h-dvh', !isLoaded && 'overflow-y-hidden')}>
      <Header transition={transition} />

      <div className="h-dvh w-full flex items-center">
        <motion.div
          variants={CONTENT_VARIANTS}
          initial="hidden"
          animate={transition ? 'visible' : 'hidden'}
          className="w-full"
        >
          <h1 className="text-4xl font-bold text-center">Hello</h1>
        </motion.div>
      </div>
      <div className="flex justify-center items-center">
        <Image src="/aiofix.svg" alt="Logo" width={100} height={100} />
      </div>
    </main>
  );
}
