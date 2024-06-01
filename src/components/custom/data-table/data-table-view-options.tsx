import {DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu'
import {Table} from '@tanstack/react-table'

import {Button} from '@/components/custom/button.tsx'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu.tsx'
import {Settings} from "lucide-react";
import {useContext} from "react";
import {TableContext} from "@/context.tsx";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
                                              table,
                                            }: DataTableViewOptionsProps<TData>) {
  const {trans} = useContext(TableContext)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'sm'}
          variant='outline'
          className='ml-auto hidden lg:flex'
        >
          <Settings size={16}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]'>
        <DropdownMenuLabel>{trans?.t('settings.table.view.option.title')}</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide()
          )
          .map((column) => {
            if (typeof column.columnDef.header === 'string') {
              return <DropdownMenuCheckboxItem
                key={'table-view-' + column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(value)}
              >
                {column.columnDef.header}
              </DropdownMenuCheckboxItem>
            }
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
