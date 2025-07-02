import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';
/**
 * 键盘快捷键显示组件
 * @component
 * @description
 * 实现了一个用于显示键盘快捷键的组件,主要包含以下机制:
 * 1. 样式设计:
 *   - 使用inline-flex布局实现内联元素的弹性布局
 *   - 固定高度为5单位(h-5)
 *   - 禁用鼠标事件(pointer-events-none)和文本选择(select-none)
 *   - 圆角边框(rounded-sm)和背景色(bg-muted)
 *   - 等宽字体(font-mono)和柔和文字颜色(text-muted-foreground)
 *
 * 2. 特殊功能:
 *   - 使用before伪元素自动添加⌘符号
 *   - 支持通过className属性扩展样式
 *   - 使用data-slot属性标记组件类型
 *
 * 3. 属性处理:
 *   - 继承原生kbd元素的所有属性
 *   - 使用cn工具函数合并className
 *   - 支持传入子元素显示快捷键内容
 *
 * @param {Object} props - 组件属性
 * @param {string} [props.className] - 自定义CSS类名
 * @param {ReactNode} props.children - 子元素内容
 */
export function Keyboard({
  className,
  children,
  ...props
}: ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="keyboard"
      className={cn(
        'pointer-events-none inline-flex h-5 select-none items-center gap-x-1 rounded-sm border bg-muted px-1.5 font-mono text-muted-foreground text-sm',
        "before:content-['⌘']",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
