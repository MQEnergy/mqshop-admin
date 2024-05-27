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
import {Fragment, useState} from "react";
import {DataForm} from "@/pages/permission/member/data-form.tsx";
import {Member} from "@/pages/permission/member/data/schema.ts";
import {useImmer} from "use-immer";

interface DataTableRowActionsProps<TData> extends DropdownMenuProps {
  row: Row<TData>
  schemas: ZodObject<any>
  isRemote: boolean // is get info by remote server
}

export function DataTableRowActions<TData>({...props}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const viewRes = useRequest(MemberInfo, {
    manual: true,
  })
  const original = props.row.original as Member
  const [info, updateInfo] = useImmer({
    id: original.id,
    account: original.account,
    real_name: original.real_name,
    password: original.password,
    phone: original.phone,
    avatar: original.avatar,
    status: original.status === 1,
    role_ids: original.role_ids
  })

  const handleRefresh = () => {
  }

  const handleEdit = () => {
    if (props.isRemote) {
      viewRes.runAsync({id: info.id}).then(res => {
        console.log('viewRes', res.data)
        const data = res.data as Member
        updateInfo(draft => {
          draft.id = data.id
          draft.account = data.account
          draft.real_name = data.real_name
          draft.password = data.password
          draft.phone = data.phone
          draft.avatar = data.real_name
          draft.status = data.status === 1
          draft.role_ids = data.role_ids
        })
      })
    }
    setIsOpen(true)
  }

  return (
      <Fragment>
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
            <DropdownMenuItem onClick={handleEdit}>
              <IconPencil className="mr-2 h-4 w-4"/>
              <span>编辑信息</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconKey className="mr-2 h-4 w-4"/>
              <span>重置密码</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconUserCheck className="mr-2 h-4 w-4"/>
              <span>分配角色</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
              <IconBan className="mr-2 h-4 w-4"/>
              <span>禁用</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconTrash className="mr-2 h-4 w-4"/>
              <span>删除</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* data edit form */}
        {isOpen && <DataForm
          data={info}
          open={isOpen}
          onOpenChange={setIsOpen}
          onRefresh={handleRefresh}/>
        }
      </Fragment>
  )
}
