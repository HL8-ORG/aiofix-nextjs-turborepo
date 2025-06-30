'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import type { DictionaryType } from '@/lib/get-dictionary';
import type { LocaleType } from '@/types';

import { FullscreenToggle } from '@/components/layout/full-screen-toggle';
import { ModeDropdown } from '@/components/layout/mode-dropdown';
import { ToggleMobileSidebar } from '@/components/layout/toggle-mobile-sidebar';
import { UserDropdown } from '@/components/layout/user-dropdown';

/**
 * 底部导航栏头部组件
 * @component
 * @description
 * 实现了一个响应式的底部导航栏头部布局,主要包含以下机制:
 * 1. 布局结构:
 *   - 使用container限制内容宽度
 *   - flex布局实现三栏结构(左侧移动菜单、中间Logo、右侧功能区)
 *   - 固定高度14单位,项目间距4单位
 *
 * 2. 响应式设计:
 *   - Logo区域在移动端隐藏(hidden),桌面端显示(lg:flex)
 *   - Logo图片支持暗色模式反转(dark:invert)
 *
 * 3. 功能区域划分:
 *   - 左侧: 移动端侧边栏切换按钮
 *   - 中间: 应用Logo和名称
 *   - 右侧: 全屏切换、主题模式切换、用户下拉菜单
 */
export function BottomBarHeader({
  dictionary,
}: { dictionary: DictionaryType }) {
  const params = useParams();
  const locale = params.lang as LocaleType;

  return (
    <div className="container flex h-14 items-center justify-between gap-4">
      <ToggleMobileSidebar />
      <Link href="/" className="hidden font-black text-foreground lg:flex">
        <Image
          src="/images/icons/shadboard.svg"
          alt=""
          height={24}
          width={24}
          className="dark:invert"
        />
        <span>Shadboard</span>
      </Link>
      <div className="flex gap-2">
        <FullscreenToggle />
        <ModeDropdown dictionary={dictionary} />
        <UserDropdown dictionary={dictionary} locale={locale} />
      </div>
    </div>
  );
}
