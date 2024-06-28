import {ColumnDef} from '@tanstack/react-table'
import {Checkbox} from '@/components/ui/checkbox.tsx'
import {statuses} from '../data/data.tsx'
import {ColumnSchemaType, columnSchema} from '../data/schema.ts'
import {DataTableColumnHeader} from "../components/data-table-column-header.tsx";
import {DataTableRowActions} from "../components/data-table-row-actions.tsx";
import dayjs from "dayjs";
import {Badge} from "@/components/custom/badge.tsx";
import ReactLogo from "@/assets/react.svg";
import {IconSquareRoundedMinusFilled, IconSquareRoundedPlusFilled} from "@tabler/icons-react";

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
    cell: ({row}) => <div className='w-[40px]'>{row.getValue('id')}</div>,
    size: 30,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'cate_desc',
    header: '图标',
    cell: ({row}) => {
      const resourceUrl = import.meta.env.VITE_RESOURCE_URL;
      return (
        <div className='w-[50px]'>
          <img className='rounded-md object-cover h-[50px] w-[50px] border'
               src={row.original.cate_url ? resourceUrl + row.original.cate_url : ReactLogo}
               alt={row.original.cate_desc}/>
        </div>
      )
    }
  },
  {
    accessorKey: 'cate_name',
    header: ({table}) => (
      <div className={'flex items-center cursor-pointer w-[180px]'} onClick={table.getToggleAllRowsExpandedHandler()}>
        {table.getIsAllRowsExpanded() ?
          <IconSquareRoundedMinusFilled className={'text-red-500'} size={18}/> :
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
                <IconSquareRoundedMinusFilled className={'text-red-500'} size={18}/> :
                <IconSquareRoundedPlusFilled className={'text-indigo-500'} size={18}/>
              }
            </button>
          )}
          <span className={'mx-2'}>{getValue<boolean>()}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'is_hot',
    header: '标签',
    cell: ({row}) => <div className='w-[150px] flex items-start space-x-2'>
      {row.original.is_hot === 1 && <Badge variant={'red'}>热门</Badge>}
      {row.original.is_index === 1 && <Badge variant={'green'}>首页</Badge>}
    </div>,
  },
  {
    accessorKey: 'cate_desc',
    header: '描述',
    cell: ({row}) => <div className='w-[150px] overflow-scroll'>{row.getValue('cate_desc')}</div>,
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
    cell: ({row}) => <DataTableRowActions row={row} isRemote={false} schemas={columnSchema}/>,
  },
]
