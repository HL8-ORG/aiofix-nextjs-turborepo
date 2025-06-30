'use client';

import { GripVertical } from 'lucide-react';

import type { DraggableProvided } from '@hello-pangea/dnd';
import type { ColumnType } from '../types';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@repo/design-system/components/shadcn-ui/button';
import {
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/shadcn-ui/card';
import { KanbanColumnActions } from './kanban-column-actions';
/**
 * 看板列标题栏组件的属性接口
 */
interface KanbanColumnItemHeaderProps {
  /** 列数据对象 */
  column: ColumnType;
  /** 拖拽功能所需的 provided 对象 */
  provided: DraggableProvided;
}

/**
 * 看板列标题栏组件
 *
 * @description
 * 渲染看板列的标题栏,包含拖拽手柄、标题文本和操作按钮
 *
 * @param props - 组件属性
 * @param props.column - 列数据对象
 * @param props.provided - 拖拽功能所需的 provided 对象
 *
 * @remarks
 * 实现机制:
 * 1. 布局结构
 *   - 使用 CardHeader 作为容器
 *   - 采用 flex 布局排列子元素
 *   - 标题文本自动占据剩余空间
 *
 * 2. 拖拽功能
 *   - 通过 provided.dragHandleProps 实现拖拽手柄
 *   - 使用 GripVertical 图标作为视觉提示
 *
 * 3. 样式处理
 *   - 使用 Tailwind 工具类控制布局和间距
 *   - 通过 cn 工具函数组合按钮样式
 */
export function KanbanColumnItemHeader({
  column,
  provided,
}: KanbanColumnItemHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center gap-x-1.5 space-y-0 p-0">
      <div
        // TODO:这段样式很有意思，
        // variant: 'ghost' - 使用幽灵按钮样式，通常是无背景、有悬停效果的按钮
        // size: 'icon' - 设置为图标尺寸，适合放置图标元素，这里使用GripVertical图标
        // cursor-grab - 设置为拖拽手柄样式
        // text-secondary-foreground/50 - 设置为次要文本颜色
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'cursor-grab text-secondary-foreground/50'
        )}
        // TODO: 展开拖拽库提供的拖拽手柄属性，包括事件处理器等，下一步需要添加是否可以拖拽的判断
        {...provided.dragHandleProps}
        // 无障碍标签，为屏幕阅读器提供可读的标签
        aria-label="Move task"
      >
        <GripVertical className="size-4" />
      </div>
      {/* 使用 me-auto 类让标题自动占据剩余空间，将KanbanColumnActions推到右侧 */}
      <CardTitle className="me-auto">{column.title}</CardTitle>
      <KanbanColumnActions column={column} />
    </CardHeader>
  );
}

/**
 *  CardHeader 容器样式说明：
 * flex flex-row - 水平弹性布局
 * items-center - 垂直居中对齐
 * gap-x-1.5 - 元素间水平间距
 * space-y-0 p-0 - 移除默认的垂直间距和内边距
 *
 *
 *
 *
 *
 *
 *
 */
