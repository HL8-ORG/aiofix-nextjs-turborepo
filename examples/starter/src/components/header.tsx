'use client';

import { useIsMobile } from '@repo/design-system/hooks/use-mobile';
import { motion } from 'motion/react';
import { Logo } from './logo';

const LOGO_WRAPPER_VARIANTS = {
  center: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  topLeft: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 'auto',
    height: 'auto',
  },
};

export const Header = ({ transition }: { transition: boolean }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      variants={LOGO_WRAPPER_VARIANTS}
      initial="center"
      animate={transition ? 'topLeft' : 'center'}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      className="fixed z-40 flex items-center justify-center w-full"
    >
      <motion.div className="absolute inset-x-0 top-0 h-14 z-100 w-full bg-background/70 backdrop-blur-md" />
      <div className="relative w-full max-w-7xl mx-auto px-4 h-full overflow-visible">
        <motion.div
          className="absolute z-110"
          initial={{
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            scale: 1,
          }}
          animate={
            transition
              ? {
                  top: 20,
                  left: 20,
                  x: 0,
                  y: 0,
                  scale: 0.6,
                }
              : {
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                  scale: 1,
                }
          }
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
          <Logo size={isMobile ? 'lg' : 'xl'} draw betaTag />
        </motion.div>
      </div>
    </motion.div>
  );
};
