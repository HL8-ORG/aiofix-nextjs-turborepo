'use client';

import { AlertTriangle, LoaderCircle, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

import { useDictionary } from '@/hooks/use-dictionary';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@repo/design-system/components/shadcn-ui/alert';
import { Button } from '@repo/design-system/components/shadcn-ui/button';

/**
 * 全局错误处理组件
 *
 * @description
 * 用于处理和展示应用程序级别的错误信息
 *
 * @mechanism
 * 1. 错误处理:
 *    - 接收error对象和reset函数作为props
 *    - 使用useEffect在组件挂载时记录错误信息
 *    - 通过reset函数提供重试机制
 *
 * 2. 界面展示:
 *    - 使用div组件作为错误信息的容器
 *    - 采用居中布局确保错误信息在页面正中显示
 *    - 通过Alert组件突出显示具体错误信息
 *
 * 3. 用户交互:
 *    - 提供"重试"按钮允许用户尝试恢复
 *    - 使用动画图标增强交互反馈
 *
 * 4. 国际化支持:
 *    - 使用useDictionary hook获取字典数据
 *    - 根据当前语言显示相应的错误信息
 *
 * @param {Error & { digest?: string }} error - 错误对象,包含错误信息和可选的错误摘要
 * @param {() => void} reset - 重置函数,用于重试操作
 * @returns {JSX.Element} 渲染错误展示界面
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const dictionary = useDictionary();

  useEffect(() => {
    // 记录错误信息到错误报告服务
    console.error(error);
  }, [error]);

  // 如果字典还在加载中，显示加载状态
  if (!dictionary) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
        <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-black text-red-600 md:text-6xl">
          {dictionary.errors.globalError.title}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {dictionary.errors.globalError.description}
        </p>
        <div className="mt-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{dictionary.errors.globalError.errorTitle}</AlertTitle>
            <AlertDescription>
              {error.message || dictionary.errors.globalError.defaultMessage}
            </AlertDescription>
          </Alert>
        </div>
        <div className="mt-8">
          <Button onClick={reset} variant="outline" size="lg">
            <RefreshCw className="mr-2 h-4 w-4" />
            {dictionary.errors.globalError.tryAgain}
          </Button>
        </div>
      </div>
    </div>
  );
}
