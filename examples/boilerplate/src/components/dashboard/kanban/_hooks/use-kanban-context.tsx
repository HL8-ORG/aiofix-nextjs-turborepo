'use client';

import { useContext } from 'react';

import { KanbanContext } from '../_contexts/kanban-context';

/**
 * 看板Context Hook
 *
 * @description
 * 这是一个自定义Hook,用于获取看板的Context数据。
 * 它通过React的useContext Hook从KanbanContext中获取状态和方法。
 *
 * @remarks
 * - 该Hook必须在KanbanProvider组件内部使用
 * - 如果在Provider外部使用会抛出错误
 * - 返回的context包含了看板的状态和操作方法
 *
 * @throws {Error} 当Hook在KanbanProvider外部使用时抛出错误
 * @returns 返回看板Context中的状态和方法
 */
export function useKanbanContext() {
  const context = useContext(KanbanContext);
  if (context === undefined) {
    throw new Error('useKanbanContext must be used within a KanbanProvider');
  }

  return context;
}
