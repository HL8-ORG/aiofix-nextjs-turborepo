// import { signOut } from 'next-auth/react';
import { User, UserCog } from 'lucide-react';
import Link from 'next/link';

import type { DictionaryType } from '@/lib/get-dictionary';
import type { LocaleType } from '@/types';

import { userData } from '@/data/user';

import { ensureLocalizedPathname } from '@/lib/i18n';
import { getInitials } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import { Button } from '@repo/design-system/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/design-system/components/shadcn-ui/dropdown-menu';

export function UserDropdown({
  dictionary,
  locale,
}: {
  dictionary: DictionaryType;
  locale: LocaleType;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-lg"
          aria-label="User"
        >
          <Avatar className="size-9">
            <AvatarImage src={userData?.avatar} alt="" />
            <AvatarFallback className="bg-transparent">
              {userData?.name && getInitials(userData.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent forceMount>
        <DropdownMenuLabel className="flex gap-2">
          <Avatar>
            <AvatarImage src={userData?.avatar} alt="Avatar" />
            <AvatarFallback className="bg-transparent">
              {userData?.name && getInitials(userData.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <p className="truncate font-medium text-sm">John Doe</p>
            <p className="truncate font-semibold text-muted-foreground text-xs">
              {userData?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-w-48">
          <DropdownMenuItem asChild>
            <Link
              href={ensureLocalizedPathname('/pages/account/profile', locale)}
            >
              <User className="me-2 size-4" />
              {dictionary.navigation.userNav.profile}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={ensureLocalizedPathname('/pages/account/settings', locale)}
            >
              <UserCog className="me-2 size-4" />
              {dictionary.navigation.userNav.settings}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="me-2 size-4" />
          {dictionary.navigation.userNav.signOut}
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
