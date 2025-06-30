'use client';

import { useMedia } from 'react-use';

import { useSettings } from '@/hooks/use-settings';

/**
 * 暗色模式检测Hook
 * @description
 * 用于检测当前应用是否应该使用暗色模式的自定义Hook。
 *
 * @returns {boolean} 如果应该使用暗色模式则返回true,否则返回false
 *
 * @remarks
 * 主要实现机制:
 * 1. 使用useSettings Hook获取用户的主题设置偏好
 * 2. 使用useMedia Hook检测系统级的暗色模式偏好
 * 3. 根据以下逻辑确定最终的主题模式:
 *    - 如果用户设置为"system",则采用系统偏好
 *    - 如果用户明确设置了"light"或"dark",则使用用户设置
 * 4. 返回布尔值用于主题切换
 *
 * 使用场景:
 * - 在需要根据主题模式调整UI样式的组件中使用
 * - 实现自动/手动切换暗色模式的功能
 */
export function useIsDarkMode() {
  const { settings } = useSettings();
  const isDarkModePreferred = useMedia('(prefers-color-scheme: dark)');

  let resolvedMode = settings.mode;

  if (resolvedMode === 'system') {
    resolvedMode = isDarkModePreferred ? 'dark' : 'light';
  }

  return resolvedMode === 'dark';
}
