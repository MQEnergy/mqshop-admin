import {Cross2Icon} from '@radix-ui/react-icons'
import {Table} from '@tanstack/react-table'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {DataTableViewOptions} from './data-table-view-options'

import {priorities, statuses} from '../data/data'
import {DataTableFacetedFilter} from './data-table-faceted-filter'
import {IconPlus} from "@tabler/icons-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
                                          table,
                                        }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
      <div className='flex items-center justify-between'>
        <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
          <Input
              placeholder='请输入商品名称'
              value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                  table.getColumn('title')?.setFilterValue(event.target.value)
              }
              className='h-10 w-[150px] lg:w-[250px]'
          />
          <div className='flex gap-x-2'>
            {table.getColumn('status') && (
                <DataTableFacetedFilter
                    column={table.getColumn('status')}
                    title='状态'
                    options={statuses}
                />
            )}
            {table.getColumn('priority') && (
                <DataTableFacetedFilter
                    column={table.getColumn('priority')}
                    title='优先级'
                    options={priorities}
                />
            )}
          </div>
        </div>
        {/* 添加 */}
        <div className='flex gap-x-2'>
          {isFiltered && (
              <Button
                  variant='outlinecancel'
                  onClick={() => table.resetColumnFilters()}
              >
                <Cross2Icon className='mr-1 h-4 w-4'/>
                重置
              </Button>
          )}
          <Button>
            <IconPlus size={20} className='mr-1' />
            添加
          </Button>
          <DataTableViewOptions table={table}/>
        </div>
      </div>
  )
}
