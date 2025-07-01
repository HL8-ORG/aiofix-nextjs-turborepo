import { NotFound404 } from '@/components/pages/not-found-404';

/**
 * Next.js 404 页面
 *
 * @description
 * 当用户访问不存在的页面时，Next.js 会自动渲染这个组件
 * 使用支持国际化的 NotFound404 组件来显示 404 错误页面
 *
 * @returns {JSX.Element} 渲染 404 页面组件
 */
export default function NotFound() {
  return <NotFound404 />;
}
