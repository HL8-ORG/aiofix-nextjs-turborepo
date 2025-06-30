// Refer to Lucide documentation for more details https://lucide.dev/guide/packages/lucide-react
import { icons } from 'lucide-react';

import type { DynamicIconNameType } from '@/types';
import type { LucideProps } from 'lucide-react';

/**
 * 动态图标组件的属性接口
 * @interface
 * @extends LucideProps - 继承自Lucide图标库的基础属性
 * @property {DynamicIconNameType} name - 图标名称,用于动态加载对应的图标组件
 */
interface DynamicIconProps extends LucideProps {
  name: DynamicIconNameType;
}

/**
 * 动态图标组件
 * @component
 * @description
 * 实现了一个动态加载Lucide图标的组件,主要包含以下机制:
 * 1. 动态加载:
 *   - 通过icons对象索引获取对应的图标组件
 *   - 支持所有Lucide库中的图标动态渲染
 *
 * 2. 属性传递:
 *   - 使用解构赋值获取name和其他props
 *   - 将剩余props透传给图标组件
 *
 * 3. 错误处理:
 *   - 当图标名称无效时返回null
 *   - 避免渲染未知图标导致的运行时错误
 *
 * @param {DynamicIconProps} props - 组件属性
 * @param {DynamicIconNameType} props.name - 要渲染的图标名称
 * @returns {ReactElement | null} 返回图标组件或null
 */
export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // 从icons对象中动态获取对应的图标组件
  const LucideIcon = icons[name];

  // 当图标名称无效时返回null
  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon {...props} />;
}
