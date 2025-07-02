import { getSessionCookie } from 'better-auth/cookies';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

// 公共路由 - 不需要身份验证
const publicRoutes = ['/', '/sign-in', '/sign-up', '/api/auth'];
// 受保护路由 - 需要身份验证
const protectedRoutes = ['/dashboard'];

/**
 * 综合中间件配置
 *
 * @description
 * 合并了Better-auth身份认证和next-intl国际化的中间件
 * 用于处理多语言路由、身份验证和重定向
 *
 * @principle 工作原理
 * 1. 身份验证处理:
 *    - 检查受保护路由的访问权限
 *    - 未登录用户重定向到登录页面
 *    - 已登录用户访问登录/注册页面时重定向到仪表板
 *
 * 2. 国际化路由处理:
 *    - 根路径重定向到对应语言
 *    - 语言前缀路径记录语言偏好
 *    - 无语言前缀路径重定向到默认语言
 *
 * 3. Cookie 处理:
 *    - 记住用户语言偏好
 *    - 处理身份验证会话
 *
 * @param {NextRequest} request - Next.js请求对象
 * @returns {NextResponse} 返回处理后的响应
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过API路由和静态资源的身份验证检查
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/_vercel/')
  ) {
    return NextResponse.next();
  }

  // 获取身份验证会话
  const sessionCookie = getSessionCookie(request);

  // 检查是否为公共路由（排除语言前缀）
  const pathWithoutLocale = pathname.replace(/^\/(en|zh|ja)/, '') || '/';
  const isPublicRoute = publicRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  // 检查是否为受保护路由（排除语言前缀）
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  );

  // 身份验证逻辑处理
  if (!sessionCookie && isProtectedRoute) {
    // 未登录用户访问受保护路由，重定向到登录页面
    // 保持当前语言前缀
    const locale = pathname.match(/^\/(en|zh|ja)/)?.[1] || 'en';
    return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
  }

  if (
    sessionCookie &&
    (pathWithoutLocale === '/sign-in' || pathWithoutLocale === '/sign-up')
  ) {
    // 已登录用户访问登录/注册页面，重定向到仪表板
    // 保持当前语言前缀
    const locale = pathname.match(/^\/(en|zh|ja)/)?.[1] || 'en';
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // 创建国际化中间件实例并处理路由
  const intlMiddleware = createMiddleware(routing);
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // 根路径匹配 - 重定向到对应语言版本
    '/',

    // 带语言前缀的路径 - 设置 cookie 记住语言选择
    '/(en|zh|ja)/:path*',

    // 匹配所有路径,除了 api, _next, _vercel, 文件名, 和 favicon.ico
    '/((?!api|_next|_vercel|.*\\.|favicon.ico).*)',
  ],
};
