'use client';

import { Droppable } from '@hello-pangea/dnd';

import type { DroppableProvided } from '@hello-pangea/dnd';
import type { ColumnType } from '../types';

import { CardContent } from '@repo/design-system/components/shadcn-ui/card';
import { KanbanAddNewTaskButton } from './kanban-add-new-task-button';
import { KanbanTaskItem } from './kanban-task-item';
/**
 * 看板任务列表组件的属性接口
 * @interface
 */
interface KanbanTaskListProps {
  /** 列数据对象 */
  column: ColumnType;
}

/**
 * 看板任务列表组件
 *
 * @description
 * 渲染一个可放置任务的列表区域,包含任务卡片和添加新任务按钮
 *
 * @param props - 组件属性
 * @param props.column - 列数据对象,包含任务列表数据
 *
 * @remarks
 * 实现机制:
 * 1. 拖放功能
 *   - 使用 @hello-pangea/dnd 的 Droppable 组件实现可放置区域
 *   - droppableId 作为唯一标识,用于确定任务放置的目标列
 *
 * 2. 渲染结构
 *   - 通过 render props 模式获取放置所需的 provided 对象
 *   - provided.innerRef 用于关联 DOM 元素
 *   - provided.droppableProps 提供放置相关属性
 *   - provided.placeholder 在拖动时保持列表高度
 *
 * 3. 布局处理
 *   - 使用 grid 布局排列任务卡片
 *   - 设置最小高度确保空列表也有合适的放置区域
 */
export function KanbanTaskList({ column }: KanbanTaskListProps) {
  return (
    <Droppable droppableId={column.id}>
      {(provided: DroppableProvided) => (
        <CardContent
          ref={provided.innerRef}
          className="grid min-h-44 p-0"
          {...provided.droppableProps}
        >
          {column.tasks.map((task, index) => (
            <KanbanTaskItem key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
          <KanbanAddNewTaskButton column={column} />
        </CardContent>
      )}
    </Droppable>
  );
}
