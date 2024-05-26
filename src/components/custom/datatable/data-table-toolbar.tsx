import {Table} from '@tanstack/react-table'

import {Button} from '@/components/custom/button.tsx'
import {DataTableViewOptions} from './data-table-view-options.tsx'

import {ArrowDownToLine, Trash2, ListPlus, Plus, RotateCw} from 'lucide-react'
import ConfirmDialog from "@/components/custom/confirm-dialog";
import {useEffect, useState} from "react";

export interface DataTableToolbarProps<TData> {
  table: Table<TData>
  isImport?: boolean // is import file
  imLoading?: boolean // import file loading
  isExport?: boolean // is export file
  exLoading?: boolean // export file loading
  deLoading: boolean // delete loading
  onRefresh: () => void // refresh list
  reLoading: boolean // refresh loading
  onOpen: (isOpen: boolean) => void // open add/update form dialog
  onDelete: () => void // delete record confirm
}

export function DataTableToolbar<TData>({...props}: DataTableToolbarProps<TData>) {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleDeleteDialog = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (!props.deLoading) {
      setIsOpen(false)
    }

  }, [props.deLoading])

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        {/* 添加按钮等 */}
        <Button size={'sm'} onClick={() => props.onOpen(true)}>
          <Plus size={18} className='mr-1'/>
          添加
        </Button>
        {props.isImport && <Button size={'sm'} variant={'outline'}>
            <ListPlus size={18} className='mr-1'/>
            批量导入
        </Button>
        }
        {props.table.getSelectedRowModel().rows.length > 0 &&
            <Button size={'sm'} variant={'outline-cancel'} onClick={handleDeleteDialog}>
                <Trash2 size={18} className='mr-1'/>
                批量删除
            </Button>
        }
      </div>
      <div className='flex gap-x-2'>
        <Button size={'sm'}>
          <ArrowDownToLine size={18} className='mr-1'/>
          导出
        </Button>
        <Button variant={'outline'} loading={props.reLoading} onClick={props.onRefresh} size={'sm'}>
          {!props.reLoading && <RotateCw size={18} className='mr-1'/>}
          刷新
        </Button>
        <DataTableViewOptions table={props.table}/>
      </div>
      {/* delete confirm dialog */}
      <ConfirmDialog open={isOpen}
                     description={'你确定要删除这些记录吗？'}
                     submitBtn={props.deLoading ? '删除中' : '确定删除'}
                     loading={props.deLoading}
                     onCancel={handleDeleteDialog}
                     onSubmit={props.onDelete}/>
      {/* multi upload dialog */}
      {/* download dialog */}
    </div>
  )
}
