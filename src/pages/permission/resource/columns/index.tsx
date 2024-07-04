import {ColumnDef} from '@tanstack/react-table'
import {Checkbox} from '@/components/ui/checkbox.tsx'
import {statuses} from '../data/data.tsx'
import {ColumnSchemaType, columnSchema} from '../data/schema.ts'
import {DataTableColumnHeader} from "../components/data-table-column-header.tsx";
import {DataTableRowActions} from "../components/data-table-row-actions.tsx";
import dayjs from "dayjs";
import {Badge} from "@/components/custom/badge.tsx";
import {
  IconSquareRoundedMinusFilled,
  IconSquareRoundedPlusFilled
} from "@tabler/icons-react";
import Icon from "@/components/custom/icon.tsx";

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
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({column}) => (
      <div className={'w-[30px]'}><DataTableColumnHeader column={column} title='ID'/></div>
    ),
    cell: ({row}) => <div className="w-[30px]">{row.getValue('id')}</div>,
    size: 30,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'icon',
    header: '图标',
    size: 30,
    cell: ({row}) => <div className="w-[30px]"><Icon name={row.getValue('icon')} size={16}/></div>
  },
  {
    accessorKey: 'name',
    size: 120,
    header: ({table}) => (
      <div className={'flex items-center cursor-pointer w-[120px]'} onClick={table.getToggleAllRowsExpandedHandler()}>
        {table.getIsAllRowsExpanded() ?
          <IconSquareRoundedMinusFilled className={'text-red-500'} size={18}/> :
          <IconSquareRoundedPlusFilled className={'text-indigo-500'} size={18}/>}
        <span className={'ml-2'}>名称</span>
      </div>
    ),
    cell: ({row, getValue}) => {
      return (
        <div className='flex items-center w-[120px]' style={{paddingLeft: `${(row.depth)}rem`}}>
          {row.getCanExpand() && (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: {cursor: 'pointer'},
              }}
            >
              {row.getIsExpanded() ?
                <IconSquareRoundedMinusFilled className={'text-red-500'} size={18}/> :
                <IconSquareRoundedPlusFilled className={'text-indigo-500'} size={18}/>
              }
            </button>
          )}
          <a className='flex flex-row items-center' key={getValue<string>()}
             data-tooltip-id="resource-tooltip"
             data-tooltip-content={`${row.original.f_url}|${row.original.b_url}`}
             data-tooltip-offset={22}>
            <span className={'mx-2'}>{getValue<string>()}</span>
          </a>
        </div>
      )
    },
  },
  {
    accessorKey: 'menu_type',
    header: '类型',
    size: 80,
    cell: ({row}) => {
      return (
        <div className='w-[80px]'>
          {parseInt(row.getValue('menu_type')) === 1 ?
            <Badge variant={'green'}>模块</Badge> :
            <Badge variant={'blue'}>操作</Badge>}
        </div>
      )
    }
  },
  {
    accessorKey: 'alias',
    header: '别名',
    size: 150,
  },
  {
    accessorKey: 'desc',
    header: '描述',
    size: 130,
    cell: ({row}) => <div className={'w-[130px] max-h-[50px] overflow-scroll'}>{row.getValue('desc')}</div>
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
    cell: ({row}) => <DataTableRowActions row={row} isRemote={false} schemas={columnSchema}/>,
  },
]
