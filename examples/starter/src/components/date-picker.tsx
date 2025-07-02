'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@repo/design-system/components/shadcn-ui/button';
import { Calendar } from '@repo/design-system/components/shadcn-ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/design-system/components/shadcn-ui/popover';

type DatePickerProps = Omit<
  ComponentProps<typeof Calendar>,
  'mode' | 'selected' | 'onSelect'
> & {
  value?: Date;
  onValueChange?: (date?: Date) => void;
  formatStr?: string;
  popoverContentClassName?: string;
  popoverContentOptions?: ComponentProps<typeof PopoverContent>;
  buttonClassName?: string;
  buttonOptions?: ComponentProps<typeof Button>;
  placeholder?: string;
};

export function DatePicker({
  value,
  onValueChange,
  formatStr = 'yyyy-MM-dd',
  popoverContentClassName,
  popoverContentOptions,
  buttonClassName,
  buttonOptions,
  placeholder = 'Pick date',
  ...props
}: DatePickerProps) {
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('w-full px-3 text-start font-normal', buttonClassName)}
          {...buttonOptions}
        >
          {value ? (
            <span>{format(value, formatStr)}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <CalendarIcon className="ms-auto h-4 w-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-auto p-0', popoverContentClassName)}
        align="start"
        {...popoverContentOptions}
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={onValueChange}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
