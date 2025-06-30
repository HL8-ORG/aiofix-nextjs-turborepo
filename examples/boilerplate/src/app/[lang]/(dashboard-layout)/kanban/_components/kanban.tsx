// Refer to react-beautiful-dnd README.md file for more details https://github.com/atlassian/react-beautiful-dnd
'use client';

import { DragDropContext } from '@hello-pangea/dnd';

import type { DropResult } from '@hello-pangea/dnd';

import { useKanbanContext } from '../_hooks/use-kanban-context';
import { KanbanColumnList } from './kanban-column-list';

/**
 * 看板组件
 *
 * @description
 * 看板的主要组件,负责处理拖拽功能和渲染看板列表。
 * 使用 @hello-pangea/dnd 库实现拖拽功能。
 *
 * @remarks
 * 实现机制:
 * 1. 拖拽上下文
 *   - 使用 DragDropContext 包裹整个看板
 *   - 通过 onDragEnd 处理拖拽完成事件
 *
 * 2. 拖拽处理
 *   - 列拖拽: type='Column' 时重排列顺序
 *   - 任务拖拽: 在列内或跨列移动任务
 *   - 使用 source 和 destination 追踪拖拽的起点和终点
 *
 * 3. 状态管理
 *   - 通过 useKanbanContext 获取状态更新方法
 *   - 拖拽完成时调用对应方法更新状态
 */
export function Kanban() {
  const { handleReorderColumns, handleReorderTasks } = useKanbanContext();

  /**
   * 处理拖拽完成事件
   *
   * @param result - 拖拽结果对象,包含源位置、目标位置和拖拽类型信息
   */
  const handleDragDrop = (result: DropResult) => {
    const { source, destination, type } = result;

    // TODO:处理拖拽后数据的同步和保存问题
    // console.log('------- 拖拽结果 -------');
    // console.log('源', JSON.stringify(source));
    // console.log('目标', JSON.stringify(destination));
    // console.log('type', JSON.stringify(type));

    // 如果没有目标位置,则忽略此次拖拽
    if (!destination) {
      return;
    }

    // 根据拖拽类型执行不同的重排序操作
    if (type === 'Column') {
      // 处理列的重排序
      handleReorderColumns(source.index, destination.index);
    } else {
      // 处理任务的重排序(包括列内和跨列)
      handleReorderTasks(
        source.droppableId,
        source.index,
        destination.droppableId,
        destination.index
      );
    }
  };

  return (
    <>
      {/* TODO: 增加一个工具栏 */}
      {/* <div
        className={cn('mb-4 flex flex-col gap-2 rounded-lg border bg-card p-4')}
      >
        {' '}
        工具栏
        <Button>保存</Button>
        <Button>保存</Button>
        <Button>保存</Button>
        <Button>保存</Button>
      </div> */}
      <DragDropContext onDragEnd={handleDragDrop}>
        <KanbanColumnList />
      </DragDropContext>
    </>
  );
}
