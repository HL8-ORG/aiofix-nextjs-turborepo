'use client';

import { useSettings } from '@/hooks/use-settings';

/**
 * 垂直布局检测Hook
 * @description
 * 用于检测当前应用布局是否为垂直布局的自定义Hook。
 *
 * @returns {boolean} 如果当前布局为垂直布局则返回true,否则返回false
 *
 * @remarks
 * 主要实现机制:
 * 1. 使用useSettings Hook获取全局设置状态
 * 2. 检查settings.layout是否为"vertical"
 * 3. 返回布尔值用于UI组件的条件渲染
 *
 * 使用场景:
 * - 在需要根据布局方向调整组件显示的场合
 * - 支持垂直和水平两种布局模式的切换
 */
export function useIsVertical() {
  const { settings } = useSettings();

  const isVertical = settings.layout === 'vertical';
  return isVertical;
}
