import {Table} from '@tanstack/react-table'

import {Button} from '@/components/ui/button.tsx'
import {DataTableViewOptions} from './data-table-view-options.tsx'

import {IconPlus} from "@tabler/icons-react";
import {Download} from 'lucide-react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
                                          table,
                                        }: DataTableToolbarProps<TData>) {

  return (
      <div className='flex items-center justify-between'>
        <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
          {/* 添加按钮等 */}
          <Button size={'sm'}>
            <IconPlus size={20} className='mr-1'/>
            添加
          </Button>
          <Button size={'sm'} variant={'outline'}>
            <IconPlus size={20} className='mr-1'/>
            批量导入
          </Button>
        </div>
        {/* 添加 */}
        <div className='flex gap-x-2'>
          <Button size={'sm'}>
            <Download size={14} className='mr-1'/>
            导出
          </Button>
          <DataTableViewOptions table={table}/>
        </div>
      </div>
  )
}
