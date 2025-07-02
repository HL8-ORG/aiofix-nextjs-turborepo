import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
/**
 * 国际化请求配置
 * 
 * @description
 * 这是一个用于配置next-intl国际化请求处理的配置函数。
 * 它负责处理语言环境的检测、规范化和消息文件的加载。
 * 
 * @principle 工作原理
 * 1. 语言环境检测机制:
 *    - 从请求中获取语言环境参数
 *    - 对语言代码进行标准化处理
 *    - 支持中文、日文和英文三种主要语言
 * 
 * 2. 语言代码规范化:
 *    - 将以'zh'开头的语言代码统一为'zh'
 *    - 将以'ja'开头的语言代码统一为'ja' 
 *    - 其他语言默认使用'en'
 * 
 * 3. 语言环境验证机制:
 *    - 检查语言代码是否在支持的语言列表中
 *    - 无效语言代码时使用默认语言
 *    - 动态加载对应的语言消息文件
 * 
 * @implements
 * - 使用 next-intl 的 getRequestConfig 配置国际化
 * - 实现语言代码的标准化处理
 * - 支持动态导入语言消息文件
 * - 提供默认语言降级机制
 * 
 * @param {Object} params - 配置参数
 * @param {string} params.requestLocale - 请求中的语言环境参数
 * @returns {Promise<{locale: string, messages: Object}>} 返回语言配置和消息
 */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (locale?.startsWith('zh')) {
    locale = 'zh';
  } else if (locale?.startsWith('ja')) {
    locale = 'ja';
  } else {
    locale = 'en';
  }

  if (!locale || !routing.locales.includes(locale as any)) {
    return {
      locale: routing.defaultLocale,
      messages: (await import(`./messages/${routing.defaultLocale}.json`)).default
    };
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});