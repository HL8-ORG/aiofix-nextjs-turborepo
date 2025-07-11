'use client';

import type { TaskType } from '../types';

import { MediaGrid } from '@/components/media-grid';
import {
  CardContent,
  CardDescription,
  CardTitle,
} from '@repo/design-system/components/shadcn-ui/card';

interface KanbanTaskItemContentProps {
  task: TaskType;
}

export function KanbanTaskItemContent({ task }: KanbanTaskItemContentProps) {
  // Get all media attachments (images & videos)
  const mediaAttachments = task.attachments
    .filter(
      (attachment) =>
        attachment.type.includes('image') || attachment.type.includes('video')
    )
    .map((attachment) => ({
      src: attachment.url,
      alt: attachment.name || 'Task attachment',
      type: attachment.type.includes('video')
        ? ('VIDEO' as const)
        : ('IMAGE' as const),
    }));

  return (
    <CardContent>
      <CardTitle>{task.title}</CardTitle>
      <CardDescription>{task.description}</CardDescription>
      {/* Display media grid if there are attachments */}
      {mediaAttachments.length > 0 && (
        <MediaGrid data={mediaAttachments} className="mt-2" />
      )}
    </CardContent>
  );
}
