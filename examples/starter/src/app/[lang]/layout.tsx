import { RouteValidator } from '@/components/route-validator';

import type { ReactNode } from 'react';

export default function LangLayout(props: { children: ReactNode }) {
  const { children } = props;

  return <RouteValidator>{children}</RouteValidator>;
}
