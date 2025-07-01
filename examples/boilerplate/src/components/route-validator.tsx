'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { i18n } from '@/configs/i18n';

/**
 * 路由验证组件
 *
 * @description
 * 这个组件用于验证当前路由是否有效
 * 如果检测到无效路由（如包含无效语言代码），会重定向到404页面
 */
export function RouteValidator({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  console.log('RouteValidator component loaded');

  useEffect(() => {
    console.log('RouteValidator: checking pathname:', pathname);

    // 检查路径中是否包含无效的语言代码
    const segments = pathname.split('/').filter(Boolean);
    console.log('RouteValidator: segments:', segments);

    // 检查第二个路径段（如果有的话）
    if (segments.length >= 2) {
      const secondSegment = segments[1];
      console.log('RouteValidator: checking second segment:', secondSegment);

      // 如果第二个段看起来像语言代码（2-3个字符），但不是支持的语言，则认为是无效的
      if (
        secondSegment.length >= 2 &&
        secondSegment.length <= 3 &&
        /^[a-z-]+$/i.test(secondSegment)
      ) {
        const isValidLocale = i18n.locales.includes(
          secondSegment as 'en' | 'zh'
        );
        console.log(
          'RouteValidator: isValidLocale:',
          isValidLocale,
          'for segment:',
          secondSegment
        );

        if (!isValidLocale) {
          console.log(
            'Invalid locale detected:',
            secondSegment,
            'in path:',
            pathname
          );
          // 重定向到首页
          router.replace('/en');
          return;
        }
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}
