'use client';

import type { DictionaryType } from '@/lib/get-dictionary';

import { Separator } from '@repo/design-system/components/shadcn-ui/separator';
import { BottomBarHeader } from './bottom-bar-header';
import { TopBarHeader } from './top-bar-header';

/**
 * 水平布局的顶部导航栏组件
 * @component
 * @description
 * 实现了一个双层结构的水平导航栏,主要包含以下机制:
 * 1. 布局定位:
 *   - 使用sticky定位固定在顶部
 *   - z-index设置为50确保显示在其他内容之上
 *   - 宽度设置为100%铺满容器
 *
 * 2. 分层结构:
 *   - 顶部栏(TopBarHeader): 放置主要导航菜单
 *   - 分隔线: 在md断点以上显示0.5px的分隔线
 *   - 底部栏(BottomBarHeader): 放置Logo和功能按钮
 *
 * 3. 响应式设计:
 *   - 分隔线在移动端隐藏(hidden),桌面端显示(md:block)
 *   - 边框和背景色配合主题色
 */
export function HorizontalLayoutHeader({
  dictionary,
}: { dictionary: DictionaryType }) {
  return (
    <header className="sticky top-0 z-50 w-full border-sidebar-border border-b bg-background">
      <TopBarHeader />
      <Separator className="hidden h-[0.5px] bg-sidebar-border md:block" />
      <BottomBarHeader dictionary={dictionary} />
    </header>
  );
}
