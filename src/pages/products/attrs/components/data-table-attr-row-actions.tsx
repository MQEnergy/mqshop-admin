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
import {IconDots, IconPencil, IconTrash} from "@tabler/icons-react";
import {DropdownMenuProps} from "@radix-ui/react-dropdown-menu";
import {useContext} from "react";
import {ColumnSchemaType} from "../data/schema.ts";
import {TableContext} from "@/context";
import {useRequest} from "ahooks";
import {ProductAttrCateAttrView} from "@/apis/product.ts";

interface DataTableRowActionsProps<TData> extends DropdownMenuProps {
  row: Row<TData>
  schemas: ZodObject<any>
  isRemote: boolean // is get info by remote server
}

export function DataTableAttrRowActions<TData>({...props}: DataTableRowActionsProps<TData>) {
  const {trans, setInfo} = useContext(TableContext);

  const viewRes = useRequest(ProductAttrCateAttrView, {manual: true})
  const original = props.row.original as ColumnSchemaType
  const handleEdit = (action: object) => {
    if (props.isRemote) {
      viewRes.runAsync({id: original.id}).then(res => {
        const data = res.data as ColumnSchemaType
        setInfo?.({...data, status: data.status, ...action})
      })
    } else {
      handleOperate(action)
    }
  }
  const handleOperate = (action: object) => {
    setInfo?.({...original, status: original.status, ...action})
  }
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
      <DropdownMenuContent align={'end'} className='w-[120px]'>
        <DropdownMenuItem onClick={() => handleEdit({__is_edit__: true})}>
          <IconPencil size={18} className="mr-2"/>
          <span>{trans?.t('settings.table.action.edit.title')}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={() => handleOperate({__is_delete__: true})}>
          <IconTrash size={18} className="mr-2"/>
          <span>{trans?.t('settings.table.action.delete.title')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
