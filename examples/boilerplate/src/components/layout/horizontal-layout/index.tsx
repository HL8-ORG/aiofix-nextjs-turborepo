import type { DictionaryType } from '@/lib/get-dictionary';
import type { ReactNode } from 'react';

import { Footer } from '../footer';
import { Sidebar } from '../sidebar';
import { HorizontalLayoutHeader } from './horizontal-layout-header';

/**
 * 水平布局组件
 * @component
 * @description
 * 实现了一个水平布局的页面结构,主要包含以下机制:
 * 1. 布局结构:
 *   - 使用Fragment包裹整体布局
 *   - 左侧为固定的侧边栏(Sidebar)
 *   - 右侧为主体内容区域,包含:
 *     - 顶部导航栏(HorizontalLayoutHeader)
 *     - 主内容区域(main)
 *     - 底部页脚(Footer)
 *
 * 2. 主体内容区域特点:
 *   - 宽度设置为100%(w-full)铺满容器
 *   - 主内容区域设置最小高度为视口高度减去顶部和底部高度(9.85rem)
 *   - 使用bg-muted/40设置40%透明度的背景色
 *
 * 3. 组件组合:
 *   - 通过children属性注入主要内容
 *   - 集成了Sidebar、HorizontalLayoutHeader和Footer等布局组件
 *
 * @param {Object} props - 组件属性
 * @param {ReactNode} props.children - 子组件内容
 * @param {DictionaryType} props.dictionary - 字典数据
 */
export function HorizontalLayout({
  children,
  dictionary,
}: {
  children: ReactNode;
  dictionary: DictionaryType;
}) {
  return (
    <>
      <Sidebar dictionary={dictionary} />
      <div className="w-full">
        <HorizontalLayoutHeader dictionary={dictionary} />
        <main className="min-h-[calc(100svh-9.85rem)] bg-muted/40">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
