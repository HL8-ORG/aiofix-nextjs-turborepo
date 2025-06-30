import { KanbanAddColumnSidebar } from './kanban-add-column-sidebar';
import { KanbanAddTaskSidebar } from './kanban-add-task-sidebar';
import { KanbanUpdateColumnSidebar } from './kanban-update-column-sidebar';
import { KanbanUpdateTaskSidebar } from './kanban-update-task-sidebar';

/**
 * 看板侧边栏组件，通过抽屉组件展示内容
 *
 *
 * @description
 * 集成了看板所有侧边栏功能的容器组件,包括添加/更新任务和列的侧边栏。
 * 使用 React Fragment 避免额外的 DOM 节点。
 *
 * @remarks
 * 实现机制:
 * 1. 组件组合
 *   - 通过组合模式整合多个功能性侧边栏组件
 *   - 每个子组件负责特定的业务功能
 *
 * 2. 状态管理
 *   - 各子组件通过 useKanbanContext 共享状态
 *   - 侧边栏的显示/隐藏由 context 中的状态控制
 *
 * 3. 渲染优化
 *   - 使用 Fragment 避免不必要的 DOM 嵌套
 *   - 子组件按需渲染,仅在打开状态时展示内容
 */
export function KanbanSidebar() {
  return (
    <>
      <KanbanAddTaskSidebar />
      <KanbanUpdateTaskSidebar />
      <KanbanAddColumnSidebar />
      <KanbanUpdateColumnSidebar />
    </>
  );
}
