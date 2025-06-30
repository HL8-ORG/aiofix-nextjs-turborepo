import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import type { LocaleType } from '@/types';
import type { NextRequest } from 'next/server';

import { i18n } from '@/configs/i18n';
import { ensureWithPrefix } from '@/lib/utils';

/**
 * 检查URL路径是否缺少语言标识前缀
 * @param pathname - 需要检查的URL路径
 * @returns 如果路径缺少语言标识则返回true,否则返回false
 * @description 通过检查路径是否以任一支持的语言代码开头来判断
 * some() 是 JavaScript 数组的一个内置方法，用于检查数组中是否至少有一个元素满足指定的条件。
 * 如果找到满足条件的元素，立即返回 true；如果所有元素都不满足条件，返回 false。
 */
export function isPathnameMissingLocale(pathname: string) {
  return !i18n.locales.some((locale) => pathname.startsWith(`/${locale}`));
}

/**
 * 从URL路径中提取语言标识
 * @param pathname - URL路径
 * @returns 返回路径中的语言标识,如果没有找到则返回undefined
 * @description 查找路径开头是否匹配任一支持的语言代码
 * find() 是 JavaScript 数组的一个内置方法，用于查找数组中第一个满足指定条件的元素。
 * 如果找到满足条件的元素，立即返回该元素；如果所有元素都不满足条件，返回 undefined。
 */
export function getLocaleFromPathname(pathname: string) {
  return i18n.locales.find((locale) => pathname.startsWith(`/${locale}`));
}

/**
 * 确保URL路径包含语言标识前缀
 * @param pathname - 原始URL路径
 * @param locale - 要添加的语言标识
 * @returns 返回带有语言标识前缀的URL路径
 * @throws 如果pathname或locale为空则抛出错误
 * @description 如果路径缺少语言标识,则在路径前添加语言标识;否则返回原始路径
 */
export function ensureLocalizedPathname(pathname: string, locale: string) {
  if (!pathname || !locale) {
    throw new Error('Pathname or Locale cannot be empty');
  }

  return isPathnameMissingLocale(pathname)
    ? `${ensureWithPrefix(locale, '/')}${ensureWithPrefix(pathname, '/')}`
    : pathname;
}

/**
 * 替换URL路径中的语言标识
 * @param pathname - 原始URL路径
 * @param locale - 新的语言标识
 * @returns 返回更新语言标识后的URL路径
 * @throws 如果pathname或locale为空则抛出错误
 * @description 将路径按/分割,替换第一个段落(语言标识),然后重新组合
 */
export function relocalizePathname(pathname: string, locale: string) {
  if (!pathname || !locale) {
    throw new Error('Pathname or Locale cannot be empty');
  }

  const segments = pathname.split('/');
  segments[1] = locale;

  return segments.join('/');
}

/**
 * 获取用户偏好的语言设置
 * @param request - Next.js请求对象
 * @returns 返回确定的语言标识
 * @description 按以下优先级获取语言设置:
 * 1. 从cookie中读取用户设置的语言
 * 2. 从请求头Accept-Language解析用户浏览器语言偏好
 * 3. 匹配支持的语言列表,如果都不匹配则使用默认语言
 */
export function getPreferredLocale(request: NextRequest) {
  // 从cookie中读取用户设置的语言
  const settingsCookie = request.cookies.get('settings')?.value;
  try {
    const parsedSettingsCookie = settingsCookie && JSON.parse(settingsCookie);

    if (parsedSettingsCookie?.locale) {
      return parsedSettingsCookie.locale as LocaleType;
    }
  } catch (error) {
    console.error('Failed to parse settings cookie', error);
  }

  // 从请求头Accept-Language解析用户浏览器语言偏好
  const supportedLocales = [...i18n.locales];
  const preferredLocales = new Negotiator({
    headers: Object.fromEntries(request.headers.entries()),
  }).languages(supportedLocales);

  const locale = match(preferredLocales, supportedLocales, i18n.defaultLocale);

  return locale as LocaleType;
}
