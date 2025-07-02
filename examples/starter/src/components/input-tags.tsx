'use client';

import { X } from 'lucide-react';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';

import type { ComponentProps, KeyboardEvent } from 'react';

import { cn } from '@/lib/utils';

import { ScrollArea } from '@repo/design-system/components/scroll-area';
import { Button } from '@repo/design-system/components/shadcn-ui/button';
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from '@repo/design-system/components/shadcn-ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/design-system/components/shadcn-ui/popover';

export interface InputTagsProps extends ComponentProps<'input'> {
  placeholder?: string;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  className?: string;
}

export function InputTags({
  placeholder,
  tags,
  onTagsChange,
  className,
  ...props
}: InputTagsProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Forward the ref to the internal ref
  useImperativeHandle(props.ref, () => inputRef.current!);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag]);
    }
    setInputValue('');
  };

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <button
      data-slot="input-tags"
      className={cn(
        'flex min-h-9 w-full flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        className
      )}
      onClick={() => inputRef.current?.focus()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }}
      type="button"
    >
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center rounded-full bg-secondary px-3 py-0.5 font-medium text-secondary-foreground text-sm"
        >
          {tag}
          <Button
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              removeTag(index);
            }}
            className="-me-1 ms-0.5 size-auto rounded-full p-0.5 hover:bg-secondary-foreground/20"
            aria-label="Remove"
          >
            <X className="h-3 w-3" />
          </Button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        className="w-0 flex-1 bg-transparent outline-hidden placeholder:text-muted-foreground"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(inputValue)}
        placeholder={tags.length === 0 ? placeholder : ''}
        {...props}
      />
    </button>
  );
}

interface InputTagsWithSuggestionsProps extends ComponentProps<'input'> {
  placeholder?: string;
  tags: string[];
  suggestions: string[];
  onTagsChange: (tags: string[]) => void;
  className?: string;
}

export function InputTagsWithSuggestions({
  placeholder,
  tags,
  suggestions,
  onTagsChange,
  className,
  ...props
}: InputTagsWithSuggestionsProps) {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (containerRef.current) {
      setPopoverWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(suggestion)
  );

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag]);
    }
    setInputValue('');
  };

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !open) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          data-slot="input-tags-with-suggestions"
          ref={containerRef}
          className={cn(
            'flex min-h-9 w-full flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
            className
          )}
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-secondary px-3 py-0.5 font-medium text-secondary-foreground text-sm"
            >
              {tag}
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  removeTag(index);
                }}
                className="-me-1 ms-0.5 size-auto rounded-full p-0.5 hover:bg-secondary-foreground/20"
                aria-label="Remove"
              >
                <X className="h-3 w-3" />
              </Button>
            </span>
          ))}
          <input
            ref={props.ref}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-0 flex-1 bg-transparent outline-hidden placeholder:text-muted-foreground"
            placeholder={tags.length === 0 ? placeholder : ''}
            {...props}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: popoverWidth ? `${popoverWidth}px` : 'auto' }}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <ScrollArea className="flex max-h-[300px] flex-col">
          <Command>
            <CommandList className="max-h-full">
              <CommandEmpty>No results found.</CommandEmpty>
              {filteredSuggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion}
                  onSelect={() => addTag(suggestion)}
                >
                  {suggestion}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
