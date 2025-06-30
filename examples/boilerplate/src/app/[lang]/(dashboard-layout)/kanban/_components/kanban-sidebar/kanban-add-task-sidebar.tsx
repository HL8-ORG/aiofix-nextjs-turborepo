'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Grid2x2Plus } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import type { KanbanTaskFormType } from '../../types';

import { labelsData } from '../../_data/labels';

import { KanbanTaskSchema } from '../../_schemas/kanban-task-schema';

import { ButtonLoading } from '@repo/design-system/components/button';
import { DatePicker } from '@/components/date-picker';
import { FileDropzone } from '@/components/file-dropzone';
import { InputTagsWithSuggestions } from '@/components/input-tags';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/design-system/components/shadcn-ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@repo/design-system/components/shadcn-ui/sheet';
import { Textarea } from '@repo/design-system/components/shadcn-ui/textarea';
import { useKanbanContext } from '../../_hooks/use-kanban-context';
/**
 * 看板任务表单的默认值
 */
const defaultValues = {
  title: '',
  description: '',
  label: 'Development',
  dueDate: new Date(),
  assigned: [],
  comments: [],
  attachments: [],
};

/**
 * 看板添加任务侧边栏组件
 *
 * @description
 * 提供添加新任务的表单界面,包含标题、标签、分配成员、截止日期等字段。
 * 使用 React Hook Form 进行表单状态管理和验证。
 *
 * @remarks
 * 实现机制:
 * 1. 表单管理
 *   - 使用 useForm hook 处理表单状态
 *   - 通过 zodResolver 实现表单验证
 *   - 维护表单字段的默认值
 *
 * 2. 状态管理
 *   - 从 KanbanContext 获取全局状态和操作方法
 *   - 管理侧边栏的开关状态
 *   - 处理任务的添加和选择
 *
 * 3. 性能优化
 *   - 使用 useMemo 缓存标签选项列表
 *   - 实现表单重置和清理机制
 *
 * 4. 交互控制
 *   - 根据表单状态控制提交按钮
 *   - 提供表单重置和侧边栏关闭功能
 */
export function KanbanAddTaskSidebar() {
  const {
    kanbanState,
    kanbanAddTaskSidebarIsOpen,
    setKanbanAddTaskSidebarIsOpen,
    handleAddTask,
    handleSelectTask,
  } = useKanbanContext();

  const form = useForm<KanbanTaskFormType>({
    resolver: zodResolver(KanbanTaskSchema),
    defaultValues,
  });

  const { teamMembers, selectedColumn } = kanbanState;
  const { isSubmitting, isDirty } = form.formState;
  const isDisabled = isSubmitting || !isDirty; // 当表单未修改或正在提交时禁用按钮

  /**
   * 处理表单提交
   * @param data - 表单数据
   */
  function onSubmit(data: KanbanTaskFormType) {
    if (selectedColumn) {
      handleAddTask(data, selectedColumn.id);
    }

    handleSidebarClose();
  }

  /**
   * 处理侧边栏关闭
   * 重置表单、清除选中任务并关闭侧边栏
   */
  const handleSidebarClose = () => {
    form.reset(defaultValues); // 重置表单到初始值
    handleSelectTask(undefined); // 取消选中当前任务
    setKanbanAddTaskSidebarIsOpen(false); // 关闭侧边栏
  };

  /**
   * 缓存标签选项列表
   * 避免不必要的重新渲染
   */
  const labelOptions = useMemo(
    () =>
      labelsData.map((label) => (
        <SelectItem key={label.id} value={label.name}>
          {label.name}
        </SelectItem>
      )),
    []
  );

  return (
    <Sheet
      open={kanbanAddTaskSidebarIsOpen}
      onOpenChange={() => handleSidebarClose()}
    >
      <SheetContent className="p-0" side="right">
        <ScrollArea className="h-full p-4">
          <SheetHeader>
            <SheetTitle>Add New Task</SheetTitle>
            <SheetDescription>
              Add a new task to the {selectedColumn?.title} column.
            </SheetDescription>
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
                      <Input placeholder="Task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a label" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>{labelOptions}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assigned"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned Team Members</FormLabel>
                    <FormControl>
                      <InputTagsWithSuggestions
                        suggestions={teamMembers.map(({ name }) => name)}
                        tags={field.value.map(({ name }) => name)}
                        onTagsChange={(tags) =>
                          field.onChange(
                            teamMembers.filter((member) =>
                              tags.includes(member.name)
                            )
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        formatStr="PPP"
                        onValueChange={field.onChange}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Event description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attachments</FormLabel>
                    <FormControl>
                      <FileDropzone
                        multiple
                        onFilesChange={field.onChange}
                        {...field}
                      />
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
