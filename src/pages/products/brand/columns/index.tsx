import {ColumnDef} from '@tanstack/react-table'
import {Checkbox} from '@/components/ui/checkbox.tsx'
import {statuses} from '../data/data.tsx'
import {ColumnSchemaType, columnSchema} from '../data/schema.ts'
import {DataTableColumnHeader} from "../components/data-table-column-header.tsx";
import {DataTableRowActions} from "../components/data-table-row-actions.tsx";
import dayjs from "dayjs";
import {Badge} from "@/components/custom/badge.tsx";
import ReactLogo from "@/assets/react.svg";

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
    accessorKey: 'logo_url',
    header: '图标',
    cell: ({row}) => {
      const resourceUrl = import.meta.env.VITE_RESOURCE_URL;
      return (
        <div className='w-[50px]'>
          <img className='rounded-md object-cover h-[50px] w-[50px] border'
               src={row.original.logo_url ? resourceUrl + row.original.logo_url : ReactLogo}
               alt={row.original.desc}/>
        </div>
      )
    }
  },
  {
    accessorKey: 'brand_name',
    header: '名称',
    cell: ({row}) => {
      return (
        <div className='flex items-center w-[100px]'>
          <span>{row.getValue<boolean>('brand_name')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'is_hot',
    header: '热门',
    cell: ({row}) => <div className='w-[150px] flex items-start space-x-2'>
      {row.getValue('is_hot') === 1 ? <Badge variant={'red'}>是</Badge> : <Badge variant={'secondary'}>否</Badge>}
    </div>,
  },
  {
    accessorKey: 'desc',
    header: '描述',
    cell: ({row}) => <div className='w-[150px] overflow-scroll'>{row.getValue('desc')}</div>,
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
