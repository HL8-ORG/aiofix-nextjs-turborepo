import { Bell } from 'lucide-react';
import Link from 'next/link';

import type { DictionaryType } from '@/lib/get-dictionary';
import type { DynamicIconNameType } from '@/types';

import { notificationData } from '@/data/notifications';

import { cn, formatDistance, formatUnreadCount } from '@/lib/utils';

import { DynamicIcon } from '@/components/dynamic-icon';
import { Badge } from '@repo/design-system/components/shadcn-ui/badge';
import {
  Button,
  buttonVariants,
} from '@repo/design-system/components/shadcn-ui/button';
import {
  Card,
  CardFooter,
} from '@repo/design-system/components/shadcn-ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/design-system/components/shadcn-ui/popover';

interface Notification {
  id: string;
  url: string;
  iconName: DynamicIconNameType;
  content: string;
  date: string | Date;
  isRead: boolean;
}

export function NotificationDropdown({
  dictionary,
}: {
  dictionary: DictionaryType;
}) {
  const unreadCount = formatUnreadCount(notificationData.unreadCount);

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          <span className="sr-only">Notification</span>
          {!!unreadCount && (
            <Badge
              className="-top-1 -end-1 absolute flex h-4 max-w-8 justify-center"
              aria-live="polite"
              aria-atomic="true"
              aria-label={`${unreadCount} unread`}
            >
              <output>{unreadCount}</output>
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0">
        <Card className="border-0">
          <div className="flex items-center justify-between border-border border-b p-3">
            <h3 className="font-semibold text-sm">
              {dictionary.navigation.notifications.notifications}
            </h3>
            <Button variant="link" className="h-auto p-0 text-primary">
              {dictionary.navigation.notifications.dismissAll}
            </Button>
          </div>
          <ul>
            {notificationData.notifications.map(
              (notification: Notification) => (
                <li key={notification.id}>
                  <Link
                    href={notification.url}
                    className="flex items-center gap-2 px-6 py-4 hover:bg-accent hover:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <Badge className="h-10 w-10">
                      <DynamicIcon
                        name={notification.iconName}
                        className="h-5 w-5"
                      />
                    </Badge>
                    <div className="w-0 flex-1">
                      <p className="truncate break-all text-sm">
                        {notification.content}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {formatDistance(notification.date)}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </Link>
                </li>
              )
            )}
          </ul>
          <CardFooter className="justify-center border-border border-t p-0">
            <Link
              href=""
              className={cn(
                buttonVariants({ variant: 'link' }),
                'text-center text-primary'
              )}
            >
              {dictionary.navigation.notifications.seeAllNotifications}
            </Link>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
