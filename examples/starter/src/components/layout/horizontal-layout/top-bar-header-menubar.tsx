'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import type { DictionaryType } from '@/lib/get-dictionary';
import type { NavigationNestedItem, NavigationRootItem } from '@/types';

import { navigationsData } from '@/data/navigations';

import { cn, isActivePathname } from '@/lib/utils';

import { DynamicIcon } from '@/components/dynamic-icon';
import { Badge } from '@repo/design-system/components/shadcn-ui/badge';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@repo/design-system/components/shadcn-ui/menubar';
/**
 * 顶部导航栏菜单组件
 * @component
 * @description
 * 实现了一个多级导航菜单栏,主要包含以下机制:
 * 1. 菜单结构:
 *   - 一级菜单: 使用MenubarMenu和MenubarTrigger实现顶层导航项
 *   - 二级菜单: 使用MenubarSub和MenubarSubTrigger实现子菜单
 *   - 菜单项: 支持图标、标题、标签(Badge)的组合展示
 *
 * 2. 路由集成:
 *   - 使用next/navigation的usePathname获取当前路径
 *   - 通过isActivePathname判断菜单项是否处于激活状态
 *   - 菜单项通过Link组件实现路由跳转
 *
 * 3. 渲染逻辑:
 *   - renderMenuItem方法递归处理导航数据
 *   - 区分有子项的菜单(MenubarSub)和叶子节点(Link)
 *   - 支持动态图标渲染和样式定制
 *
 * 4. 样式特点:
 *   - 激活状态使用bg-accent突出显示
 *   - 菜单项使用flex布局和gap控制间距
 *   - 支持最大高度限制和滚动
 */
export function TopBarHeaderMenubar({
  dictionary,
}: {
  dictionary: DictionaryType;
}) {
  const pathname = usePathname();

  const renderMenuItem = (item: NavigationRootItem | NavigationNestedItem) => {
    // If the item has nested items, render it with a MenubarSub.
    if (item.items) {
      return (
        <MenubarSub>
          <MenubarSubTrigger className="gap-2">
            {'iconName' in item && (
              <DynamicIcon name={item.iconName} className="me-2 h-4 w-4" />
            )}
            <span>{item.title}</span>
            {'label' in item && <Badge variant="secondary">{item.label}</Badge>}
          </MenubarSubTrigger>
          <MenubarSubContent className="flex max-h-[90vh] flex-col flex-wrap gap-1">
            {item.items.map((subItem: NavigationNestedItem) => {
              return (
                <MenubarItem key={subItem.title} className="p-0">
                  {renderMenuItem(subItem)}
                </MenubarItem>
              );
            })}
          </MenubarSubContent>
        </MenubarSub>
      );
    }

    // Otherwise, render the item with a link.
    if ('href' in item) {
      const isActive = isActivePathname(item.href, pathname);

      return (
        <MenubarItem asChild>
          <Link
            href={item.href}
            className={cn('w-full gap-2', isActive && 'bg-accent')}
          >
            {'iconName' in item ? (
              <DynamicIcon name={item.iconName} className="h-4 w-4" />
            ) : (
              <DynamicIcon name="Circle" className="h-2 w-2" />
            )}
            <span>{item.title}</span>
            {'label' in item && <Badge variant="secondary">{item.label}</Badge>}
          </Link>
        </MenubarItem>
      );
    }
  };

  return (
    <Menubar className="border-0">
      {navigationsData.map((nav) => (
        <MenubarMenu key={nav.title}>
          <MenubarTrigger>{nav.title}</MenubarTrigger>
          <MenubarContent className="space-y-1">
            {nav.items.map((item) => (
              <Fragment key={item.title}>{renderMenuItem(item)}</Fragment>
            ))}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}
