'use client';

import { Plus } from 'lucide-react';

import type { ColumnType } from '../types';

import { Button } from '@repo/design-system/components/shadcn-ui/button';
import { useKanbanContext } from '../_hooks/use-kanban-context';

interface KanbanTaskListProps {
  column: ColumnType;
}

export function KanbanAddNewTaskButton({ column }: KanbanTaskListProps) {
  const { handleSelectColumn, setKanbanAddTaskSidebarIsOpen } =
    useKanbanContext();

  return (
    <Button
      variant="outline"
      className="my-2 w-full"
      onClick={() => {
        handleSelectColumn(column);
        setKanbanAddTaskSidebarIsOpen(true);
      }}
    >
      <Plus className="me-2 size-4 text-muted-foreground" />
      Add New Task
    </Button>
  );
}
