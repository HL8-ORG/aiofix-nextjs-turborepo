import type { LocaleType } from '@/types';
import type { ReactNode } from 'react';

import { SettingsProvider } from '@/contexts/settings-context';
import { SidebarProvider } from '@repo/design-system/components/shadcn-ui/sidebar';
import { ModeProvider } from './mode-provider';
import { ThemeProvider } from './theme-provider';

export function Providers({
  locale,
  children,
}: Readonly<{
  locale: LocaleType;
  children: ReactNode;
}>) {
  return (
    <SettingsProvider locale={locale}>
      <ModeProvider>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </ModeProvider>
    </SettingsProvider>
  );
}
