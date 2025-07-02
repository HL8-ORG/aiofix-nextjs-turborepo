'use client';

import { useDirection } from '@radix-ui/react-direction';

/**
 * RTL方向检测Hook
 * @description
 * 用于检测当前文档的阅读方向是否为从右到左(RTL)的自定义Hook。
 *
 * @returns {boolean} 如果文档方向为RTL则返回true,否则返回false
 *
 * @remarks
 * 主要实现机制:
 * 1. 使用Radix UI提供的useDirection Hook获取当前文档方向
 * 2. 将direction与"rtl"进行比较,确定是否为RTL方向
 * 3. 返回布尔值用于UI组件的条件渲染
 *
 * 使用场景:
 * - 在需要根据文档阅读方向调整布局的组件中使用
 * - 支持阿拉伯语等从右到左书写的语言场景
 */
export function useIsRtl() {
  const direction = useDirection();

  const isRtl = direction === 'rtl';
  return isRtl;
}
