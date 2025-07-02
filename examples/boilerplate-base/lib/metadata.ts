import { siteConfig } from '@/config/site'
import { DEFAULT_LOCALE, LOCALE_NAMES, Locale } from '@/i18n/routing'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

/**
 * 元数据属性接口
 * 
 * @description
 * 定义了构建页面元数据所需的属性。
 */
type MetadataProps = {
  page?: string        // 页面名称
  title?: string       // 页面标题
  description?: string // 页面描述
  images?: string[]    // 页面图片列表
  noIndex?: boolean    // 是否禁止搜索引擎索引
  locale: Locale       // 页面语言
  path?: string        // 页面路径
  canonicalUrl?: string // 规范链接
}

/**
 * 构建页面元数据
 * 
 * @description
 * 这是一个用于构建页面元数据的异步函数。
 * 它负责生成符合 Next.js Metadata API 规范的页面元数据,包括标题、描述、Open Graph 和 Twitter 卡片等。
 * 
 * @principle 工作原理
 * 1. 标题构建机制:
 *    - 支持首页和内页不同的标题格式
 *    - 集成多语言标题和标语
 *    - 自动处理标题回退逻辑
 * 
 * 2. 图片处理机制:
 *    - 支持多图片配置
 *    - 自动处理相对和绝对路径
 *    - 提供默认图片回退
 * 
 * 3. 多语言支持机制:
 *    - 自动构建语言切换链接
 *    - 处理默认语言的URL前缀
 *    - 支持规范链接的多语言版本
 * 
 * 4. SEO优化机制:
 *    - 配置Open Graph协议支持
 *    - 配置Twitter卡片支持
 *    - 管理搜索引擎索引行为
 * 
 * @implements
 * - 使用 next-intl 实现多语言支持
 * - 实现 Open Graph 协议支持
 * - 实现 Twitter 卡片支持
 * - 支持搜索引擎优化配置
 * 
 * @param {MetadataProps} props - 元数据配置属性
 * @returns {Promise<Metadata>} 返回格式化的页面元数据
 */
export async function constructMetadata({
  page = 'Home',
  title,
  description,
  images = [],
  noIndex = false,
  locale,
  path,
  canonicalUrl,
}: MetadataProps): Promise<Metadata> {
  // 获取翻译函数
  const t = await getTranslations({ locale, namespace: 'Home' })

  // 获取页面特定的元数据翻译
  const pageTitle = title || t(`title`)
  const pageDescription = description || t(`description`)

  // 构建完整标题
  const finalTitle = page === 'Home'
    ? `${pageTitle} - ${t('tagLine')}`
    : `${pageTitle} | ${t('title')}`

  // 构建图片URL列表
  const imageUrls = images.length > 0
    ? images.map(img => ({
      url: img.startsWith('http') ? img : `${siteConfig.url}/${img}`,
      alt: pageTitle,
    }))
    : [{
      url: `${siteConfig.url}/og.png`,
      alt: pageTitle,
    }]

  // 构建Open Graph站点URL
  const pageURL = `${locale === DEFAULT_LOCALE ? '' : locale}${path}` || siteConfig.url

  // 构建备用语言链接
  const alternateLanguages = Object.keys(LOCALE_NAMES).reduce((acc, lang) => {
    const path = canonicalUrl
      ? `${lang === DEFAULT_LOCALE ? '' : `/${lang}`}${canonicalUrl === '/' ? '' : canonicalUrl}`
      : `${lang === DEFAULT_LOCALE ? '' : `/${lang}`}`
    acc[lang] = `${siteConfig.url}${path}`

    return acc
  }, {} as Record<string, string>)

  return {
    title: finalTitle,
    description: pageDescription,
    keywords: [],
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl ? `${siteConfig.url}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${canonicalUrl === '/' ? '' : canonicalUrl}` : undefined,
      languages: alternateLanguages,
    },
    openGraph: {
      type: 'website',
      title: finalTitle,
      description: pageDescription,
      url: pageURL,
      siteName: t('title'),
      locale: locale,
      images: imageUrls,
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: pageDescription,
      site: `${siteConfig.url}${pageURL === '/' ? '' : pageURL}`,
      images: imageUrls,
      creator: siteConfig.creator,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  }
}