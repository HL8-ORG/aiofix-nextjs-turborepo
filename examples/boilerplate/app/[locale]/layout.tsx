import { LanguageDetectionAlert } from '@/components/language-detection';
import { type Locale, routing } from '@/i18n/routing';
import { constructMetadata } from '@/lib/metadata';
import type React from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  return constructMetadata({
    page: 'Home',
    title: t('title'),
    description: t('description'),
    locale: locale as Locale,
    path: '/',
    canonicalUrl: '/',
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {messages.LanguageDetection && <LanguageDetectionAlert />}
      <main className="flex-1 flex flex-col items-center w-full">
        {children}
      </main>
    </NextIntlClientProvider>
  );
}
