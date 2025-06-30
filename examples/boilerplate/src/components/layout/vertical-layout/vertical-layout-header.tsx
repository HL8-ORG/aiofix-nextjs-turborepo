'use client';

import { useParams } from 'next/navigation';

import type { DictionaryType } from '@/lib/get-dictionary';
import type { LocaleType } from '@/types';

import { LanguageDropdown } from '@/components/language-dropdown';
import { FullscreenToggle } from '@/components/layout/full-screen-toggle';
import { ModeDropdown } from '@/components/layout/mode-dropdown';
import { NotificationDropdown } from '@/components/layout/notification-dropdown';
import { UserDropdown } from '@/components/layout/user-dropdown';
import { SidebarTrigger } from '@repo/design-system/components/shadcn-ui/sidebar';
import { ToggleMobileSidebar } from '../toggle-mobile-sidebar';

export function VerticalLayoutHeader({
  dictionary,
}: {
  dictionary: DictionaryType;
}) {
  const params = useParams();

  const locale = params.lang as LocaleType;

  return (
    <header className="sticky top-0 z-50 w-full border-sidebar-border border-b bg-background">
      <div className="container flex h-14 items-center justify-between gap-4">
        <ToggleMobileSidebar />
        <div className="flex grow justify-end gap-2">
          <SidebarTrigger className="hidden lg:me-auto lg:flex" />
          <NotificationDropdown dictionary={dictionary} />
          <FullscreenToggle />
          <ModeDropdown dictionary={dictionary} />
          <LanguageDropdown dictionary={dictionary} />
          <UserDropdown dictionary={dictionary} locale={locale} />
        </div>
      </div>
    </header>
  );
}
