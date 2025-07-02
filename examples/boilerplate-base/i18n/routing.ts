import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
/**
 * 国际化路由配置
 * 
 * @description
 * 这是一个用于配置next-intl国际化路由的配置文件。
 * 它负责处理多语言路由、语言切换、URL前缀等核心功能。
 * 
 * @principle 工作原理
 * 1. 语言配置机制:
 *    - 支持英文、中文和日文三种主要语言
 *    - 使用语言代码标识不同语言版本
 *    - 提供语言名称的本地化显示
 * 
 * 2. 路由配置机制:
 *    - 使用 next-intl 的 defineRouting 配置路由
 *    - 支持自动语言检测功能
 *    - 实现智能的URL语言前缀处理
 * 
 * 3. 导航工具集成:
 *    - 封装 Next.js 的导航API
 *    - 提供多语言感知的导航组件
 *    - 支持路径解析和重定向功能
 * 
 * @implements
 * - 使用 next-intl 实现国际化路由
 * - 支持自动语言检测
 * - 提供统一的导航API
 * - 实现类型安全的语言配置
 */

export const LOCALES = ['en', 'zh', 'ja']
export const DEFAULT_LOCALE = 'en'
export const LOCALE_NAMES: Record<string, string> = {
  'en': "English",
  'zh': "中文",
  'ja': "日本語",
};

export const routing = defineRouting({
  // 支持的所有语言列表
  locales: LOCALES,

  // 当没有匹配的语言时使用的默认语言
  defaultLocale: DEFAULT_LOCALE,

  // 是否启用自动语言检测
  localeDetection: process.env.NEXT_PUBLIC_LOCALE_DETECTION === 'true',

  // URL语言前缀策略: 仅在必要时显示
  localePrefix: 'as-needed',
});

// 封装 Next.js 导航API的轻量级工具
// 这些工具会考虑路由配置进行相应处理
export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);

// 导出语言类型定义
export type Locale = (typeof routing.locales)[number];
