'use client';

import { MessageCircleMore, Paperclip } from 'lucide-react';

import type { TaskType } from '../types';

import { AvatarStack } from '@/components/avatar';
import { Button } from '@repo/design-system/components/shadcn-ui/button';
import { CardFooter } from '@repo/design-system/components/shadcn-ui/card';

interface KanbanTaskItemFooterProps {
  task: TaskType;
}

export function KanbanTaskItemFooter({ task }: KanbanTaskItemFooterProps) {
  const avatars = task.assigned.map((member) => ({
    src: member.avatar,
    alt: member.name,
    href: '/', // Replace with the correct link to the member's profile, e.g., `/profile/${member.username}`
  }));

  return (
    <CardFooter className="justify-between gap-2 ps-5 pe-3">
      <AvatarStack avatars={avatars} limit={3} size="sm" />
      <div className="flex items-center">
        <Button variant="ghost" size="sm">
          <MessageCircleMore className="me-1.5 size-3.5 text-muted-foreground" />
          {task.comments.length}
        </Button>
        <Button variant="ghost" size="sm">
          <Paperclip className="me-1.5 size-3.5 text-muted-foreground" />
          {task.attachments.length}
        </Button>
      </div>
    </CardFooter>
  );
}
