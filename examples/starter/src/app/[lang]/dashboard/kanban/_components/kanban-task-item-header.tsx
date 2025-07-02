'use client';

import { GripVertical } from 'lucide-react';

import type { DraggableProvided } from '@hello-pangea/dnd';
import type { TaskType } from '../types';

import { cn } from '@/lib/utils';

import { Badge } from '@repo/design-system/components/shadcn-ui/badge';
import { buttonVariants } from '@repo/design-system/components/shadcn-ui/button';
import { CardHeader } from '@repo/design-system/components/shadcn-ui/card';
import { KanbanTaskItemActions } from './kanban-task-item-actions';

interface KanbanTaskItemHeaderProps {
  task: TaskType;
  provided: DraggableProvided;
}

export function KanbanTaskItemHeader({
  task,
  provided,
}: KanbanTaskItemHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center gap-x-1.5 space-y-0 px-3 py-0">
      <div
        className={cn(
          buttonVariants({
            variant: 'ghost',
            size: 'icon',
          }),
          'cursor-grab text-secondary-foreground/50'
        )}
        // TODO: 展开拖拽库提供的拖拽手柄属性，包括事件处理器等，下一步需要添加是否可以拖拽的判断
        {...provided.dragHandleProps} // Draggable props for drag-and-drop functionality
        aria-label="Move task"
      >
        <GripVertical className="size-4" />
      </div>
      <Badge>{task.label}</Badge>
      <KanbanTaskItemActions task={task} />
    </CardHeader>
  );
}
