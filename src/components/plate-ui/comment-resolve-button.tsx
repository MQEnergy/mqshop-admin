'use client';

import React from 'react';

import { cn } from '@udecode/cn';
import {
  CommentResolveButton as CommentResolveButtonPrimitive,
  useComment,
} from '@udecode/plate-comments';

import { Icons } from '@/components/custom/icons.tsx';

import { buttonVariants } from './button';

export function CommentResolveButton() {
  const comment = useComment()!;

  return (
    <CommentResolveButtonPrimitive
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'h-6 p-1 text-muted-foreground'
      )}
    >
      {comment.isResolved ? (
        <Icons.refresh className="size-4" />
      ) : (
        <Icons.check className="size-4" />
      )}
    </CommentResolveButtonPrimitive>
  );
}
