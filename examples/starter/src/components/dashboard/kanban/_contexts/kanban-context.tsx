'use client';

import { createContext, useReducer, useState } from 'react';

import type { ReactNode } from 'react';
import type {
  ColumnType,
  ColumnWithoutIdAndOrderAndTasksType,
  KanbanContextType,
  TaskType,
  TaskWithoutIdAndOrderAndColumnIdType,
} from '../types';

import { teamMembersData } from '../_data/team-members';

import { KanbanReducer } from '../_reducers/kanban-reducer';

/**
 * 看板Context，集中管理看板的内容
 *
 * @description
 * 用于在组件树中共享看板相关的状态和操作方法。
 * 包含了看板的列、任务、团队成员等数据,以及对这些数据的增删改查操作。
 */
export const KanbanContext = createContext<KanbanContextType | undefined>(
  undefined
);

/**
 * 看板Provider组件的属性接口
 *
 * @description
 * 定义了KanbanProvider组件所需的属性类型。
 *
 * @property {ColumnType[]} kanbanData - 看板初始数据,包含所有列的信息
 * @property {ReactNode} children - 子组件,用于组件组合模式
 *
 * @remarks
 * 实现机制:
 * 1. 通过kanbanData传入初始看板数据,用于初始化看板状态
 * 2. 使用React的组件组合模式,通过children渲染子组件
 * 3. 子组件可以通过Context访问看板状态和方法
 */
interface KanbanProviderProps {
  kanbanData: ColumnType[];
  children: ReactNode;
}

/**
 * 看板Context Provider组件
 *
 * @description
 * 为子组件提供看板相关的状态和操作方法。
 * 使用useReducer管理复杂的看板状态,使用useState管理侧边栏的显示状态。
 *
 * @param {KanbanProviderProps} props - 组件属性
 * @param {ColumnType[]} props.kanbanData - 初始看板数据
 * @param {ReactNode} props.children - 子组件
 *
 * @remarks
 * 主要功能和机制:
 * 1. 状态管理
 *   - 使用useReducer管理看板的核心状态(列、任务、选中项等)
 *   - 使用useState管理UI状态(侧边栏的显示/隐藏)
 *
 * 2. 看板操作
 *   - 列操作:添加、更新、删除列
 *   - 任务操作:添加、更新、删除任务
 *   - 拖拽重排:支持列和任务的拖拽排序
 *   - 选择操作:支持选中列和任务
 *
 * 3. 数据流转
 *   - 通过Context API向下传递状态和方法
 *   - 子组件通过useKanbanContext hook获取这些状态和方法
 */
export function KanbanProvider({ kanbanData, children }: KanbanProviderProps) {
  // 使用Reducer管理看板核心状态
  const [kanbanState, dispatch] = useReducer(KanbanReducer, {
    columns: kanbanData,
    teamMembers: teamMembersData,
    selectedColumn: undefined,
    selectedTask: undefined,
  });

  // 侧边栏状态管理
  const [kanbanAddTaskSidebarIsOpen, setKanbanAddTaskSidebarIsOpen] =
    useState(false);
  const [kanbanUpdateTaskSidebarIsOpen, setKanbanUpdateTaskSidebarIsOpen] =
    useState(false);
  const [kanbanAddColumnSidebarIsOpen, setKanbanAddColumnSidebarIsOpen] =
    useState(false);
  const [kanbanUpdateColumnSidebarIsOpen, setKanbanUpdateColumnSidebarIsOpen] =
    useState(false);

  /**
   * 列操作处理方法
   */
  const handleAddColumn = (column: ColumnWithoutIdAndOrderAndTasksType) => {
    dispatch({ type: 'addColumn', column });
  };

  const handleUpdateColumn = (column: ColumnType) => {
    dispatch({ type: 'updateColumn', column });
  };

  const handleDeleteColumn = (columnId: ColumnType['id']) => {
    dispatch({ type: 'deleteColumn', columnId });
  };

  /**
   * 任务操作处理方法
   */
  const handleAddTask = (
    task: TaskWithoutIdAndOrderAndColumnIdType,
    columnId: ColumnType['id']
  ) => {
    dispatch({ type: 'addTask', task, columnId });
  };

  const handleUpdateTask = (task: TaskType) => {
    dispatch({ type: 'updateTask', task });
  };

  const handleDeleteTask = (taskId: TaskType['id']) => {
    dispatch({ type: 'deleteTask', taskId });
  };

  /**
   * 拖拽重排处理方法
   */
  const handleReorderColumns = (
    sourceIndex: number,
    destinationIndex: number
  ) => {
    // 如果源索引和目标索引相同,则不进行重排序
    if (sourceIndex === destinationIndex) {
      return;
    }
    // 调用Reducer进行列重排序
    dispatch({
      type: 'reorderColumns',
      sourceIndex,
      destinationIndex,
    });
  };

  const handleReorderTasks = (
    sourceColumnId: string,
    sourceIndex: number,
    destinationColumnId: string,
    destinationIndex: number
  ) => {
    // 如果源列ID和目标列ID相同,且源索引和目标索引相同,则不进行重排序
    if (
      sourceColumnId === destinationColumnId &&
      sourceIndex === destinationIndex
    ) {
      return;
    }
    // 调用Reducer进行任务重排序
    dispatch({
      type: 'reorderTasks',
      source: { columnId: sourceColumnId, index: sourceIndex },
      destination: { columnId: destinationColumnId, index: destinationIndex },
    });
  };

  /**
   * 选择操作处理方法
   */
  const handleSelectColumn = (column: ColumnType | undefined) => {
    dispatch({ type: 'selectColumn', column });
  };

  const handleSelectTask = (task: TaskType | undefined) => {
    dispatch({ type: 'selectTask', task });
  };

  return (
    <KanbanContext.Provider
      value={{
        kanbanState,
        kanbanAddTaskSidebarIsOpen,
        setKanbanAddTaskSidebarIsOpen,
        kanbanUpdateTaskSidebarIsOpen,
        setKanbanUpdateTaskSidebarIsOpen,
        kanbanAddColumnSidebarIsOpen,
        setKanbanAddColumnSidebarIsOpen,
        kanbanUpdateColumnSidebarIsOpen,
        setKanbanUpdateColumnSidebarIsOpen,
        handleAddColumn,
        handleUpdateColumn,
        handleDeleteColumn,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
        handleReorderColumns,
        handleReorderTasks,
        handleSelectColumn,
        handleSelectTask,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}
