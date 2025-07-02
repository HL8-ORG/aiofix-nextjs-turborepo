import type { ReactNode } from "react"
import type { ColumnType } from "../types"

import { KanbanProvider } from "../_contexts/kanban-context"
import { KanbanSidebar } from "./kanban-sidebar"
/**
 * 看板包装器组件
 * 
 * @description
 * 为看板提供数据上下文和布局结构的容器组件。
 * 集成了看板的状态管理和侧边栏功能。
 * 
 * @remarks
 * 实现机制:
 * 1. 状态管理
 *   - 使用 KanbanProvider 提供全局状态管理
 *   - 接收初始看板数据并注入到 context 中
 * 
 * 2. 布局结构
 *   - 采用 flex 布局实现侧边栏和主内容区的水平排列
 *   - 侧边栏固定在左侧,主内容区自适应宽度
 * 
 * 3. 组件组合
 *   - 通过 children 属性实现内容的灵活注入
 *   - 集成 KanbanSidebar 提供统一的侧边栏功能
 * 
 * @param props - 组件属性
 * @param props.kanbanData - 看板初始数据,包含列和任务信息
 * @param props.children - 子组件内容,通常是看板主体
 */
export function KanbanWrapper({
  kanbanData,
  children,
}: {
  kanbanData: ColumnType[]
  children: ReactNode
}) {
  return (
    <KanbanProvider kanbanData={kanbanData}>
      <div className="flex">
        <KanbanSidebar />
        {children}
      </div>
    </KanbanProvider>
  )
}
