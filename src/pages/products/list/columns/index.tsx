import {ColumnDef} from '@tanstack/react-table'
import {Checkbox} from '@/components/ui/checkbox.tsx'
import {statuses} from '../data/data.tsx'
import {ColumnSchemaType, columnSchema} from '../data/schema.ts'
import {DataTableColumnHeader} from "../components/data-table-column-header.tsx";
import {DataTableRowActions} from "../components/data-table-row-actions.tsx";
import dayjs from "dayjs";
import {Badge} from "@/components/custom/badge.tsx";
import {Progress} from "@/components/ui/progress";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ImageOff} from "lucide-react";

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
    accessorKey: 'goods_title',
    header: '产品',
    cell: ({row}) => {
      const resourceUrl = import.meta.env.VITE_RESOURCE_URL;
      return (
        <div className='w-[300px] flex'>
          <Avatar className={'rounded-md h-[70px] w-[70px] aspect-square m-auto'}>
            <AvatarImage src={row.original.thumb_url ? resourceUrl + row.original.thumb_url : ''} alt={row.original.desc}/>
            <AvatarFallback className='rounded-md aspect-square text-gray-300'>
              <ImageOff size={24}/>
            </AvatarFallback>
          </Avatar>
          <div className={'ml-2 space-y-1'}>
            <div className='h-10 overflow-hidden'>{row.original.goods_title}</div>
            <div className={'space-x-1'}>
              {row.original.is_hot === 1 && <Badge variant={'red'}>热</Badge>}
              {row.original.is_new === 1 && <Badge variant={'indigo'}>新</Badge>}
              {row.original.is_recommend === 1 && <Badge variant={'pink'}>推荐</Badge>}
            </div>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'cate_name',
    header: '分类',
    cell: ({row}) => <div className='w-[80px]'>
      {row.getValue('cate_name')}
      {/*<Badge variant={'secondary'}>{row.getValue('cate_name')}</Badge>*/}
    </div>,
  },
  {
    accessorKey: 'brand_name',
    header: '品牌',
    cell: ({row}) => <div className='w-[80px]'>
      {row.getValue('brand_name')}
      {/*{row.getValue('brand_name') !== '' && <Badge variant='secondary'>{row.getValue('brand_name')}</Badge>}*/}
    </div>,
  },
  {
    accessorKey: 'final_price',
    header: '价格',
    cell: ({row}) => <div className='w-[100px] '>
      <p className={'text-gray-500 line-through'}>¥{row.original.origin_price}</p>
      <p className={'text-black-500 font-medium'}>¥{row.getValue('final_price')}</p>
    </div>,
  },
  {
    accessorKey: 'total_stock',
    header: '库存',
    cell: ({row}) => <div className='w-[100px] flex items-center space-x-2'>
      <span>{row.getValue('total_stock')}</span>
      <Progress value={33} className={'h-[5px]'} />
    </div>
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
        <Badge variant={status.value == 1 ? 'green' : 'gray'}>
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
      return <div className={'w-[80px]'}>{dayjs.unix(row.getValue('created_at')).format('YYYY-MM-DD HH:mm:ss')}</div>
    }
  },
  {
    id: 'actions',
    header: '操作',
    cell: ({row}) => <DataTableRowActions row={row} isRemote={false} schemas={columnSchema}/>,
  },
]
