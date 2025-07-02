import type {
  ColumnType,
  KanbanActionType,
  KanbanStateType,
  TaskType,
} from "../types"

/**
 * 看板状态管理的Reducer函数
 * 处理所有看板相关的状态更新操作
 * 
 * @param {KanbanStateType} state - 当前看板状态
 * @param {KanbanActionType} action - 要执行的操作
 * @returns {KanbanStateType} 更新后的看板状态
 */
export const KanbanReducer = (
  state: KanbanStateType,
  action: KanbanActionType
): KanbanStateType => {
  switch (action.type) {
    case "addColumn": {
      // 添加新列
      // 1. 生成唯一ID
      // 2. 设置列的顺序为当前列数
      // 3. 初始化空任务数组
      const newColumn: ColumnType = {
        ...action.column,
        id: crypto.randomUUID(),
        order: state.columns.length,
        tasks: [],
      }
      return { ...state, columns: [...state.columns, newColumn] }
    }

    case "updateColumn": {
      // 更新列信息
      // 通过map遍历所有列,匹配ID后更新对应列的信息
      return {
        ...state,
        columns: state.columns.map(
          (column) =>
            column.id === action.column.id ? { ...action.column } : column
        ),
      }
    }

    case "deleteColumn": {
      // 删除列
      // 通过filter过滤掉要删除的列
      return {
        ...state,
        columns: state.columns.filter(
          (column) => column.id !== action.columnId
        ),
      }
    }

    case "addTask": {
      // 添加新任务
      // 1. 生成唯一ID
      // 2. 关联到指定列
      // 3. 设置任务顺序
      return {
        ...state,
        columns: state.columns.map((column) => {
          if (column.id === action.columnId) {
            const newTask = {
              ...action.task,
              id: crypto.randomUUID(),
              columnId: action.columnId,
              order: column.tasks.length,
            }
            return {
              ...column,
              tasks: [...column.tasks, newTask],
            }
          }
          return column
        }),
      }
    }

    case "updateTask": {
      // 更新任务信息
      // 遍历所有列和任务,匹配ID后更新对应任务
      return {
        ...state,
        columns: state.columns.map((column) => {
          const updatedTasks = column.tasks.map((task) =>
            task.id === action.task.id
              ? { ...action.task, column_id: column.id }
              : task
          )
          return { ...column, tasks: updatedTasks }
        }),
      }
    }

    case "deleteTask": {
      // 删除任务
      // 遍历所有列,通过filter移除指定任务
      return {
        ...state,
        columns: state.columns.map((column) => {
          const updatedTasks = column.tasks.filter(
            (task) => task.id !== action.taskId
          )
          return { ...column, tasks: updatedTasks }
        }),
      }
    }

    case "reorderColumns": {
      // 重新排序列
      // 1. 从原位置移除列
      // 2. 插入到新位置
      // 3. 更新所有列的顺序
      const { sourceIndex, destinationIndex } = action
      const reorderedColumns = [...state.columns]
      const [movedColumn] = reorderedColumns.splice(sourceIndex, 1)
      reorderedColumns.splice(destinationIndex, 0, movedColumn)

      return {
        ...state,
        columns: reorderedColumns.map((column, index) => ({
          ...column,
          order: index,
        })),
      }
    }

    case "reorderTasks": {
      const { source, destination } = action

      // 同列内任务重排序
      if (source.columnId === destination.columnId) {
        return {
          ...state,
          columns: state.columns.map((column) => {
            if (column.id === source.columnId) {
              const updatedTasks = [...column.tasks]
              const [movedTask] = updatedTasks.splice(source.index, 1)
              updatedTasks.splice(destination.index, 0, movedTask)

              return {
                ...column,
                tasks: updatedTasks.map((task, index) => ({
                  ...task,
                  order: index,
                })),
              }
            }
            return column
          }),
        }
      } else {
        // 跨列任务移动
        // 1. 从源列移除任务
        // 2. 更新任务的列ID
        // 3. 添加到目标列
        // 4. 更新任务顺序
        let movedTask: TaskType | undefined

        const updatedState = {
          ...state,
          columns: state.columns.map((column) => {
            if (column.id === source.columnId) {
              const updatedSourceTasks = [...column.tasks]
              ;[movedTask] = updatedSourceTasks.splice(source.index, 1)
              return { ...column, tasks: updatedSourceTasks }
            }
            return column
          }),
        }

        return {
          ...updatedState,
          columns: updatedState.columns.map((column) => {
            if (column.id === destination.columnId && movedTask) {
              const updatedDestinationTasks = [...column.tasks]
              const movedTaskWithUpdatedColumnId = {
                ...movedTask,
                column_id: destination.columnId,
                order: updatedDestinationTasks.length,
              }
              updatedDestinationTasks.splice(
                destination.index,
                0,
                movedTaskWithUpdatedColumnId
              )

              return {
                ...column,
                tasks: updatedDestinationTasks.map((task, index) => ({
                  ...task,
                  order: index,
                })),
              }
            }
            return column
          }),
        }
      }
    }

    case "selectColumn": {
      // 选中列
      // 更新选中的列状态
      return { ...state, selectedColumn: action.column }
    }

    case "selectTask": {
      // 选中任务
      // 更新选中的任务状态
      return { ...state, selectedTask: action.task }
    }

    default:
      return state // 未知action时返回当前状态
  }
}
