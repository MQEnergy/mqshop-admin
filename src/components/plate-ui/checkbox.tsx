'use client';

import * as React from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn, withRef } from '@udecode/cn';

import { Icons } from '@/components/custom/icons.tsx';

export const Checkbox = withRef<typeof CheckboxPrimitive.Root>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      className={cn(
        'peer size-4 shrink-0 rounded-sm border border-primary bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        className
      )}
      ref={ref}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <Icons.check className="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);
