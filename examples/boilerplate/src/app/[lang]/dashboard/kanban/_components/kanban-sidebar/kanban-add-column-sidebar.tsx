'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Grid2x2Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { KanbanColumnFormType } from '../../types';

import { KanbanColumnSchema } from '../../_schemas/kanban-column-schema';

// TODO:这个button需要移植
import { ButtonLoading } from '@repo/design-system/components/button';
import { ScrollArea } from '@repo/design-system/components/scroll-area';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/design-system/components/shadcn-ui/form';
import { Input } from '@repo/design-system/components/shadcn-ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@repo/design-system/components/shadcn-ui/sheet';
import { useKanbanContext } from '../../_hooks/use-kanban-context';

const defaultValues = {
  title: '',
};

export function KanbanAddColumnSidebar() {
  const {
    kanbanAddColumnSidebarIsOpen,
    setKanbanAddColumnSidebarIsOpen,
    handleAddColumn,
  } = useKanbanContext();

  const form = useForm<KanbanColumnFormType>({
    resolver: zodResolver(KanbanColumnSchema),
    defaultValues,
  });

  // Reset the form whenever `kanbanAddColumnSidebarIsOpen` changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    form.reset();
  }, [kanbanAddColumnSidebarIsOpen, form.reset]);

  const { isSubmitting, isDirty } = form.formState;
  const isDisabled = isSubmitting || !isDirty; // Disable button if form is unchanged or submitting

  function onSubmit(data: KanbanColumnFormType) {
    handleAddColumn(data);

    handleSidebarClose();
  }

  const handleSidebarClose = () => {
    form.reset(defaultValues); // Reset the form to the initial values
    setKanbanAddColumnSidebarIsOpen(false); // Close the sidebar
  };

  return (
    <Sheet
      open={kanbanAddColumnSidebarIsOpen}
      onOpenChange={() => handleSidebarClose()}
    >
      <SheetContent className="p-0" side="right">
        <ScrollArea className="h-full p-4">
          <SheetHeader>
            <SheetTitle>Add New Column</SheetTitle>
            <SheetDescription>Add a new column to the board.</SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-3 grid gap-y-3"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Column title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ButtonLoading
                isLoading={isSubmitting}
                disabled={isDisabled}
                className="w-full"
                icon={Grid2x2Plus}
              >
                Save
              </ButtonLoading>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
