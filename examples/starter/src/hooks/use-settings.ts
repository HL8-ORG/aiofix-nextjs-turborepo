'use client';

import { useContext } from 'react';

import { SettingsContext } from '@/contexts/settings-context';

/**
 * 全局设置获取Hook
 * @description
 * 用于获取和管理应用全局设置状态的自定义Hook。
 *
 * @returns {SettingsContextType} 返回包含全局设置状态和更新方法的上下文对象
 * @throws {Error} 如果在SettingsProvider外部使用则抛出错误
 *
 * @remarks
 * 主要实现机制:
 * 1. 使用React的useContext Hook获取SettingsContext中的状态
 * 2. 进行空值检查确保Hook在Provider内部使用
 * 3. 返回包含以下内容的上下文对象:
 *    - settings: 全局设置状态对象
 *    - updateSettings: 更新设置的方法
 *
 * 使用场景:
 * - 在需要访问或修改全局设置的组件中使用
 * - 用于主题、布局、语言等全局配置的状态管理
 */
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
