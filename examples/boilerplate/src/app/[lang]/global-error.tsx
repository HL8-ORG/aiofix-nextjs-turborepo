'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

import { useDictionary } from '@/hooks/use-dictionary';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@repo/design-system/components/shadcn-ui/alert';
import { Button } from '@repo/design-system/components/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/shadcn-ui/card';

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
 *    - 使用Card组件作为错误信息的容器
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center font-bold text-2xl text-red-600">
            {dictionary.errors.globalError.title}
          </CardTitle>
          <CardDescription className="text-center">
            {dictionary.errors.globalError.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{dictionary.errors.globalError.errorTitle}</AlertTitle>
            <AlertDescription>
              {error.message || dictionary.errors.globalError.defaultMessage}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={reset} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />{' '}
            {dictionary.errors.globalError.tryAgain}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
