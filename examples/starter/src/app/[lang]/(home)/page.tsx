'use client';

import { Header } from '@/components/header';
import { useDictionary } from '@/hooks/use-dictionary';
import { Button } from '@repo/design-system/components/shadcn-ui/button';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

/**
 * 动画变体配置对象
 *
 * @description
 * 使用 Framer Motion 的变体(variants)系统来定义动画状态
 * - hidden: 初始隐藏状态,内容位于屏幕下方2000px处且完全透明
 * - visible: 最终显示状态,内容回到原位且完全不透明
 *
 * @mechanism
 * 1. 通过 y 属性控制垂直位移
 * 2. 通过 opacity 属性控制透明度
 * 3. transition 配置使用弹簧动画:
 *    - type: 'spring' 指定使用弹簧动画
 *    - stiffness: 100 控制弹簧刚度
 *    - damping: 30 控制弹簧阻尼
 *
 * @constant {const} CONTENT_VARIANTS
 */
const CONTENT_VARIANTS = {
  hidden: {
    y: 2000,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 30 },
  },
} as const;
/**
 * 着陆页组件
 *
 * @description
 * 实现带有动画过渡效果的着陆页,包含页头和内容区域
 *
 * @mechanism
 * 1. 状态管理:
 *    - transition: 控制动画过渡状态
 *    - isLoaded: 控制页面加载完成状态
 *
 * 2. 生命周期:
 *    - 组件挂载后通过定时器触发两个状态变更:
 *      a. 2秒后触发transition动画
 *      b. 3秒后标记页面加载完成
 *    - 组件卸载时清理定时器避免内存泄漏
 *
 * 3. 动画实现:
 *    - 使用Framer Motion实现内容区域的动画效果
 *    - 根据transition状态切换动画变体
 *    - 动画配置在CONTENT_VARIANTS中定义
 *
 * 4. 布局结构:
 *    - 主容器采用flex布局并垂直居中
 *    - 内容区域包含一个可点击跳转的按钮
 *
 * 5. 国际化支持:
 *    - 使用 useDictionary hook 获取字典数据
 *    - 根据当前语言显示相应的按钮文本
 *
 * @returns {JSX.Element} 渲染着陆页组件
 */
export default function LandingPage() {
  const [transition, setTransition] = useState(false);
  const [_isLoaded, setIsLoaded] = useState(false);
  const dictionary = useDictionary();

  useEffect(() => {
    const timer = setTimeout(() => setTransition(true), 2000);
    const timer2 = setTimeout(() => setIsLoaded(true), 3000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className="h-dvh w-full flex items-center">
      <Header transition={transition} />

      <motion.div
        variants={CONTENT_VARIANTS}
        initial="hidden"
        animate={transition ? 'visible' : 'hidden'}
        className="w-full"
      >
        <div className="flex flex-col items-center justify-center">
          <Button
            onClick={() => {
              window.location.href = '/dashboard/kanban';
            }}
          >
            {dictionary?.landing?.ctaButton || 'Click me'}
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
