'use client';

import type { DictionaryType } from '@/lib/get-dictionary';
import type { LocaleType } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * 客户端字典获取函数
 */
async function getClientDictionary(
  locale: LocaleType
): Promise<DictionaryType> {
  switch (locale) {
    case 'en':
      return (await import('@/data/dictionaries/en.json')).default;
    case 'zh':
      return (await import('@/data/dictionaries/zh.json')).default;
    // case 'ar':
    //   return (await import('@/data/dictionaries/ar.json')).default;
    default:
      return (await import('@/data/dictionaries/en.json')).default;
  }
}

/**
 * 字典获取 Hook
 *
 * @description
 * 用于在客户端组件中获取字典数据的自定义 Hook
 *
 * @returns {DictionaryType | null} 返回字典数据或 null（加载中）
 *
 * @remarks
 * 主要实现机制:
 * 1. 使用 useParams 获取当前语言参数
 * 2. 使用 useState 管理字典状态
 * 3. 使用 useEffect 异步加载字典数据
 * 4. 支持动态导入不同语言的字典文件
 */
export function useDictionary(): DictionaryType | null {
  const params = useParams();
  const [dictionary, setDictionary] = useState<DictionaryType | null>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      const lang = params.lang as LocaleType;
      const dict = await getClientDictionary(lang);
      setDictionary(dict);
    };

    loadDictionary();
  }, [params.lang]);

  return dictionary;
}
