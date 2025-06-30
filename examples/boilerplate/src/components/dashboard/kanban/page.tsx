import type { Metadata } from 'next';

import { kanbanData } from './_data/kanban';

import { Kanban } from './_components/kanban';
import { KanbanWrapper } from './_components/kanban-wrapper';

/**
 * 看板页面的元数据配置
 *
 * @description
 * 定义页面的基本元数据信息,用于SEO优化和页面展示
 *
 * @remarks
 * 使用 Next.js 的 Metadata API 进行配置
 * 更多信息参考: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  title: 'Kanban',
};

/**
 * 看板页面组件
 *
 * @description
 * 看板应用的主页面组件,负责组装和渲染看板的整体结构
 *
 * @remarks
 * 实现机制:
 * 1. 数据流
 *   - 从 kanbanData 导入初始看板数据
 *   - 通过 KanbanWrapper 注入数据到上下文中
 *
 * 2. 组件结构
 *   - KanbanWrapper: 提供数据上下文和布局结构
 *   - Kanban: 实现核心看板功能和拖拽逻辑
 *
 * 3. 状态管理
 *   - 利用 KanbanWrapper 的 Context 实现状态共享
 *   - 确保数据在组件树中的统一管理
 */
export default function KanbanPage() {
  return (
    <KanbanWrapper kanbanData={kanbanData}>
      <Kanban />
    </KanbanWrapper>
  );
}
