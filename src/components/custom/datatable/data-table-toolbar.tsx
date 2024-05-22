import {Table} from '@tanstack/react-table'

import {Button} from '@/components/custom/button.tsx'
import {DataTableViewOptions} from './data-table-view-options.tsx'

import {ArrowDownToLine, ListPlus, Plus, RotateCw} from 'lucide-react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  loading: boolean
  onRefresh: () => void
}

export function DataTableToolbar<TData>({
                                          table,
                                          loading,
                                          onRefresh
                                        }: DataTableToolbarProps<TData>) {

  return (
      <div className='flex items-center justify-between'>
        <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
          {/* 添加按钮等 */}
          <Button size={'sm'}>
            <Plus size={18} className='mr-1'/>
            添加
          </Button>
          <Button size={'sm'} variant={'outline'}>
            <ListPlus size={18} className='mr-1'/>
            批量导入
          </Button>
        </div>
        {/* 添加 */}
        <div className='flex gap-x-2'>
          <Button size={'sm'}>
            <ArrowDownToLine size={18} className='mr-1'/>
            导出
          </Button>
          <Button variant={'outline'} loading={loading} onClick={onRefresh} size={'sm'}>
            {!loading && <RotateCw size={18} className='mr-1'/>}
            刷新
          </Button>
          <DataTableViewOptions table={table}/>
        </div>
      </div>
  )
}
