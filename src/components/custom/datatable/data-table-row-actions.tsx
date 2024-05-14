import {DotsHorizontalIcon} from '@radix-ui/react-icons'
import {Row} from '@tanstack/react-table'

import {Button} from '@/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'

import * as React from "react";
import {ZodObject} from "zod";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  labels: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  schemas: ZodObject<any>
}

export function DataTableRowActions<TData>({
                                             row,
                                             labels,
                                             schemas
                                           }: DataTableRowActionsProps<TData>) {
  const task = schemas.parse(row.original)

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
              variant='ghost'
              className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4'/>
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={task.label}>
                {labels.map((label) => (
                    <DropdownMenuRadioItem key={label.value} value={label.value}>
                      {label.label}
                    </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
