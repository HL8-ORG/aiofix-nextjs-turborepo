import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import {
  ensureLocalizedPathname,
  getLocaleFromPathname,
  getPreferredLocale,
  isPathnameMissingLocale,
} from '@/lib/i18n';
import { ensureRedirectPathname, ensureWithoutPrefix } from '@/lib/utils';

/**
 * 执行URL重定向操作的辅助函数
 * @param pathname - 需要重定向的路径
 * @param request - Next.js请求对象
 * @returns NextResponse重定向响应
 */
function redirect(pathname: string, request: NextRequest) {
  // 获取当前URL中的请求参数和hash片段
  const { search, hash } = request.nextUrl;
  // 初始化重定向路径
  let resolvedPathname = pathname;

  // 如果路径缺少语言标识,添加用户偏好的语言标识
  if (isPathnameMissingLocale(pathname)) {
    // 获取用户偏好的语言标识
    const preferredLocale = getPreferredLocale(request);
    // 确保URL路径包含语言标识前缀
    resolvedPathname = ensureLocalizedPathname(pathname, preferredLocale);
  }
  // 保留URL中的查询参数
  if (search) {
    resolvedPathname += search;
  }
  // 保留URL中的hash片段
  if (hash) {
    resolvedPathname += hash;
  }
  // 创建重定向URL
  const redirectUrl = new URL(resolvedPathname, request.url).toString();
  // 返回重定向响应
  return NextResponse.redirect(redirectUrl);
}

/**
 * Next.js中间件函数 - 处理路由拦截、认证和国际化
 * @param request - Next.js请求对象
 * @returns NextResponse响应
 */
export async function middleware(request: NextRequest) {
  // 获取当前URL的路径
  const { pathname } = request.nextUrl;

  // 获取当前URL中的语言标识
  const locale = getLocaleFromPathname(pathname);
  // 移除路径中的语言标识前缀
  const pathnameWithoutLocale = ensureWithoutPrefix(pathname, `/${locale}`);
  // 检查路径是否为公共路由
  const isNotPublic = true;

  // 处理受保护路由和访客路由的认证逻辑
  if (isNotPublic) {
    const token = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    // 检查用户是否已登录
    const isAuthenticated = !!token;
    // 检查路径是否为访客路由
    const isGuest = false;
    // 检查路径是否为受保护路由
    const isProtected = !isGuest;

    // 已登录用户访问访客路由时重定向到首页
    if (isAuthenticated && isGuest) {
      return redirect(process.env.HOME_PATHNAME || '/', request);
    }

    // 未登录用户访问受保护路由时重定向到登录页
    if (!isAuthenticated && isProtected) {
      // let redirectPathname = "/sign-in"
      // TODO: 测试用, 正式环境需要修改为 "/sign-in"
      let redirectPathname = '/';
      // 保存原始路径用于登录后重定向
      if (pathnameWithoutLocale !== '') {
        redirectPathname = ensureRedirectPathname(redirectPathname, pathname);
      }

      return redirect(redirectPathname, request);
    }
  }

  // 如果URL缺少语言标识,进行重定向添加默认语言
  if (!locale) {
    return redirect(pathname, request);
  }

  /**
   * 注意
   * 如果你的首页不是'/',你需要在next.config.mjs中使用redirects()函数配置重定向,
   * 并相应地设置HOME_PATHNAME环境变量。
   *
   * 参考 https://nextjs.org/docs/app/building-your-application/routing/redirecting#redirects-in-nextconfigjs
   */

  return NextResponse.next();
}

/**
 * 中间件配置对象 - 定义需要执行中间件的路由匹配规则
 */
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径,但排除以下路径:
     * - api (API路由)
     * - _next/static (静态文件)
     * - _next/image (图片优化文件)
     * - favicon.ico, sitemap.xml, robots.txt (元数据文件)
     * - images文件夹
     * - docs文件夹
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|docs).*)',
  ],
};
