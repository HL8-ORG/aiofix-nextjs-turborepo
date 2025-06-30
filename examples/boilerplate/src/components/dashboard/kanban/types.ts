import type { FileType } from "@/types"
import type { z } from "zod"
import type { KanbanColumnSchema } from "./_schemas/kanban-column-schema"
import type { KanbanTaskSchema } from "./_schemas/kanban-task-schema"

/**
 * 用户类型接口定义
 * @interface UserType
 * @property {string} id - 用户唯一标识符
 * @property {string} username - 用户名
 * @property {string} name - 用户显示名称
 * @property {string} [avatar] - 用户头像URL(可选)
 */
export interface UserType {
  id: string
  username: string
  name: string
  avatar?: string
}

/**
 * 评论类型接口定义
 * @interface CommentType
 * @property {string} id - 评论唯一标识符
 * @property {string} userId - 评论作者ID
 * @property {string} text - 评论内容
 * @property {Date} createdAt - 评论创建时间
 */
export interface CommentType {
  id: string
  userId: string
  text: string
  createdAt: Date
}

/**
 * 任务类型接口定义
 * @interface TaskType
 * @property {string} id - 任务唯一标识符
 * @property {string} columnId - 所属列ID
 * @property {number} order - 任务在列中的排序位置
 * @property {string} title - 任务标题
 * @property {string} [description] - 任务描述(可选)
 * @property {string} label - 任务标签
 * @property {CommentType[]} comments - 任务相关评论列表
 * @property {UserType[]} assigned - 任务分配的用户列表
 * @property {Date} dueDate - 任务截止日期
 * @property {FileType[]} attachments - 任务附件列表
 */
export interface TaskType {
  id: string
  columnId: string
  order: number
  title: string
  description?: string
  label: string
  comments: CommentType[]
  assigned: UserType[]
  dueDate: Date
  attachments: FileType[]
}

/**
 * 看板列类型接口定义
 * @interface ColumnType
 * @property {string} id - 列唯一标识符
 * @property {number} order - 列的排序位置
 * @property {string} title - 列标题
 * @property {TaskType[]} tasks - 列中包含的任务列表
 */
export interface ColumnType {
  id: string
  order: number
  title: string
  tasks: TaskType[]
}

/**
 * 不包含id、order和tasks的列类型
 * 用于创建新列时的数据类型
 * @description Omit 是 TypeScript 内置的工具类型，用于从一个对象类型中
 * 排除指定的属性，创建一个新的类型。
 */
export type ColumnWithoutIdAndOrderAndTasksType = Omit<
  ColumnType,
  "id" | "order" | "tasks"
>

/**
 * 不包含id、order和columnId的任务类型
 * 用于创建新任务时的数据类型
 */
export type TaskWithoutIdAndOrderAndColumnIdType = Omit<
  TaskType,
  "id" | "order" | "columnId"
>

/**
 * 看板状态类型接口定义
 * @interface KanbanStateType
 * @property {ColumnType[]} columns - 所有看板列
 * @property {UserType[]} teamMembers - 团队成员列表
 * @property {ColumnType} [selectedColumn] - 当前选中的列(可选)
 * @property {TaskType} [selectedTask] - 当前选中的任务(可选)
 */
export interface KanbanStateType {
  columns: ColumnType[]
  teamMembers: UserType[]
  selectedColumn?: ColumnType
  selectedTask?: TaskType
}

/**
 * 标签类型接口定义
 * @interface LabelType
 * @property {string} id - 标签唯一标识符
 * @property {string} name - 标签名称
 */
export interface LabelType {
  id: string
  name: string
}

/**
 * 看板操作类型联合类型
 * 定义了所有可能的看板操作
 * @type KanbanActionType
 * @description 这里 | 的作用是：
将多个不同的对象类型组合成一个联合类型
表示 KanbanActionType 可以是这些类型中的任意一种
完整的联合类型示例
 */
export type KanbanActionType =
  | { type: "addColumn"; column: ColumnWithoutIdAndOrderAndTasksType }
  | { type: "updateColumn"; column: ColumnType }
  | { type: "deleteColumn"; columnId: string }
  | {
      type: "addTask"
      task: TaskWithoutIdAndOrderAndColumnIdType
      columnId: string
    }
  | { type: "updateTask"; task: TaskType }
  | { type: "deleteTask"; taskId: string }
  | { type: "reorderColumns"; sourceIndex: number; destinationIndex: number }
  | {
      type: "reorderTasks"
      source: { columnId: string; index: number }
      destination: { columnId: string; index: number }
    }
  | { type: "selectColumn"; column?: ColumnType }
  | { type: "selectTask"; task?: TaskType }

/**
 * 看板上下文类型接口定义
 * 包含看板状态和所有操作方法
 * @interface KanbanContextType
 * @property {KanbanStateType} kanbanState - 看板当前状态
 * @property {boolean} kanbanAddTaskSidebarIsOpen - 添加任务侧边栏是否打开
 * @property {Function} setKanbanAddTaskSidebarIsOpen - 设置添加任务侧边栏状态
 * @property {boolean} kanbanUpdateTaskSidebarIsOpen - 更新任务侧边栏是否打开
 * @property {Function} setKanbanUpdateTaskSidebarIsOpen - 设置更新任务侧边栏状态
 * @property {boolean} kanbanAddColumnSidebarIsOpen - 添加列侧边栏是否打开
 * @property {Function} setKanbanAddColumnSidebarIsOpen - 设置添加列侧边栏状态
 * @property {boolean} kanbanUpdateColumnSidebarIsOpen - 更新列侧边栏是否打开
 * @property {Function} setKanbanUpdateColumnSidebarIsOpen - 设置更新列侧边栏状态
 */
export interface KanbanContextType {
  kanbanState: KanbanStateType
  kanbanAddTaskSidebarIsOpen: boolean
  setKanbanAddTaskSidebarIsOpen: (value: boolean) => void
  kanbanUpdateTaskSidebarIsOpen: boolean
  setKanbanUpdateTaskSidebarIsOpen: (value: boolean) => void
  kanbanAddColumnSidebarIsOpen: boolean
  setKanbanAddColumnSidebarIsOpen: (value: boolean) => void
  kanbanUpdateColumnSidebarIsOpen: boolean
  setKanbanUpdateColumnSidebarIsOpen: (value: boolean) => void
  handleAddColumn: (column: ColumnWithoutIdAndOrderAndTasksType) => void
  handleUpdateColumn: (column: ColumnType) => void
  handleDeleteColumn: (columnId: ColumnType["id"]) => void
  handleAddTask: (
    task: TaskWithoutIdAndOrderAndColumnIdType,
    columnId: ColumnType["id"]
  ) => void
  handleUpdateTask: (task: TaskType) => void
  handleDeleteTask: (taskId: TaskType["id"]) => void
  handleReorderColumns: (sourceIndex: number, destinationIndex: number) => void
  handleReorderTasks: (
    sourceColumnId: string,
    sourceIndex: number,
    destinationColumnId: string,
    destinationIndex: number
  ) => void
  handleSelectColumn: (column: ColumnType | undefined) => void
  handleSelectTask: (task: TaskType | undefined) => void
}

/**
 * 看板列表单类型
 * 使用zod schema进行类型推断和验证
 */
export type KanbanColumnFormType = z.infer<typeof KanbanColumnSchema>

/**
 * 看板任务表单类型
 * 使用zod schema进行类型推断和验证
 */
export type KanbanTaskFormType = z.infer<typeof KanbanTaskSchema>
