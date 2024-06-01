import {Table} from '@tanstack/react-table'

import {Button} from '@/components/custom/button.tsx'
import {DataTableViewOptions} from './data-table-view-options.tsx'

import {ArrowDownToLine, Trash2, ListPlus, Plus, RotateCw} from 'lucide-react'
import ConfirmDialog from "@/components/custom/confirm-dialog";
import {useContext, useEffect, useState} from "react";
import {TableContext} from "@/context";

export interface DataTableToolbarProps<TData> {
  table: Table<TData>
  isImport?: boolean // is import file
  imLoading?: boolean // import file loading
  isExport?: boolean // is export file
  exLoading?: boolean // export file loading
  deLoading: boolean // delete loading
  reLoading: boolean // refresh loading
  onOpen: (isOpen: boolean) => void // open add/update form dialog
  onDelete: () => void // delete record confirm
}

export function DataTableToolbar<TData>({...props}: DataTableToolbarProps<TData>) {
  const {trans, onRefresh} = useContext(TableContext);

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
        <Button size={'sm'} onClick={() => props.onOpen(true)}>
          <Plus size={16} className='mr-1'/>
          {trans?.t('settings.table.add')}
        </Button>
        {props.isImport && <Button size={'sm'} variant={'outline'}>
          <ListPlus size={16} className='mr-1'/>
          {trans?.t('settings.table.multi.import')}
        </Button>
        }
        {props.table.getSelectedRowModel().rows.length > 0 &&
          <Button size={'sm'} variant={'outline-cancel'} onClick={handleDeleteDialog}>
            <Trash2 size={16} className='mr-1'/>
            {trans?.t('settings.table.multi.delete')}
          </Button>
        }
      </div>
      <div className='flex gap-x-2'>
        <Button variant={'outline'} size={'sm'}>
          <ArrowDownToLine size={16}/>
        </Button>
        <Button variant={'outline'} onClick={onRefresh} size={'sm'}>
          <RotateCw size={16} className={props.reLoading ? 'animate-spin' : ''}/>
        </Button>
        <DataTableViewOptions table={props.table}/>
      </div>
      {/* delete confirm dialog */}
      <ConfirmDialog open={isOpen}
                     isDelete={true}
                     description={trans?.t('settings.table.delete.desc')}
                     submitTitle={props.deLoading ? trans?.t('settings.table.delete.loading') : trans?.t('settings.table.delete.confirm')}
                     loading={props.deLoading}
                     onCancel={handleDeleteDialog}
                     onSubmit={props.onDelete}/>
      {/* multi upload dialog */}
      {/* download dialog */}
    </div>
  )
}
