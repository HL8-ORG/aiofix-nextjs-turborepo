'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { useCookie } from 'react-use';

import type { LocaleType, SettingsType } from '@/types';
import type { ReactNode } from 'react';
/**
 * 默认设置配置对象
 * @property {string} theme - 主题名称，默认为"zinc"
 * @property {string} mode - 显示模式，默认为"system"跟随系统
 * @property {number} radius - 圆角大小，默认0.5
 * @property {string} layout - 布局方式，默认为"vertical"垂直布局
 * @property {string} locale - 语言设置，默认为"en"英文
 */
export const defaultSettings: SettingsType = {
  theme: 'zinc',
  mode: 'system',
  radius: 0.5,
  layout: 'vertical',
  locale: 'en',
};

/**
 * 设置上下文对象
 * 提供全局的设置状态和更新方法
 */
export const SettingsContext = createContext<
  | {
      settings: SettingsType;
      updateSettings: (newSettings: SettingsType) => void;
      resetSettings: () => void;
    }
  | undefined
>(undefined);

/**
 * 设置提供者组件
 * @param {LocaleType} locale - 初始语言设置
 * @param {ReactNode} children - 子组件
 *
 * @description
 * 该组件通过React Context API提供全局设置状态管理
 * 使用Cookie存储设置信息,在组件初始化时会:
 * 1. 尝试从Cookie中读取已存储的设置
 * 2. 如果Cookie中有设置则使用已存储的设置
 * 3. 如果没有则使用默认设置和传入的locale参数创建新设置
 */
export function SettingsProvider({
  locale,
  children,
}: {
  locale: LocaleType;
  children: ReactNode;
}) {
  // 使用Cookie存储设置
  const [storedSettings, setStoredSettings, deleteStoredSettings] =
    useCookie('settings');
  // 设置状态
  const [settings, setSettings] = useState<SettingsType | null>(null);

  // 初始化设置
  useEffect(() => {
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    } else {
      setSettings({ ...defaultSettings, locale });
    }
  }, [storedSettings, locale]);

  /**
   * 更新设置
   * 将新设置同时更新到Cookie和状态中
   */
  const updateSettings = useCallback(
    (newSettings: SettingsType) => {
      setStoredSettings(JSON.stringify(newSettings));
      setSettings(newSettings);
    },
    [setStoredSettings]
  );

  /**
   * 重置设置
   * 清除Cookie并恢复默认设置
   */
  const resetSettings = useCallback(() => {
    deleteStoredSettings();
    setSettings(defaultSettings);
  }, [deleteStoredSettings]);

  // 仅在设置加载完成后渲染子组件
  if (!settings) {
    return null;
  }

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
