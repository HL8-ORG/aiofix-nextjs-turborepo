import type { NavigationType } from '@/types';

/**
 * 导航菜单数据配置
 * @description
 * 定义了一个包含导航菜单项的数据数组,主要包含以下机制:
 * 1. 数据结构:
 *   - 每个导航组都包含title和items两个属性
 *   - title定义导航组的标题
 *   - items数组包含该组下的具体导航项
 *
 * 2. 导航项配置:
 *   - title: 导航项的显示名称
 *   - href: 导航项的链接地址
 *   - iconName: 使用的Lucide图标名称
 *
 * 3. 类型约束:
 *   - 使用NavigationType[]确保数据结构符合预定义的导航类型
 *   - 支持多级导航组的扩展
 */
export const navigationsData: NavigationType[] = [
  {
    title: 'Main',
    items: [
      {
        title: 'Home',
        href: '/',
        iconName: 'House',
      },
    ],
  },
];
