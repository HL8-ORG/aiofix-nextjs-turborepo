'use client';

import { Plus } from 'lucide-react';

import { Button } from '@repo/design-system/components/shadcn-ui/button';

export function KanbanAddNewColumnButton({
  setKanbanAddColumnSidebarIsOpen,
}: {
  setKanbanAddColumnSidebarIsOpen: (value: boolean) => void;
}) {
  return (
    <Button
      variant="outline"
      className="mx-2 w-64 md:w-72"
      onClick={() => setKanbanAddColumnSidebarIsOpen(true)}
    >
      {/* 一个加号图标 */}
      <Plus className="me-2 size-4 text-muted-foreground" />
      Add New Column
    </Button>
  );
}
