import {ColumnDef} from '@tanstack/react-table'
import {Checkbox} from '@/components/ui/checkbox.tsx'
import {inputTypes} from '../data/data.tsx'
import {AttrColumnSchemaType, attrColumnSchema} from '../data/schema.ts'
import {DataTableColumnHeader} from "../components/data-table-column-header.tsx";
import {DataTableRowActions} from "../components/data-table-row-actions.tsx";
import dayjs from "dayjs";
import {Badge} from "@/components/custom/badge.tsx";

export const columns: ColumnDef<AttrColumnSchemaType>[] = [
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
    accessorKey: 'attr_name',
    header: '属性名称',
    cell: ({row}) => {
      return (
        <div className='flex items-center w-[100px]'>
          <span>{row.getValue<string>('attr_name')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'attr_value',
    header: '属性值',
    cell: ({row}) => {
      return (
        <div className='flex items-center w-[100px]'>
          <span>{row.getValue<string>('attr_value')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'input_type',
    header: '录入方式',
    cell: ({row}) => {
      const inputType = inputTypes.find(
        (inputType) => inputType.value === row.getValue('input_type')
      )
      if (!inputType) {
        return null
      }
      return (
        <div className={'w-[100px]'}>
          <Badge variant={inputType.value == 1 ? 'green' : 'red'}>
            <span>{inputType.label}</span>
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'sort_order',
    header: '排序',
    cell: ({row}) => {
      return (
        <div className='flex items-center w-[80px]'>
          <span>{row.getValue<string>('sort_order')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: '创建时间',
    cell: ({row}) => {
      return <div className={'w-[100px]'}>{dayjs.unix(row.getValue('created_at')).format('YYYY-MM-DD HH:mm:ss')}</div>
    }
  },
  {
    id: 'actions',
    header: '操作',
    cell: ({row}) => <DataTableRowActions row={row} isRemote={false} schemas={attrColumnSchema}/>,
  },
]
