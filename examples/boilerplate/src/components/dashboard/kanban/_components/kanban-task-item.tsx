'use client';

import { Draggable } from '@hello-pangea/dnd';

import type { DraggableProvided } from '@hello-pangea/dnd';
import type { TaskType } from '../types';

import { Card } from '@repo/design-system/components/shadcn-ui/card';
import { KanbanTaskItemContent } from './kanban-task-item-content';
import { KanbanTaskItemFooter } from './kanban-task-item-footer';
import { KanbanTaskItemHeader } from './kanban-task-item-header';

interface KanbanTaskItemProps {
  task: TaskType;
  index: number;
}

export function KanbanTaskItem({ task, index }: KanbanTaskItemProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: DraggableProvided) => (
        <Card
          ref={provided.innerRef}
          className=" my-2 w-64 md:w-72"
          // TODO: 展开拖拽库提供的拖拽手柄属性，包括事件处理器等，下一步需要添加是否可以拖拽的判断
          {...provided.draggableProps}
        >
          <KanbanTaskItemHeader task={task} provided={provided} />
          <KanbanTaskItemContent task={task} />
          <KanbanTaskItemFooter task={task} />
        </Card>
      )}
    </Draggable>
  );
}
