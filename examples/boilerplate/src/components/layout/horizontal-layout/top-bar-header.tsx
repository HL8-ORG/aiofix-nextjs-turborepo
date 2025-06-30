'use client';

import { CommandMenu } from '@/components/layout/command-menu';
import { TopBarHeaderMenubar } from './top-bar-header-menubar';

/**
 * 顶部导航栏组件
 * @component
 * @description
 * 实现了一个响应式的顶部导航栏布局,主要包含以下机制:
 * 1. 布局结构:
 *   - 使用container限制内容宽度
 *   - flex布局实现两栏结构(左侧菜单栏、右侧命令菜单)
 *   - 垂直内边距1单位(py-1)确保内容间距
 *
 * 2. 响应式设计:
 *   - 移动端隐藏(hidden)
 *   - 桌面端显示为flex布局(lg:flex)
 *   - 使用justify-between实现两端对齐
 *
 * 3. 组件集成:
 *   - TopBarHeaderMenubar: 实现主导航菜单
 *   - CommandMenu: 实现命令菜单,高度固定为8单位
 */
export function TopBarHeader() {
  return (
    <div className="container hidden items-center justify-between py-1 lg:flex">
      <TopBarHeaderMenubar />
      <CommandMenu buttonClassName="h-8" />
    </div>
  );
}
