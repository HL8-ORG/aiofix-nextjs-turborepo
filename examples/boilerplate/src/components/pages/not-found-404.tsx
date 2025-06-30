import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@repo/design-system/components/shadcn-ui/button';

/**
 * 404页面组件
 * @component
 * @description
 * 实现了一个响应式的404错误页面,主要包含以下机制:
 * 1. 布局结构:
 *   - 使用flex布局实现垂直居中对齐
 *   - 最小高度设置为视口高度(min-h-screen)确保页面填充
 *   - 内容采用flex-col垂直排列,间距为gap-y-6
 *
 * 2. 响应式设计:
 *   - 移动端:
 *     - 图片和文字垂直排列(flex-col-reverse)
 *     - 文字居中对齐(text-center)
 *   - 桌面端(md):
 *     - 图片和文字水平排列(md:flex-row)
 *     - 文字左对齐(md:text-start)
 *
 * 3. 视觉元素:
 *   - 使用next/image加载SVG插图,设置priority优先加载
 *   - 404标题使用大号字体(text-6xl)和加粗样式(font-black)
 *   - 错误说明文字使用柔和前景色(text-muted-foreground)
 *
 * 4. 交互功能:
 *   - 底部提供返回首页的按钮链接
 *   - 按钮使用大尺寸(size="lg")样式
 */
export function NotFound404() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-6 bg-background p-4 text-center text-foreground">
      <div className="flex flex-col-reverse items-center justify-center gap-y-6 md:flex-row md:text-start">
        <Image
          src="/images/illustrations/characters/character-02.svg"
          alt=""
          height={232}
          width={249}
          priority
        />

        <h1 className="inline-grid font-black text-6xl">
          404 <span className="font-semibold text-3xl">Page Not Found</span>
        </h1>
      </div>
      <p className="max-w-prose text-muted-foreground text-xl">
        We couldn&apos;t find the page you&apos;re looking for. It might have
        been moved or doesn&apos;t exist.
      </p>
      <Button size="lg" asChild>
        <Link href="/">Home Page</Link>
      </Button>
    </div>
  );
}
