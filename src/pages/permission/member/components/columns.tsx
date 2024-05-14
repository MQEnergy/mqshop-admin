import {ColumnDef} from '@tanstack/react-table'

import {Badge} from '@/components/ui/badge.tsx'
import {Checkbox} from '@/components/ui/checkbox.tsx'

import {labels, priorities, statuses} from '../data/data.tsx'
import {Task, taskSchema} from '../data/schema.ts'
import {DataTableColumnHeader} from "@/components/custom/datatable/data-table-column-header.tsx";
import {DataTableRowActions} from "@/components/custom/datatable/data-table-row-actions.tsx";

export const columns: ColumnDef<Task>[] = [
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
        <DataTableColumnHeader column={column} title='商品'/>
    ),
    cell: ({row}) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'url',
    header: ({column}) => (
        <DataTableColumnHeader column={column} title='Url'/>
    ),
    cell: ({row}) => <div className='w-[80px]'>
      <img className='rounded-md object-cover h-[60px] w-[60px]' src={row.getValue('url')}/>
    </div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({column}) => (
        <DataTableColumnHeader column={column} title='Title'/>
    ),
    cell: ({row}) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
          <div className='flex space-x-2'>
            {label && <Badge variant='outline'>{label.label}</Badge>}
            <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('title')}
          </span>
          </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({column}) => (
        <DataTableColumnHeader column={column} title='Status'/>
    ),
    cell: ({row}) => {
      const status = statuses.find(
          (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }

      return (
          <div className='flex w-[100px] items-center'>
            {status.icon && (
                <status.icon className='mr-2 h-4 w-4 text-muted-foreground'/>
            )}
            <span>{status.label}</span>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'priority',
    header: ({column}) => (
        <DataTableColumnHeader column={column} title='Priority'/>
    ),
    cell: ({row}) => {
      const priority = priorities.find(
          (priority) => priority.value === row.getValue('priority')
      )

      if (!priority) {
        return null
      }

      return (
          <div className='flex items-center'>
            {priority.icon && (
                <priority.icon className='mr-2 h-4 w-4 text-muted-foreground'/>
            )}
            <span>{priority.label}</span>
          </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({row}) => <DataTableRowActions row={row} labels={labels} schemas={taskSchema}/>,
  },
]
