import { Search } from 'lucide-react';

import { Label } from '@repo/design-system/components/shadcn-ui/label';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from '@repo/design-system/components/shadcn-ui/sidebar';

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the docs..."
            className="pl-8"
          />
          <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2 size-4 select-none opacity-50" />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
