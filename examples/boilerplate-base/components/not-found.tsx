import { Button } from '@repo/design-system/components/shadcn-ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="text-center">
        <p className="max-w-[460px] mb-6">{t('description')}</p>
        <Button asChild>
          <Link href="/">{t('homePage')}</Link>
        </Button>
      </div>
    </div>
  );
}
