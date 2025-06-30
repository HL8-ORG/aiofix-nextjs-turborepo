'use client';

import { Droppable } from '@hello-pangea/dnd';

import type { DroppableProvided } from '@hello-pangea/dnd';

import { ScrollArea } from '@repo/design-system/components/scroll-area';
import { useKanbanContext } from '../_hooks/use-kanban-context';
import { KanbanAddNewColumnButton } from './kanban-add-new-column-button';
import { KanbanColumnItem } from './kanban-column-item';

export function KanbanColumnList() {
  const { kanbanState, setKanbanAddColumnSidebarIsOpen } = useKanbanContext();

  return (
    // 水平滚动区域
    <ScrollArea orientation="horizontal" className="container w-0 flex-1 p-0">
      <Droppable
        droppableId="root" // 可放置区域的唯一标识符,用于追踪拖放事件
        type="Column" // 指定此可放置区域接受的可拖动项类型,用于区分列和任务的移动
        direction="horizontal" // 指定可放置区域内的拖动方向(看板列的水平布局)
      >
        {/* 提供 Droppable 组件正常运行所需属性的渲染回调函数 */}
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps} // 用于拖放功能的 Droppable 属性
            className="flex gap-x-4 p-4"
          >
            {kanbanState.columns.map((column, index) => (
              <KanbanColumnItem key={column.id} column={column} index={index} />
            ))}
            {/* 通过为拖动项创建可视空间来维护布局完整性的占位符 */}
            {provided.placeholder}
            <KanbanAddNewColumnButton
              setKanbanAddColumnSidebarIsOpen={setKanbanAddColumnSidebarIsOpen}
            />
          </div>
        )}
      </Droppable>
    </ScrollArea>
  );
}
