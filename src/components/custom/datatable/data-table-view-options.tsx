import {DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu'
import {MixerHorizontalIcon} from '@radix-ui/react-icons'
import {Table} from '@tanstack/react-table'

import {Button} from '@/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu.tsx'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
                                              table,
                                            }: DataTableViewOptionsProps<TData>) {
  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
              size={'sm'}
              variant='outline'
              className='ml-auto hidden lg:flex'
          >
            <MixerHorizontalIcon className='mr-2 h-4 w-4'/>
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[150px]'>
          <DropdownMenuLabel>切换列</DropdownMenuLabel>
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
                      key={'table-view-'+column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.columnDef.header}
                  </DropdownMenuCheckboxItem>
                } else {
                  return <></>
                }
              })}
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
