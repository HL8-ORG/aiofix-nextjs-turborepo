'use client';

import { PanelLeft } from 'lucide-react';

import { Button } from '@repo/design-system/components/shadcn-ui/button';
import { useSidebar } from '@repo/design-system/components/shadcn-ui/sidebar';

export function ToggleMobileSidebar() {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Button
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        onClick={() => setOpenMobile(!openMobile)}
        aria-label="Toggle Sidebar"
      >
        <PanelLeft className="h-4 w-4" />
      </Button>
    );
  }
}
