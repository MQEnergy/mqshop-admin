import {ColumnDef} from '@tanstack/react-table'

import {Checkbox} from '@/components/ui/checkbox.tsx'

import {statuses} from '../data/data.tsx'
import {ColumnSchemaType, formSchema} from '../data/schema.ts'
import {DataTableColumnHeader} from "../components/data-table-column-header.tsx";
import {DataTableRowActions} from "../components/data-table-row-actions.tsx";
import dayjs from "dayjs";
import ReactLogo from "@/assets/react.svg";
import {Badge} from "@/components/custom/badge.tsx";

export const columns: ColumnDef<ColumnSchemaType>[] = [
  {
    id: 'select',
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title='ID'/>
    ),
    cell: ({row}) => <div className='w-[40px]'>{row.getValue('id')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'avatar',
    header: '头像',
    cell: ({row}) => {
      const resourceUrl = import.meta.env.VITE_RESOURCE_URL;
      return (
        <div className='w-[50px]'>
          <img className='rounded-md object-cover h-[50px] w-[50px] border'
               src={row.getValue('avatar') ? resourceUrl + row.getValue('avatar') : ReactLogo}
               alt={row.getValue('real_name')}/>
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: 'account',
    header: '账号',
    cell: ({row}) => {
      return (
        <div className='flex space-x-2'>
            <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
              {row.getValue('account')}
            </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'real_name',
    header: '姓名'
  },
  {
    accessorKey: 'phone',
    header: '手机号'
  },
  {
    accessorKey: 'role_ids',
    header: '角色',
    enableHiding: true,
    cell: ({row}) => {
      const roleList: any[] = row.original?.role_list || []
      return (
        <div className='space-x-1 space-y-1 w-[200px] max-h-[60px] overflow-scroll'>
          {roleList.map(item => <Badge key={item.id} variant={'blue'}>{item.name}</Badge>)}
        </div>
      )
    }
  },
  {
    accessorKey: 'status',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title='状态'/>
    ),
    cell: ({row}) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )
      if (!status) {
        return null
      }
      return (
        <Badge variant={status.value == 1 ? 'green' : 'red'}>
          <span>{status.label}</span>
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'created_at',
    header: '创建时间',
    cell: ({row}) => {
      return dayjs.unix(row.getValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  {
    id: 'actions',
    header: '操作',
    cell: ({row}) => <DataTableRowActions row={row} isRemote={false} schemas={formSchema}/>,
  },
]
