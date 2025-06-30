// More info: https://nextjs.org/docs/app/building-your-application/routing/internationalization#localization
import 'server-only';

import type { LocaleType } from '@/types';

/**
 * 字典文件映射对象
 *
 * @description
 * 该对象为每种支持的语言提供一个动态导入函数。使用动态导入可以实现:
 * - 按需加载: 只在需要时才加载对应语言的字典文件
 * - 代码分割: 每个语言包会被打包为独立的chunk
 */
const dictionaries = {
  en: () =>
    import('@/data/dictionaries/en.json').then((module) => module.default),
  zh: () =>
    import('@/data/dictionaries/zh.json').then((module) => module.default),
  ar: () =>
    import('@/data/dictionaries/ar.json').then((module) => module.default),
};

/**
 * 获取指定语言的字典数据
 *
 * @param locale - 目标语言代码
 * @returns 返回对应语言的字典数据Promise
 *
 * @description
 * 该函数通过传入的locale参数:
 * 1. 从dictionaries中获取对应语言的加载函数
 * 2. 执行该函数动态导入字典文件
 * 3. 返回解析后的字典数据
 */
export async function getDictionary(locale: LocaleType) {
  return dictionaries[locale]();
}

/**
 * 字典数据类型
 *
 * @description
 * 使用 Awaited 工具类型获取异步函数的返回值类型
 * ReturnType<typeof getDictionary> 获取 getDictionary 函数的返回类型(Promise)
 * Awaited 进一步解析 Promise 的值类型,得到最终的字典数据类型
 */
export type DictionaryType = Awaited<ReturnType<typeof getDictionary>>;
