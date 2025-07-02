import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * 国际化中间件配置
 *
 * @description
 * 使用 next-intl 创建的中间件,用于处理多语言路由和重定向
 *
 * @principle 工作原理
 * 1. 路由匹配规则:
 *    - 根路径('/')重定向到对应语言
 *    - 语言前缀路径记录语言偏好
 *    - 无语言前缀路径重定向到默认语言
 *
 * 2. Cookie 处理:
 *    - 记住用户上次选择的语言偏好
 *    - 用于后续访问时的自动语言选择
 *
 * @returns {Middleware} 返回配置好的国际化中间件
 */
export default createMiddleware(routing);

export const config = {
  matcher: [
    // 根路径匹配 - 重定向到对应语言版本
    '/',

    // 带语言前缀的路径 - 设置 cookie 记住语言选择
    '/(en|zh|ja)/:path*',

    // 无语言前缀路径的处理 - 添加默认语言前缀
    // 例如: /pathnames -> /en/pathnames

    // 匹配所有路径,除了 api, _next, _vercel, 文件名, 和 favicon.ico
    '/((?!api|_next|_vercel|.*\\.|favicon.ico).*)',
  ],
};
