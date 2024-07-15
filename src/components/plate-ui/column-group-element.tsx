import React from 'react';

import { cn, withRef } from '@udecode/cn';
import {
  PlateElement,
  useElement,
  useRemoveNodeButton,
} from '@udecode/plate-common';
import {
  ELEMENT_COLUMN,
  type TColumnElement,
  useColumnState,
  useDebouncePopoverOpen,
} from '@udecode/plate-layout';
import { useReadOnly } from 'slate-react';

import { Icons } from '@/components/custom/icons.tsx';

import { Button } from './button';
import { Popover, PopoverAnchor, PopoverContent } from './popover';
import { Separator } from './separator';

export const ColumnGroupElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement className={cn(className, 'my-2')} ref={ref} {...props}>
        <ColumnFloatingToolbar>
          <div className={cn('flex size-full gap-4 rounded')}>{children}</div>
        </ColumnFloatingToolbar>
      </PlateElement>
    );
  }
);

export function ColumnFloatingToolbar({ children }: React.PropsWithChildren) {
  const readOnly = useReadOnly();

  const {
    setDoubleColumn,
    setDoubleSideDoubleColumn,
    setLeftSideDoubleColumn,
    setRightSideDoubleColumn,
    setThreeColumn,
  } = useColumnState();

  const element = useElement<TColumnElement>(ELEMENT_COLUMN);

  const { props: buttonProps } = useRemoveNodeButton({ element });

  const isOpen = useDebouncePopoverOpen();

  if (readOnly) return <>{children}</>;

  return (
    <Popover modal={false} open={isOpen}>
      <PopoverAnchor>{children}</PopoverAnchor>
      <PopoverContent
        align="center"
        className="w-auto p-1"
        onOpenAutoFocus={(e) => e.preventDefault()}
        side="top"
        sideOffset={10}
      >
        <div className="box-content flex h-9 items-center gap-1 [&_svg]:size-4 [&_svg]:text-muted-foreground">
          <Button onClick={setDoubleColumn} size="sms" variant="ghost">
            <Icons.doubleColumn />
          </Button>
          <Button onClick={setThreeColumn} size="sms" variant="ghost">
            <Icons.threeColumn />
          </Button>
          <Button onClick={setRightSideDoubleColumn} size="sms" variant="ghost">
            <Icons.rightSideDoubleColumn />
          </Button>
          <Button onClick={setLeftSideDoubleColumn} size="sms" variant="ghost">
            <Icons.leftSideDoubleColumn />
          </Button>
          <Button
            onClick={setDoubleSideDoubleColumn}
            size="sms"
            variant="ghost"
          >
            <Icons.doubleSideDoubleColumn />
          </Button>

          <Separator className="my-1" orientation="vertical" />
          <Button size="sms" variant="ghost" {...buttonProps}>
            <Icons.delete />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
