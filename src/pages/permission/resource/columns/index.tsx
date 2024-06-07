import {ColumnDef} from '@tanstack/react-table'
import {Checkbox} from '@/components/ui/checkbox.tsx'
import {statuses} from '../data/data.tsx'
import {ResourceItem, resourceSchema} from '../data/schema.ts'
import {DataTableColumnHeader} from "../components/data-table-column-header.tsx";
import {DataTableRowActions} from "../components/data-table-row-actions.tsx";
import dayjs from "dayjs";
import {Badge} from "@/components/custom/badge.tsx";
import {
  IconSquareRoundedMinusFilled,
  IconSquareRoundedPlusFilled
} from "@tabler/icons-react";

export const columns: ColumnDef<ResourceItem>[] = [
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
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({column}) => (
      <div className={'w-[30px]'}><DataTableColumnHeader column={column} title='ID'/></div>
    ),
    size: 30,
    cell: ({row}) => <div className="w-[30px]">{row.getValue('id')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    size: 180,
    header: ({table}) => (
      <div className={'flex items-center cursor-pointer w-[180px]'} onClick={table.getToggleAllRowsExpandedHandler()}>
        {table.getIsAllRowsExpanded() ?
          <IconSquareRoundedMinusFilled className={'text-gray-500'} size={18}/> :
          <IconSquareRoundedPlusFilled className={'text-indigo-500'} size={18}/>}
        <span className={'ml-2'}>名称</span>
      </div>
    ),
    cell: ({row, getValue}) => {
      return (
        <div className='flex items-center w-[180px]' style={{paddingLeft: `${(row.depth)}rem`}}>
          {row.getCanExpand() && (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: {cursor: 'pointer'},
              }}
            >
              {row.getIsExpanded() ?
                <IconSquareRoundedMinusFilled className={'text-gray-500'} size={18}/> :
                <IconSquareRoundedPlusFilled className={'text-indigo-500'} size={18}/>
              }
            </button>
          )}
          <span className={'mx-2'}>{getValue<boolean>()}</span>
          {parseInt(row.original.menu_type) === 1 ?
            <Badge variant={'green'}>模块</Badge> :
            <Badge variant={'blue'}>操作</Badge>}
        </div>
      )
    },
  },
  {
    accessorKey: 'alias',
    header: '别名',
  },
  {
    accessorKey: 'desc',
    header: '描述',
    size: 100,
    cell: ({row}) => <div className={'w-[100px] max-h-[50px] overflow-scroll'}>{row.getValue('desc')}</div>
  },
  {
    accessorKey: 'f_url',
    header: '路由',
    cell: ({row}) => <div className={'min-w-[100px] flex flex-col space-y-1 max-h-[50px] overflow-scroll'}>
      <p className={'flex items-center'}><span className={'w-[45px]'}>前端：</span><Badge
        variant={'secondary'}>{row.getValue('f_url')}</Badge></p>
      <p className={'flex items-center'}><span className={'w-[45px]'}>后端：</span><Badge
        variant={'secondary'}>{row.original.b_url}</Badge></p>
    </div>
  },
  {
    accessorKey: 'status',
    size: 50,
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
    size: 160,
    header: '创建时间',
    cell: ({row}) => <div
      className={'w-[160px]'}>{dayjs.unix(row.getValue('created_at')).format('YYYY-MM-DD HH:mm:ss')}</div>
  },
  {
    id: 'actions',
    size: 80,
    header: '操作',
    cell: ({row}) => <DataTableRowActions row={row} isRemote={false} schemas={resourceSchema}/>,
  },
]
