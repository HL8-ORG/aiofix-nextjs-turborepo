'use client';

import { useDictionary } from '@/hooks/use-dictionary';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@repo/design-system/components/shadcn-ui/button';

/**
 * 页面底部组件
 * @returns 渲染页面底部的 React 组件
 * @description
 * 实现机制:
 * 1. 使用 Date 对象获取当前年份
 * 2. 采用 flex 布局实现两端对齐的页脚内容
 * 3. 通过 Tailwind CSS 实现响应式设计:
 *    - md 断点前使用较小字体(text-xs)
 *    - md 断点后使用稍大字体(text-sm)
 * 4. 使用 buttonVariants 和 cn 工具函数组合链接样式:
 *    - variant:'link' 提供基础链接样式
 *    - 'inline p-0' 确保链接内联显示且无内边距
 * 5. 链接使用 target="_blank" 和 rel="noopener noreferrer" 确保安全性
 * 6. 国际化支持:
 *    - 使用 useDictionary hook 获取字典数据
 *    - 根据当前语言显示相应的页脚信息
 */
export function Footer() {
  const dictionary = useDictionary();

  // 获取当前时间的年份
  const currentYear = new Date().getFullYear();

  // 如果字典还在加载中，显示默认内容
  if (!dictionary) {
    return (
      <footer className="border-sidebar-border border-t bg-background">
        <div className="container flex items-center justify-between p-4 md:px-6">
          <p className="text-muted-foreground text-xs md:text-sm">
            © {currentYear}{' '}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'link' }), 'inline p-0')}
            >
              Shadboard
            </a>
            .
          </p>
          <p className="text-muted-foreground text-xs md:text-sm">
            Designed & Developed by{' '}
            <a
              href="https://github.com/Qualiora"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'link' }), 'inline p-0')}
            >
              Qualiora
            </a>
            .
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-sidebar-border border-t bg-background">
      <div className="container flex items-center justify-between p-4 md:px-6">
        <p className="text-muted-foreground text-xs md:text-sm">
          © {currentYear}{' '}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'link' }), 'inline p-0')}
          >
            {dictionary.footer.appName}
          </a>
          .
        </p>
        <p className="text-muted-foreground text-xs md:text-sm">
          {dictionary.footer.designedBy}{' '}
          <a
            href="https://github.com/Qualiora"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'link' }), 'inline p-0')}
          >
            Qualiora
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
