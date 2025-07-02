'use client';

import { remToPx } from '@/lib/utils';

import { useSettings } from '@/hooks/use-settings';

/**
 * 圆角半径获取Hook
 * @description
 * 用于获取应用全局圆角半径设置的自定义Hook。
 *
 * @param {boolean} asPx - 是否将圆角值转换为像素单位,默认为true
 * @returns {number} 返回圆角半径值,根据asPx参数决定返回rem或px单位
 *
 * @remarks
 * 主要实现机制:
 * 1. 使用useSettings Hook获取全局设置中的radius值
 * 2. 将radius字符串转换为数字类型
 * 3. 如果asPx为true,则使用remToPx工具函数将rem单位转换为px单位
 * 4. 返回最终的圆角半径数值
 *
 * 使用场景:
 * - 在需要应用全局一致圆角样式的UI组件中使用
 * - 支持rem和px两种单位的灵活切换
 */
export function useRadius(asPx = true) {
  const { settings } = useSettings();

  let radius = Number(settings.radius);
  if (asPx) {
    radius = remToPx(radius);
  }

  return radius;
}
