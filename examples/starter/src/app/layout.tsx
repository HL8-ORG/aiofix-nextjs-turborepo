import { cn } from '@/lib/utils';
import { fonts } from '@repo/design-system/lib/fonts';

import './globals.css';

import { Providers } from '@/providers';

import type { ReactNode } from 'react';

import { Toaster } from '@repo/design-system/components/shadcn-ui/sonner';

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <html lang="en" className={fonts} dir="ltr" suppressHydrationWarning>
      <body
        className={cn(
          '[&:lang(ar)]:font-cairo [&:lang(en)]:font-ltr', // Set font styles based on the language
          'overscroll-none bg-background text-foreground antialiased' // Set background, text, , anti-aliasing styles, and overscroll behavior
        )}
      >
        <Providers locale="en">
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
