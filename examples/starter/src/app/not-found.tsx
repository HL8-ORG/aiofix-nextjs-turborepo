'use client';

import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { DictionaryType } from '@/lib/get-dictionary';
import { Button } from '@repo/design-system/components/shadcn-ui/button';

const DICTIONARIES = {
  en: () => import('@/data/dictionaries/en.json').then((m) => m.default),
  zh: () => import('@/data/dictionaries/zh.json').then((m) => m.default),
};

function getLocaleFromPath(pathname: string) {
  if (pathname.startsWith('/zh')) return 'zh';
  return 'en';
}

export default function NotFound() {
  const pathname = usePathname();
  const [dictionary, setDictionary] = useState<DictionaryType | null>(null);

  useEffect(() => {
    const locale = getLocaleFromPath(pathname);
    DICTIONARIES[locale]().then(setDictionary);
  }, [pathname]);

  if (!dictionary) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
        <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl text-center">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
          <Image
            src="/images/illustrations/characters/leisure-shirt.svg"
            alt=""
            height={120}
            width={129}
            priority
            className="h-20 w-auto md:h-24"
          />
          <div>
            <h1 className="text-4xl font-black text-foreground md:text-6xl">
              {dictionary.errors.notFound.title}
            </h1>
            <p className="text-xl font-semibold text-muted-foreground md:text-3xl">
              {dictionary.errors.notFound.subtitle}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-muted-foreground text-lg">
            {dictionary.errors.notFound.description}
          </p>
        </div>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/">{dictionary.errors.notFound.homePage}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
