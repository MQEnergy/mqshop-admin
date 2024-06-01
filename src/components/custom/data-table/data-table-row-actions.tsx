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
import {useContext} from "react";
import {TableContext} from "@/context.tsx";

interface DataTableRowActionsProps<TData> extends DropdownMenuProps {
  row: Row<TData>
  schemas: ZodObject<any>
}

export function DataTableRowActions<TData>({}: DataTableRowActionsProps<TData>) {
  const {trans} = useContext(TableContext)

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
            <span>{trans?.t('settings.table.action.edit.title')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconKey className="mr-2 h-4 w-4"/>
            <span>{trans?.t('settings.table.action.pass.title')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconUserCheck className="mr-2 h-4 w-4"/>
            <span>{trans?.t('settings.table.action.role.title')}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
            <IconBan className="mr-2 h-4 w-4"/>
            <span>{trans?.t('settings.table.action.ban.title')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconTrash className="mr-2 h-4 w-4"/>
            <span>{trans?.t('settings.table.action.delete.title')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
