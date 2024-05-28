import {Row} from '@tanstack/react-table'

import {Button} from '@/components/custom/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'

import {ZodObject} from "zod";
import {IconBan, IconDots, IconKey, IconPencil, IconTrash, IconUserCheck} from "@tabler/icons-react";
import {DropdownMenuProps} from "@radix-ui/react-dropdown-menu";

interface DataTableRowActionsProps<TData> extends DropdownMenuProps {
  row: Row<TData>
  schemas: ZodObject<any>
}

export function DataTableRowActions<TData>({}: DataTableRowActionsProps<TData>) {

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
              variant='ghost'
              className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <IconDots className='h-4 w-4'/>
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[120px]'>
          <DropdownMenuItem>
            <IconPencil className="mr-2 h-4 w-4"/>
            <span>编辑信息</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconKey className="mr-2 h-4 w-4"/>
            <span>重置密码</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconUserCheck className="mr-2 h-4 w-4"/>
            <span>分配角色</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
            <IconBan className="mr-2 h-4 w-4"/>
            <span>禁用</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconTrash className="mr-2 h-4 w-4"/>
            <span>删除</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
