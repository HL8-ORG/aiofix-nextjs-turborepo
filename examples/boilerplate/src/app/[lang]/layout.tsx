import { cn } from '@/lib/utils';

import '../globals.css';

import { Providers } from '@/providers';

import type { ReactNode } from 'react';

import { Toaster } from '@repo/design-system/components/shadcn-ui/sonner';

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <div
      className={cn(
        '[&:lang(ar)]:font-cairo [&:lang(en)]:font-lato', // Set font styles based on the language
        'overscroll-none bg-background text-foreground antialiased' // Set background, text, , anti-aliasing styles, and overscroll behavior
      )}
    >
      <Providers locale="en">
        {children}
        <Toaster />
      </Providers>
    </div>
  );
}
