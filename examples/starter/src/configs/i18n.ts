/**
 * 国际化配置对象
 *
 * @description
 * 该配置用于管理应用的国际化(i18n)设置，包含以下机制:
 * - 通过 defaultLocale 设置默认语言
 * - locales 数组定义支持的所有语言
 * - localeDirection 对象定义每种语言的文字方向(LTR/RTL)
 * - localeNames 对象定义每种语言的显示名称
 *
 * @remarks
 * - LTR (Left to Right): 从左到右的文字方向，如英文
 * - RTL (Right to Left): 从右到左的文字方向，如阿拉伯文
 */
export const i18n = {
  /** 默认语言设置为英文 */
  defaultLocale: 'en',
  /** 支持的语言列表: 英文和阿拉伯文 */
  locales: ['en', 'zh'],
  /**
   * 语言的文字方向配置
   * en: 从左到右(LTR)
   * ar: 从右到左(RTL)
   */
  localeDirection: {
    en: 'ltr',
    zh: 'ltr',
    // ar: 'rtl',
  },
  /** 语言的显示名称映射 */
  localeNames: {
    en: 'english',
    zh: 'chinese',
    // ar: 'arabic',
  },
} as const;

/**
 * `as const` 是 TypeScript 中的一个类型断言，它的作用是让 TypeScript 将对象的所有属性推断为**只读的字面量类型**，而不是更宽泛的类型。

让我用你的代码来解释：

```typescript
export const i18n = {
  defaultLocale: "en",
  locales: ["en", "ar"],
  localeDirection: {
    en: "ltr",
    ar: "rtl",
  },
  localeNames: {
    en: "english",
    ar: "arabic",
  },
} as const
```

## 不使用 `as const` 的情况：

```typescript
// TypeScript 会推断为：
{
  defaultLocale: string;           // 宽泛的 string 类型
  locales: string[];              // 字符串数组
  localeDirection: {
    en: string;                   // 宽泛的 string 类型
    ar: string;
  };
  localeNames: {
    en: string;                   // 宽泛的 string 类型
    ar: string;
  };
}
```

## 使用 `as const` 的情况：

```typescript
// TypeScript 会推断为：
{
  readonly defaultLocale: "en";   // 只读的字面量类型 "en"
  readonly locales: readonly ["en", "ar"];  // 只读的元组类型
  readonly localeDirection: {
    readonly en: "ltr";           // 只读的字面量类型 "ltr"
    readonly ar: "rtl";           // 只读的字面量类型 "rtl"
  };
  readonly localeNames: {
    readonly en: "english";       // 只读的字面量类型 "english"
    readonly ar: "arabic";        // 只读的字面量类型 "arabic"
  };
}
```

## 主要好处：

1. **类型安全**：确保配置值不会被意外修改
2. **精确的类型推断**：IDE 可以提供更准确的自动补全和类型检查
3. **防止运行时错误**：TypeScript 会在编译时捕获对只读属性的修改尝试

## 在你的项目中的应用：

在你的国际化配置中，`as const` 确保了：
- `defaultLocale` 只能是 `"en"`，不能是其他字符串
- `locales` 数组是只读的，不能添加或删除元素
- `localeDirection` 和 `localeNames` 中的键值对都是只读的

这样可以让 TypeScript 在编译时就能发现潜在的类型错误，提高代码的健壮性。
 */
