import {Row} from '@tanstack/react-table'

import {Button} from '@/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'

import {ZodObject} from "zod";
import {Ban, Delete, Edit2, Ellipsis, KeySquare, User} from "lucide-react";

interface DataTableRowActionsProps<TData> {
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
          <Ellipsis className='h-4 w-4'/>
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[120px]'>
        <DropdownMenuItem>
          <Edit2 className="mr-2 h-4 w-4"/>
          <span>编辑信息</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <KeySquare className="mr-2 h-4 w-4"/>
          <span>重置密码</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4"/>
          <span>分配角色</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem>
          <Ban className="mr-2 h-4 w-4"/>
          <span>禁用</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Delete className="mr-2 h-4 w-4"/>
          <span>删除</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
