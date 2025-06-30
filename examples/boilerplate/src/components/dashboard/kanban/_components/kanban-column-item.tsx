'use client';

import { Draggable } from '@hello-pangea/dnd';

import type { DraggableProvided } from '@hello-pangea/dnd';
import type { ColumnType } from '../types';

import { KanbanColumnItemHeader } from './kanban-column-item-header';
import { KanbanTaskList } from './kanban-task-list';
/**
 * 看板列组件的属性接口
 * @interface
 */
interface KanbanColumnProps {
  /** 列数据对象 */
  column: ColumnType;
  /** 列在看板中的索引位置 */
  index: number;
}

/**
 * 看板列组件
 *
 * @description
 * 渲染一个可拖拽的看板列,包含列标题和任务列表
 *
 * @param props - 组件属性
 * @param props.column - 列数据对象
 * @param props.index - 列在看板中的索引位置
 *
 * @remarks
 * 实现机制:
 * 1. 拖拽功能
 *   - 使用 @hello-pangea/dnd 的 Draggable 组件实现拖拽
 *   - draggableId 作为唯一标识,用于追踪列的移动
 *   - index 用于确定列的顺序和重新排序
 * @see https://github.com/hello-pangea/dnd
 * @see https://dnd.dev/docs/getting-started/introduction
 *
 * 2. 渲染结构
 *   - 通过 render props 模式获取拖拽所需的 provided 对象
 *   - provided.innerRef 用于关联 DOM 元素
 *   - provided.draggableProps 提供拖拽相关属性
 *
 * 3. 布局处理
 *   - 使用 Tailwind 工具类控制列宽和高度自适应
 *   - 响应式设计:移动端 w-64,桌面端 w-72
 */
export function KanbanColumnItem({ column, index }: KanbanColumnProps) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          ref={provided.innerRef}
          className="h-fit w-64 md:w-72"
          {...provided.draggableProps}
        >
          <KanbanColumnItemHeader column={column} provided={provided} />
          <KanbanTaskList column={column} />
        </div>
      )}
    </Draggable>
  );
}
