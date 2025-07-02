'use client';

import { useMedia } from 'react-use';

/**
 * 移动设备断点值(单位:像素)
 * @constant
 * @description 定义移动设备与桌面设备的分界点宽度
 */
const MOBILE_BREAKPOINT = 1024;

/**
 * 移动设备检测Hook
 * @description
 * 用于检测当前设备是否为移动设备的自定义Hook。
 *
 * @returns {boolean} 如果当前设备为移动设备则返回true,否则返回false
 *
 * @remarks
 * 主要实现机制:
 * 1. 使用react-use库的useMedia Hook监听媒体查询
 * 2. 通过max-width媒体查询判断屏幕宽度是否小于移动设备断点值
 * 3. 返回布尔值用于UI组件的响应式渲染
 *
 * 使用场景:
 * - 在需要针对移动设备进行特殊处理的组件中使用
 * - 实现响应式布局和交互的自适应调整
 */
export function useIsMobile() {
  const isMobile = useMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

  return isMobile;
}
