import createNextIntlPlugin from 'next-intl/plugin';

/**
 * Next.js 国际化插件实例
 *
 * @description
 * 使用 next-intl 创建的插件实例,用于处理多语言路由和翻译
 */
const withNextIntl = createNextIntlPlugin();

/**
 * Next.js 配置对象
 *
 * @description
 * 定义 Next.js 项目的核心配置选项
 *
 * @principle 配置说明
 * 1. 图片配置:
 *    - remotePatterns: 配置允许的远程图片域名
 *    - 根据环境变量 R2_PUBLIC_URL 动态添加 CDN 域名
 *
 * 2. 编译器配置:
 *    - removeConsole: 生产环境移除 console 语句
 *    - 保留 error 级别的日志输出
 *    - 开发环境保留所有 console
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      ...(process.env.R2_PUBLIC_URL
        ? [
            {
              hostname: process.env.R2_PUBLIC_URL.replace('https://', ''),
            },
          ]
        : []),
    ],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error'],
          }
        : false,
  },
};

export default withNextIntl(nextConfig);
