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
import {IconBan, IconDots, IconKey, IconPencil, IconTrash, IconUserCheck} from "@tabler/icons-react";
import {DropdownMenuProps} from "@radix-ui/react-dropdown-menu";
import {useRequest} from "ahooks";
import {MemberInfo} from "@/apis/permission.ts";
import {useContext} from "react";
import {Member} from "@/pages/permission/member/data/schema.ts";
import {TableContext} from "@/context";

interface DataTableRowActionsProps<TData> extends DropdownMenuProps {
  row: Row<TData>
  schemas: ZodObject<any>
  isRemote: boolean // is get info by remote server
}

export function DataTableRowActions<TData>({...props}: DataTableRowActionsProps<TData>) {
  const {setInfo} = useContext(TableContext);

  const viewRes = useRequest(MemberInfo, {
    manual: true,
  })
  const original = props.row.original as Member

  const handleEdit = (action: object) => {
    if (props.isRemote) {
      viewRes.runAsync({id: original.id}).then(res => {
        const data = res.data as Member
        setInfo?.({...data, status: data.status === 1, ...action})
      })
    } else {
      setInfo?.({...original, status: original.status === 1, ...action})
    }
  }
  const handleOperate = (action: object) => {
    setInfo?.({...original, status: original.status === 1, ...action})
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
      <DropdownMenuContent className='w-[120px]'>
        <DropdownMenuItem onClick={() => handleEdit({__is_edit__: true})}>
          <IconPencil className="mr-2 h-4 w-4"/>
          <span>编辑信息</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleOperate({__is_reset_pass__: true})}>
          <IconKey className="mr-2 h-4 w-4"/>
          <span>重置密码</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleOperate({__is_assign_role__: true})}>
          <IconUserCheck className="mr-2 h-4 w-4"/>
          <span>分配角色</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={() => handleOperate({__is_forbidden__: true})}>
          <IconBan className="mr-2 h-4 w-4"/>
          <span>禁用</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleOperate({__is_delete__: true})}>
          <IconTrash className="mr-2 h-4 w-4"/>
          <span>删除</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
